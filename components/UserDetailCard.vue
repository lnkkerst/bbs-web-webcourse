<script setup lang="ts">
const userStore = useUserStore();

const { data: nodesFavCount } = await useApiFetch<string>(
  "/api/favorites/count",
  {
    query: {
      "type.equals": "NODE",
      "ownerId.equals": userStore.user?.id,
    },
  },
);
const { data: usersFavCount } = await useApiFetch<string>(
  "/api/favorites/count",
  {
    query: {
      "type.equals": "USER",
      "ownerId.equals": userStore.user?.id,
    },
  },
);
const { data: postsFavCount } = await useApiFetch<string>(
  "/api/favorites/count",
  {
    query: {
      "type.equals": "POST",
      "ownerId.equals": userStore.user?.id,
    },
  },
);
const { data: postsCount } = await useApiFetch<string>("/api/posts/count", {
  query: {
    "userId.equals": userStore.user?.id,
  },
});
const { data: commentsCount } = await useApiFetch<string>(
  "/api/comments/count",
  {
    query: {
      "userId.equals": userStore.user?.id,
    },
  },
);
const { data: fansCount } = await useApiFetch<string>("/api/favorites/count", {
  query: {
    "type.equals": "USER",
    "userId.equals": userStore.user?.id,
  },
});
const items = ref([
  {
    title: "板块收藏",
    content: nodesFavCount,
    to: "/f/nodes",
  },
  {
    title: "用户收藏",
    content: usersFavCount,
    to: "/f/users",
  },
  {
    title: "帖子收藏",
    content: postsFavCount,
    to: "/f/posts",
  },
  {
    title: "发帖数",
    content: postsCount,
    to: "/me/posts",
  },
  {
    title: "评论数",
    content: commentsCount,
    to: "/me/comments",
  },
  {
    title: "粉丝数",
    content: fansCount,
    to: "/me/fans",
  },
]);
</script>

<template>
  <div>
    <q-card-section horizontal>
      <NuxtLink to="/profile">
        <q-card-section>
          <q-avatar size="72px">
            <q-img :src="userStore.user?.imageUrl || defaultAvatar"></q-img>
          </q-avatar>
        </q-card-section>
      </NuxtLink>

      <NuxtLink to="/profile">
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
      </NuxtLink>
    </q-card-section>

    <q-card-section>
      <div class="grid grid-cols-3 gap-2">
        <NuxtLink
          v-for="item in items"
          :key="item.title"
          :to="item.to"
          class="hover:opacity-70 active:opacity-50"
        >
          <div class="text-center">{{ item.title }}</div>
          <div class="text-center">{{ item.content }}</div>
        </NuxtLink>
      </div>
    </q-card-section>
  </div>
</template>

<style scoped lang="scss"></style>
