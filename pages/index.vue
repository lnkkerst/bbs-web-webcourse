<script lang="ts" setup>
import { type Node } from "~/types/blogApi";

const nodesFetch = await useBlogFetch("/api/nodes");
const nodes = computed(() => {
  const res: Array<Node> = [{ id: -1, name: "全部" }];
  if (nodesFetch.data.value) {
    console.log(nodesFetch.data.value);
    res.push(...nodesFetch.data.value);
  }
  return res;
});
const currentNode = ref<number | undefined>(-1);
const page = ref(1);
const size = ref(20);
const postsFetch = await useBlogFetch("/api/posts", {
  query: computed(() => ({
    "nodeId.equals": currentNode.value === -1 ? undefined : currentNode.value,
  })),
});
</script>

<template>
  <q-page>
    <div
      class="mx-auto pt-6 w-96/100 max-w-256 grid grid-rows-2 md:grid-cols-[1fr_288px] gap-2"
    >
      <div class="">
        <q-card>
          <div class="flex items-center p-2">
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

          <div>
            {{ postsFetch.data.value }}
          </div>
        </q-card>
      </div>
      <div>
        <UserDetailCard class="mx-auto max-w-96">
          <q-card-section></q-card-section>
        </UserDetailCard>
      </div>
    </div>
  </q-page>
</template>
