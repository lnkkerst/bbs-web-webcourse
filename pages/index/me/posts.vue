<script setup lang="ts">
const userStore = useUserStore();
</script>

<template>
  <q-card>
    <PostList :user-id="userStore.user?.id"></PostList>
  </q-card>
</template>
