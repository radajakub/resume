<script setup lang="ts">
import IntroductionComponent from '@/components/intro/IntroductionComponent.vue';
import AboutMeComponent from '@/components/about_me/AboutMeComponent.vue';
import EducationComponent from '@/components/items/EducationComponent.vue';
// import SkillComponent from '@/components/about_me/SkillComponent.vue';
// import CarouselComponent from '@/components/carousel/CarouselComponent.vue';

import personal_info from '@/assets/data/me/personal.json';
import education from '@/assets/data/me/education.json';

const about_me = personal_info.aboutme;
// const skills = personal_info.skills;
const educations = education.all.sort((a, b) => {
    const yearDiff = b.end.year - a.end.year;
    if (yearDiff != 0) {
        return yearDiff;
    }

    const monthDiff = b.end.month - a.end.month;
    if (monthDiff != 0) {
        return monthDiff;
    }

    return b.end.day - a.end.day;
})

</script>


<template>
    <!-- introduction row [personal column, about me column] -->
    <div class="intro-row mb-50">
        <IntroductionComponent />
        <div class="about-me-col ml-20">
            <AboutMeComponent :aboutme="about_me" class="mb-50" />
            <!-- <CarouselComponent :title="'Skills'" :showCount="3" :maxCount="skills.length">
                <SkillComponent v-for="skill in skills" :title="skill.category" :icon="skill.icon" :skills="skill.skills" />
            </CarouselComponent> -->
        </div>
    </div>
    <div class="edu-col mb-50">
        <div class="heading mb-20">Education</div>
        <div class="edu-row">
            <EducationComponent v-for="education in educations" :education="education" :modalWidth=80 class="mb-20" />
        </div>
    </div>
</template>

<style scoped>
.intro-row {
    display: flex;
    flex-direction: row;
}

.edu-row {
    display: flex;
    flex-direction: column;
}

.about-me-col {
    height: fit-content;
}
</style>
