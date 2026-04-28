<template>
  <section id="tech" class="page-section">
    <SectionTitle :eyebrow="section[0]" :title="section[1]" />
    <p class="section-intro">{{ sectionIntroCopy.tech[locale] }}</p>
    <div class="tech-flow" aria-label="Technology stack flow">
      <div class="tech-flow__track">
        <article v-for="(group, index) in flowItems" :key="`${group.category.en}-${index}`" class="tech-card">
          <div class="tech-card__top">
            <span>{{ String((index % techStack.length) + 1).padStart(2, '0') }}</span>
            <i>{{ locale === 'zh' ? '能力模块' : 'Skill module' }}</i>
          </div>
          <h3>{{ group.category[locale] }}</h3>
          <div class="tech-card__items">
            <TagPill v-for="item in group.items" :key="item">{{ item }}</TagPill>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Locale } from '@/data/types'
import { sectionIntroCopy } from '@/data/homeCopy'
import { techStack } from '@/data/techStack'
import SectionTitle from '@/components/common/SectionTitle.vue'
import TagPill from '@/components/common/TagPill.vue'

defineProps<{ locale: Locale; section: string[] }>()

const flowItems = computed(() => [...techStack, ...techStack])
</script>
