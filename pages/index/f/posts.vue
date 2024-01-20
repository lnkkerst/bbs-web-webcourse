<script setup lang="ts">
import type { Favorite, Post } from "~/types/blogApi";

const userStore = useUserStore();
const { $apiFetch } = useNuxtApp();

const postsFavFetch = await useApiFetch<Favorite[]>("/api/favorites", {
  query: {
    "type.equals": "POST",
    "ownerId.equals": userStore.user?.id,
  },
});

const posts = asyncComputed(async () => {
  if (!postsFavFetch.data.value) {
    return [];
  }
  const res: Post[] = [];
  await Promise.all(
    postsFavFetch.data.value.map(async fav => {
      if (!fav.post?.id) {
        return;
      }
      const post = await $apiFetch(`/api/posts/${fav.post.id}`, {});
      res.push(post);
    }),
  );
  return res;
}) as globalThis.Ref<Post[]>;
</script>

<template>
  <q-card>
    <q-list>
      <q-item v-for="post in posts">
        <q-item-section avatar>
          <q-avatar>
            <q-img :src="post.user.imageUrl || defaultAvatar"></q-img>
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <NuxtLink :to="`/p/${post.id}`">
            <q-item-label class="hover:opacity-80 active:opacity-60">
              {{ post.title }}
            </q-item-label>
          </NuxtLink>
        </q-item-section>

        <q-item-section side>
          <PostFavoriteButton
            :post-id="post.id!"
            color="primary"
            :flat="false"
          ></PostFavoriteButton>
        </q-item-section>
      </q-item>
    </q-list>

    <q-card-section v-if="!posts || posts.length === 0">
      你没有收藏的帖子
    </q-card-section>
  </q-card>
</template>
