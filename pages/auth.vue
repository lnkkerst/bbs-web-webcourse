<script setup lang="ts">
definePageMeta({
  name: "auth",
});

const router = useRouter();
const userStore = useUserStore();

// default to login
const register = ref(false);
const form = ref({
  email: "",
  username: "",
  password: "",
});
const displayLabel = computed(() => (register.value ? "注册" : "登录"));
const submitting = ref(false);

async function handleSubmit() {
  submitting.value = true;
  try {
    await userStore.login({
      username: form.value.username,
      password: form.value.password,
    });

    Notify.create({
      type: "positive",
      message: "登录成功",
    });

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
}

function handleReset() {
  form.value = { email: "", username: "", password: "" };
}
</script>

<template>
  <div>
    <q-page padding class="grid place-items-center">
      <q-card class="w-full max-w-96">
        <q-card-section class="bg-primary text-center">
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

        <q-card-section>
          <q-form class="q-gutter-md">
            <q-input
              v-show="register"
              v-model="form.email"
              label="邮箱"
              type="email"
            ></q-input>

            <q-input
              v-model="form.username"
              label="用户名"
              type="text"
            ></q-input>

            <q-input
              v-model="form.password"
              label="密码"
              type="password"
            ></q-input>

            <div class="flex justify-center">
              <q-btn
                :label="displayLabel"
                type="submit"
                color="primary"
                @click.prevent="handleSubmit"
                :loading="submitting"
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
