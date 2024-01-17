<template>
  <div>
    <q-layout>
      <q-header elevated class="bg-primary text-white">
        <q-toolbar>
          <q-toolbar-title>Blog</q-toolbar-title>
        </q-toolbar>
      </q-header>

      <q-page-container>
        <slot />
      </q-page-container>
    </q-layout>
  </div>
</template>
