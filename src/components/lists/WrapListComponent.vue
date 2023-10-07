<script setup lang="ts">
import { Education, Work, Project, Achievement, Skill } from "@/data.ts";
import EducationComponent from "@/components/items/EducationComponent.vue";
import WorkComonent from "@/components/items/WorkComonent.vue";
import SkillComponent from "@/components/about_me/SkillComponent.vue";
import ProjectComponent from "@/components/items/ProjectComponent.vue";
import AchievementsComponent from "@/components/items/AchievementsComponent.vue";

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

var wrapListTitle = "";
if (showEducations) {
    wrapListTitle = "Education";
} else if (showWorks) {
    wrapListTitle = "Work";
} else if (showProjects) {
    wrapListTitle = "Projects";
} else if (showAchievements) {
    wrapListTitle = "Achievements";
} else if (showSkills) {
    wrapListTitle = "Skills";
}

const allOptions = [showEducations, showWorks, showProjects, showAchievements, showSkills];

if (allOptions.filter((x) => x == true).length != 1) {
    throw Error("Wrap List: Exactly one of educations, works, projects, or achievements must be true");
}

</script>

<template>
    <div class="wrap-list">
        <div class="heading">
            {{ wrapListTitle }}
        </div>
        <div class="wrap-list-body">
            <div v-if="showEducations">
                <EducationComponent v-for="(education, index) in props.educations" :key="index" :education="education" />
            </div>
            <div v-if="showWorks">
                <WorkComonent v-for="(work, index) in props.works" :key="index" :work="work" />
            </div>
            <div v-if="showProjects">
                <ProjectComponent v-for="(project, index) in props.projects" :key="index" :project="project" />
            </div>
            <div v-if="showAchievements">
                <AchievementsComponent v-for="(achievement, index) in props.achievements" :key="index"
                    :achievement="achievement" />
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
