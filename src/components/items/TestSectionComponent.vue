<script setup lang="ts">
import type { TestSection } from "@/data/types";
import ProgressBarComponent from "../ProgressBarComponent.vue";

const props = defineProps<{
  section: TestSection;
}>();

const percentage = Math.round((props.section.points / props.section.maxPoints) * 100);
</script>

<template>
  <div class="wrapper">
    <div class="name">
      <div class="bold">{{ section.name }}</div>
      <div class="spacer"></div>
      <div>{{ section.points }}/{{ section.maxPoints }}</div>
    </div>
    <ProgressBarComponent :percentage="percentage" :show-number="false" />
  </div>
</template>

<style scoped lang="css">
.name {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.spacer {
  width: 10px;
}

.bold {
  font-weight: bold;
}
</style>
