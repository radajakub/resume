<script setup lang="ts">
const props = defineProps<{
  clickable: boolean;
}>();
</script>

<template>
  <div class="shadowed" :class="{ clickable: props.clickable }">
    <slot></slot>
  </div>
</template>

<style scoped>
.shadowed:hover {
  transform: translate(var(--translation-size-pos), var(--translation-size-neg));
  box-shadow: var(--translation-size-neg-double) var(--translation-size-pos-double) var(--shadow-color);
}

.clickable {
  cursor: pointer;
}

.shadowed {
  height: 100%;
  width: 100%;
  transition:
    transform var(--translation-time) ease,
    box-shadow var(--translation-time) ease;
}
</style>
