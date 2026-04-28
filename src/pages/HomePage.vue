<template>
  <div class="home-page">
    <HeroSection :locale="locale" />
    <ScrollReveal v-for="section in homeSections" :key="section.id">
      <component :is="section.component" :locale="locale" :section="sectionTitle(section.titleKey)" />
    </ScrollReveal>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import type { Locale } from '@/data/types'
import AboutSection from '@/components/home/AboutSection.vue'
import BlogPreviewSection from '@/components/home/BlogPreviewSection.vue'
import CodeFootprintSection from '@/components/home/CodeFootprintSection.vue'
import ExperienceSection from '@/components/home/ExperienceSection.vue'
import HeroSection from '@/components/home/HeroSection.vue'
import HonorsSection from '@/components/home/HonorsSection.vue'
import PhotographySection from '@/components/home/PhotographySection.vue'
import ProjectsSection from '@/components/home/ProjectsSection.vue'
import ScrollReveal from '@/components/common/ScrollReveal.vue'
import TechStackSection from '@/components/home/TechStackSection.vue'
import UpdatesSection from '@/components/home/UpdatesSection.vue'

const route = useRoute()
const { tm } = useI18n()
const locale = computed(() => (route.params.locale === 'en' ? 'en' : 'zh') as Locale)

const homeSections = [
  { id: 'about', titleKey: 'about', component: AboutSection },
  { id: 'experience', titleKey: 'experience', component: ExperienceSection },
  { id: 'tech', titleKey: 'tech', component: TechStackSection },
  { id: 'projects', titleKey: 'projects', component: ProjectsSection },
  { id: 'honors', titleKey: 'honors', component: HonorsSection },
  { id: 'code', titleKey: 'code', component: CodeFootprintSection },
  { id: 'updates', titleKey: 'updates', component: UpdatesSection },
  { id: 'blog', titleKey: 'blog', component: BlogPreviewSection },
  { id: 'photography', titleKey: 'photography', component: PhotographySection },
] as const

function sectionTitle(key: (typeof homeSections)[number]['titleKey']) {
  return tm(`sections.${key}`) as string[]
}
</script>
