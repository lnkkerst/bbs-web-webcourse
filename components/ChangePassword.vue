<script setup lang="ts">
import { z } from "zod";

const formEl = ref();
const { $apiFetch } = useNuxtApp();

const form = ref({
  currentPassword: "",
  newPassword: "",
  repeatPassword: "",
});

const submitting = ref(false);

async function handleSubmit() {
  if (!formEl.value) {
    return;
  }
  if (!(await formEl.value?.validate?.())) {
    return;
  }

  submitting.value = true;
  try {
    await $apiFetch("/api/account/change-password", {
      method: "POST",
      body: {
        currentPassword: form.value.currentPassword,
        newPassword: form.value.newPassword,
      },
    });
    Notify.create({
      type: "positive",
      message: "更新密码成功",
    });
  } catch (_e) {
    const e = _e as any;
    if (e?.status === 400) {
      Notify.create({
        type: "negative",
        message: "更改密码失败，原始密码错误",
      });
    } else {
      Notify.create({
        type: "negative",
        message: "更改密码失败，未知错误",
      });
    }
  } finally {
    submitting.value = false;
  }
}
</script>

<template>
  <div>
    <div class="text-h6 py-2">更改密码</div>
    <q-form ref="formEl">
      <q-input
        v-model="form.currentPassword"
        label="当前密码"
        type="password"
        :rules="[
          v =>
            z.string().min(4).max(36).safeParse(v).success ||
            '密码长度必须介于4到36个字符之间',
        ]"
        lazy-rules
      ></q-input>

      <q-input
        v-model="form.newPassword"
        label="新密码"
        type="password"
        :rules="[
          v =>
            z.string().min(4).max(36).safeParse(v).success ||
            '密码长度必须介于4到36个字符之间',
        ]"
        lazy-rules
      ></q-input>

      <q-input
        v-model="form.repeatPassword"
        label="重复密码"
        type="password"
        :rules="[v => v === form.newPassword || '两次输入的密码不一样']"
        lazy-rules
      ></q-input>

      <div class="pt-4">
        <q-btn color="primary" :loading="submitting" @click="handleSubmit">
          更改密码
        </q-btn>
      </div>
    </q-form>
  </div>
</template>
