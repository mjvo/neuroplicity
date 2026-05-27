<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <UCard class="text-section-card">
    <h2>{{ title }}</h2>
    <div class="section-body">
      <slot />
    </div>
  </UCard>
</template>
