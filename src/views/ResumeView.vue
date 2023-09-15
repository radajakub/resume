<script setup lang="ts">

import IntroductionComponent from '@/components/intro/IntroductionComponent.vue';
import AboutMeComponent from '@/components/intro/AboutMeComponent.vue';
import SchoolComponent from '@/components/education/SchoolComponent.vue';

import education_json from '@/assets/data/me/education.json';
const educations = education_json['all'];
import personal_json from '@/assets/data/me/personal.json';
const about_me = personal_json['aboutme'];


// extract the array of educations from the json
// const education = education_json['all']
// ref([]) creates an array which can be modified by v-model
// to modify ref, use .value property
</script>


<template>
    <!-- introduction row [personal column, about me column] -->
    <div class="intro-row">
        <IntroductionComponent />
        <div class="about-me-col">
            <AboutMeComponent :aboutme="about_me" />
        </div>
    </div>
    <!-- education row -->
    <!-- <SchoolComponent v-for="education in educations" :education="education" /> -->
</template>

<style scoped>
.intro-row {
    display: flex;
}
</style>
