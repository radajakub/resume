<script setup lang="ts">
import ItemComponent from '@/components/items/ItemComponent.vue';
import { Interval } from '@/classes/interval.ts';

const props = defineProps<{
    education: Object,
    modalWidth: number,
}>();

const edu = props.education;

const start = edu.start;
const end = edu.end;
const interval = new Interval(start.year, start.month, start.day, end.year, end.month, end.day);

const subtitles = []
if (edu.faculty != null) {
    subtitles.push(edu.faculty);
}
if (edu.specialization != null) {
    subtitles.push(edu.specialization);
}
if (edu.short != null) {
    subtitles.push(edu.short);
}

</script>

<template>
    <ItemComponent :topLeft="education.level" :topRight="interval.computePercentage() + '%'" :title="education.school"
        :logoPath="education.logoPath" :logo-link="education.link" :subtitles="subtitles" :midLeft="education.grade.GPA"
        :midRight="education.graduation.honors ? 'Honors' : ''" :modalTitle="education.school"
        :bottomLeft="education.start.year + ' - ' + education.end.year" :modalWidth="props.modalWidth" />
</template>

<style scoped>
</style>
