<script setup lang="ts">
import { ref } from "vue";

import SeparatorComponent from "@/components/SeparatorComponent.vue";
import { Section } from "@/data/types";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const props = defineProps<{
  sections?: Section[];
}>();

const links = props.sections?.map((section) => section.linkify()) ?? [];

const active = ref(0);

function clickSection(index: number) {
  // active.value = index;
  var element = document.getElementById(links[index]);
  if (element == null) {
    throw new Error("[click] The id of scroll element is null");
  }
  const offset = 70;
  let y = element.getBoundingClientRect().top + window.scrollY - offset;
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
    <div v-for="(section, index) in props.sections" :key="index">
      <div class="element vertical-separator" :class="{ active: index == active }" @click="clickSection(index)">
        <span class="item-icon">
          <font-awesome-icon :icon="section.icon" />
        </span>
        <span class="item">{{ section.name }}</span>
      </div>
      <SeparatorComponent
        v-if="index < (props.sections?.length ?? 0) - 1"
        class="separator"
        :no-vertical-padding="true"
      />
    </div>
  </div>
</template>

<style scoped>
.element {
  height: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
  box-sizing: border-box;
}

.element:hover {
  background-color: var(--color-background-hover);
  color: var(--color-border);
}

.vertical-separator {
  border-right: var(--border-thickness) solid var(--color-border);
}

.element:last-child.vertical-separator {
  border-right: 0;
}

.separator {
  display: none;
}

.element.active {
  background-color: var(--color-border);
  color: var(--color-background);
}

.wrapper {
  background-color: var(--color-background);
  width: fit-content;
  height: var(--scroll-height);
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  margin: auto;
  text-align: center;
}

.item {
  display: block;
  font-size: 12px;
  padding-left: var(--half-spacer-size);
  padding-right: var(--half-spacer-size);
  padding-top: 0;
  padding-bottom: 0;
}

.item-icon {
  display: none;
  padding-left: var(--half-spacer-size);
  padding-right: var(--half-spacer-size);
  font-size: 20px;
}

@media screen and (max-width: 900px) {
  .item {
    display: none;
  }

  .item-icon {
    display: block;
  }
}
</style>
