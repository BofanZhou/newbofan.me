<template>
  <article class="timeline-item">
    <div class="timeline-item__dot" />
    <div>
      <p class="timeline-item__meta">{{ item.time }} · {{ item.type[locale] }}</p>
      <h3>{{ item.title[locale] }}</h3>
      <p class="timeline-item__role">{{ item.role[locale] }}</p>
      <p class="muted">{{ item.description[locale] }}</p>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { Locale } from '@/data/types'

defineProps<{
  item: {
    time: string
    type: Record<Locale, string>
    title: Record<Locale, string>
    role: Record<Locale, string>
    description: Record<Locale, string>
  }
  locale: Locale
}>()
</script>
