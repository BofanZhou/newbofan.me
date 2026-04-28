<template>
  <div class="contact-page">
    <section class="contact-page-hero">
      <p>{{ locale === 'zh' ? 'Contact' : 'Contact' }}</p>
      <h1>{{ locale === 'zh' ? '把想法发给我。' : 'Send me your thoughts.' }}</h1>
      <span>{{ locale === 'zh' ? '项目合作、学习交流、求职求学机会或摄影创作，都可以从这里开始。' : 'Project collaboration, learning exchange, academic or career opportunities, and photography ideas can all start here.' }}</span>
    </section>
    <ContactSection :locale="locale" :section="tm('sections.contact') as string[]" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import type { Locale } from '@/data/types'
import ContactSection from '@/components/home/ContactSection.vue'

const route = useRoute()
const { tm } = useI18n()
const locale = computed(() => (route.params.locale === 'en' ? 'en' : 'zh') as Locale)
</script>
