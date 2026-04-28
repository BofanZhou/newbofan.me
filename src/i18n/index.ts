import { createI18n } from 'vue-i18n'
import en from './en'
import zh from './zh'

export const messages = { zh, en }

export const i18n = createI18n({
  legacy: false,
  locale: 'zh',
  fallbackLocale: 'zh',
  messages,
})
