<script setup lang="ts">
const userStore = useUserStore();
const userFavListFetch = await useBlogFetch("/api/favorites", {
  query: {
    "type.equals": "USER",
    "ownerId.equals": userStore.user?.id,
  },
});
</script>

<template>
  <q-card>
    <template v-for="fav in userFavListFetch.data.value" :key="fav.user?.id">
      <UserDetailItem :user-id="fav.user?.id as number"></UserDetailItem>
    </template>

    <q-card-section v-if="userFavListFetch.data.value?.length === 0">
      没有关注的用户
    </q-card-section>
  </q-card>
</template>
