<script setup lang="ts">
import { inject } from "vue";

import IntroductionComponent from "@/components/intro/IntroductionComponent.vue";
import AboutMeComponent from "@/components/about_me/AboutMeComponent.vue";
import GoalComponent from "@/components/about_me/GoalComponent.vue";
import WrapListComponent from "@/components/lists/WrapListComponent.vue";
import ScrollComponent from "@/components/scroll/ScrollComponent.vue";

import { Data, Sections } from "@/data.ts";

const data: Data | undefined = inject("data");

if (data == undefined) {
    throw new Error("ResumeView: Data is undefined");
}

const sections = data.sections();
const sectionsArray = Array.from(sections.values());

</script>


<template>
    <div class="scroll-col">
        <ScrollComponent :sections="sectionsArray" />
    </div>
    <!-- introduction row [personal column, about me column] -->
    <div class="body-margin">
        <div class="intro-row mb-50">
            <div class="intro">
                <IntroductionComponent />
            </div>
            <div class="about-me-col">
                <GoalComponent v-if="sections.get(Sections.introduction)"
                    :id="sections.get(Sections.introduction)?.linkify()" class="mb-20" />
                <AboutMeComponent v-if="sections.get(Sections.aboutme)" :id="sections.get(Sections.aboutme)?.linkify()"
                    class="mb-20" />
                <WrapListComponent v-if="sections.get(Sections.skills)" :id="sections.get(Sections.skills)?.linkify()"
                    :skills="data.skills" />
            </div>
        </div>

        <div class="edu-col mb-50" v-if="sections.get(Sections.education)">
            <WrapListComponent :id="sections.get(Sections.education)?.linkify()" :educations="data.educationsSorted()" />
        </div>

        <div class="work-col mb-50">
            <WrapListComponent id="work" :works="data.worksSorted()" />
        </div>

        <div class="project-col mb-50">
            <WrapListComponent id="projects" :projects="data.projectsSorted()" />
        </div>

        <div class="project-col mb-50">
            <WrapListComponent id="achievements" :achievements="data.achievementsSorted()" />
        </div>

        <div class="project-col mb-50">
            <WrapListComponent id="publications" :publications="data.publicationsSorted()" />
        </div>
    </div>
</template>


<style scoped>
.body-margin {
    margin-left: 50px;
    z-index: 0;
}

.topclass {
    height: 10px;
}

.scroll-col {
    z-index: 10;
    position: fixed;
    left: var(--spacer-size);
    top: var(--spacer-size);
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

@media screen and (max-height: 650px) {
    .intro {
        margin-bottom: var(--spacer-size);
    }

    .body-margin {
        margin-left: 0px;
        margin-top: 40px;
    }

    .scroll-col {
        background-color: var(--color-background);
        position: fixed;
        top: 0;
        left: 0;
        padding-top: 10px;
        padding-bottom: 10px;
        width: 100%;
    }
}

@media screen and (max-width: 1150px) {
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
        margin-top: 40px;
    }

    .scroll-col {
        background-color: var(--color-background);
        position: fixed;
        top: 0;
        left: 0;
        padding-top: 10px;
        padding-bottom: 10px;
        width: 100%;
    }
}
</style>
