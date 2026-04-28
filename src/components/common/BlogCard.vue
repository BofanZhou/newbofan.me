<template>
  <RouterLink class="blog-card" :to="`/${locale}/blog/${post.slug}`">
    <div>
      <p class="blog-card__meta">{{ post.date }} · {{ post.category[locale] }}</p>
      <h3>{{ post.title[locale] }}</h3>
      <p class="muted">{{ post.description[locale] }}</p>
    </div>
    <div class="blog-card__tags">
      <TagPill v-for="tag in post.tags" :key="tag">{{ tag }}</TagPill>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import type { BlogPost, Locale } from '@/data/types'
import TagPill from './TagPill.vue'

defineProps<{
  post: BlogPost
  locale: Locale
}>()
</script>
