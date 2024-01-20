<script setup lang="ts">
import type { Favorite } from "~/types/blogApi";

const userStore = useUserStore();
const userFavListFetch = await useApiFetch<Favorite[]>("/api/favorites", {
  query: {
    "type.equals": "USER",
    "ownerId.equals": userStore.user?.id,
  },
});
</script>

<template>
  <q-card>
    <UserDetailItem
      v-for="fav in userFavListFetch.data.value"
      :user-id="fav.user?.id as number"
      :key="fav.id"
    ></UserDetailItem>

    <q-card-section v-if="userFavListFetch.data.value?.length === 0">
      没有关注的用户
    </q-card-section>
  </q-card>
</template>
