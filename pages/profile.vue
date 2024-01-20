<script setup lang="ts">
import { z } from "zod";

const userStore = useUserStore();
const { $apiFetch } = useNuxtApp();

const loading = ref(true);
const formEl = ref();
const form = ref({
  email: "",
  username: "",
  nickname: "",
  signature: "",
  imageUrl: "",
});
const submitting = ref(false);
const displayAvatar = refDebounced<string>(
  computed(() => form.value.imageUrl) as any,
  1000,
) as any;

function updateForm() {
  form.value.email = userStore.user?.email ?? "";
  form.value.username = userStore.user?.login ?? "";
  form.value.nickname = userStore.user?.firstName ?? "";
  form.value.signature = userStore.user?.lastName ?? "";
  form.value.imageUrl = userStore.user?.imageUrl ?? "";
}

async function handleSubmit() {
  if (!formEl.value) {
    return;
  }
  if (!(await formEl.value.validate?.())) {
    return;
  }
  submitting.value = true;
  try {
    await $apiFetch("/api/account", {
      method: "POST",
      body: {
        login: form.value.username,
        imageUrl: form.value.imageUrl,
        firstName: form.value.nickname,
        lastName: form.value.signature,
      },
    });

    Notify.create({
      type: "positive",
      message: "更新成功",
    });

    await userStore.refresh();
    updateForm();
  } catch (_e) {
    Notify.create({
      type: "negative",
      message: "更新失败，未知错误",
    });
  } finally {
    submitting.value = false;
  }
}

onMounted(async () => {
  await userStore.refresh();
  updateForm();
  loading.value = true;
});
</script>

<template>
  <q-page padding>
    <div class="mx-auto w-full max-w-256">
      <q-card>
        <q-card-section class="flex flex-col-reverse md:flex-row gap-4">
          <q-form ref="formEl" class="grow-1">
            <q-input label="用户名" disable v-model="form.username"></q-input>

            <q-input label="邮箱" disable v-model="form.email"></q-input>

            <q-input
              label="昵称"
              v-model="form.nickname"
              :rules="[
                v =>
                  z.string().min(4).max(20).safeParse(v).success ||
                  '昵称长度必须介于4到20个字符之间',
              ]"
              lazy-rules
            ></q-input>

            <q-input
              label="个性签名"
              v-model="form.signature"
              :rules="[
                v =>
                  z.string().min(1).max(64).safeParse(v).success ||
                  '个性签名长度必须介于1到64个字符之间',
              ]"
              lazy-rules
            ></q-input>

            <q-input
              hint="默认头像链接为邮箱关联的Gravatar头像，本站暂不提供头像文件托管"
              label="头像链接"
              v-model="form.imageUrl"
              :rules="[
                v =>
                  z.string().url().safeParse(v).success ||
                  '头像链接必须是正确的URL格式',
              ]"
              lazy-rules
            ></q-input>

            <div class="pt-4">
              <q-btn
                color="primary"
                :loading="submitting"
                @click="handleSubmit"
              >
                更新
              </q-btn>
              <q-btn color="primary ml-4" flat @click="updateForm()">
                重置
              </q-btn>
            </div>
          </q-form>

          <div class="flex item-center">
            <q-avatar size="128px">
              <q-img :src="displayAvatar || defaultAvatar"></q-img>
            </q-avatar>
          </div>
        </q-card-section>

        <q-separator></q-separator>

        <q-card-section>
          <ChangePassword></ChangePassword>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>
