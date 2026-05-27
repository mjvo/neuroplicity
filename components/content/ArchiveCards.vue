<script setup lang="ts">
defineProps<{
  variant?: 'default' | 'team' | 'researchers' | 'explore'
}>()
</script>

<template>
  <div :class="['card-grid', variant === 'team' && 'card-grid-team', variant === 'researchers' && 'card-grid-researchers', variant === 'explore' && 'card-grid-explore']">
    <slot />
  </div>
</template>
