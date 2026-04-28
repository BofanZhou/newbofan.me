import { defineStore } from 'pinia'
import type { Locale } from '@/data/types'

export const useAppStore = defineStore('app', {
  state: () => ({
    locale: (localStorage.getItem('bofan-locale') as Locale) || 'zh',
  }),
  actions: {
    setLocale(locale: Locale) {
      this.locale = locale
      localStorage.setItem('bofan-locale', locale)
      document.documentElement.lang = locale === 'zh' ? 'zh-CN' : 'en'
    },
  },
})
