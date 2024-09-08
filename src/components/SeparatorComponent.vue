<script setup lang="ts">
const props = defineProps<{ dotted?: boolean; noVerticalPadding?: boolean }>();
</script>

<template>
  <hr class="separator" :class="{ dotted: props.dotted, nopad: props.noVerticalPadding }" />
</template>

<style scoped>
.separator {
  display: block;
  border: 0;
  border-bottom: var(--border-thickness) solid var(--color-border);
  width: 100%;
}

.nopad {
  margin: 0;
}

.dotted {
  border-bottom-style: dotted;
}
</style>
