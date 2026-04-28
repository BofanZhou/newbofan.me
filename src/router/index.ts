import { createRouter, createWebHistory } from 'vue-router'
import { i18n } from '@/i18n'
import BlogDetailPage from '@/pages/BlogDetailPage.vue'
import BlogPage from '@/pages/BlogPage.vue'
import ContactPage from '@/pages/ContactPage.vue'
import HomePage from '@/pages/HomePage.vue'
import NotFoundPage from '@/pages/NotFoundPage.vue'
import ProjectDetailPage from '@/pages/ProjectDetailPage.vue'
import type { Locale } from '@/data/types'

const localePattern = '/:locale(zh|en)'

export const router = createRouter({
  history: createWebHistory(),
  scrollBehavior(to) {
    if (to.hash) return { el: to.hash, top: 84, behavior: 'smooth' }
    return { top: 0 }
  },
  routes: [
    { path: '/', redirect: '/zh' },
    { path: localePattern, name: 'home', component: HomePage },
    { path: `${localePattern}/contact`, name: 'contact', component: ContactPage },
    { path: `${localePattern}/blog`, name: 'blog', component: BlogPage },
    { path: `${localePattern}/blog/:slug`, name: 'blog-detail', component: BlogDetailPage },
    { path: `${localePattern}/projects/:id`, name: 'project-detail', component: ProjectDetailPage },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundPage },
  ],
})

router.beforeEach((to) => {
  const locale = to.params.locale as Locale | undefined
  if (locale === 'zh' || locale === 'en') {
    i18n.global.locale.value = locale
    document.documentElement.lang = locale === 'zh' ? 'zh-CN' : 'en'
  }
})
