<script setup lang="ts">
import type { Node } from "~/types/blogApi";

const emit = defineEmits<{
  (e: "update:node", id?: number): void;
}>();

const nodesFetch = await useBlogFetch("/api/nodes");
const nodes = computed(() => {
  const res: Array<Node> = [
    { id: -1, name: "全部" },
    { id: -2, name: "收藏" },
  ];
  if (nodesFetch.data.value) {
    res.push(...nodesFetch.data.value);
  }
  return res;
});
const currentNode = ref<number | undefined>(-1);

watch(
  () => currentNode.value,
  newVal => {
    emit("update:node", newVal === -1 ? undefined : newVal);
  },
);
</script>

<template>
  <div class="flex items-center p-2 relative">
    <q-inner-loading
      color="primary"
      :showing="nodesFetch.pending.value"
      class="z-10"
    ></q-inner-loading>
    <template v-for="node in nodes">
      <q-chip
        :color="currentNode === node.id ? 'primary' : undefined"
        :text-color="currentNode === node.id ? 'white' : undefined"
        clickable
        @click="currentNode = node.id"
      >
        {{ node.name }}
      </q-chip>
    </template>
  </div>
</template>
