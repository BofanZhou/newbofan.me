<template>
  <article v-if="post" class="article-page">
    <RouterLink class="text-link" :to="`/${locale}/blog`">{{ locale === 'zh' ? '返回博客列表' : 'Back to blog' }}</RouterLink>
    <p class="article-meta">{{ post.date }} · {{ post.category[locale] }}</p>
    <h1>{{ post.title[locale] }}</h1>
    <p class="article-description">{{ post.description[locale] }}</p>
    <div class="article-tags">
      <TagPill v-for="tag in post.tags" :key="tag">{{ tag }}</TagPill>
    </div>
    <div class="article-body" v-html="post.content[locale]" />
    <div class="article-comments">
      <h3>{{ locale === 'zh' ? '评论' : 'Comments' }}</h3>
      <Waline :serverURL="serverURL" :path="path" :lang="locale" />
    </div>
  </article>
  <NotFoundPage v-else />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { Waline } from '@waline/client/component'
import type { Locale } from '@/data/types'
import { blogPosts } from '@/data/blog'
import TagPill from '@/components/common/TagPill.vue'
import NotFoundPage from './NotFoundPage.vue'

import '@waline/client/style'

const route = useRoute()
const locale = computed(() => (route.params.locale === 'en' ? 'en' : 'zh') as Locale)
const post = computed(() => blogPosts.find((item) => item.slug === route.params.slug))

const serverURL = 'https://acmipin.cn'
const path = computed(() => route.path)
</script>

<style scoped>
.article-comments {
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.article-comments h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: inherit;
}

.dark .article-comments {
  border-top-color: rgba(255, 255, 255, 0.1);
}
</style>
