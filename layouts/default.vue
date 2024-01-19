<script setup lang="ts">
import { OverlayScrollbarsComponent } from "overlayscrollbars-vue";

const route = useRoute();
const userStore = useUserStore();

const searchText = useSearchText();

const drawer = ref(false);
</script>

<template>
  <div>
    <OverlayScrollbarsComponent class="max-h-screen max-w-screen">
      <q-layout view="hHh lpR fff">
        <q-header elevated class="bg-primary text-white">
          <q-toolbar>
            <q-toolbar-title class="flex items-center">
              <NuxtLink to="/">BBS</NuxtLink>

              <Transition name="fade">
                <HeaderSearchBar
                  v-if="route.name === 'index'"
                  v-model="searchText"
                ></HeaderSearchBar>
              </Transition>
            </q-toolbar-title>

            <HeaderAuthButton></HeaderAuthButton>

            <q-btn
              icon="mdi-menu"
              class="md:hidden"
              round
              flat
              @click="drawer = !drawer"
            ></q-btn>
          </q-toolbar>
        </q-header>

        <q-drawer v-model="drawer" side="right" bordered class="pa-4">
          <UserDetailCard v-if="userStore.user"></UserDetailCard>
          <q-card-section v-else>
            请先
            <NuxtLink
              to="/auth"
              class="text-primary hover:opacity-80 active:opacity-60"
            >
              登录
            </NuxtLink>
          </q-card-section>

          <NuxtLink to="/p/new">
            <q-item clickable @click="() => {}">
              <q-item-section avatar>
                <q-icon name="mdi-text-box-edit" />
              </q-item-section>
              <q-item-section>
                <q-item-label>发布新帖</q-item-label>
              </q-item-section>
            </q-item>
          </NuxtLink>
        </q-drawer>

        <q-page-container>
          <slot />
        </q-page-container>
      </q-layout>
    </OverlayScrollbarsComponent>
  </div>
</template>
