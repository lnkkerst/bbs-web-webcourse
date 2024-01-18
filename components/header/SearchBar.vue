<script setup lang="ts">
const props = defineProps<{
  modelValue: string;
}>();
const emit = defineEmits<{
  (e: "update:modelValue", v: string): void;
}>();
</script>

<template>
  <q-input
    dark
    dense
    standout
    :model-value="props.modelValue"
    type="text"
    @update:model-value="v => emit('update:modelValue', v ? v.toString() : '')"
    class="q-ml-md w-36 md:w-64"
  >
    <template v-slot:append>
      <q-icon v-if="props.modelValue === ''" name="mdi-magnify" />
      <q-icon
        v-else
        name="mdi-close"
        class="cursor-pointer"
        @click="emit('update:modelValue', '')"
      />
    </template>
  </q-input>
</template>
