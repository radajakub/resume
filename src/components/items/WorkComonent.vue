<script setup lang="ts">
import ItemComponent from "@/components/items/ItemComponent.vue";
import { Work } from "@/data.ts";

const props = defineProps<{
    work: Work,
    modalWidth?: number,
    langNum?: number,
}>();

const work = props.work;
const langNum = props.langNum ?? 2;
const languageString = work.programmingLanguages.splice(0, langNum).map((lang) => lang.name).join(" | ");

const subtitles: string[] = [];
subtitles.push(work.field);

</script>

<template>
    <ItemComponent :topLeft="work.companyName" :topRight="work.mode" :title="work.title" :logoPath="work.logoPath"
        :logo-link="work.logoLink" :subtitles="subtitles" :short-text="work.shortDescription" :midLeft="languageString"
        :bottomLeft="work.interval.yearRange()" :modalTitle="work.title" :modalWidth="props.modalWidth">
        <template #modal>
        </template>
    </ItemComponent>
</template>

<style scoped>
</style>
