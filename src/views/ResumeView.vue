<script setup lang="ts">
import IntroductionComponent from '@/components/intro/IntroductionComponent.vue';
import AboutMeComponent from '@/components/about_me/AboutMeComponent.vue';
import personal_info from '@/assets/data/me/personal.json';
import SkillComponent from '@/components/about_me/SkillComponent.vue';
import EducationComponent from '@/components/items/EducationComponent.vue';

const about_me = personal_info.aboutme;
const skills = personal_info.skills;
</script>


<template>
    <!-- introduction row [personal column, about me column] -->
    <div class="intro-row mb-50">
        <IntroductionComponent />
        <div class="about-me-col ml-20">
            <AboutMeComponent :aboutme="about_me" class="mb-50" />
        </div>
    </div>
</template>

<style scoped>
.intro-row {
    display: flex;
    flex-direction: row;
}

.about-me-col {
    height: fit-content;
}
</style>
