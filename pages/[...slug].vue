<script setup lang="ts">
const route = useRoute()
const path = computed(() => {
  const slug = route.params.slug
  if (Array.isArray(slug) && slug.length > 0) {
    return `/${slug.join('/')}`
  }
  return '/'
})
</script>

<template>
  <ArchivePage :path="path" />
</template>
