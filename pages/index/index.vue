<script setup lang="ts">
import type { Favorite } from "~/types/blogApi";

definePageMeta({
  name: "index",
});

const userStore = useUserStore();
const { $apiFetch } = useNuxtApp();

const currentNode = ref<number>(-1);

const nodesFavFetch = await useApiFetch<Favorite[]>("/api/favorites", {
  query: {
    "ownerId.equals": userStore.user?.id,
    "type.equals": "NODE",
  },
});

const passNodes = computed<number[]>(() => {
  if (currentNode.value === -1) {
    return [] as number[];
  }
  if (currentNode.value === -2 && nodesFavFetch.data.value) {
    return nodesFavFetch.data.value
      .map(val => val.node?.id!)
      .filter(val => val);
  }
  return [currentNode.value];
});
</script>

<template>
  <q-card>
    <NodeList @update:node="id => (currentNode = id ?? -1)"></NodeList>
    <PostList :node-id="passNodes"></PostList>
  </q-card>
</template>
