<template>
  <section id="updates" class="page-section">
    <SectionTitle :eyebrow="section[0]" :title="section[1]" />
    <p class="section-intro">{{ sectionIntroCopy.updates[locale] }}</p>
    <div class="updates-list">
      <article v-for="item in homepageUpdates" :key="item.id" class="update-item">
        <span>{{ item.date }}</span>
        <strong>{{ item.type[locale] }}</strong>
        <p>{{ item.content[locale] }}</p>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Locale } from '@/data/types'
import { homeUpdateCopy, sectionIntroCopy } from '@/data/homeCopy'
import { updates } from '@/data/updates'
import SectionTitle from '@/components/common/SectionTitle.vue'

defineProps<{ locale: Locale; section: string[] }>()

const homepageUpdates = computed(() =>
  updates.map((item) => ({
    ...item,
    content: homeUpdateCopy[item.id]?.content ?? item.content,
  }))
)
</script>
