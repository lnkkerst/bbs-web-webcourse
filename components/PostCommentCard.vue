<script setup lang="ts">
import type { Comment } from "~/types/blogApi";

const props = defineProps<{ postId: number }>();

const userStore = useUserStore();
const router = useRouter();

const newCommentEl = ref<HTMLElement>();
const replyChipEl = ref<HTMLElement>();

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
const commentsEl = ref<HTMLElement[]>([]);

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
  newCommentEl.value?.scrollIntoView({ behavior: "smooth" });
  useAnime({
    targets: replyChipEl.value,
    opacity: [0.3, 1, 0.3, 1],
    easing: "easeInOutQuad",
    duration: 1000,
  });
}

function scrollToComment(id: number) {
  commentsEl.value.some(el => {
    if (Number.parseInt(el.dataset.commentId as string) === id) {
      el.scrollIntoView({ behavior: "smooth" });
      useAnime({
        targets: el,
        opacity: [0.3, 1, 0.3, 1],
        easing: "easeInOutQuad",
        duration: 1000,
      });
      return true;
    }
  });
}
</script>

<template>
  <q-card class="mt-4">
    <q-card-section>
      <div ref="newCommentEl" class="scroll-mt-20">
        <div id="new-comment" class="flex items-center gap-2 h-10">
          <div class="text-h6">
            {{ userStore.user ? "发表新评论" : "登录以发表评论" }}
          </div>
          <div ref="replyChipEl">
            <q-chip v-if="replyId" removable @remove="replyId = undefined">
              回复 {{ replyId }}
            </q-chip>
          </div>
        </div>

        <template v-if="userStore.user">
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
        </template>
      </div>
    </q-card-section>

    <q-card-section class="pl-6 pr-4">
      <q-timeline color="primary">
        <div
          v-for="comment in commentsFetch.data.value"
          ref="commentsEl"
          class="scroll-mt-20"
          :data-comment-id="comment.id"
        >
          <q-timeline-entry :avatar="comment.user.imageUrl || defaultAvatar">
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
              <span class="float-right text-gray-6">
                {{ `#${comment.id}` }}
              </span>
            </template>
            <template #title>
              <span class="text-bold">
                {{ comment.user.firstName }}
              </span>
              <span v-if="comment.reply">
                回复给
                <span
                  class="hover:opacity-80 active:opative-80 cursor-pointer"
                  @click="scrollToComment(comment?.reply?.id ?? -1)"
                >
                  {{ comment.reply.id }}
                </span>
              </span>
            </template>
            <div class="break-words">
              {{ comment.content }}
            </div>
          </q-timeline-entry>
        </div>
      </q-timeline>
      <div class="text-center text-gray-5">后面没有了～</div>
    </q-card-section>
  </q-card>
</template>
