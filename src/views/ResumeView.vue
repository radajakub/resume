<script setup lang="ts">
import { inject } from "vue";

import IntroductionComponent from "@/components/intro/IntroductionComponent.vue";
import AboutMeComponent from "@/components/about_me/AboutMeComponent.vue";
import CarouselComponent from "@/components/carousel/CarouselComponent.vue";
import EducationComponent from "@/components/items/EducationComponent.vue";

import { Data } from "@/data.ts";

const data: Data | undefined = inject("data");
</script>


<template>
    <!-- introduction row [personal column, about me column] -->
    <div class="intro-row mb-50">
        <IntroductionComponent />
        <div class="about-me-col ml-20">
            <AboutMeComponent class="mb-50" />
            <div class="carousel-col mb-50">
                <CarouselComponent title="Carousel"></CarouselComponent>
            </div>
            <!-- <CarouselComponent :title="'Skills'" :showCount="3" :maxCount="skills.length">
                <SkillComponent v-for="skill in skills" :title="skill.category" :icon="skill.icon" :skills="skill.skills" />
            </CarouselComponent> -->
        </div>
    </div>

    <div class="edu-col mb-50">
        <div class="heading mb-20">Education</div>
        <div class="edu-row">
            <EducationComponent v-for="(education, index) in data?.educationsSorted()" :key="index" :education="education"
                :modalWidth=80 class="mb-20" />
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
