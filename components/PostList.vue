<script setup lang="ts">
const props = defineProps<{
  nodeId?: number[];
  userId?: number;
}>();

definePageMeta({
  name: "index",
});

const page = ref(1);
const size = ref(20);
const totalCount = ref(0);
const maxPages = computed(() => {
  return Math.floor((totalCount.value + size.value - 1) / size.value);
});
const searchText = useSearchText();
const postsFetch = await useBlogFetch("/api/posts", {
  query: refDebounced(
    computed(() => ({
      "nodeId.in": props.nodeId,
      "title.contains": searchText.value,
      page: page.value - 1,
      size: size.value,
      sort: "createdAt,desc",
      ...(props.userId ? { "userId.equals": props.userId } : {}),
    })) as any,
    500,
  ) as any,
  onResponse({ response }) {
    totalCount.value = Number.parseInt(
      response.headers.get("X-Total-Count") ?? "0",
    );
  },
});
</script>

<template>
  <div>
    <q-list bordered padding class="relative">
      <q-inner-loading
        color="primary"
        :showing="postsFetch.pending.value"
        class="z-10"
      ></q-inner-loading>

      <div
        v-if="postsFetch.data.value?.length === 0"
        class="text-center text-gray-5"
      >
        你来到了知识的荒原～
      </div>

      <template v-for="post in postsFetch.data.value">
        <NuxtLink :to="`/p/${post.id}`">
          <q-item clickable>
            <q-item-section avatar class="items-center w-64px">
              <q-avatar size="44px">
                <q-img :src="post.user.imageUrl || defaultAvatar" />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ post.title }}</q-item-label>

              <q-item-label caption class="">
                <span>{{ `${post.user.firstName} 发布在` }}</span>
                <q-chip :label="post.node.name" dense square></q-chip>
              </q-item-label>
            </q-item-section>

            <q-item-section side bottom>
              {{ new Date(post.createdAt).toLocaleString() }}
            </q-item-section>
          </q-item>
        </NuxtLink>
      </template>
    </q-list>

    <div class="flex py-2 px-4 items-center">
      <div class="flex-grow"></div>
      <div>
        <span>{{ `共${totalCount}条` }}</span>
        <span>
          每页显示
          <q-select
            class="inline-block"
            borderless
            dense
            v-model="size"
            :options="[10, 20, 30, 40]"
          ></q-select>
          条
        </span>
      </div>
      <q-pagination v-model="page" :max="maxPages" input></q-pagination>
    </div>
  </div>
</template>

<style scoped></style>
