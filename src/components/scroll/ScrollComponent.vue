<script setup lang="ts">
import { ref } from "vue";

import SeparatorComponent from "@/components/SeparatorComponent.vue";

const props = defineProps<{
    labels: string[],
}>();

function createLink(label: string) {
    return label.toLowerCase().split(" ").join("");
}

const links = props.labels.map((label) => createLink(label));

const active = ref(0);

function clickSection(index: number) {
    active.value = index;
    var y = document.getElementById(links[index]).getBoundingClientRect().top + window.scrollY;
    if (index == 0) {
        y = 0;
    }
    window.scrollTo({
        top: y,
        behavior: "smooth",
    });
}

document.addEventListener("scroll", () => {
    for (var i = 0; i < links.length; i++) {
        var elementBox = document.getElementById(links[i]).getBoundingClientRect();
        var middle = elementBox.top + elementBox.height / 2;
        if (middle >= 0) {
            active.value = i;
            break;
        }
    }
});

</script>

<template>
    <div class="wrapper thin-border rounded-border">
        <div v-for="(label, index) in props.labels" :key="index">
            <div class="element" :class="{ active: index == active }" @click="clickSection(index)">
                <span class="item pv-20">{{ label }}</span>
            </div>
            <SeparatorComponent :dotted=true :noVerticalPadding=true v-if="index < props.labels.length - 1" />
        </div>
    </div>
</template>

<style scoped>
.element {
    width: 100%;
    cursor: pointer;
}

.element:hover {
    background-color: var(--color-background-hover);
    color: var(--button-active-text-color);
}

.element.active {
    background-color: var(--color-border);
    color: var(--color-background);
}

.wrapper {
    width: var(--scroll-width);
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    text-align: center;
}

.item {
    padding-right: 5;
    writing-mode: vertical-rl;
    transform: rotate(180deg);
}
</style>
