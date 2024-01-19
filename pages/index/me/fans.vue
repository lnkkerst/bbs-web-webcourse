<script setup lang="ts">
const userStore = useUserStore();
const userFavListFetch = await useBlogFetch("/api/favorites", {
  query: {
    "type.equals": "USER",
    "userId.equals": userStore.user?.id,
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
      没有关注你的用户
    </q-card-section>
  </q-card>
</template>
