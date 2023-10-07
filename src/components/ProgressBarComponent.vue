<script setup lang="ts">
const props = defineProps<{ percentage: number }>();
</script>

<template>
    <div class="wrapper">
        <div class="outline">
            <div class="bar" :style="{ width: props.percentage + '%' }"
                :class="{ 'right-border': props.percentage != 100 }"></div>
        </div>
        <div class="text ml-5">{{ props.percentage }}%</div>
    </div>
</template>

<style scoped>
.wrapper {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
}

.outline {
    position: relative;
    width: 100%;
    height: var(--progress-bar-height);
    border-top-left-radius: 80px;
    border-top-right-radius: 80px;
    border-bottom-left-radius: 80px;
    border-bottom-right-radius: 80px;
    border: var(--border-thickness) solid var(--color-border);
    background: repeating-linear-gradient(45deg,
            transparent,
            transparent 2px,
            var(--color-border) 2px,
            var(--color-border) 4px);
}

.bar {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    height: 100%;
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
    border-bottom-left-radius: inherit;
    border-bottom-right-radius: inherit;
    background-color: var(--progress-bar-color);
}

/* add right border only when the percentage is less than 100% */
.right-border {
    border-right: var(--border-thickness) solid var(--color-border);
}
</style>
