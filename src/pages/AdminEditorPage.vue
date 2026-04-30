<template>
  <section class="subpage admin-editor-page">
    <div class="editor-header">
      <RouterLink :to="`/${locale}/admin`" class="text-link">
        ← {{ locale === 'zh' ? '返回管理后台' : 'Back to Admin' }}
      </RouterLink>
      <div class="editor-actions">
        <button 
          v-if="selectedPost" 
          class="admin-btn admin-btn--danger" 
          @click="deletePost"
          :disabled="saving"
        >
          {{ locale === 'zh' ? '删除' : 'Delete' }}
        </button>
        <button 
          class="admin-btn admin-btn--primary" 
          @click="savePost"
          :disabled="saving || !isValid"
        >
          {{ saving ? (locale === 'zh' ? '保存中...' : 'Saving...') : (locale === 'zh' ? '保存' : 'Save') }}
        </button>
      </div>
    </div>

    <div class="editor-layout">
      <!-- 侧边栏：文章列表 -->
      <aside class="editor-sidebar">
        <div class="sidebar-header">
          <h3>{{ locale === 'zh' ? '文章列表' : 'Posts' }}</h3>
          <button class="admin-btn admin-btn--small" @click="createNewPost">
            + {{ locale === 'zh' ? '新建' : 'New' }}
          </button>
        </div>
        
        <div class="post-list">
          <div
            v-for="post in blogPosts"
            :key="post.id"
            :class="['post-item', { active: selectedPost?.id === post.id }]"
            @click="selectPost(post)"
          >
            <span class="post-title">{{ post.title[locale] }}</span>
            <span class="post-date">{{ post.date }}</span>
          </div>
        </div>
      </aside>

      <!-- 主编辑区 -->
      <div class="editor-main">
        <div v-if="!selectedPost" class="editor-empty">
          <p>{{ locale === 'zh' ? '请选择一篇文章或创建新文章' : 'Select a post or create a new one' }}</p>
        </div>

        <template v-else>
          <!-- 元数据表单 -->
          <div class="editor-meta">
            <div class="form-row">
              <div class="form-group">
                <label>{{ locale === 'zh' ? 'ID（唯一标识）' : 'ID (Unique)' }}</label>
                <input v-model="form.id" type="text" placeholder="post-id" />
              </div>
              <div class="form-group">
                <label>Slug (URL)</label>
                <input v-model="form.slug" type="text" placeholder="post-slug" />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>{{ locale === 'zh' ? '标题（中文）' : 'Title (Chinese)' }}</label>
                <input v-model="form.title_zh" type="text" />
              </div>
              <div class="form-group">
                <label>{{ locale === 'zh' ? '标题（英文）' : 'Title (English)' }}</label>
                <input v-model="form.title_en" type="text" />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>{{ locale === 'zh' ? '描述（中文）' : 'Description (Chinese)' }}</label>
                <input v-model="form.description_zh" type="text" />
              </div>
              <div class="form-group">
                <label>{{ locale === 'zh' ? '描述（英文）' : 'Description (English)' }}</label>
                <input v-model="form.description_en" type="text" />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>{{ locale === 'zh' ? '分类（中文）' : 'Category (Chinese)' }}</label>
                <input v-model="form.category_zh" type="text" />
              </div>
              <div class="form-group">
                <label>{{ locale === 'zh' ? '分类（英文）' : 'Category (English)' }}</label>
                <input v-model="form.category_en" type="text" />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>{{ locale === 'zh' ? '标签（逗号分隔）' : 'Tags (comma separated)' }}</label>
                <input v-model="tagsInput" type="text" placeholder="Vue, TypeScript, Web" />
              </div>
              <div class="form-group">
                <label>{{ locale === 'zh' ? '日期' : 'Date' }}</label>
                <input v-model="form.date" type="date" />
              </div>
            </div>
          </div>

          <!-- 编辑器 -->
          <div class="editor-content">
            <div class="editor-tabs">
              <button 
                :class="{ active: activeTab === 'zh' }" 
                @click="activeTab = 'zh'"
              >
                {{ locale === 'zh' ? '中文内容' : 'Chinese Content' }}
              </button>
              <button 
                :class="{ active: activeTab === 'en' }" 
                @click="activeTab = 'en'"
              >
                {{ locale === 'zh' ? '英文内容' : 'English Content' }}
              </button>
              <button 
                :class="{ active: activeTab === 'preview' }" 
                @click="activeTab = 'preview'"
              >
                {{ locale === 'zh' ? '预览' : 'Preview' }}
              </button>
            </div>

            <div class="editor-body">
              <textarea
                v-if="activeTab === 'zh'"
                v-model="form.content_zh"
                class="editor-textarea"
                :placeholder="locale === 'zh' ? '在此输入 Markdown 内容...' : 'Enter Markdown content here...'"
              />
              
              <textarea
                v-else-if="activeTab === 'en'"
                v-model="form.content_en"
                class="editor-textarea"
                :placeholder="locale === 'zh' ? '在此输入英文 Markdown 内容...' : 'Enter English Markdown content here...'"
              />
              
              <div
                v-else-if="activeTab === 'preview'"
                class="editor-preview"
                v-html="previewHtml"
              />
            </div>
          </div>
        </template>
      </div>
    </div>

    <!-- 保存结果提示 -->
    <div v-if="message" :class="['editor-message', messageType]">
      {{ message }}
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { blogPosts } from '@/data/blog'
import { useAdminStore } from '@/stores/admin'
import type { BlogPost, Locale } from '@/data/types'

function simpleMarkdownToHtml(md: string): string {
  if (!md) return ''
  let html = md
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img alt="$1" src="$2" />')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    .replace(/^\- (.*$)/gim, '<li>$1</li>')
  html = html.split('\n').map(line => {
    if (line.trim().startsWith('<') && !line.trim().startsWith('<br>')) {
      return line
    }
    return line + '<br>'
  }).join('')
  return html
}

const route = useRoute()
const router = useRouter()
const adminStore = useAdminStore()
const locale = computed(() => (route.params.locale === 'en' ? 'en' : 'zh') as Locale)

// 处理 OAuth 回调的 token（从 URL 查询参数读取）
const tokenFromUrl = route.query.token as string
const usernameFromUrl = route.query.login as string
if (tokenFromUrl && usernameFromUrl) {
  adminStore.setAuth(tokenFromUrl, usernameFromUrl)
  // 清除 URL 参数
  router.replace({ path: route.path, query: {} })
}

// 未登录重定向
if (!adminStore.isAuthenticated) {
  router.push(`/${locale.value}/admin`)
}

const selectedPost = ref<BlogPost | null>(null)
const activeTab = ref('zh')
const saving = ref(false)
const message = ref('')
const messageType = ref('success')
const tagsInput = ref('')

const form = reactive({
  id: '',
  slug: '',
  title_zh: '',
  title_en: '',
  description_zh: '',
  description_en: '',
  category_zh: '',
  category_en: '',
  tags: [] as string[],
  date: new Date().toISOString().split('T')[0],
  lang: 'both' as 'zh' | 'en' | 'both',
  content_zh: '',
  content_en: '',
})

const isValid = computed(() => {
  return form.id && form.slug && form.title_zh && form.date
})

const previewHtml = computed(() => {
  const content = activeTab.value === 'preview' ? form.content_zh : ''
  return simpleMarkdownToHtml(content)
})

watch(tagsInput, (val) => {
  form.tags = val.split(',').map(t => t.trim()).filter(Boolean)
})

function selectPost(post: BlogPost) {
  selectedPost.value = post
  form.id = post.id
  form.slug = post.slug
  form.title_zh = post.title.zh
  form.title_en = post.title.en
  form.description_zh = post.description.zh
  form.description_en = post.description.en
  form.category_zh = post.category.zh
  form.category_en = post.category.en
  form.tags = [...post.tags]
  tagsInput.value = post.tags.join(', ')
  form.date = post.date
  form.lang = post.lang
  
  // 解析 HTML 回文本（简化处理）
  const div = document.createElement('div')
  div.innerHTML = post.content.zh
  form.content_zh = div.textContent || div.innerText || ''
  
  div.innerHTML = post.content.en
  form.content_en = div.textContent || div.innerText || ''
  
  activeTab.value = 'zh'
}

function createNewPost() {
  selectedPost.value = null
  form.id = ''
  form.slug = ''
  form.title_zh = ''
  form.title_en = ''
  form.description_zh = ''
  form.description_en = ''
  form.category_zh = ''
  form.category_en = ''
  form.tags = []
  tagsInput.value = ''
  form.date = new Date().toISOString().split('T')[0]
  form.lang = 'both'
  form.content_zh = ''
  form.content_en = ''
  activeTab.value = 'zh'
}

function generateMarkdown(): string {
  const frontmatter = {
    id: form.id,
    slug: form.slug,
    title_zh: form.title_zh,
    title_en: form.title_en,
    description_zh: form.description_zh,
    description_en: form.description_en,
    date: form.date,
    category_zh: form.category_zh,
    category_en: form.category_en,
    tags: form.tags,
    lang: form.lang,
  }
  
  const yamlLines = Object.entries(frontmatter)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return `${key}:\n${value.map(v => `  - ${v}`).join('\n')}`
      }
      return `${key}: ${value}`
    })
    .join('\n')
  
  return `---\n${yamlLines}\ncontent_en: |\n  ${form.content_en.replace(/\n/g, '\n  ')}\n---\n\n${form.content_zh}`
}

async function savePost() {
  if (!isValid.value || !adminStore.token) return
  
  saving.value = true
  message.value = ''
  
  try {
    const owner = import.meta.env.VITE_GITHUB_OWNER || 'BofanZhou'
    const repo = import.meta.env.VITE_GITHUB_REPO || 'bofan'
    const path = `content/posts/${form.slug}.md`
    const content = generateMarkdown()
    const contentBase64 = btoa(unescape(encodeURIComponent(content)))
    
    // 检查文件是否已存在（获取 sha）
    let sha: string | undefined
    try {
      const checkRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
        headers: {
          'Authorization': `Bearer ${adminStore.token}`,
          'Accept': 'application/vnd.github.v3+json',
        },
      })
      if (checkRes.ok) {
        const fileData = await checkRes.json()
        sha = fileData.sha
      }
    } catch {
      // 文件不存在，继续
    }
    
    // 保存文件
    const body: Record<string, unknown> = {
      message: `Update post: ${form.title_zh}`,
      content: contentBase64,
      branch: 'main',
    }
    if (sha) body.sha = sha
    
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${adminStore.token}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    
    if (!res.ok) {
      const error = await res.json()
      throw new Error(error.message || 'Failed to save')
    }
    
    message.value = locale.value === 'zh' ? '保存成功！请等待重新构建。' : 'Saved successfully! Please wait for rebuild.'
    messageType.value = 'success'
  } catch (error: any) {
    message.value = error.message || (locale.value === 'zh' ? '保存失败' : 'Save failed')
    messageType.value = 'error'
  } finally {
    saving.value = false
    setTimeout(() => { message.value = '' }, 5000)
  }
}

async function deletePost() {
  if (!selectedPost.value || !adminStore.token) return
  
  const confirmMsg = locale.value === 'zh' 
    ? '确定要删除这篇文章吗？此操作不可撤销。'
    : 'Are you sure you want to delete this post? This cannot be undone.'
  
  if (!confirm(confirmMsg)) return
  
  saving.value = true
  
  try {
    const owner = import.meta.env.VITE_GITHUB_OWNER || 'BofanZhou'
    const repo = import.meta.env.VITE_GITHUB_REPO || 'bofan'
    const path = `content/posts/${form.slug}.md`
    
    // 获取 sha
    const checkRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
      headers: {
        'Authorization': `Bearer ${adminStore.token}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    })
    
    if (!checkRes.ok) throw new Error('File not found')
    const fileData = await checkRes.json()
    
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${adminStore.token}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: `Delete post: ${form.title_zh}`,
        sha: fileData.sha,
        branch: 'main',
      }),
    })
    
    if (!res.ok) {
      const error = await res.json()
      throw new Error(error.message)
    }
    
    message.value = locale.value === 'zh' ? '删除成功！' : 'Deleted successfully!'
    messageType.value = 'success'
    createNewPost()
  } catch (error: any) {
    message.value = error.message || (locale.value === 'zh' ? '删除失败' : 'Delete failed')
    messageType.value = 'error'
  } finally {
    saving.value = false
    setTimeout(() => { message.value = '' }, 5000)
  }
}
</script>

<style scoped>
.admin-editor-page {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
}

.editor-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border, #eee);
}

.editor-actions {
  display: flex;
  gap: 0.75rem;
}

.editor-layout {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 2rem;
  min-height: 600px;
}

.editor-sidebar {
  background: var(--bg-secondary, #f9f9f9);
  border-radius: 12px;
  padding: 1rem;
  height: fit-content;
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--border, #eee);
}

.sidebar-header h3 {
  font-size: 1rem;
  font-weight: 600;
}

.post-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.post-item {
  padding: 0.75rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid transparent;
}

.post-item:hover {
  background: var(--bg-hover, #f0f0f0);
}

.post-item.active {
  background: var(--accent-bg, #e6f2ff);
  border-color: var(--accent, #0070f3);
}

.post-title {
  display: block;
  font-weight: 500;
  font-size: 0.9375rem;
  margin-bottom: 0.25rem;
}

.post-date {
  display: block;
  font-size: 0.8125rem;
  color: var(--text-secondary, #888);
}

.editor-empty {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 400px;
  color: var(--text-secondary, #888);
  font-size: 1.125rem;
}

.editor-meta {
  background: var(--bg-secondary, #f9f9f9);
  padding: 1.5rem;
  border-radius: 12px;
  margin-bottom: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.form-group label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-secondary, #666);
}

.form-group input {
  padding: 0.625rem 0.875rem;
  border: 1px solid var(--border, #ddd);
  border-radius: 8px;
  font-size: 0.9375rem;
  background: white;
  transition: border-color 0.2s;
}

.form-group input:focus {
  outline: none;
  border-color: var(--accent, #0070f3);
}

.editor-content {
  border: 1px solid var(--border, #ddd);
  border-radius: 12px;
  overflow: hidden;
}

.editor-tabs {
  display: flex;
  border-bottom: 1px solid var(--border, #eee);
  background: var(--bg-secondary, #f9f9f9);
}

.editor-tabs button {
  padding: 0.75rem 1.5rem;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 0.9375rem;
  font-weight: 500;
  color: var(--text-secondary, #888);
  transition: all 0.2s;
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;
}

.editor-tabs button:hover {
  color: var(--text-primary, #333);
}

.editor-tabs button.active {
  color: var(--accent, #0070f3);
  border-bottom-color: var(--accent, #0070f3);
  background: white;
}

.editor-body {
  min-height: 400px;
}

.editor-textarea {
  width: 100%;
  min-height: 400px;
  padding: 1.5rem;
  border: none;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.9375rem;
  line-height: 1.7;
  resize: vertical;
  background: white;
}

.editor-textarea:focus {
  outline: none;
}

.editor-preview {
  padding: 1.5rem;
  min-height: 400px;
  background: white;
  line-height: 1.7;
}

.editor-preview :deep(h1),
.editor-preview :deep(h2),
.editor-preview :deep(h3) {
  margin-top: 1.5rem;
  margin-bottom: 1rem;
}

.editor-preview :deep(p) {
  margin-bottom: 1rem;
}

.editor-preview :deep(ul),
.editor-preview :deep(ol) {
  margin-bottom: 1rem;
  padding-left: 1.5rem;
}

.editor-preview :deep(code) {
  background: #f4f4f4;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-family: monospace;
}

.editor-preview :deep(pre) {
  background: #f4f4f4;
  padding: 1rem;
  border-radius: 8px;
  overflow-x: auto;
  margin-bottom: 1rem;
}

.editor-message {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  animation: slideIn 0.3s ease;
  z-index: 100;
}

.editor-message.success {
  background: #dcfce7;
  color: #166534;
  border: 1px solid #86efac;
}

.editor-message.error {
  background: #fee2e2;
  color: #991b1b;
  border: 1px solid #fca5a5;
}

.admin-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.625rem 1.25rem;
  border-radius: 8px;
  font-size: 0.9375rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
}

.admin-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.admin-btn--primary {
  background: var(--accent, #0070f3);
  color: white;
}

.admin-btn--primary:hover:not(:disabled) {
  opacity: 0.9;
}

.admin-btn--secondary {
  background: transparent;
  color: var(--text-primary, #333);
  border: 1px solid var(--border, #ddd);
}

.admin-btn--danger {
  background: #ef4444;
  color: white;
}

.admin-btn--danger:hover:not(:disabled) {
  background: #dc2626;
}

.admin-btn--small {
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .editor-layout {
    grid-template-columns: 1fr;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>
