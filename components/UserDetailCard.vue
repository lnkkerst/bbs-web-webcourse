<script setup lang="ts">
const userStore = useUserStore();

const { data: nodesFavCount } = await useBlogFetch("/api/favorites/count", {
  query: {
    "type.equals": "NODE",
  },
});
const { data: usersFavCount } = await useBlogFetch("/api/favorites/count", {
  query: {
    "type.equals": "USER",
  },
});
const { data: postsFavCount } = await useBlogFetch("/api/favorites/count", {
  query: {
    "type.equals": "POST",
  },
});
const { data: postsCount } = await useBlogFetch("/api/posts/count", {
  query: {
    "userId.equals": userStore.user?.id,
  },
});
const { data: commentsCount } = await useBlogFetch("/api/comments/count", {
  query: {
    "userId.equals": userStore.user?.id,
  },
});
const { data: fansCount } = await useBlogFetch("/api/favorites/count", {
  query: {
    "type.equals": "USER",
    "userId.equals": userStore.user?.id,
  },
});
const items = ref([
  {
    title: "板块收藏",
    content: nodesFavCount,
  },
  {
    title: "用户收藏",
    content: usersFavCount,
    to: "/f/users",
  },
  {
    title: "帖子收藏",
    content: postsFavCount,
  },
  {
    title: "发帖数",
    content: postsCount,
  },
  {
    title: "评论数",
    content: commentsCount,
  },
  {
    title: "粉丝数",
    content: fansCount,
  },
]);
</script>

<template>
  <div>
    <q-card-section horizontal>
      <q-card-section>
        <q-avatar size="72px">
          <q-img :src="userStore.user?.imageUrl || defaultAvatar"></q-img>
        </q-avatar>
      </q-card-section>

      <q-card-section class="pl-0">
        <div class="">
          <span class="text-4 truncate">
            {{ userStore.user?.firstName }}
          </span>
          <span class="text-gray-6">{{ `@${userStore.user?.login}` }}</span>
        </div>
        <div class="text-gray-5">
          {{ userStore.user?.lastName }}
        </div>
      </q-card-section>
    </q-card-section>

    <q-card-section>
      <div class="grid grid-cols-3 gap-2">
        <NuxtLink v-for="item in items" :key="item.title" :to="item.to">
          <div class="text-center">{{ item.title }}</div>
          <div class="text-center">{{ item.content }}</div>
        </NuxtLink>
      </div>
    </q-card-section>
  </div>
</template>

<style scoped lang="scss"></style>
