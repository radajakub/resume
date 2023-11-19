<script setup lang="ts">
import { inject } from "vue";

import IntroductionComponent from "@/components/intro/IntroductionComponent.vue";
import AboutMeComponent from "@/components/about_me/AboutMeComponent.vue";
import WrapListComponent from "@/components/lists/WrapListComponent.vue";
import ScrollComponent from "@/components/scroll/ScrollComponent.vue";

import { Data } from "@/data.ts";

const data: Data | undefined = inject("data");

const sections = [
    "About me", "Skills", "Education", "Work", "Projects", "Achievements"
];
</script>


<template>
    <div class="scroll-col">
        <ScrollComponent :labels="sections" />
    </div>
    <!-- introduction row [personal column, about me column] -->
    <div class="body-margin">
        <div class="intro-row mb-50">
            <div class="intro">
                <IntroductionComponent id="introduction" />
            </div>
            <div class="about-me-col">
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
.body-margin {
    margin-left: 50px;
    z-index: 0;
}

.scroll-col {
    z-index: 10;
    position: fixed;
    left: var(--spacer-size);
    top: var(--base-padding-vertical);
}

.intro-row {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
}

.about-me-col {
    height: fit-content;
    width: 100%;
    margin-left: var(--spacer-size);
}

@media screen and (max-width: 1100px) {
    .intro-row {
        flex-direction: column;
        align-items: center;
    }

    .about-me-col {
        margin-left: 0px;
    }

    .intro {
        margin-bottom: var(--spacer-size);
    }

    .body-margin {
        margin-left: 0px;
        margin-top: 50px;
    }

    .scroll-col {
        background-color: var(--color-background);
        position: fixed;
        top: 0;
        padding-top: 10px;
        padding-bottom: 10px;
        width: 100%;
    }
}
</style>
