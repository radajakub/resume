<script setup lang="ts">
import ItemComponent from "@/components/items/ItemComponent.vue";
import { Project } from "@/data.ts";

const props = defineProps<{
    project: Project,
    modalWidth?: number,
    langNum?: number,
}>();

const project = props.project;
const langNum = props.langNum ?? 2;
const languageString = project.programmingLanguages.splice(0, langNum).map((lang) => lang.name).join(" | ");


const subtitles: string[] = [];
subtitles.push(project.topic);
subtitles.push(project.subtitle);

</script>

<template>
    <ItemComponent :topLeft="project.relatedInstitution" :title="project.name" logoPath="logo_github.png"
        :logo-link="project.githubLink" :subtitles="subtitles" :short-text="project.shortDescription"
        :midLeft="languageString" :bottomLeft="project.interval.yearRange()" :modalTitle="project.name"
        :modalWidth="props.modalWidth">
        <template #modal>
        </template>
    </ItemComponent>
</template>

<style scoped>
</style>
