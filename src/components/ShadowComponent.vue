<script setup lang="ts"></script>

<template>
    <div class="shadowed">
        <slot></slot>
    </div>
</template>

<style scoped>
.shadowed:hover {
    transform: translate(var(--translation-size-pos), var(--translation-size-neg));
    box-shadow: var(--translation-size-neg-double) var(--translation-size-pos-double) var(--shadow-color);
}

.shadowed {
    cursor: pointer;
    transition: transform var(--translation-time) ease, box-shadow var(--translation-time) ease;
}
</style>
