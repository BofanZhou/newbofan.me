<template>
  <section id="code" class="page-section code-section">
    <SectionTitle :eyebrow="section[0]" :title="section[1]" />
    <div class="code-grid">
      <div>
        <p class="section-intro">{{ sectionIntroCopy.code[locale] }}</p>
        <p class="code-slogan">{{ copy.slogan }}</p>
        <a class="btn btn-primary" href="https://github.com/BofanZhou" target="_blank" rel="noreferrer"><Github :size="18" />GitHub</a>
      </div>
      <div class="stats-grid" aria-label="GitHub stats">
        <article v-for="stat in stats" :key="stat.label" class="stat-card">
          <component :is="stat.icon" :size="20" />
          <strong>{{ stat.value }}</strong>
          <span>{{ stat.label }}</span>
        </article>
      </div>
    </div>
    <div class="github-live-panel">
      <div class="github-panel-header">
        <div>
          <p>{{ statusLabel }}</p>
          <h3>{{ copy.recentHeading }}</h3>
        </div>
        <a href="https://github.com/BofanZhou" target="_blank" rel="noreferrer" aria-label="Open BofanZhou on GitHub">
          <ArrowUpRight :size="18" />
        </a>
      </div>
      <div v-if="error" class="github-error">{{ copy.error }}</div>
      <div v-else class="repo-list">
        <a v-for="repo in recentRepos" :key="repo.id" class="repo-row" :href="repo.html_url" target="_blank" rel="noreferrer">
          <div>
            <strong>{{ repo.name }}</strong>
            <p>{{ repo.description || copy.repoFallback }}</p>
          </div>
          <span>{{ repo.language || 'Code' }}</span>
        </a>
      </div>
      <div class="language-meter" aria-label="GitHub language summary">
        <div v-for="language in languages" :key="language.name">
          <span>{{ language.name }}</span>
          <strong>{{ language.count }}</strong>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Activity, ArrowUpRight, Code2, GitFork, Github, Star } from 'lucide-vue-next'
import { computed, onMounted, ref } from 'vue'
import type { Locale } from '@/data/types'
import type { GitHubRepo, GitHubUser } from '@/data/github'
import { fetchGitHubProfile, summarizeLanguages } from '@/data/github'
import { codeCopy, sectionIntroCopy } from '@/data/homeCopy'
import SectionTitle from '@/components/common/SectionTitle.vue'

const props = defineProps<{ locale: Locale; section: string[] }>()
const user = ref<GitHubUser | null>(null)
const repos = ref<GitHubRepo[]>([])
const loading = ref(true)
const error = ref(false)
const copy = computed(() => codeCopy[props.locale])
const totalStars = computed(() => repos.value.reduce((sum, repo) => sum + repo.stargazers_count, 0))
const totalForks = computed(() => repos.value.reduce((sum, repo) => sum + repo.forks_count, 0))
const languages = computed(() => summarizeLanguages(repos.value))
const recentRepos = computed(() => repos.value.slice(0, 4))
const mainLanguage = computed(() => languages.value[0]?.name || 'Python')
const statusLabel = computed(() => {
  if (loading.value) return copy.value.status.loading
  if (error.value) return copy.value.status.error
  return copy.value.status.ready
})
const stats = computed(() => [
  { value: String(user.value?.public_repos ?? (repos.value.length || 'Public')), label: copy.value.statLabels.repos, icon: Github },
  { value: String(totalStars.value), label: copy.value.statLabels.stars, icon: Star },
  { value: mainLanguage.value, label: copy.value.statLabels.language, icon: Code2 },
  { value: String(totalForks.value), label: copy.value.statLabels.forks, icon: GitFork },
  { value: String(user.value?.followers ?? 0), label: copy.value.statLabels.followers, icon: Activity },
])

onMounted(async () => {
  try {
    const data = await fetchGitHubProfile()
    user.value = data.user
    repos.value = data.repos
  } catch {
    error.value = true
  } finally {
    loading.value = false
  }
})
</script>
