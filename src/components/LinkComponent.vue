<script setup lang="ts">
import { openLink } from "@/utils.ts";

const props = defineProps<{ url?: string, border?: boolean, hoverColor?: string, clickColor?: string, bgColor?: string, }>();

const onClick = () => {
    if (props.url != null) {
        openLink(props.url);
    }
};

const theme = {
    background: props.bgColor ?? "transparent",
    hoverColor: props.hoverColor ?? "var(--color-background-hover)",
    clickColor: props.clickColor ?? "var(--color-background-click)",
};

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
    background-color: v-bind('theme.background');
}

.hover-box:hover {
    background: v-bind('theme.hoverColor');
}

.hover-box:active {
    background: v-bind('theme.clickColor');
}

.border {
    border: var(--border-thickness) solid var(--color-border);
}
</style>
