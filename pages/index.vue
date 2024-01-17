<script lang="ts" setup></script>

<template>
  <q-page>
    <div
      class="mx-auto py-6 w-96/100 max-w-256 grid grid-rows-2 grid-cols-1 md:grid-cols-[1fr_288px] md:grid-rows-1 gap-4"
    >
      <div class="">
        <NuxtPage />
      </div>

      <div>
        <UserDetailCard class="mx-auto max-w-96"></UserDetailCard>

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
