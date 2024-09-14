<script setup lang="ts">
import { Course, Grades } from "@/data/types";
import SeparatorComponent from "@/components/SeparatorComponent.vue";

const props = defineProps<{
  grades: Grades;
}>();

const gradesBySemester: Map<number, Course[]> = new Map<number, Course[]>();
for (const course of props.grades.courses) {
  if (!gradesBySemester.has(course.group)) {
    gradesBySemester.set(course.group, []);
  }
  gradesBySemester.get(course.group)?.push(course);
}
const semesters = Array.from(gradesBySemester.keys()).sort();
</script>

<template>
  <div class="ph-20 title">Courses</div>
  <div class="container">
    <div class="ph-20 pv-10">
      <div class="row sticky-header subsubtitle">
        <div class="left">Course</div>
        <div class="middle">Description</div>
        <div class="right center">Credits</div>
        <div class="more-right center">Grade</div>
      </div>
    </div>
    <div v-for="(semester, index) in semesters" :key="index" class="group">
      <div v-if="semester != 0" class="ph-20 pt-10 subtitle">{{ grades.groupLabel }} {{ semester }}</div>
      <div class="white-bg horizontal-border sharp-border">
        <div v-for="(course, courseIndex) in gradesBySemester.get(semester)" :key="courseIndex">
          <div class="ph-20 pv-10 course">
            <div class="row">
              <div class="left">{{ course.name }}</div>
              <div class="middle">{{ course.description }}</div>
              <div class="right center">{{ course.credits }}</div>
              <div class="more-right center">{{ course.grade }}</div>
            </div>
          </div>
          <SeparatorComponent
            v-if="courseIndex + 1 != gradesBySemester.get(semester)?.length"
            :no-vertical-padding="true"
            :dotted="true"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.course:hover {
  background-color: var(--color-background-hover-white);
}

.row {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  width: 100%;
  align-items: center;
  gap: 10px;
}

.left {
  width: 30%;
}

.middle {
  width: 50%;
}

.right {
  width: 10%;
}

.more-right {
  width: 10%;
}
</style>
