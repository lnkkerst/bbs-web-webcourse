<script setup lang="ts">
const userStore = useUserStore();
const router = useRouter();

const label = computed(() => {
  return userStore.user ? "注销" : "登录";
});

async function handleClick() {
  if (userStore.user) {
    await userStore.logout();
    Notify.create({
      type: "positive",
      message: "注销成功",
    });
    router.push("/");
  } else {
    router.push("/auth");
  }
}
</script>

<template>
  <div>
    <q-btn flat :label="label" @click.prevent="handleClick"></q-btn>
  </div>
</template>
