<script setup lang="ts">
import ItemComponent from "@/components/items/ItemComponent.vue";
import { Achievement } from "@/data/types";

const props = defineProps<{
  achievement: Achievement;
  modalWidth?: number;
}>();

const achievement = props.achievement;

const subtitles: string[] = [];
subtitles.push(achievement.achievement);
</script>

<template>
  <ItemComponent
    :top-left="achievement.category"
    :title="achievement.name"
    :logo-path="achievement.logoPath"
    :logo-link="achievement.link"
    :subtitles="subtitles"
    :short-text="achievement.shortDescription"
    :mid-left="achievement.programmingLanguage?.name"
    :bottom-left="achievement.interval.yearRange(true)"
    :bottom-right="achievement.awardingInstitution"
    :modal-title="achievement.name"
    :modal-width="props.modalWidth"
  >
    <template #modal> </template>
  </ItemComponent>
</template>

<style scoped></style>
