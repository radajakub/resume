<script setup lang="ts">
import SeparatorComponent from "@/components/SeparatorComponent.vue";

const props = defineProps<{
  bottomSeparator?: boolean;
  bottomSeparatorDotted?: boolean;
  topSeparator?: boolean;
  topSeparatorDotted?: boolean;
}>();
</script>

<template>
  <SeparatorComponent v-if="props.topSeparator" :dotted="props.topSeparatorDotted" :no-vertical-padding="true" />
  <div class="row pv-5 ph-10">
    <slot></slot>
  </div>
  <SeparatorComponent v-if="props.bottomSeparator" :dotted="props.bottomSeparatorDotted" :no-vertical-padding="true" />
</template>

<style scoped>
.row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
</style>
