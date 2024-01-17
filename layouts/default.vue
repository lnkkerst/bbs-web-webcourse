<template>
  <div>
    <q-layout view="hHh lpR fff">
      <q-header elevated class="bg-primary text-white">
        <q-toolbar>
          <q-toolbar-title>
            <NuxtLink to="/">Blog</NuxtLink>
          </q-toolbar-title>
        </q-toolbar>
      </q-header>

      <q-page-container>
        <slot />
      </q-page-container>
    </q-layout>
  </div>
</template>
