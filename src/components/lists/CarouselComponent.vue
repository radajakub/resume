<script setup lang="ts">
import { ref } from "vue";
import { Education, Work, Project, Achievement, Skill } from "@/data.ts";

import ArrowButtonComponent from "@/components/lists/ArrowButtonComponent.vue";
import EducationComponent from "@/components/items/EducationComponent.vue";
import SkillComponent from "../about_me/SkillComponent.vue";
// import SkillComponent from "@/components/items/SkillComponent.vue";

const props = defineProps<{
    educations?: Education[],
    works?: Work[],
    projects?: Project[],
    achievements?: Achievement[],
    skills?: Skill[],
}>();

const showEducations = props.educations != null;
const showWorks = props.works != null;
const showProjects = props.projects != null;
const showAchievements = props.achievements != null;
const showSkills = props.skills != null;

var carouselTitle = "";
if (showEducations) {
    carouselTitle = "Education";
} else if (showWorks) {
    carouselTitle = "Work";
} else if (showProjects) {
    carouselTitle = "Projects";
} else if (showAchievements) {
    carouselTitle = "Achievements";
} else if (showSkills) {
    carouselTitle = "Skills";
}

const allOptions = [showEducations, showWorks, showProjects, showAchievements, showSkills];

if (allOptions.filter((x) => x == true).length != 1) {
    throw Error("Carousel: Exactly one of educations, works, projects, or achievements must be true");
}

const prevButtonActive = ref(false);
const nextButtonActive = ref(true);

// const firstIndex = ref(0);
// const lastIndex = ref();

function nextCallback(): void {
    prevButtonActive.value = true;
    nextButtonActive.value = false;
}

function prevCallback(): void {
    prevButtonActive.value = false;
    nextButtonActive.value = true;
}

</script>

<template>
    <div class="carousel">
        <div class="header-row">
            <div class="heading">
                {{ carouselTitle }}
            </div>
            <div class="buttons">
                <ArrowButtonComponent direction="left" :active="prevButtonActive" class="mr-10" @click="prevCallback" />
                <ArrowButtonComponent direction="right" :active="nextButtonActive" @click="nextCallback" />
            </div>
        </div>
        <div class="carousel-body">
            <div v-if="showEducations">
                <EducationComponent v-for="(education, index) in props.educations" :key="index" :education="education" />
            </div>
            <div v-if="showSkills">
                <SkillComponent v-for="(skill, index) in props.skills" :key="index" :skill="skill" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.buttons {
    display: flex;
    flex-direction: row;
}

.carousel-body>div {
    display: flex;
    flex-direction: row;
    overflow: hidden;
}

.header-row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center
}
</style>
