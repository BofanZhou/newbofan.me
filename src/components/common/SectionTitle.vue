<template>
  <div class="section-heading">
    <p>{{ eyebrow }}</p>
    <h2>{{ title }}</h2>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  eyebrow: string
  title: string
}>()
</script>
