<script lang="ts" setup>
if (process.client) {
  Notify.setDefaults({
    position: "bottom-right",
  });
}
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage></NuxtPage>
    </NuxtLayout>
  </div>
</template>
