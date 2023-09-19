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
    display: inline-block;
    border-radius: var(--border-radius);
    padding: var(--badge-vertical-padding) var(--badge-horizontal-padding);
    background: var(--color-badge);
    color: var(--color-badge-text);
}

.border {
    border: var(--border-thickness) solid var(--color-border);
}
</style>
