<script setup lang="ts">
import ItemComponent from "@/components/items/ItemComponent.vue";
import { Education, Grades } from "@/data/types";
import CourseComponent from "@/components/items/CourseComponent.vue";
import ThesisComponent from "@/components/items/ThesisComponent.vue";

const props = defineProps<{
  education: Education;
  modalWidth?: number;
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
  return "Grade average: " + grades.result + (grades.scale != "" ? " (scale " + grades.scale + ")" : "");
}
</script>

<template>
  <ItemComponent
    :top-left="education.level"
    :percentage="education.interval.computePercentage()"
    :title="education.school"
    :logo-path="education.logoPath"
    :logo-link="education.link"
    :subtitles="subtitles"
    :short-text="education.shortDescription"
    :mid-left="createGradeString(education.grades)"
    :mid-right="createGraudationString(education.grades)"
    :bottom-left="education.interval.yearRange(true)"
    :bottom-right="education.shortcut"
    :modal-enabled="true"
    :modal-title="education.school"
    :modal-width="props.modalWidth"
  >
    <template #modal>
      <div class="mb-50">
        <div class="text ph-20">{{ education.longDescription }}</div>
      </div>
      <div v-if="education.grades.courses.length > 0" class="mb-50">
        <CourseComponent :grades="education.grades" />
      </div>
      <div v-if="education.thesis != null" class="mb-50">
        <ThesisComponent :thesis="education.thesis" />
      </div>
    </template>
  </ItemComponent>
</template>

<style scoped></style>
