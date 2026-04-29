import type { BlogPost } from './types'

// 使用 Vite 的 raw import 读取 Markdown 文件
const postFiles: Record<string, string> = import.meta.glob('../../content/posts/*.md', {
  eager: true,
  as: 'raw',
})

function parseFrontmatter(content: string): { data: Record<string, any>; body: string; contentEn: string } {
  const match = content.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/)
  
  if (!match) {
    return { data: {}, body: content, contentEn: '' }
  }
  
  const frontmatter = match[1]
  const body = match[2] || ''
  const data: Record<string, any> = {}
  
  let currentKey = ''
  let currentList: string[] = []
  let inList = false
  let isMultiline = false
  let multilineKey = ''
  let multilineValue = ''
  
  const lines = frontmatter.split('\n')
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const trimmed = line.trim()
    
    if (!trimmed || trimmed.startsWith('#')) {
      if (isMultiline) {
        multilineValue += '\n'
      }
      continue
    }
    
    // 处理多行字符串（YAML | 语法）
    if (isMultiline) {
      if (line.startsWith('  ') || line === '' || trimmed === '') {
        multilineValue += (multilineValue ? '\n' : '') + line.replace(/^  /, '')
        continue
      } else {
        data[multilineKey] = multilineValue.trim()
        isMultiline = false
        multilineKey = ''
        multilineValue = ''
      }
    }
    
    if (trimmed.startsWith('- ')) {
      if (!inList && currentKey) {
        inList = true
        currentList = []
      }
      if (inList) {
        currentList.push(trimmed.slice(2).trim().replace(/^['"]|['"]$/g, ''))
      }
    } else {
      if (inList && currentKey) {
        data[currentKey] = currentList
        inList = false
        currentList = []
      }
      
      const colonIndex = trimmed.indexOf(':')
      if (colonIndex > 0) {
        currentKey = trimmed.slice(0, colonIndex).trim()
        const value = trimmed.slice(colonIndex + 1).trim()
        
        if (value === '|') {
          // YAML multiline string starts
          isMultiline = true
          multilineKey = currentKey
          multilineValue = ''
        } else if (value.startsWith('[') && value.endsWith(']')) {
          data[currentKey] = value.slice(1, -1).split(',').map(v => v.trim().replace(/^['"]|['"]$/g, '')).filter(Boolean)
        } else if (value === 'true') {
          data[currentKey] = true
        } else if (value === 'false') {
          data[currentKey] = false
        } else {
          data[currentKey] = value.replace(/^['"]|['"]$/g, '')
        }
      }
    }
  }
  
  // 处理结尾的多行字符串
  if (isMultiline && multilineKey) {
    data[multilineKey] = multilineValue.trim()
  }
  
  if (inList && currentKey) {
    data[currentKey] = currentList
  }
  
  return { data, body, contentEn: data.content_en || '' }
}

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
  
  // 处理段落和换行
  const lines = html.split('\n')
  const result: string[] = []
  let inParagraph = false
  
  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed) {
      if (inParagraph) {
        result.push('</p>')
        inParagraph = false
      }
      continue
    }
    
    if (trimmed.startsWith('<') && !trimmed.startsWith('<br>')) {
      if (inParagraph) {
        result.push('</p>')
        inParagraph = false
      }
      result.push(line)
    } else {
      if (!inParagraph) {
        result.push('<p>')
        inParagraph = true
      }
      result.push(line)
    }
  }
  
  if (inParagraph) {
    result.push('</p>')
  }
  
  return result.join('\n')
}

function parsePost(fileContent: unknown): BlogPost | null {
  if (typeof fileContent !== 'string') {
    console.warn('Invalid file content type:', typeof fileContent)
    return null
  }
  
  try {
    const { data, body, contentEn } = parseFrontmatter(fileContent)
    
    const bodyHtml = simpleMarkdownToHtml(body.trim())
    const enHtml = contentEn ? simpleMarkdownToHtml(contentEn) : bodyHtml

    return {
      id: data.id || '',
      slug: data.slug || '',
      title: { zh: data.title_zh || '', en: data.title_en || '' },
      description: { zh: data.description_zh || '', en: data.description_en || '' },
      date: data.date || '',
      category: { zh: data.category_zh || '', en: data.category_en || '' },
      tags: Array.isArray(data.tags) ? data.tags : (data.tags ? [data.tags] : []),
      lang: (data.lang as 'zh' | 'en' | 'both') || 'both',
      content: {
        zh: bodyHtml,
        en: enHtml,
      },
    }
  } catch (error) {
    console.error('Failed to parse post:', error)
    return null
  }
}

// 解析所有 Markdown 文件
export const blogPosts: BlogPost[] = Object.values(postFiles)
  .map(parsePost)
  .filter((post): post is BlogPost => post !== null)
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
