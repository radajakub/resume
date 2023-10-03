<script setup lang="ts">
import ItemComponent from "@/components/items/ItemComponent.vue";
import { Education } from "@/data.ts";

const props = defineProps<{
    education: Education,
    modalWidth: number,
}>();

const education = props.education;

const subtitles: string[] = [];
if (education.faculty != null) {
    subtitles.push(education.faculty);
}
subtitles.push(education.specialization);
subtitles.push(education.shortDescription);

</script>

<template>
    <ItemComponent :topLeft="education.level" :topRight="education.timeFrame.computePercentage() + '%'"
        :title="education.school" :logoPath="education.logoPath" :logo-link="education.link" :subtitles="subtitles"
        :midLeft="education.grades.result" :midRight="education.grades.graduatedWithHonors ? 'Honors' : ''"
        :modalTitle="education.school" :bottomLeft="education.timeFrame.yearRange()" :bottom-right="education.shortcut"
        :modalWidth="props.modalWidth" />
</template>

<style scoped>
</style>
