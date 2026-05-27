<script setup lang="ts">
const props = defineProps<{
  title: string
  youtubeId: string
  caption?: string
  headingLevel?: 2 | 3 | 4
}>()

const headingTag = computed(() => `h${props.headingLevel || 2}`)
</script>

<template>
  <UCard class="video-card">
    <component :is="headingTag">{{ title }}</component>
    <div class="video-card-body">
      <slot />
    </div>
    <div class="video-frame">
      <iframe
        :title="title"
        :src="`https://www.youtube.com/embed/${youtubeId}`"
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      />
    </div>
    <p v-if="caption" class="video-card-caption">{{ caption }}</p>
  </UCard>
</template>
