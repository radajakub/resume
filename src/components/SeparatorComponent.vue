<script setup lang="ts">
const props = defineProps<{ dotted?: boolean }>();
</script>

<template>
    <hr class="separator" :class="{ dotted: props.dotted }" />
</template>

<style scoped>
.separator {
    display: block;
    border: 0;
    border-bottom: var(--border-thickness) solid var(--color-border);
    width: 100%;
}

.dotted {
    border-bottom-style: dotted;
}
</style>
