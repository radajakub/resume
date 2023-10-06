<script setup lang="ts">
import { Education, Work, Project, Achievement, Skill } from "@/data.ts";
import EducationComponent from "@/components/items/EducationComponent.vue";
import WorkComonent from "@/components/items/WorkComonent.vue";
import SkillComponent from "@/components/about_me/SkillComponent.vue";

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

</script>

<template>
    <div class="wrap-list">
        <div class="heading">
            {{ carouselTitle }}
        </div>
        <div class="wrap-list-body">
            <div v-if="showEducations">
                <EducationComponent v-for="(education, index) in props.educations" :key="index" :education="education" />
            </div>
            <div v-if="showWorks">
                <WorkComonent v-for="(work, index) in props.works" :key="index" :work="work" />
            </div>
            <div v-if="showSkills">
                <SkillComponent v-for="(skill, index) in props.skills" :key="index" :skill="skill" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.wrap-list-body>div {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}
</style>
