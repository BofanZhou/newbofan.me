export type GitHubUser = {
  login: string
  html_url: string
  public_repos: number
  followers: number
}

export type GitHubRepo = {
  id: number
  name: string
  html_url: string
  description: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  updated_at: string
}

const username = import.meta.env.VITE_GITHUB_USERNAME || 'BofanZhou'
const apiBase = 'https://api.github.com'
const cacheKey = `bofan:github:${username}`
const cacheTtl = 1000 * 60 * 30

type GitHubProfilePayload = {
  user: GitHubUser
  repos: GitHubRepo[]
}

function readCache() {
  try {
    const raw = window.localStorage.getItem(cacheKey)
    if (!raw) return null
    const cache = JSON.parse(raw) as GitHubProfilePayload & { cachedAt: number }
    if (Date.now() - cache.cachedAt > cacheTtl) return null
    return { user: cache.user, repos: cache.repos }
  } catch {
    return null
  }
}

function writeCache(payload: GitHubProfilePayload) {
  try {
    window.localStorage.setItem(cacheKey, JSON.stringify({ ...payload, cachedAt: Date.now() }))
  } catch {
    // Cache is a convenience only; private browsing or quota limits should not break the page.
  }
}

export async function fetchGitHubProfile() {
  try {
    const [userResponse, repoResponse] = await Promise.all([
      fetch(`${apiBase}/users/${username}`),
      fetch(`${apiBase}/users/${username}/repos?per_page=100&sort=updated&direction=desc`),
    ])

    if (!userResponse.ok || !repoResponse.ok) {
      throw new Error('GitHub public API request failed')
    }

    const user = (await userResponse.json()) as GitHubUser
    const repos = (await repoResponse.json()) as GitHubRepo[]
    const payload = { user, repos }
    writeCache(payload)

    return payload
  } catch (error) {
    const cached = readCache()
    if (cached) return cached
    throw error
  }
}

export function summarizeLanguages(repos: GitHubRepo[]) {
  const counts = repos.reduce<Record<string, number>>((acc, repo) => {
    if (!repo.language) return acc
    acc[repo.language] = (acc[repo.language] || 0) + 1
    return acc
  }, {})

  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([name, count]) => ({ name, count }))
}
