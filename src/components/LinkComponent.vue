<script setup lang="ts">
import { openLink } from '@/utils.ts';

const props = defineProps<{ url?: string, border?: boolean }>();
</script>

<template>
    <div @click="() => openLink(url)">
        <div class="hover-box" :class="{ border: props.border }">
            <slot></slot>
        </div>
    </div>
</template>

<style scoped>
a,
a:visited,
a:active,
a:link {
    text-decoration: none;
    color: inherit;
    cursor: auto;
}

.hover-box {
    display: block;
    border-radius: var(--border-radius);
    height: 50px;
    cursor: pointer;
}

.hover-box:hover {
    background: var(--color-background-hover);
}

.hover-box:active {
    background: var(--color-background-click);
}

.border {
    border: var(--border-thickness) solid var(--color-border);
}
</style>
