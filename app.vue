<script lang="ts" setup>
if (process.client) {
  Notify.setDefaults({
    position: "bottom-right",
  });
}
</script>

<template>
  <div>
    <NuxtLoadingIndicator color="#ffffffaa"></NuxtLoadingIndicator>
    <NuxtLayout>
      <NuxtPage></NuxtPage>
    </NuxtLayout>
  </div>
</template>
