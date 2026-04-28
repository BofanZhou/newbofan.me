<template>
  <div class="scroll-progress" aria-hidden="true">
    <div class="scroll-progress__track">
      <span :style="{ transform: `scaleY(${progress})` }" />
      <i :style="{ top: `${progress * 100}%` }" />
    </div>
    <strong>{{ Math.round(progress * 100) }}</strong>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const progress = ref(0)

function updateProgress() {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight
  progress.value = maxScroll > 0 ? Math.min(window.scrollY / maxScroll, 1) : 0
}

onMounted(() => {
  updateProgress()
  window.addEventListener('scroll', updateProgress, { passive: true })
  window.addEventListener('resize', updateProgress)
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateProgress)
  window.removeEventListener('resize', updateProgress)
})
</script>
