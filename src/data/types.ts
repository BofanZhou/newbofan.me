export type Locale = 'zh' | 'en'

export type Localized = {
  zh: string
  en: string
}

export type Project = {
  id: string
  title: Localized
  type: Localized
  time: string
  role: Localized
  description: Localized
  short: Localized
  highlights: { zh: string[]; en: string[] }
  techStack: string[]
  links?: { github?: string; demo?: string; website?: string }
  public: boolean
}

export type BlogPost = {
  id: string
  slug: string
  title: Localized
  description: Localized
  date: string
  category: Localized
  tags: string[]
  lang: 'zh' | 'en' | 'both'
  content: Localized
}

export type UpdateItem = {
  id: string
  date: string
  type: Localized
  content: Localized
}
