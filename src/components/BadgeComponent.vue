<script setup lang="ts">
const props = defineProps<{ border?: boolean }>();
</script>

<template>
  <div class="badge" :class="{ border: props.border }">
    <slot></slot>
  </div>
</template>

<style scoped>
.badge {
  display: block;
  width: fit-content;
  border-radius: var(--badge-border-radius);
  padding: var(--badge-vertical-padding) var(--badge-horizontal-padding);
  background: var(--color-badge);
  color: var(--color-badge-text);
  margin: var(--badge-vertical-padding) auto;
}

.border {
  border: var(--border-thickness) solid var(--color-border);
}
</style>
