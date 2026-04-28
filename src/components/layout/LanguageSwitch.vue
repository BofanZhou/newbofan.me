<template>
  <div class="language-switch" aria-label="Language">
    <button :class="{ active: locale === 'zh' }" @click="switchLocale('zh')">中文</button>
    <button :class="{ active: locale === 'en' }" @click="switchLocale('en')">EN</button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { Locale } from '@/data/types'

const route = useRoute()
const router = useRouter()
const locale = computed(() => (route.params.locale === 'en' ? 'en' : 'zh') as Locale)

function switchLocale(next: Locale) {
  const path = route.fullPath.replace(/^\/(zh|en)/, `/${next}`)
  router.push(path === route.fullPath ? `/${next}` : path)
}
</script>
