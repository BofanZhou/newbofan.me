<template>
  <section id="photography" class="photo-section">
    <div class="photo-media" aria-hidden="true">
      <img src="/images/photography-placeholder.svg" alt="" />
    </div>
    <div class="photo-copy">
      <SectionTitle :eyebrow="section[0]" :title="section[1]" />
      <p>{{ sectionIntroCopy.photography[locale] }}</p>
      <a class="btn btn-primary" href="https://bofan.work" target="_blank" rel="noreferrer"><Camera :size="18" />{{ locale === 'zh' ? '访问摄影网站' : 'View Photography' }}</a>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Camera } from 'lucide-vue-next'
import type { Locale } from '@/data/types'
import { sectionIntroCopy } from '@/data/homeCopy'
import SectionTitle from '@/components/common/SectionTitle.vue'

defineProps<{ locale: Locale; section: string[] }>()
</script>
