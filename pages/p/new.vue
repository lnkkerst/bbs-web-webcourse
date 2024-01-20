<script setup lang="ts">
import { MdEditor } from "md-editor-v3";
import "md-editor-v3/lib/style.css";

import { z } from "zod";
import type { Node } from "~/types/blogApi";

const router = useRouter();
const userStore = useUserStore();
const { $apiFetch } = useNuxtApp();
if (!userStore.user) {
  Notify.create({
    type: "warning",
    message: "请先登录",
  });
  router.replace("/auth");
}

const nodeSelectEl = ref();
const titleInputEl = ref();

const title = ref("");
const content = ref("");
const selectedNode = ref({ id: -1, name: "请选择" });
const nodesFetch = await useApiFetch<Node[]>("/api/nodes");
const submitting = ref(false);
const routing = ref(false);

async function handleSubmit() {
  if (!nodeSelectEl.value || !titleInputEl.value) {
    return;
  }

  if (
    !(await nodeSelectEl.value.validate?.()) ||
    !(await titleInputEl.value.validate?.())
  ) {
    return;
  }

  if (content.value.length < 5 || content.value.length > 4096) {
    Notify.create({
      type: "warning",
      message: "正文内容的长度必须在5到4096之间",
    });
    return;
  }

  submitting.value = true;
  const userStore = useUserStore();
  try {
    const res = await $apiFetch("/api/posts", {
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

    routing.value = true;
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
  <q-page padding>
    <div class="mx-auto py-6 w-full max-w-256">
      <div class="flex">
        <h1 class="flex-grow text-h4 pb-6 text-medium">发布新帖子</h1>
      </div>

      <div>
        <q-select
          ref="nodeSelectEl"
          v-model="selectedNode"
          :options="nodesFetch.data.value ?? []"
          option-value="id"
          option-label="name"
          label="发布板块"
          class="min-w-36"
          :rules="[v => v.id !== -1 || '请选择板块']"
          lazy-rules
        ></q-select>
      </div>

      <q-input
        ref="titleInputEl"
        v-model="title"
        label="请输入标题"
        :rules="[
          v =>
            z.string().min(4).max(64).safeParse(v).success ||
            '标题长度必须介于4和64之间',
        ]"
      ></q-input>

      <ClientOnly>
        <MdEditor v-model="content" class="w-full mt-4 my-2"></MdEditor>
      </ClientOnly>

      <q-btn
        class="mx-auto mt-4 w-full"
        color="primary"
        :icon="routing ? 'mdi-check' : undefined"
        :disable="selectedNode.id === -1 || routing"
        :loading="submitting"
        :label="!routing ? '发布' : '跳转中'"
        @click.prevent="handleSubmit"
      ></q-btn>
    </div>
  </q-page>
</template>

<style lang="scss" scoped></style>
