<script lang="ts" setup>
const userStore = useUserStore();
</script>

<template>
  <q-page>
    <div class="mx-auto py-6 w-96/100 max-w-256 gap-4 flex flex-nowrap">
      <div class="grow min-w-0">
        <NuxtPage />
      </div>

      <div class="w-288px min-w-288px">
        <UserDetailCard
          v-if="userStore.user"
          class="mx-auto max-w-96"
        ></UserDetailCard>
        <q-card v-else>
          <q-card-section>
            请先
            <NuxtLink
              to="/auth"
              class="text-primary hover:opacity-80 active:opacity-60"
            >
              登录
            </NuxtLink>
          </q-card-section>
        </q-card>

        <q-card class="mt-4">
          <NuxtLink to="/p/new">
            <q-item clickable>
              <q-item-section avatar>
                <q-icon name="mdi-text-box-edit" />
              </q-item-section>
              <q-item-section>
                <q-item-label>发布新帖</q-item-label>
              </q-item-section>
            </q-item>
          </NuxtLink>
        </q-card>
      </div>
    </div>
  </q-page>
</template>
