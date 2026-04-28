<template>
  <OpeningLoader :key="loaderKey" :label="loaderLabel" />
  <ScrollProgress />
  <AppHeader />
  <main id="main">
    <RouterView v-slot="{ Component }">
      <Transition name="page" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </main>
  <AppFooter />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import AppFooter from '@/components/layout/AppFooter.vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import OpeningLoader from '@/components/layout/OpeningLoader.vue'
import ScrollProgress from '@/components/layout/ScrollProgress.vue'

const route = useRoute()
const loaderKey = computed(() => route.path.replace(/^\/(zh|en)(?=\/|$)/, '') || '/')
const loaderLabel = computed(() => {
  if (route.name === 'blog' || route.name === 'blog-detail') return 'journal / notes / ideas'
  if (route.name === 'contact') return 'signal / hello / connect'
  if (route.name === 'project-detail') return 'project / build / review'
  return 'portfolio / code / life'
})
</script>
