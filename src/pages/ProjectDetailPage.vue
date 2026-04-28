<template>
  <article v-if="project" class="project-case-page">
    <RouterLink class="text-link" :to="`/${locale}#projects`">{{ locale === 'zh' ? '返回项目' : 'Back to projects' }}</RouterLink>
    <header class="case-hero">
      <p class="article-meta">{{ project.time }} · {{ project.type[locale] }}</p>
      <h1>{{ project.title[locale] }}</h1>
      <p class="article-description">{{ project.description[locale] }}</p>
      <div class="case-meta-grid">
        <div>
          <span>{{ locale === 'zh' ? '角色' : 'Role' }}</span>
          <strong>{{ project.role[locale] }}</strong>
        </div>
        <div>
          <span>{{ locale === 'zh' ? '状态' : 'Status' }}</span>
          <strong>{{ project.public ? (locale === 'zh' ? '公开展示' : 'Public') : (locale === 'zh' ? '内部项目' : 'Private') }}</strong>
        </div>
        <div>
          <span>{{ locale === 'zh' ? '类型' : 'Type' }}</span>
          <strong>{{ project.type[locale] }}</strong>
        </div>
      </div>
    </header>
    <section class="case-section case-section--overview">
      <div>
        <p>{{ locale === 'zh' ? 'Case Study' : 'Case Study' }}</p>
        <h2>{{ locale === 'zh' ? '从问题到作品' : 'From problem to work' }}</h2>
      </div>
      <p>{{ project.short[locale] }}</p>
    </section>
    <section class="case-section">
      <div>
        <p>{{ locale === 'zh' ? 'Highlights' : 'Highlights' }}</p>
        <h2>{{ locale === 'zh' ? '关键亮点' : 'Key highlights' }}</h2>
      </div>
      <ul class="case-list">
        <li v-for="highlight in project.highlights[locale]" :key="highlight">{{ highlight }}</li>
      </ul>
    </section>
    <section class="case-section">
      <div>
        <p>{{ locale === 'zh' ? 'Stack' : 'Stack' }}</p>
        <h2>{{ locale === 'zh' ? '技术与方法' : 'Tools and methods' }}</h2>
      </div>
      <div class="article-tags">
        <TagPill v-for="tech in project.techStack" :key="tech">{{ tech }}</TagPill>
      </div>
    </section>
    <div v-if="project.links?.website || project.links?.demo || project.links?.github" class="case-actions">
      <a v-if="project.links?.website" class="btn btn-primary" :href="project.links.website" target="_blank" rel="noreferrer">{{ locale === 'zh' ? '访问项目' : 'Visit project' }}</a>
      <a v-if="project.links?.demo" class="btn btn-secondary" :href="project.links.demo" target="_blank" rel="noreferrer">Demo</a>
      <a v-if="project.links?.github" class="btn btn-ghost" :href="project.links.github" target="_blank" rel="noreferrer">GitHub</a>
    </div>
  </article>
  <NotFoundPage v-else />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import type { Locale } from '@/data/types'
import { projects } from '@/data/projects'
import TagPill from '@/components/common/TagPill.vue'
import NotFoundPage from './NotFoundPage.vue'

const route = useRoute()
const locale = computed(() => (route.params.locale === 'en' ? 'en' : 'zh') as Locale)
const project = computed(() => projects.find((item) => item.id === route.params.id))
</script>
