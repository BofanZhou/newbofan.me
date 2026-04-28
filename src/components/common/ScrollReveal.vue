<template>
  <div ref="container" class="scroll-reveal">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Props {
  y?: number
  duration?: number
  delay?: number
  stagger?: number
  start?: string
  once?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  y: 50,
  duration: 0.9,
  delay: 0,
  stagger: 0,
  start: 'top 85%',
  once: true,
})

const container = ref<HTMLElement | null>(null)
let tweenInstance: gsap.core.Tween | null = null

onMounted(() => {
  if (!container.value) return

  const targets =
    props.stagger > 0 && container.value.children.length > 1
      ? container.value.children
      : container.value

  tweenInstance = gsap.from(targets, {
    y: props.y,
    opacity: 0,
    duration: props.duration,
    delay: props.delay,
    stagger: props.stagger,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: container.value,
      start: props.start,
      toggleActions: props.once ? 'play none none none' : 'play reverse play reverse',
    },
  })
})

onUnmounted(() => {
  if (tweenInstance) {
    tweenInstance.scrollTrigger?.kill()
    tweenInstance.kill()
    tweenInstance = null
  }
})
</script>
