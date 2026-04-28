<template>
  <section class="subpage blog-notebook-page">
    <div class="blog-notebook-hero">
      <div>
        <p>{{ locale === 'zh' ? 'Technical Notebook' : 'Technical Notebook' }}</p>
        <h1>{{ locale === 'zh' ? '把学习过程写成可回看的笔记。' : 'Notes I can return to while learning.' }}</h1>
      </div>
      <span>{{ locale === 'zh' ? 'AI / Web / 工程实践 / 项目复盘' : 'AI / Web / Engineering / Project logs' }}</span>
    </div>
    <div class="blog-notebook">
      <aside class="blog-index">
        <p>{{ locale === 'zh' ? '索引' : 'Index' }}</p>
        <button type="button" :class="{ active: activeCategory === 'all' }" @click="activeCategory = 'all'">
          <span>{{ t('common.allPosts') }}</span>
          <strong>{{ blogPosts.length }}</strong>
        </button>
        <button v-for="category in categories" :key="category" type="button" :class="{ active: activeCategory === category }" @click="activeCategory = category">
          <span>{{ category }}</span>
          <strong>{{ categoryCount(category) }}</strong>
        </button>
      </aside>
      <div class="note-list">
        <RouterLink v-for="(post, index) in filteredPosts" :key="post.id" class="note-entry" :to="`/${locale}/blog/${post.slug}`">
          <div class="note-entry__index">{{ String(index + 1).padStart(2, '0') }}</div>
          <div class="note-entry__content">
            <p>{{ post.date }} · {{ post.category[locale] }}</p>
            <h2>{{ post.title[locale] }}</h2>
            <span>{{ post.description[locale] }}</span>
            <div class="note-entry__tags">
              <TagPill v-for="tag in post.tags" :key="tag">{{ tag }}</TagPill>
            </div>
          </div>
          <div class="note-entry__arrow" aria-hidden="true">↗</div>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink, useRoute } from 'vue-router'
import type { Locale } from '@/data/types'
import { blogPosts } from '@/data/blog'
import TagPill from '@/components/common/TagPill.vue'

const route = useRoute()
const { t } = useI18n()
const locale = computed(() => (route.params.locale === 'en' ? 'en' : 'zh') as Locale)
const activeCategory = ref('all')
const categories = computed(() => Array.from(new Set(blogPosts.map((post) => post.category[locale.value]))))
const filteredPosts = computed(() =>
  activeCategory.value === 'all' ? blogPosts : blogPosts.filter((post) => post.category[locale.value] === activeCategory.value)
)
const categoryCount = (category: string) => blogPosts.filter((post) => post.category[locale.value] === category).length
</script>
