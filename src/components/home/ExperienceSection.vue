<template>
  <section id="experience" class="page-section">
    <SectionTitle :eyebrow="section[0]" :title="section[1]" />
    <div class="timeline">
      <TimelineItem v-for="item in homepageExperience" :key="item.id" :item="item" :locale="locale" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Locale } from '@/data/types'
import { experience } from '@/data/experience'
import { homeExperienceCopy } from '@/data/homeCopy'
import SectionTitle from '@/components/common/SectionTitle.vue'
import TimelineItem from '@/components/common/TimelineItem.vue'

defineProps<{ locale: Locale; section: string[] }>()

const homepageExperience = computed(() =>
  experience.map((item) => ({
    ...item,
    description: homeExperienceCopy[item.id]?.description ?? item.description,
  }))
)
</script>
