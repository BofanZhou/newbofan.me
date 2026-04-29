import matter from 'gray-matter'
import { marked } from 'marked'
import type { BlogPost } from './types'

const modules = import.meta.glob<string>('../../content/posts/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
})

export const blogPosts: BlogPost[] = Object.entries(modules)
  .map(([, content]) => {
    const { data, content: body } = matter(content)

    return {
      id: data.id,
      slug: data.slug,
      title: { zh: data.title_zh, en: data.title_en },
      description: { zh: data.description_zh, en: data.description_en },
      date: data.date,
      category: { zh: data.category_zh, en: data.category_en },
      tags: data.tags || [],
      lang: data.lang || 'both',
      content: {
        zh: marked.parse(body.trim()) as string,
        en: marked.parse(data.content_en || body.trim()) as string,
      },
    } as BlogPost
  })
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
