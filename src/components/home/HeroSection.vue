<template>
  <section class="hero-section">
    <div class="hero-orb hero-orb--cyan" aria-hidden="true" />
    <div class="hero-orb hero-orb--amber" aria-hidden="true" />
    <div class="hero-copy reveal">
      <p class="hero-kicker">{{ profile.identity[locale] }}</p>
      <h1>Hi, I’m Bofan.</h1>
      <p class="hero-lead">{{ copy.lead }}</p>
      <p class="hero-body">{{ copy.body }}</p>
      <div class="hero-tags" aria-label="Hero tags">
        <TagPill v-for="tag in profile.directions" :key="tag">{{ tag }}</TagPill>
      </div>
      <div class="hero-actions">
        <a class="btn btn-primary" :href="`/${locale}#about`"><UserRound :size="18" />{{ t('common.aboutMe') }}</a>
        <a class="btn btn-secondary" :href="`/${locale}#projects`"><FolderKanban :size="18" />{{ t('common.viewProjects') }}</a>
        <RouterLink class="btn btn-ghost" :to="`/${locale}/blog`"><BookOpenText :size="18" />{{ t('common.readBlog') }}</RouterLink>
        <RouterLink class="btn btn-ghost" :to="`/${locale}/contact`"><MessageCircle :size="18" />{{ t('common.contact') }}</RouterLink>
        <a class="btn btn-ghost" href="https://bofan.work" target="_blank" rel="noreferrer"><Camera :size="18" />{{ t('common.photography') }}</a>
      </div>
    </div>
    <div class="hero-visual reveal">
      <div class="hero-visual__orbit" aria-hidden="true">
        <span />
        <span />
      </div>
      <div class="mini-card mini-card--top">
        <span>{{ copy.focusLabel }}</span>
        <strong>AI + Energy</strong>
      </div>
      <div class="portrait-shell">
        <img src="/avatar.jpg" alt="Bofan avatar" />
      </div>
      <div class="code-note">
        <span>{{ copy.buildingLabel }}</span>
        <strong>bofan</strong>
        <p>{{ copy.buildingLine }}</p>
      </div>
      <div class="mini-card mini-card--bottom">
        <span>{{ copy.modeLabel }}</span>
        <strong>{{ copy.modeValue }}</strong>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { BookOpenText, Camera, FolderKanban, MessageCircle, UserRound } from 'lucide-vue-next'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'
import type { Locale } from '@/data/types'
import { heroCopy } from '@/data/homeCopy'
import { profile } from '@/data/profile'
import TagPill from '@/components/common/TagPill.vue'

const props = defineProps<{ locale: Locale }>()
const { t } = useI18n()

const copy = computed(() => heroCopy[props.locale])
</script>
