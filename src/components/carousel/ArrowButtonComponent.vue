<script setup lang="ts">
const props = defineProps<{
    direction: string,
    active: true,
}>();

const directionOptions = ["left", "right"];

if (!directionOptions.includes(props.direction)) {
    throw Error("ArrowButton: Exactly one of left or right must be true");
}

const iconString = "fa-solid fa-chevron-" + props.direction;

</script>

<template>
    <div class="button subtitle mh-5" :class="{ active: props.active }">
        <font-awesome-icon :icon="iconString" />
    </div>
</template>

<style scoped>
.button {
    color: var(--button-inactive-color);
    width: var(--carousel-button-size);
    height: var(--carousel-button-size);
    border: var(--carousel-button-border) solid var(--button-inactive-color);
    border-radius: var(--carousel-button-border-radius);
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color 150ms ease, color 150ms ease;
}

.active {
    border-color: var(--color-border);
    color: var(--color-border);
    cursor: pointer;
}

.button.active:hover {
    background-color: var(--color-background-hover);
    color: var(--button-active-text-color);
}

.button.active:active {
    background-color: var(--color-border);
    color: var(--color-background);
}
</style>
