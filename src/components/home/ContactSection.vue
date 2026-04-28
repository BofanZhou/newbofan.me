<template>
  <section id="contact" class="page-section contact-section">
    <SectionTitle :eyebrow="section[0]" :title="section[1]" />
    <p class="section-intro">{{ intro }}</p>
    <form class="contact-form" action="https://formsubmit.co/bofan_zhou@foxmail.com" method="POST">
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_subject" :value="locale === 'zh' ? 'bofan 网站新留言' : 'New message from bofan'" />
      <div class="form-row">
        <label>
          <span>{{ locale === 'zh' ? '你的邮箱' : 'Your email' }}</span>
          <input name="email" type="email" autocomplete="email" required :placeholder="locale === 'zh' ? 'name@example.com' : 'name@example.com'" />
        </label>
        <label>
          <span>{{ locale === 'zh' ? '主题' : 'Subject' }}</span>
          <input name="subject" type="text" required :placeholder="locale === 'zh' ? '项目合作 / 学习交流' : 'Project collaboration / Learning exchange'" />
        </label>
      </div>
      <label>
        <span>{{ locale === 'zh' ? '内容' : 'Message' }}</span>
        <textarea name="message" rows="6" required :placeholder="locale === 'zh' ? '写下你想和我交流的内容...' : 'Write what you would like to talk about...'"></textarea>
      </label>
      <button class="btn btn-primary contact-submit" type="submit">
        <Send :size="18" />{{ locale === 'zh' ? '发送留言' : 'Send Message' }}
      </button>
    </form>
    <div class="contact-board">
      <div class="contact-actions">
        <a class="btn btn-ghost" :href="`mailto:${profile.contacts.email}`"><Mail :size="18" />{{ t('common.email') }}</a>
        <a class="btn btn-secondary" :href="profile.contacts.github" target="_blank" rel="noreferrer"><Github :size="18" />GitHub</a>
        <a class="btn btn-ghost" href="/resume-placeholder.pdf" download><Download :size="18" />{{ t('common.resume') }}</a>
        <a class="btn btn-ghost" :href="profile.contacts.photography" target="_blank" rel="noreferrer"><Camera :size="18" />{{ locale === 'zh' ? '摄影网站' : 'Photography' }}</a>
      </div>
      <div class="contact-grid">
        <button v-for="item in copyItems" :key="item.label" type="button" class="copy-card" @click="copy(item.value)">
          <span>{{ item.label }}</span>
          <strong>{{ copied === item.value ? t('common.copied') : item.value }}</strong>
        </button>
        <a class="copy-card" :href="profile.contacts.instagram" target="_blank" rel="noreferrer"><span>Instagram</span><strong>vaughn89070</strong></a>
        <a class="copy-card" :href="profile.contacts.x" target="_blank" rel="noreferrer"><span>X</span><strong>Choubovan</strong></a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Camera, Download, Github, Mail, Send } from 'lucide-vue-next'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Locale } from '@/data/types'
import { profile } from '@/data/profile'
import SectionTitle from '@/components/common/SectionTitle.vue'

const props = defineProps<{ locale: Locale; section: string[] }>()
const { t } = useI18n()
const copied = ref('')
const intro = computed(() =>
  props.locale === 'zh'
    ? '如果你对我的项目、技术博客、摄影作品或合作机会感兴趣，欢迎与我联系。'
    : 'If you are interested in my projects, technical blog, photography works, or possible collaboration, feel free to contact me.'
)
const copyItems = [
  { label: 'Email', value: profile.contacts.email },
  { label: 'WeChat', value: profile.contacts.wechat },
  { label: 'QQ', value: profile.contacts.qq },
]

async function copy(value: string) {
  await navigator.clipboard.writeText(value)
  copied.value = value
  window.setTimeout(() => (copied.value = ''), 1800)
}
</script>
