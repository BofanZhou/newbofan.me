<template>
  <section id="projects" class="page-section">
    <SectionTitle :eyebrow="section[0]" :title="section[1]" />
    <div class="project-showcase">
      <article v-if="featuredProject" class="project-feature">
        <div class="project-feature__copy">
          <p class="project-feature__eyebrow">{{ copy.label }} · {{ featuredProject.time }}</p>
          <h3>{{ featuredProject.title[locale] }}</h3>
          <p>{{ featuredProject.description[locale] }}</p>
          <div class="project-card__tags">
            <TagPill v-for="tech in featuredProject.techStack.slice(0, 5)" :key="tech">{{ tech }}</TagPill>
          </div>
        </div>
        <div class="project-feature__panel" aria-hidden="true">
          <span>{{ featuredProject.type[locale] }}</span>
          <strong>{{ copy.panelTitle }}</strong>
          <div>
            <i v-for="highlight in featuredProject.highlights[locale]" :key="highlight">{{ highlight }}</i>
          </div>
        </div>
        <RouterLink class="project-feature__link" :to="`/${locale}/projects/${featuredProject.id}`" :aria-label="featuredProject.title[locale]">
          <span>{{ copy.link }}</span>
          <ArrowUpRight :size="18" />
        </RouterLink>
      </article>
      <div class="project-grid project-grid--compact">
        <ProjectCard v-for="project in restProjects" :key="project.id" :project="project" :locale="locale" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ArrowUpRight } from 'lucide-vue-next'
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import type { Locale, Project } from '@/data/types'
import { homeProjectCopy, projectFeatureCopy } from '@/data/homeCopy'
import { projects } from '@/data/projects'
import ProjectCard from '@/components/common/ProjectCard.vue'
import SectionTitle from '@/components/common/SectionTitle.vue'
import TagPill from '@/components/common/TagPill.vue'

const props = defineProps<{ locale: Locale; section: string[] }>()

const copy = computed(() => projectFeatureCopy[props.locale])
const homepageProjects = computed(() => projects.map(withHomeCopy))
const featuredProject = computed(() => homepageProjects.value[0])
const restProjects = computed(() => homepageProjects.value.slice(1))

function withHomeCopy(project: Project): Project {
  const copy = homeProjectCopy[project.id]
  if (!copy) return project

  return {
    ...project,
    short: copy.short,
    description: copy.description ?? project.description,
    highlights: copy.highlights ?? project.highlights,
  }
}
</script>
