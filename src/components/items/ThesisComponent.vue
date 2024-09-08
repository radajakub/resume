<script setup lang="ts">
import { Thesis } from "@/data/types";
import BadgeComponent from "../BadgeComponent.vue";
import { openLink } from "@/utils";

const props = defineProps<{
  thesis: Thesis;
}>();
var level = "";
if (props.thesis.level == "bachelor") {
  level = "Bachelor";
} else if (props.thesis.level == "master") {
  level = "Master";
} else if (props.thesis.level == "phd") {
  level = "PhD";
} else {
  throw Error("Thesis: level must be bachelor, master, or phd");
}
</script>

<template>
  <div class="title mb-10 ph-20">{{ level }} Thesis</div>
  <div class="white-bg horizontal-border sharp-border container" @click="openLink(thesis.link)">
    <div class="subtitle mb-10 ph-20">{{ thesis.title }}</div>
    <div class="badges mb-10 ph-20">
      <BadgeComponent v-for="(badge, index) in thesis.badges" :key="index" class="text mh-5 ph-20"
        >{{ badge }}
      </BadgeComponent>
    </div>
    <div class="text ph-20">{{ thesis.description }}</div>
  </div>
</template>

<style scoped>
.container:hover {
  background-color: var(--color-background-hover-white);
  cursor: pointer;
}

.badges {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>
