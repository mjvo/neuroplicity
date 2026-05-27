<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    lightSrc: string
    darkSrc?: string
    alt: string
    class?: string
  }>(),
  {
    darkSrc: ''
  }
)

const colorMode = useColorMode()

const resolvedSrc = computed(() => {
  if (colorMode.value === 'dark' && props.darkSrc) {
    return props.darkSrc
  }

  return props.lightSrc
})
</script>

<template>
  <img :src="resolvedSrc" :alt="alt" :class="props.class" />
</template>
