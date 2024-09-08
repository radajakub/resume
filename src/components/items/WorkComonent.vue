<script setup lang="ts">
import ItemComponent from "@/components/items/ItemComponent.vue";
import { Work } from "@/data/types";

const props = defineProps<{
  work: Work;
  modalWidth?: number;
  langNum?: number;
}>();

const work = props.work;
const langNum = props.langNum ?? 2;
const languageString = work.programmingLanguages
  .splice(0, langNum)
  .map((lang) => lang.name)
  .join(" | ");

const subtitles: string[] = [];
subtitles.push(work.field);
</script>

<template>
  <ItemComponent
    :top-left="work.companyName"
    :top-right="work.mode"
    :title="work.title"
    :logo-path="work.logoPath"
    :logo-link="work.logoLink"
    :subtitles="subtitles"
    :short-text="work.shortDescription"
    :mid-left="languageString"
    :bottom-left="work.interval.yearRange(true)"
    :modal-title="work.title"
    :modal-width="props.modalWidth"
  >
    <template #modal> </template>
  </ItemComponent>
</template>

<style scoped></style>
