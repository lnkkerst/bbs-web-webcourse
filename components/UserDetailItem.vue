<script setup lang="ts">
import type { User, Favorite } from "~/types/blogApi";

const props = defineProps<{
  userId: number;
}>();

const userStore = useUserStore();

const { blogApiBase } = useRuntimeConfig().public;

const userFetch = await useFetch<User>(
  `${blogApiBase}/api/users/${props.userId}`,
  { cache: "no-cache" },
);
// const userFetch = await useBlogFetch(`/api/users/${props.userId}`, {});
const followStatusFetch = useFetch<Favorite[]>(`${blogApiBase}/api/favorites`, {
  query: computed(
    () =>
      ({
        "type.equals": "USER",
        "ownerId.equals": userStore.user?.id,
        "userId.equals": userFetch.data.value?.id,
      }) as any,
  ),
});
const followed = computed(
  () => followStatusFetch.data.value && followStatusFetch.data.value.length > 0,
);
const user = computed(() => userFetch.data.value);
const following = ref(false);

async function handleFollow() {
  if (!followStatusFetch.data.value) {
    return;
  }

  following.value = true;
  const { $blogFetch } = useNuxtApp();
  if (followed.value) {
    try {
      await $blogFetch("/api/favorites/{id}", {
        method: "DELETE",
        path: { id: followStatusFetch.data.value?.[0].id as number },
      });

      Notify.create({
        type: "positive",
        message: "取消关注成功",
      });
      await followStatusFetch.refresh();
    } catch (_e) {
      Notify.create({
        type: "negative",
        message: "取消关注失败，未知错误",
      });
    } finally {
      following.value = false;
    }
  } else {
    try {
      await $blogFetch("/api/favorites", {
        method: "POST",
        body: {
          owner: {
            id: userStore.user?.id,
          },
          type: "USER",
          user: {
            id: userFetch.data.value?.id,
          },
        } as any,
      });

      Notify.create({
        type: "positive",
        message: "关注成功",
      });
      await followStatusFetch.refresh();
    } catch (_e) {
      Notify.create({
        type: "negative",
        message: "关注失败，未知错误",
      });
    } finally {
      following.value = false;
    }
  }
}
</script>

<template>
  <q-item class="h-28">
    <q-item-section v-if="!userFetch.data.value">
      未找到用户 `{{ userId }}`
    </q-item-section>

    <template v-else>
      <q-item-section avatar>
        <q-avatar size="64px">
          <q-img :src="user?.imageUrl || defaultAvatar"></q-img>
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <NuxtLink :to="`/u/${user?.id}`">
          <q-item-label>
            <span class="text-4">{{ user?.firstName }}</span>
            <span class="text-sm text-gray-5">{{ `@${user?.login}` }}</span>
          </q-item-label>
        </NuxtLink>

        <q-item-label class="text-sm" caption>
          {{ user?.lastName }}
        </q-item-label>
      </q-item-section>

      <q-item-section side>
        <q-btn
          :loading="followStatusFetch.pending.value || following"
          :icon="followed ? 'mdi-check' : undefined"
          :label="followed ? '已关注' : '关注'"
          @click.prevent="handleFollow"
          color="primary"
        ></q-btn>
      </q-item-section>
    </template>
  </q-item>
</template>
