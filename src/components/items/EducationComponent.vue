<script setup lang="ts">
import ItemComponent from "@/components/items/ItemComponent.vue";
import { Education, Grades } from "@/data.ts";
import CourseComponent from "./CourseComponent.vue";

const props = defineProps<{
    education: Education,
    modalWidth?: number,
}>();

const education = props.education;

const subtitles: string[] = [];
if (education.faculty != null) {
    subtitles.push(education.faculty);
}
subtitles.push(education.specialization);

function createGraudationString(grades: Grades) {
    return grades.graduatedWithHonors ? "Honors" : "";
}

function createGradeString(grades: Grades) {
    if (!grades.showGPA) {
        return "";
    }
    return "Grade average: " + grades.result + " (scale " + grades.scale + ")";
}

</script>

<template>
    <ItemComponent :topLeft="education.level" :percentage="education.timeFrame.computePercentage()"
        :title="education.school" :logoPath="education.logoPath" :logo-link="education.link" :subtitles="subtitles"
        :short-text="education.shortDescription" :midLeft="createGradeString(education.grades)"
        :midRight="createGraudationString(education.grades)" :bottomLeft="education.timeFrame.yearRange()"
        :bottom-right="education.shortcut" :modalEnabled="true" :modalTitle="education.school"
        :modalWidth="props.modalWidth">
        <template #modal>
            <CourseComponent :courses="education.grades.courses" />
        </template>
    </ItemComponent>
</template>

<style scoped>
</style>
