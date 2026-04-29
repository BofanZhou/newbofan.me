<template>
  <section class="subpage admin-page">
    <div class="admin-container">
      <h1>{{ locale === 'zh' ? '管理后台' : 'Admin Dashboard' }}</h1>
      
      <div v-if="adminStore.isAuthenticated" class="admin-logged-in">
        <p>{{ locale === 'zh' ? '欢迎，' : 'Welcome, ' }}{{ adminStore.username }}</p>
        <div class="admin-actions">
          <RouterLink :to="`/${locale}/admin/editor`" class="admin-btn admin-btn--primary">
            {{ locale === 'zh' ? '进入编辑器' : 'Open Editor' }}
          </RouterLink>
          <button class="admin-btn admin-btn--secondary" @click="adminStore.logout">
            {{ locale === 'zh' ? '退出登录' : 'Logout' }}
          </button>
        </div>
      </div>
      
      <div v-else class="admin-login">
        <p class="admin-desc">
          {{ locale === 'zh' ? '请使用 GitHub 账号登录以管理博客文章。' : 'Please login with GitHub to manage blog posts.' }}
        </p>
        <button class="admin-btn admin-btn--primary admin-btn--github" @click="loginWithGitHub">
          <Github :size="20" />
          {{ locale === 'zh' ? '使用 GitHub 登录' : 'Login with GitHub' }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Github } from 'lucide-vue-next'
import { useAdminStore } from '@/stores/admin'
import type { Locale } from '@/data/types'

const route = useRoute()
const router = useRouter()
const adminStore = useAdminStore()
const locale = computed(() => (route.params.locale === 'en' ? 'en' : 'zh') as Locale)

onMounted(() => {
  // 检查 URL 参数中是否有 token（从 GitHub OAuth 回调返回）
  const token = route.query.token as string
  const username = route.query.login as string
  
  if (token && username) {
    adminStore.setAuth(token, username)
    // 清除 URL 参数
    router.replace({ path: route.path, query: {} })
  }
})

function loginWithGitHub() {
  const apiUrl = import.meta.env.PROD 
    ? `${window.location.origin}/api/auth/github`
    : 'http://localhost:3000/api/auth/github'
  
  window.location.href = apiUrl
}
</script>

<style scoped>
.admin-page {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.admin-container {
  max-width: 480px;
  width: 100%;
  padding: 2rem;
  text-align: center;
}

.admin-container h1 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
}

.admin-desc {
  color: var(--text-secondary, #666);
  margin-bottom: 2rem;
  line-height: 1.6;
}

.admin-actions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
}

.admin-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.875rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  text-decoration: none;
  border: none;
}

.admin-btn--primary {
  background: var(--accent, #0070f3);
  color: white;
}

.admin-btn--primary:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

.admin-btn--secondary {
  background: transparent;
  color: var(--text-primary, #333);
  border: 1px solid var(--border, #ddd);
}

.admin-btn--secondary:hover {
  background: var(--bg-secondary, #f5f5f5);
}

.admin-btn--github {
  background: #24292f;
  color: white;
}

.admin-logged-in p {
  font-size: 1.125rem;
  margin-bottom: 1rem;
}
</style>
