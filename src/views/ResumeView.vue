<script setup lang="ts">
import IntroductionComponent from '@/components/intro/IntroductionComponent.vue';
</script>


<template>
    <!-- introduction row [personal column, about me column] -->
    <div class="intro-row">
        <IntroductionComponent />
        <!-- <div class="about-me-col">
            <AboutMeComponent :aboutme="about_me" />
        </div> -->
    </div>
    <!-- education row -->
    <!-- <SchoolComponent v-for="education in educations" :education="education" /> -->
</template>

<style scoped>
.intro-row {
    display: flex;
}
</style>
