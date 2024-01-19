<script setup lang="ts">
const userStore = useUserStore();

const currentNode = ref<number>(-1);

const nodesFavFetch = await useBlogFetch("/api/favorites", {
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
    return nodesFavFetch.data.value.map(val => val.node?.id!);
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
