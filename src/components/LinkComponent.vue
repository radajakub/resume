<script setup lang="ts">

const props = defineProps<{ url: string, border: boolean }>();
</script>

<template>
    <a :href="props.url" target="_blank">
        <div class="hover-box" :class="{ border: props.border }">
            <slot></slot>
        </div>
    </a>
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

.border {
    border: var(--border-thickness) solid var(--color-border);
}
</style>
