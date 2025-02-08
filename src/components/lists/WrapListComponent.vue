<script setup lang="ts">
import { Education, Work, Project, Achievement, Skill, Publication, Membership, Certificate, Hackathon } from "@/data/types";
import EducationComponent from "@/components/items/EducationComponent.vue";
import WorkComonent from "@/components/items/WorkComonent.vue";
import SkillComponent from "@/components/about_me/SkillComponent.vue";
import ProjectComponent from "@/components/items/ProjectComponent.vue";
import AchievementsComponent from "@/components/items/AchievementsComponent.vue";
import PublicationComponent from "@/components/items/PublicationComponent.vue";
import MembershipComponent from "@/components/items/MembershipComponent.vue";
import CertificateComponent from "../items/CertificateComponent.vue";
import HackathonComponent from "../items/HackathonComponent.vue";

const props = defineProps<{
  educations?: Education[];
  works?: Work[];
  projects?: Project[];
  achievements?: Achievement[];
  skills?: Skill[];
  publications?: Publication[];
  memberships?: Membership[];
  certificates?: Certificate[];
  hackathons?: Hackathon[];
}>();

const showEducations = props.educations != null;
const showWorks = props.works != null;
const showProjects = props.projects != null;
const showAchievements = props.achievements != null;
const showSkills = props.skills != null;
const showPublications = props.publications != null;
const showMemberships = props.memberships != null;
const showCertificates = props.certificates != null;
const showHackathons = props.hackathons != null;

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
} else if (showPublications) {
  wrapListTitle = "Publications";
} else if (showMemberships) {
  wrapListTitle = "Fellowships and Societies";
} else if (showCertificates) {
  wrapListTitle = "Certificates";
} else if (showHackathons) {
  wrapListTitle = "Hackathons";
}

const allOptions = [showEducations, showWorks, showProjects, showAchievements, showSkills, showPublications, showMemberships, showCertificates, showHackathons];

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
        <AchievementsComponent v-for="(achievement, index) in props.achievements" :key="index" :achievement="achievement" />
      </div>
      <div v-if="showSkills">
        <SkillComponent v-for="(skill, index) in props.skills" :key="index" :skill="skill" />
      </div>
      <div v-if="showPublications">
        <PublicationComponent v-for="(publication, index) in props.publications" :key="index" :publication="publication" />
      </div>
      <div v-if="showMemberships">
        <MembershipComponent v-for="(membership, index) in props.memberships" :key="index" :membership="membership" />
      </div>
      <div v-if="showCertificates">
        <CertificateComponent v-for="(certificate, index) in props.certificates" :key="index" :certificate="certificate" />
      </div>
      <div v-if="showHackathons">
        <HackathonComponent v-for="(hackathon, index) in props.hackathons" :key="index" :hackathon="hackathon" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrap-list-body > div {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>
