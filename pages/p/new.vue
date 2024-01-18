<script setup lang="ts">
import { MdEditor } from "md-editor-v3";
import "md-editor-v3/lib/style.css";

const router = useRouter();
const userStore = useUserStore();
if (!userStore.user) {
  Notify.create({
    type: "warning",
    message: "请先登录",
  });
  router.push("/auth");
}

const title = ref("");
const content = ref("");
const selectedNode = ref({ id: -1, name: "请选择" });
const nodesFetch = await useBlogFetch("/api/nodes");
const submitting = ref(false);

async function handleSubmit() {
  submitting.value = true;
  const { $blogFetch } = useNuxtApp();
  const userStore = useUserStore();
  try {
    const res = await $blogFetch("/api/posts", {
      method: "POST",
      body: {
        title: title.value,
        content: content.value,
        createdAt: new Date().toISOString(),
        node: {
          id: selectedNode.value.id,
        },
        user: {
          id: userStore.user?.id,
        },
      } as any,
    });

    Notify.create({
      type: "positive",
      message: "发布成功",
    });

    router.push(`/p/${res.id}`);
  } catch (_e) {
    Notify.create({
      type: "negative",
      message: "未知错误，发布失败",
    });
  } finally {
    submitting.value = false;
  }
}
</script>

<template>
  <q-page>
    <div class="mx-auto py-6 w-96/100 max-w-256">
      <div class="flex">
        <h1 class="flex-grow text-h4 pt-2 pb-6 text-medium">发布新帖子</h1>
      </div>

      <div>
        <q-select
          v-model="selectedNode"
          :options="nodesFetch.data.value ?? []"
          option-value="id"
          option-label="name"
          label="发布板块"
          class="min-w-36"
        ></q-select>
      </div>

      <q-input v-model="title" label="请输入标题"></q-input>

      <q-card class="mt-4">
        <ClientOnly>
          <MdEditor v-model="content" class="w-full"></MdEditor>
        </ClientOnly>
      </q-card>

      <q-btn
        class="mx-auto mt-4 w-full"
        color="primary"
        :disable="selectedNode.id === -1"
        :loading="submitting"
        @click.prevent="handleSubmit"
      >
        发布
      </q-btn>
    </div>
  </q-page>
</template>

<style lang="scss" scoped></style>
