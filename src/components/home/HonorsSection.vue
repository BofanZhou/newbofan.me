<template>
  <section id="honors" class="page-section">
    <SectionTitle :eyebrow="section[0]" :title="section[1]" />
    <p class="section-intro">{{ sectionIntroCopy.honors[locale] }}</p>
    <div class="honor-grid">
      <article v-for="honor in homepageHonors" :key="honor.id" class="honor-card">
        <span>{{ honor.time }}</span>
        <h3>{{ honor.title[locale] }}</h3>
        <p class="honor-card__meta">{{ honor.meta[locale] }}</p>
        <p class="muted">{{ honor.description[locale] }}</p>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Locale } from '@/data/types'
import { homeHonorCopy, sectionIntroCopy } from '@/data/homeCopy'
import { honors } from '@/data/honors'
import SectionTitle from '@/components/common/SectionTitle.vue'

defineProps<{ locale: Locale; section: string[] }>()

const homepageHonors = computed(() =>
  honors.map((honor) => ({
    ...honor,
    description: homeHonorCopy[honor.id]?.description ?? honor.description,
  }))
)
</script>
