<script setup lang="ts">
import type { Comment } from "~/types/blogApi";

const props = defineProps<{ postId: number }>();

const userStore = useUserStore();

const newCommentEl = ref<HTMLElement>();

const commentsFetch = await useBlogFetch("/api/comments", {
  query: computed(
    () =>
      ({
        "postId.equals": props.postId,
        sort: "createdAt,desc",
      }) as any,
  ),
});
const newCommentText = ref("");
const replyId = ref<number>();
const submitting = ref(false);
const commentsIdMap = computed(() => {
  let res: Record<number, Comment> = {};
  if (!commentsFetch.data.value) {
    return res;
  }
  for (let comment of commentsFetch.data.value) {
    res[comment.id ?? -1] = comment;
  }
  return res;
});

async function handleSubmit() {
  const { $blogFetch } = useNuxtApp();
  submitting.value = true;
  try {
    const _res = await $blogFetch("/api/comments", {
      method: "POST",
      body: {
        content: newCommentText.value,
        createdAt: new Date().toISOString(),
        post: {
          id: props.postId,
        },
        user: {
          id: userStore.user?.id,
        },
        ...(replyId.value
          ? {
              reply: {
                id: replyId.value,
              },
            }
          : {}),
      } as any,
    });

    Notify.create({
      type: "positive",
      message: "发布成功",
    });

    newCommentText.value = "";
    replyId.value = undefined;
    commentsFetch.refresh();
  } catch (_e) {
    Notify.create({
      type: "negative",
      message: "未知错误，发布失败",
    });
  } finally {
    submitting.value = false;
  }
}

function handleReply(id: number) {
  replyId.value = id;
  newCommentEl.value?.scrollIntoView({ behavior: "auto" });
}
</script>

<template>
  <q-card class="mt-4">
    <q-card-section>
      <div ref="newCommentEl" class="scroll-mt-20">
        <div id="new-comment" class="flex items-center gap-2 h-10">
          <div class="text-h6">发表新评论</div>
          <q-chip v-if="replyId" removable @remove="replyId = undefined">
            回复 {{ replyId }}
          </q-chip>
        </div>

        <q-input type="textarea" v-model="newCommentText"></q-input>

        <div class="flex mt-4 justify-end">
          <q-btn
            :loading="submitting"
            color="primary"
            @click.prevent="handleSubmit"
          >
            发布
          </q-btn>
        </div>
      </div>
    </q-card-section>

    <q-card-section>
      <q-timeline color="primary">
        <q-timeline-entry
          v-for="comment in commentsFetch.data.value"
          :avatar="comment.user.imageUrl || defaultAvatar"
        >
          <template #subtitle>
            <span>{{ new Date(comment.createdAt).toLocaleString() }}</span>
            <q-btn
              flat
              dense
              color="primary"
              class="mx-1"
              @click.prevent="handleReply(comment.id ?? -1)"
            >
              回复
            </q-btn>
          </template>
          <template #title>
            <span class="text-bold">
              {{ comment.user.firstName }}
            </span>
            <span v-if="comment.reply">
              回复给
              {{ comment.reply.id }}
            </span>
          </template>
          <div class="break-words">
            {{ comment.content }}
          </div>
        </q-timeline-entry>
      </q-timeline>
    </q-card-section>
  </q-card>
</template>
