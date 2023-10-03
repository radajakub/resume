<script setup lang="ts">
import { ref } from "vue";

import ArrowButtonComponent from "@/components/carousel/ArrowButtonComponent.vue";

const props = defineProps<{
    title: string,
}>();

const prevButtonActive = ref(false);
const nextButtonActive = ref(true);

function nextCallback() {
    if (!nextButtonActive.value) {
        return;
    }
    nextButtonActive.value = false;
    prevButtonActive.value = true;
}

function prevCallback() {
    if (!prevButtonActive.value) {
        return;
    }
    nextButtonActive.value = true;
    prevButtonActive.value = false;
}

</script>

<template>
    <div class="carousel">
        <div class="header-row">
            <div class="heading">
                {{ props.title }}
            </div>
            <div class="buttons">
                <ArrowButtonComponent direction="left" :active="prevButtonActive" class="mr-10" @click="prevCallback" />
                <ArrowButtonComponent direction="right" :active="nextButtonActive" @click="nextCallback" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.buttons {
    display: flex;
    flex-direction: row;
}

.header-row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center
}
</style>
