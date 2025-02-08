<script setup lang="ts">
import { inject } from "vue";

import IntroductionComponent from "@/components/intro/IntroductionComponent.vue";
import AboutMeComponent from "@/components/about_me/AboutMeComponent.vue";
import GoalComponent from "@/components/about_me/GoalComponent.vue";
import WrapListComponent from "@/components/lists/WrapListComponent.vue";
import ScrollComponent from "@/components/scroll/ScrollComponent.vue";

import { Data, Sections } from "@/data/types";

const data: Data | undefined = inject("data");

if (data == undefined) {
  throw new Error("ResumeView: Data is undefined");
}

const sections = data.sections();
const sectionsArray = Array.from(sections.values());
</script>

<template>
  <div class="scroll-row">
    <ScrollComponent :sections="sectionsArray" />
  </div>
  <!-- introduction row [personal column, about me column] -->
  <div class="body-margin">
    <div class="intro-row mb-50">
      <div class="intro">
        <IntroductionComponent />
      </div>
      <div class="about-me-col">
        <GoalComponent v-if="sections.get(Sections.introduction)" :id="sections.get(Sections.introduction)?.linkify()" class="mb-20" />
        <AboutMeComponent v-if="sections.get(Sections.aboutme)" :id="sections.get(Sections.aboutme)?.linkify()" class="mb-20" />
        <WrapListComponent v-if="sections.get(Sections.skills)" :id="sections.get(Sections.skills)?.linkify()" :skills="data.skills" />
      </div>
    </div>

    <div v-if="sections.get(Sections.education)" class="edu-col mb-50">
      <WrapListComponent :id="sections.get(Sections.education)?.linkify()" :educations="data.educationsSorted()" />
    </div>

    <div v-if="sections.get(Sections.certificates)" class="edu-col mb-50">
      <WrapListComponent :id="sections.get(Sections.certificates)?.linkify()" :certificates="data.certificatesSorted()" />
    </div>

    <div class="membership-col mb-50">
      <WrapListComponent :id="sections.get(Sections.memberships)?.linkify()" :memberships="data.membershipsSorted()" />
    </div>

    <div class="publication-col mb-50">
      <WrapListComponent :id="sections.get(Sections.publications)?.linkify()" :publications="data.publicationsSorted()" />
    </div>

    <div class="work-col mb-50">
      <WrapListComponent :id="sections.get(Sections.work)?.linkify()" :works="data.worksSorted()" />
    </div>

    <div class="hackathon-col mb-50">
      <WrapListComponent :id="sections.get(Sections.hackathons)?.linkify()" :hackathons="data.hackathonsSorted()" />
    </div>

    <div class="project-col mb-50">
      <WrapListComponent :id="sections.get(Sections.projects)?.linkify()" :projects="data.projectsSorted()" />
    </div>

    <div class="achievement-col mb-50">
      <WrapListComponent :id="sections.get(Sections.achievements)?.linkify()" :achievements="data.achievementsSorted()" />
    </div>
  </div>
</template>

<style scoped>
.intro {
  margin-bottom: var(--spacer-size);
}

.body-margin {
  margin-left: 0px;
  margin-top: 40px;
}

.topclass {
  height: 10px;
}

.scroll-row {
  z-index: 10;
  position: fixed;
  background-color: var(--color-background);
  position: fixed;
  top: 0;
  left: 0;
  padding-top: 10px;
  padding-bottom: 10px;
  width: 100%;
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

@media screen and (max-width: 1150px) {
  .intro-row {
    flex-direction: column;
    align-items: center;
  }

  .about-me-col {
    margin-left: 0px;
  }
}
</style>
