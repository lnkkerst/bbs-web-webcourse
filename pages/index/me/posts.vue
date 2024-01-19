<script setup lang="ts">
const userStore = useUserStore();
</script>

<template>
  <q-card>
    <PostList :user-id="userStore.user?.id"></PostList>
    <q-card-section class="text-gray-6 text-center">
      后面没有了～
    </q-card-section>
  </q-card>
</template>
