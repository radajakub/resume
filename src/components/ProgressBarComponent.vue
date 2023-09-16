<script setup lang="ts">
const props = defineProps<{ color: string, max: number, curr: number }>();

function computePercentage() {
    return Math.max(Math.min(Math.ceil(props.curr * 100 / props.max), 100), 0);
}

const percentage = computePercentage();
</script>

<template>
    <div class="wrapper">
        <div class="text">{{ percentage }}%</div>
        <div class="outline">
            <div class="bar" :width="percentage" :class="{ 'right-border': percentage != 100 }"></div>
        </div>
    </div>
</template>

<style scoped>
.wrapper {
    position: relative;
}

.text {
    font-size: 20px;
    position: relative;
    text-align: right;
    height: 20px;
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

.progress-enter-active,
.progress-leave-active {
    width: v-bind(percentage) 1s ease;
}

.progress-enter-from,
.progress-leave-to {
    width: 0;
}
</style>
