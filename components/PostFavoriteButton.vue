<script setup lang="ts">
const props = defineProps<{
  postId: number;
}>();

const { $blogFetch } = useNuxtApp();
const userStore = useUserStore();

const favStatusFetch = await useBlogFetch("/api/favorites", {
  query: computed(
    () =>
      ({
        "type.equals": "POST",
        "ownerId.equals": userStore.user?.id!,
        "postId.equals": props.postId,
      }) as any,
  ),
});
const favorited = computed(() => {
  if (!favStatusFetch.data.value) {
    return false;
  }

  if (favStatusFetch.data.value.length === 0) {
    return false;
  }

  return favStatusFetch.data.value[0];
});
const submitting = ref(false);

async function handleClick() {
  submitting.value = true;
  if (favorited.value) {
    try {
      await $blogFetch("/api/favorites/{id}", {
        method: "DELETE",
        path: { id: favorited.value.id! },
      });

      Notify.create({
        type: "positive",
        message: "取消收藏成功",
      });
      favStatusFetch.refresh();
    } catch (_e) {
      Notify.create({
        type: "negative",
        message: "取消收藏失败，未知错误",
      });
    } finally {
      submitting.value = false;
    }
  } else {
    try {
      await $blogFetch("/api/favorites", {
        method: "POST",
        body: {
          type: "POST",
          owner: {
            id: userStore.user?.id!,
          },
          post: {
            id: props.postId,
          },
        } as any,
      });

      Notify.create({
        type: "positive",
        message: "收藏成功",
      });
      favStatusFetch.refresh();
    } catch (_e) {
      Notify.create({
        type: "negative",
        message: "收藏失败，未知错误",
      });
    } finally {
      submitting.value = false;
    }
  }
}
</script>

<template>
  <q-btn
    flat
    :loading="submitting"
    :icon="favorited ? 'mdi-check' : undefined"
    :label="favorited ? '已收藏' : '收藏'"
    @click="handleClick"
  ></q-btn>
</template>
