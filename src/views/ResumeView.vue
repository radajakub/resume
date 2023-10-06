<script setup lang="ts">
import { inject } from "vue";

import IntroductionComponent from "@/components/intro/IntroductionComponent.vue";
import AboutMeComponent from "@/components/about_me/AboutMeComponent.vue";
import WrapListComponent from "@/components/lists/WrapListComponent.vue";

import { Data } from "@/data.ts";

const data: Data | undefined = inject("data");
</script>


<template>
    <!-- introduction row [personal column, about me column] -->
    <div class="intro-row mb-50">
        <IntroductionComponent />
        <div class="about-me-col ml-20">
            <AboutMeComponent class="mb-50" />
        </div>
    </div>

    <div class="edu-col mb-50">
        <WrapListComponent :educations="data?.educationsSorted()" />
    </div>
</template>


<style scoped>
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
