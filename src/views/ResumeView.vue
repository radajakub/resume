<script setup lang="ts">
import { inject } from "vue";

import IntroductionComponent from "@/components/intro/IntroductionComponent.vue";
import AboutMeComponent from "@/components/about_me/AboutMeComponent.vue";
import WrapListComponent from "@/components/lists/WrapListComponent.vue";
import ScrollComponent from "@/components/scroll/ScrollComponent.vue";

import { Data } from "@/data.ts";

const data: Data | undefined = inject("data");

const sections = [
    "Introduction", "Skills", "Education", "Work", "Projects", "Achievements"
];
</script>


<template>
    <div class="scroll-col">
        <ScrollComponent :labels="sections" />
    </div>
    <!-- introduction row [personal column, about me column] -->
    <div class="ml-50">
        <div class="intro-row mb-50">
            <IntroductionComponent id="introduction" />
            <div class="about-me-col ml-20">
                <AboutMeComponent id="aboutme" class="mb-20" />
                <WrapListComponent id="skills" :skills="data?.skills" />
            </div>
        </div>

        <div class="edu-col mb-50">
            <WrapListComponent id="education" :educations="data?.educationsSorted()" />
        </div>

        <div class="work-col mb-50">
            <WrapListComponent id="work" :works="data?.worksSorted()" />
        </div>

        <div class="project-col mb-50">
            <WrapListComponent id="projects" :projects="data?.projectsSorted()" />
        </div>

        <div class="project-col mb-50">
            <WrapListComponent id="achievements" :achievements="data?.achievementsSorted()" />
        </div>
    </div>
</template>


<style scoped>
.scroll-col {
    position: fixed;
    left: 20px;
    top: var(--base-padding-vertical);
}

.intro-row {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
}

.about-me-col {
    height: fit-content;
    width: 100%;
}
</style>
