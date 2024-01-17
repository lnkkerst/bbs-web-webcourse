<script setup lang="ts">
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

    <q-list bordered padding>
      <template v-for="post in postsFetch.data.value">
        <NuxtLink :to="`/p/${post.id}`">
          <q-item clickable>
            <q-item-section avatar>
              <q-avatar>
                <q-img :src="post.user.imageUrl || defaultAvatar" />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ post.title }}</q-item-label>
              <q-item-label caption class="max-w-1/2">
                {{ post.content.repeat(100).slice(0, 32) }}
              </q-item-label>
            </q-item-section>

            <q-item-section side bottom>
              {{ new Date(post.createdAt).toLocaleString() }}
            </q-item-section>
          </q-item>
        </NuxtLink>
      </template>
    </q-list>
  </q-card>
</template>

<style scoped></style>
