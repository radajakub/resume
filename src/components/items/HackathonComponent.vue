<script setup lang="ts">
import ItemComponent from "@/components/items/ItemComponent.vue";
import { Hackathon } from "@/data/types";
import { formatOrdinal } from "@/utils";

const props = defineProps<{
  hackathon: Hackathon;
  modalWidth?: number;
  langNum?: number;
  sponsorsNum?: number;
}>();

const hackathon = props.hackathon;
const langNum = props.langNum ?? 3;
const sponsorsNum = props.sponsorsNum ?? 3;
const languageString = hackathon.programmingLanguages
  .slice(0, langNum)
  .map((lang) => lang.name)
  .join(" | ");

const sponsorsString = hackathon.sponsors.slice(0, sponsorsNum).join(" | ");

const subtitles: string[] = [];
subtitles.push(hackathon.topic);
subtitles.push(hackathon.place);

const awardString = `${formatOrdinal(hackathon.award)} place`;
</script>

<template>
  <ItemComponent
    :top-left="sponsorsString"
    :title="hackathon.name"
    :logo-path="hackathon.logoPath"
    :logo-link="hackathon.link"
    :subtitles="subtitles"
    :short-text="hackathon.shortDescription"
    :mid-left="languageString"
    :bottom-left="hackathon.interval.yearRange(true)"
    :bottom-right="awardString"
    :modal-title="hackathon.name"
    :modal-width="props.modalWidth"
  >
    <template #modal> </template>
  </ItemComponent>
</template>

<style scoped></style>
