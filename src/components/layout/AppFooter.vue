<template>
  <footer class="site-footer">
    <div class="footer-brand">
      <div class="footer-brand-mark">
        <BrandLogo />
        <strong>bofan</strong>
      </div>
      <p>{{ locale === 'zh' ? '不止于技术。记录学习、项目、代码与生活。' : 'Beyond technology. Recording learning, projects, code, and life.' }}</p>
    </div>
    <nav class="footer-links" :aria-label="locale === 'zh' ? '友情链接' : 'Friend links'">
      <h2>{{ locale === 'zh' ? '友情链接' : 'Links' }}</h2>
      <RouterLink :to="`/${locale}/contact`">{{ locale === 'zh' ? '联系我' : 'Contact' }}</RouterLink>
      <a :href="profile.contacts.photography" target="_blank" rel="noreferrer">{{ locale === 'zh' ? '摄影网站' : 'Photography' }}</a>
      <a :href="profile.contacts.github" target="_blank" rel="noreferrer">GitHub</a>
      <a :href="profile.contacts.instagram" target="_blank" rel="noreferrer">Instagram</a>
      <a :href="profile.contacts.x" target="_blank" rel="noreferrer">X</a>
    </nav>
    <nav class="footer-links" :aria-label="locale === 'zh' ? '博客文档' : 'Blog posts'">
      <h2>{{ locale === 'zh' ? '博客文档' : 'Blog' }}</h2>
      <RouterLink v-for="post in footerPosts" :key="post.id" :to="`/${locale}/blog/${post.slug}`">{{ post.title[locale] }}</RouterLink>
    </nav>
    <nav class="footer-links" :aria-label="locale === 'zh' ? '项目跳转' : 'Projects'">
      <h2>{{ locale === 'zh' ? '项目跳转' : 'Projects' }}</h2>
      <RouterLink v-for="project in footerProjects" :key="project.id" :to="`/${locale}/projects/${project.id}`">{{ project.title[locale] }}</RouterLink>
    </nav>
    <p class="footer-bottom">© 2026 Bofan. Built with curiosity, code and life.</p>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import type { Locale } from '@/data/types'
import { blogPosts } from '@/data/blog'
import BrandLogo from '@/components/common/BrandLogo.vue'
import { profile } from '@/data/profile'
import { projects } from '@/data/projects'

const route = useRoute()
const locale = computed(() => (route.params.locale === 'en' ? 'en' : 'zh') as Locale)
const footerPosts = computed(() => blogPosts.slice(0, 4))
const footerProjects = computed(() => projects.slice(0, 5))
</script>
