<script setup lang="ts">
import { openLink } from '@/utils.ts';

const props = defineProps<{ url?: string, border?: boolean }>();

const onClick = () => {
    if (props.url != null) {
        openLink(props.url);
    }
}
</script>

<template>
    <div @click.stop="onClick">
        <div class="hover-box" :class="{ border: props.border }">
            <slot></slot>
        </div>
    </div>
</template>

<style scoped>
.hover-box {
    display: block;
    border-radius: var(--border-radius);
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
