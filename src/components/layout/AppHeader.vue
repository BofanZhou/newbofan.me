<template>
  <a class="skip-link" href="#main">Skip to main content</a>
  <header class="site-header">
    <RouterLink class="brand" :to="`/${locale}`" aria-label="bofan home">
      <BrandLogo />
      <span>bofan</span>
    </RouterLink>
    <nav class="desktop-nav" aria-label="Primary">
      <div
        class="nav-dropdown"
        @mouseenter="dropdownOpen = true"
        @mouseleave="dropdownOpen = false"
        @focusout="handleDropdownBlur"
        @keydown.escape="dropdownOpen = false"
      >
        <RouterLink
          class="nav-dropdown__trigger"
          :class="{ 'is-open': dropdownOpen }"
          aria-haspopup="true"
          :aria-expanded="dropdownOpen"
          :to="`/${locale}`"
          @focus="dropdownOpen = true"
          @click="dropdownOpen = false"
        >
          {{ t('nav.about') }}
          <ChevronDown :size="14" />
        </RouterLink>
        <Transition name="dropdown">
          <div v-show="dropdownOpen" class="nav-dropdown__menu">
            <a
              v-for="item in aboutSubItems"
              :key="item.id"
              :href="`/${locale}#${item.id}`"
              @click="dropdownOpen = false"
              >{{ item.label }}</a
            >
          </div>
        </Transition>
      </div>
      <RouterLink class="nav-feature nav-feature--blog" :to="`/${locale}/blog`">
        <BookOpenText :size="16" />
        <span>{{ t('nav.blog') }}</span>
      </RouterLink>
      <RouterLink class="nav-feature nav-feature--contact" :to="`/${locale}/contact`">
        <MessageCircle :size="16" />
        <span>{{ t('nav.contact') }}</span>
      </RouterLink>
      <a class="nav-feature nav-feature--photo" href="https://bofan.work" target="_blank" rel="noreferrer">
        <Camera :size="16" />
        <span>{{ t('nav.photography') }}</span>
      </a>
    </nav>
    <div class="header-actions">
      <a
        class="icon-button"
        href="https://github.com/BofanZhou"
        target="_blank"
        rel="noreferrer"
        aria-label="GitHub"
      >
        <Github :size="19" />
      </a>
      <LanguageSwitch />
      <button
        class="icon-button mobile-only"
        type="button"
        :aria-label="open ? 'Close menu' : 'Open menu'"
        @click="open = !open"
      >
        <X v-if="open" :size="20" />
        <Menu v-else :size="20" />
      </button>
    </div>
    <Transition name="drop">
      <nav v-if="open" class="mobile-nav" aria-label="Mobile">
        <div class="mobile-nav__group">
          <span class="mobile-nav__label">{{ t('nav.about') }}</span>
          <a
            v-for="item in aboutSubItems"
            :key="item.id"
            :href="`/${locale}#${item.id}`"
            @click="open = false"
            >{{ item.label }}</a
          >
        </div>
        <RouterLink class="nav-feature nav-feature--blog" :to="`/${locale}/blog`" @click="open = false">
          <BookOpenText :size="16" />
          <span>{{ t('nav.blog') }}</span>
        </RouterLink>
        <RouterLink class="nav-feature nav-feature--contact" :to="`/${locale}/contact`" @click="open = false">
          <MessageCircle :size="16" />
          <span>{{ t('nav.contact') }}</span>
        </RouterLink>
        <a class="nav-feature nav-feature--photo" href="https://bofan.work" target="_blank" rel="noreferrer" @click="open = false">
          <Camera :size="16" />
          <span>{{ t('nav.photography') }}</span>
        </a>
      </nav>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { BookOpenText, Camera, ChevronDown, Github, Menu, MessageCircle, X } from 'lucide-vue-next'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink, useRoute } from 'vue-router'
import type { Locale } from '@/data/types'
import BrandLogo from '@/components/common/BrandLogo.vue'
import LanguageSwitch from './LanguageSwitch.vue'

const { t } = useI18n()
const route = useRoute()
const open = ref(false)
const dropdownOpen = ref(false)
const locale = computed(() => (route.params.locale === 'en' ? 'en' : 'zh') as Locale)

const aboutSubItems = computed(() => [
  { id: 'experience', label: t('nav.experience') },
  { id: 'tech', label: t('nav.tech') },
  { id: 'projects', label: t('nav.projects') },
  { id: 'honors', label: t('nav.honors') },
  { id: 'code', label: t('nav.code') },
  { id: 'updates', label: t('nav.updates') },
])

function handleDropdownBlur(event: FocusEvent) {
  const nextTarget = event.relatedTarget
  if (!(nextTarget instanceof Node)) {
    dropdownOpen.value = false
    return
  }

  if (!event.currentTarget || !(event.currentTarget as HTMLElement).contains(nextTarget)) {
    dropdownOpen.value = false
  }
}
</script>
