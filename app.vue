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
    <Suspense>
      <template #default>
        <div>
          <NuxtLoadingIndicator color="#ffffffaa"></NuxtLoadingIndicator>
          <NuxtLayout>
            <NuxtPage></NuxtPage>
          </NuxtLayout>
        </div>
      </template>
      <template #fallback>
        <div class="absolue z-114514 top-0 left-0 right-0 bottom-0">
          <q-inner-loading showing color="primary" dark></q-inner-loading>
        </div>
      </template>
    </Suspense>
  </div>
</template>
