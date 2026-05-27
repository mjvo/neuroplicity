<script setup lang="ts">
const props = defineProps<{
  title: string
  kicker?: string
  description?: string
  image?: string
  heroClass?: string
}>()

const heroStyle = computed(() => {
  return {
    '--hero-image': `url('${props.image || '/images/homepage-hero.jpg'}')`
  }
})
</script>

<template>
  <section :class="['page-hero', heroClass]" :style="heroStyle">
    <div class="hero-overlay" />
    <div class="container hero-content">
      <p v-if="kicker" class="hero-kicker">{{ kicker }}</p>
      <h1>{{ title }}</h1>
      <p v-if="description" class="hero-description">{{ description }}</p>
    </div>
  </section>
</template>
