<script setup lang="ts">
import { ref } from 'vue';

import { computeScrollDotsWidth, createRange } from '@/utils.ts';

const props = defineProps<{ title: string, showCount: number, maxCount: number }>();

const maxCount = props.maxCount;
const showCount = props.showCount % maxCount;

const dotsWidth = computeScrollDotsWidth(maxCount, 10).toString() + "px";

const startActive = ref(0);
const endActive = ref(showCount - 1);

function canAdvance() {
    return endActive.value < maxCount - 1;
}

function canRetreat() {
    return startActive.value > 0;
}

function advanceIndices() {
    if (canAdvance()) {
        startActive.value = startActive.value + 1;
        endActive.value = endActive.value + 1;
    }
}

function retreatIndices() {
    if (canRetreat()) {
        startActive.value = startActive.value - 1;
        endActive.value = endActive.value - 1;
    }
}


</script>

<template>
    <div class="outer-wrapper debug">
        <div class="scroll-row mb-20">
            <div class="arrow-button debug" @click="retreatIndices">
                <font-awesome-icon icon="fa-solid fa-caret-left"></font-awesome-icon>
            </div>

            <div class="arrow-button debug" @click="advanceIndices">
                <font-awesome-icon icon="fa-solid fa-caret-right"></font-awesome-icon>
            </div>
        </div>
        <div class="scroll-dots" :style="{ width: dotsWidth }">
            <div v-for="i in createRange(0, maxCount - 1)" class="dot"
                :class="{ active: i >= startActive && i <= endActive }">
            </div>
        </div>
    </div>
</template>

<style scoped>
.outer-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
}

.scroll-row {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: baseline;
    justify-content: space-evenly;
}

.arrow-button {
    font-size: 30px;
}

.scroll-dots {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.active {
    background-color: var(--dots-active-color);
}

.dot {
    height: 10px;
    width: 10px;
    border-radius: 50%;
    border: 1px solid var(--dots-active-color);
    display: inline-block;
}
</style>
