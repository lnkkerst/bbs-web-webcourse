<script setup lang="ts">
import type { Favorite, Node } from "~/types/blogApi";

const userStore = useUserStore();

const { blogApiBase } = useRuntimeConfig().public;

const nodesFetch = await useBlogFetch("/api/nodes");
const favNodesFetch = await useFetch<Favorite[]>(
  `${blogApiBase}/api/favorites`,
  {
    query: computed(
      () =>
        ({
          "type.equals": "NODE",
          "ownerId.equals": userStore.user?.id,
        }) as any,
    ),
  },
);
const favNodeList = computed(() => {
  const res: (Node & { favId: number })[] = [];
  if (!nodesFetch.data.value || !favNodesFetch.data.value) {
    return res;
  }
  for (let node of nodesFetch.data.value) {
    let fav = favNodesFetch.data.value.find(val => val.node?.id === node.id);
    if (fav) {
      res.push({ favId: fav.id!, ...node });
    }
  }
  return res;
});
const otherNodeList = computed(() => {
  const res: Node[] = [];
  if (!nodesFetch.data.value || !favNodesFetch.data.value) {
    return res;
  }
  return nodesFetch.data.value.filter(
    node =>
      favNodesFetch.data.value?.findIndex(val => val.node?.id === node.id) ===
      -1,
  );
});
const adding = ref(false);

async function handleAddNode(id?: number) {
  if (!id || id === -1) {
    return;
  }
  const { $blogFetch } = useNuxtApp();
  try {
    adding.value = true;
    await $blogFetch("/api/favorites", {
      method: "POST",
      body: {
        type: "NODE",
        owner: {
          id: userStore.user?.id,
        },
        node: {
          id,
        },
      } as any,
    });
    Notify.create({
      type: "positive",
      message: "添加板块收藏成功",
    });
    favNodesFetch.refresh();
  } catch (_e) {
    Notify.create({
      type: "negative",
      message: "添加板块收藏失败，未知错误",
    });
  } finally {
    adding.value = false;
  }
}

async function handleDeleteNode(id?: number) {
  if (!id || id === -1) {
    return;
  }
  const { $blogFetch } = useNuxtApp();
  try {
    adding.value = true;
    await $blogFetch("/api/favorites/{id}", {
      method: "DELETE",
      path: {
        id,
      },
    });
    Notify.create({
      type: "positive",
      message: "删除板块收藏成功",
    });
    favNodesFetch.refresh();
  } catch (_e) {
    Notify.create({
      type: "negative",
      message: "删除板块收藏失败，未知错误",
    });
  } finally {
    adding.value = false;
  }
}
</script>

<template>
  <q-card>
    <q-card-section class="flex gap-4">
      <q-btn-dropdown
        v-for="node in favNodeList"
        color="primary"
        :label="node.name"
        split
      >
        <q-list class="min-w-100px">
          <q-item clickable v-close-popup @click="handleDeleteNode(node.favId)">
            <q-item-section>删除</q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>

      <q-btn icon="mdi-plus" color="accent" :loading="adding" round>
        <q-menu>
          <q-list class="min-w-100px">
            <q-item
              v-for="anode in otherNodeList"
              clickable
              v-close-popup
              @click="handleAddNode(anode.id)"
            >
              <q-item-section>{{ anode.name }}</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </q-card-section>
  </q-card>
</template>
