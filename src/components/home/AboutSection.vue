<template>
  <section id="about" class="page-section">
    <SectionTitle :eyebrow="section[0]" :title="section[1]" />
    <div class="about-grid">
      <div class="about-copy">
        <p v-for="paragraph in aboutCopy[locale]" :key="paragraph">{{ paragraph }}</p>
      </div>
      <div class="about-panel">
        <TagPill v-for="tag in tags" :key="tag">{{ tag }}</TagPill>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Locale } from '@/data/types'
import { aboutCopy } from '@/data/homeCopy'
import SectionTitle from '@/components/common/SectionTitle.vue'
import TagPill from '@/components/common/TagPill.vue'

defineProps<{ locale: Locale; section: string[] }>()

const tags = ['Engineering Background', 'AI Programming', 'Web Development', 'Data Analysis', 'Creative Builder', 'Photography & Life']
</script>
