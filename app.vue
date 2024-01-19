<script lang="ts" setup>
if (process.client) {
  Notify.setDefaults({
    position: "bottom-right",
  });
}

useHead({
  title: "简单的论坛",
});
</script>

<template>
  <div>
    <NuxtLoadingIndicator color="#ffffffaa"></NuxtLoadingIndicator>
    <NuxtLayout>
      <NuxtPage></NuxtPage>
    </NuxtLayout>
  </div>
</template>
