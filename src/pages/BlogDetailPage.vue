<template>
  <article v-if="post" class="article-page">
    <RouterLink class="text-link" :to="`/${locale}/blog`">{{ locale === 'zh' ? '返回博客列表' : 'Back to blog' }}</RouterLink>
    <p class="article-meta">{{ post.date }} · {{ post.category[locale] }}</p>
    <h1>{{ post.title[locale] }}</h1>
    <p class="article-description">{{ post.description[locale] }}</p>
    <div class="article-tags">
      <TagPill v-for="tag in post.tags" :key="tag">{{ tag }}</TagPill>
    </div>
    <div class="article-body">
      <p>{{ post.content[locale] }}</p>
    </div>
  </article>
  <NotFoundPage v-else />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import type { Locale } from '@/data/types'
import { blogPosts } from '@/data/blog'
import TagPill from '@/components/common/TagPill.vue'
import NotFoundPage from './NotFoundPage.vue'

const route = useRoute()
const locale = computed(() => (route.params.locale === 'en' ? 'en' : 'zh') as Locale)
const post = computed(() => blogPosts.find((item) => item.slug === route.params.slug))
</script>
