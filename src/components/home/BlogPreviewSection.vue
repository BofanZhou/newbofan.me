<template>
  <section id="blog" class="page-section">
    <SectionTitle :eyebrow="section[0]" :title="section[1]" />
    <p class="section-intro">{{ sectionIntroCopy.blog[locale] }}</p>
    <div class="blog-grid">
      <BlogCard v-for="post in blogPosts.slice(0, 3)" :key="post.id" :post="post" :locale="locale" />
    </div>
    <RouterLink class="text-link" :to="`/${locale}/blog`">{{ locale === 'zh' ? '查看全部文章' : 'View all posts' }}</RouterLink>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import type { Locale } from '@/data/types'
import { blogPosts } from '@/data/blog'
import { sectionIntroCopy } from '@/data/homeCopy'
import BlogCard from '@/components/common/BlogCard.vue'
import SectionTitle from '@/components/common/SectionTitle.vue'

defineProps<{ locale: Locale; section: string[] }>()
</script>
