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
    // active.value = index;
    var element = document.getElementById(links[index]);
    if (element == null) {
        throw new Error("[click] The id of scroll element is null");
    }
    var y = element.getBoundingClientRect().top + window.scrollY;
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
        var elementBox = document.getElementById(links[i])?.getBoundingClientRect();
        if (elementBox == null) {
            throw new Error("[scroll] The id of scroll element is null");
        }
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
            <div class="element vertical-separator" :class="{ active: index == active }" @click="clickSection(index)">
                <span class="item">{{ label }}</span>
            </div>
            <SeparatorComponent class="separator" :noVerticalPadding=true v-if="index < props.labels.length - 1" />
        </div>
    </div>
</template>

<style scoped>
.element {
    width: 100%;
    cursor: pointer;
    box-sizing: border-box;
}

.element:hover {
    background-color: var(--color-background-hover);
    color: var(--color-border);
}

.vertical-separator {
    border: 0;
}

.element.active {
    background-color: var(--color-border);
    color: var(--color-background);
}

.wrapper {
    background-color: var(--color-background);
    width: var(--scroll-width);
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    text-align: center;
}

.item {
    writing-mode: vertical-rl;
    transform: rotate(180deg);
    padding-top: 20px;
    padding-bottom: 20px;
}

@media screen and (max-width: 1100px) {
    .wrapper {
        width: fit-content;
        height: var(--scroll-width);
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        margin: auto;
    }

    .element {
        height: 100%;
    }

    .item {
        writing-mode: horizontal-tb;
        padding-left: 20px;
        padding-right: 20px;
        padding-top: 0px;
        padding-bottom: 0px;
    }

    .separator {
        display: none;
    }

    .vertical-separator {
        border-right: var(--border-thickness) solid var(--color-border);
    }

    .element:last-child.vertical-separator {
        border-right: 0;
    }

}
</style>
