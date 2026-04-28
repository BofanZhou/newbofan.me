<template>
  <article class="project-card">
    <div class="project-card__top">
      <span>{{ project.time }}</span>
      <RouterLink :to="`/${locale}/projects/${project.id}`" :aria-label="project.title[locale]">
        <ArrowUpRight :size="18" />
      </RouterLink>
    </div>
    <h3>{{ project.title[locale] }}</h3>
    <p class="muted">{{ project.short[locale] }}</p>
    <div class="project-card__tags">
      <TagPill v-for="tech in project.techStack.slice(0, 4)" :key="tech">{{ tech }}</TagPill>
    </div>
  </article>
</template>

<script setup lang="ts">
import { ArrowUpRight } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'
import type { Locale, Project } from '@/data/types'
import TagPill from './TagPill.vue'

defineProps<{
  project: Project
  locale: Locale
}>()
</script>
