<script setup lang="ts">
type ProfileLink = {
  type?: 'university' | 'linkedin' | 'portfolio'
  label?: string
  href: string
}

const props = defineProps<{
  title: string
  href?: string
  image?: string
  imageAlt?: string
  description?: string
  portrait?: boolean
  role?: string
  links?: ProfileLink[]
  headingLevel?: 2 | 3 | 4
}>()

const isExternal = computed(() => /^https?:\/\//i.test(props.href || ''))
const headingTag = computed(() => `h${props.headingLevel || 3}`)

const getDefaultLabel = (type?: ProfileLink['type']) => {
  if (type === 'linkedin') return 'LinkedIn'
  if (type === 'portfolio') return 'Portfolio'
  return 'University profile'
}

const profileLinks = computed(() => {
  return (props.links || []).map((link) => ({
    href: link.href,
    label: link.label || getDefaultLabel(link.type),
    icon: link.type || 'portfolio'
  }))
})
</script>

<template>
  <UCard :class="['info-card', portrait && 'info-card-portrait']">
    <img v-if="image" :src="image" :alt="imageAlt || ''" />
    <component :is="headingTag">
      <a
        v-if="href && isExternal"
        :href="href"
        target="_blank"
        rel="noopener"
        :aria-label="`${title} (opens in a new tab)`"
      >
        {{ title }}
      </a>
      <NuxtLink v-else-if="href" :to="href">{{ title }}</NuxtLink>
      <span v-else>{{ title }}</span>
    </component>
    <p v-if="role" class="info-card-role">{{ role }}</p>
    <MDC v-if="description" :value="description" tag="div" class="info-card-description" />
    <div v-if="profileLinks.length" class="profile-link-list" aria-label="Profile links">
      <a
        v-for="link in profileLinks"
        :key="`${title}-${link.label}`"
        class="profile-link"
        :href="link.href"
        target="_blank"
        rel="noopener"
        :aria-label="`${link.label} (opens in a new tab)`"
      >
        <LucideUniversity v-if="link.icon === 'university'" class="profile-link-icon" aria-hidden="true" />
        <UIcon v-else-if="link.icon === 'linkedin'" name="i-simple-icons-linkedin" class="profile-link-icon" aria-hidden="true" />
        <LucideExternalLink v-else class="profile-link-icon" aria-hidden="true" />
        <span>{{ link.label }}</span>
      </a>
    </div>
  </UCard>
</template>
