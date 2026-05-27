<script setup lang="ts">
const props = defineProps<{
  title: string
  youtubeId: string
  caption?: string
  headingLevel?: 2 | 3 | 4
}>()

const headingTag = computed(() => `h${props.headingLevel || 3}`)
</script>

<template>
  <UCard class="video-card">
    <div class="video-frame">
      <iframe
        :title="title"
        :src="`https://www.youtube.com/embed/${youtubeId}`"
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      />
    </div>
    <component :is="headingTag">{{ title }}</component>
    <p v-if="caption">{{ caption }}</p>
  </UCard>
</template>
