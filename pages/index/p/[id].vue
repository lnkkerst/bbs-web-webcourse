<script setup lang="ts">
import { marked } from "marked";
import type { Post } from "~/types/blogApi";

const route = useRoute();
const { $apiFetch } = useNuxtApp();

const postId = computed(() => {
  return Number.parseInt(route.params.id as string);
});
const postFetch = await useApiFetch<Post>(
  () => `/api/posts/${postId.value}`,
  {},
);
const postHtml = computed(() => {
  const { $dompurify } = useNuxtApp();
  const content = postFetch.data.value?.content ?? "";
  return $dompurify.sanitize(marked.parse(content) as string);
});
const user = computed(() => postFetch.data.value?.user);
const commentCountFetch = await useApiFetch<string>("/api/comments/count", {
  query: computed(() => ({
    "postId.equals": postFetch.data.value?.id ?? -1,
  })),
});
const favCountFetch = await useApiFetch<string>("/api/favorites/count", {
  query: computed(() => ({
    "type.equals": "POST" as any,
    "postId.equals": postFetch.data.value?.id ?? -1,
  })),
});
</script>

<template>
  <div>
    <q-card>
      <q-inner-loading :showing="postFetch.pending.value">
        <q-spinner-gears color="primary"></q-spinner-gears>
      </q-inner-loading>
      <q-card-section>
        <div class="prose max-w-full">
          <div class="flex justify-center items-center">
            <div class="flex-grow">
              <h1>{{ postFetch.data.value?.title }}</h1>

              <div class="text-gray-5">
                <NuxtLink :to="`/u/${user?.id}`">
                  {{ `${user?.firstName}@${user?.login}` }}
                </NuxtLink>
                <span class="mx-2" v-if="postFetch.data.value?.createdAt">
                  {{
                    new Date(postFetch.data.value?.createdAt).toLocaleString()
                  }}
                </span>
                <span class="mx-1">
                  {{ `${commentCountFetch.data.value}回复` }}
                </span>
                <span class="mx-1">
                  {{ `${favCountFetch.data.value}收藏` }}
                </span>
              </div>
            </div>

            <NuxtLink :to="`/u/${user?.id}`">
              <q-avatar size="64px" class="my-4">
                <q-img
                  :src="postFetch.data.value?.user.imageUrl || defaultAvatar"
                ></q-img>
              </q-avatar>
            </NuxtLink>
          </div>

          <q-separator></q-separator>

          <div v-html="postHtml"></div>
        </div>
      </q-card-section>

      <q-card-section class="flex flex-row-reverse">
        <PostFavoriteButton
          :post-id="postId"
          color="primary"
        ></PostFavoriteButton>
      </q-card-section>
    </q-card>

    <PostCommentCard
      :post-id="postFetch.data.value?.id ?? -1"
    ></PostCommentCard>
  </div>
</template>
