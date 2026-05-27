<script setup lang="ts">
const props = defineProps<{
  path: string
}>()

const pathRef = toRef(props, 'path')

const { data: doc } = await useAsyncData(
  () => `content:${pathRef.value}`,
  () => queryCollection('content').path(pathRef.value).first(),
  {
    watch: [pathRef]
  }
)

const meta = computed(() => {
  return (doc.value?.meta || {}) as {
    heroTitle?: string
    heroKicker?: string
    heroImage?: string
  }
})

const heroClass = computed(() => {
  return pathRef.value.startsWith('/researcher-profiles/') ? 'profile-hero' : undefined
})

useSeoMeta({
  title: () => (doc.value ? meta.value.heroTitle || doc.value.title : 'Page not found'),
  description: () =>
    doc.value?.description ||
    'Neuroplicity static archive of a multi-year Duke student/faculty science communication project.'
})
</script>

<template>
  <main v-if="doc" id="main-content" tabindex="-1">
    <PageHero
      :title="meta.heroTitle || doc.title"
      :kicker="meta.heroKicker"
      :description="doc.description"
      :image="meta.heroImage"
      :hero-class="heroClass"
    />

    <div class="container page-main">
      <ContentRenderer :value="doc" class="rich-content" />
    </div>
  </main>

  <main v-else id="main-content" class="container not-found" tabindex="-1">
    <h1>Page not found</h1>
    <p>This archive route has not been generated yet.</p>
    <NuxtLink to="/" class="nav-link">Back to Home</NuxtLink>
  </main>
</template>
