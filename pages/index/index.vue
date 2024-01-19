<script setup lang="ts">
const currentNode = ref<number>(-1);
</script>

<template>
  <q-card>
    <NodeList @update:node="id => (currentNode = id ?? -1)"></NodeList>
    <PostList
      :node-id="currentNode === -1 ? ([] as number[]) : [currentNode]"
    ></PostList>
  </q-card>
</template>
