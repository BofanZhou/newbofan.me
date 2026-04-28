<template>
  <section class="not-found">
    <p>404</p>
    <h1>{{ locale === 'zh' ? '页面没有找到' : 'Page not found' }}</h1>
    <RouterLink class="btn btn-primary" :to="`/${locale}`">{{ t('common.backHome') }}</RouterLink>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink, useRoute } from 'vue-router'
import type { Locale } from '@/data/types'

const route = useRoute()
const { t } = useI18n()
const locale = computed(() => (route.params.locale === 'en' ? 'en' : 'zh') as Locale)
</script>
