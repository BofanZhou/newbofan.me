<template>
  <div v-if="visible" class="opening-loader" :class="{ 'is-opening': opening }" role="status" aria-live="polite">
    <div class="opening-panel opening-panel--left" />
    <div class="opening-panel opening-panel--right" />
    <div class="opening-core">
      <div class="opening-word" aria-hidden="true">
        <span>b</span>
        <span>o</span>
        <span>f</span>
        <span>a</span>
        <span>n</span>
      </div>
      <div class="opening-rail" aria-hidden="true" />
      <p>{{ label }}</p>
    </div>
    <span class="sr-only">Loading bofan</span>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

withDefaults(defineProps<{ label?: string }>(), {
  label: 'portfolio / code / life',
})

const visible = ref(true)
const opening = ref(false)

onMounted(() => {
  window.setTimeout(() => {
    opening.value = true
  }, 1500)

  window.setTimeout(() => {
    visible.value = false
  }, 2450)
})
</script>
