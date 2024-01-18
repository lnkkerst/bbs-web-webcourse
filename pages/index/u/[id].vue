<script setup lang="ts">
const route = useRoute();

const userId = computed(() => parseInt((route.params.id ?? "-1") as string));
</script>

<template>
  <q-card>
    <UserDetailItem :user-id="userId"></UserDetailItem>
  </q-card>
</template>
