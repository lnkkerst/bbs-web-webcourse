<script setup lang="ts">
import { OverlayScrollbarsComponent } from "overlayscrollbars-vue";

const route = useRoute();

const searchText = useSearchText();
</script>

<template>
  <div>
    <OverlayScrollbarsComponent class="max-h-screen max-w-screen">
      <q-layout view="hHh lpR fff">
        <q-header elevated class="bg-primary text-white">
          <q-toolbar>
            <q-toolbar-title class="flex items-center">
              <NuxtLink to="/">Blog</NuxtLink>

              <Transition name="fade">
                <HeaderSearchBar
                  v-if="route.name === 'index'"
                  v-model="searchText"
                ></HeaderSearchBar>
              </Transition>
            </q-toolbar-title>

            <HeaderAuthButton></HeaderAuthButton>
          </q-toolbar>
        </q-header>

        <q-page-container>
          <slot />
        </q-page-container>
      </q-layout>
    </OverlayScrollbarsComponent>
  </div>
</template>
