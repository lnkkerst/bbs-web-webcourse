<script setup lang="ts">
import { z } from "zod";

definePageMeta({
  name: "auth",
});

const router = useRouter();
const userStore = useUserStore();

const formEl = ref();

// default to login
const register = ref(false);
const form = ref({
  email: "",
  username: "",
  password: "",
});
const displayLabel = computed(() => (register.value ? "注册" : "登录"));
const submitting = ref(false);
const routing = ref(false);

async function handleSubmit() {
  if (!formEl.value) {
    return;
  }

  if (!(await formEl.value.validate?.())) {
    return;
  }

  submitting.value = true;
  if (!register.value) {
    try {
      await userStore.login({
        username: form.value.username,
        password: form.value.password,
      });

      Notify.create({
        type: "positive",
        message: "登录成功",
      });

      routing.value = true;
      router.push("/");
    } catch (_e) {
      const e = _e as any;
      if (e.status === 401) {
        Notify.create({
          type: "negative",
          message: "用户名或密码错误，登录失败",
        });
      } else {
        Notify.create({
          type: "negative",
          message: "未知错误，登录失败",
        });
      }
    } finally {
      submitting.value = false;
    }
  } else {
    const { $blogFetch } = useNuxtApp();
    try {
      await $blogFetch("/api/register", {
        method: "POST",
        body: {
          email: form.value.email,
          login: form.value.username,
          password: form.value.password,
          firstName: form.value.username,
        },
      });
      Notify.create({
        type: "positive",
        message: "注册成功",
      });
      register.value = false;
    } catch (_e) {
      Notify.create({
        type: "negative",
        message: "注册失败，未知错误",
      });
    } finally {
      submitting.value = false;
    }
  }
}

function handleReset() {
  form.value = { email: "", username: "", password: "" };
  if (formEl.value) {
    formEl.value.resetValidation?.();
  }
}
</script>

<template>
  <div>
    <q-page padding class="grid place-items-center">
      <q-card class="w-full max-w-96">
        <q-card-section class="bg-primary text-center py-8">
          <span class="text-xl font-medium text-white">
            {{ displayLabel }}
          </span>

          <QFab
            color="secondary"
            icon="mdi-plus"
            class="absolute bottom-0 right-4 translate-y-1/2"
            v-model="register"
          ></QFab>
        </q-card-section>

        <q-card-section class="px-6 pt-8">
          <q-form class="q-gutter-md" ref="formEl">
            <q-input
              v-if="register"
              v-model="form.email"
              label="邮箱"
              type="email"
              :rules="[
                v =>
                  z.string().email().safeParse(v).success || '邮箱格式不合法',
              ]"
              lazy-rules
            ></q-input>

            <q-input
              v-model="form.username"
              label="用户名"
              type="text"
              :rules="[
                v =>
                  z.string().min(4).max(20).safeParse(v).success ||
                  '用户名长度必须介于4到20个字符之间',
              ]"
              lazy-rules
            ></q-input>

            <q-input
              v-model="form.password"
              label="密码"
              type="password"
              :rules="[
                v =>
                  z.string().min(4).max(36).safeParse(v).success ||
                  '密码长度必须介于4到36个字符之间',
              ]"
              lazy-rules
            ></q-input>

            <div class="flex justify-center">
              <q-btn
                :label="routing ? undefined : displayLabel"
                :icon="routing ? 'mdi-check' : undefined"
                type="submit"
                color="primary"
                @click.prevent="handleSubmit"
                :loading="submitting"
                :disable="routing"
              ></q-btn>

              <q-btn
                label="清空"
                type="reset"
                color="primary"
                flat
                class="ml-8"
                @click.prevent="handleReset"
              ></q-btn>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-page>
  </div>
</template>

<style scoped lang="scss"></style>
