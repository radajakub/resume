<script setup lang="ts">
import IntroductionComponent from '@/components/intro/IntroductionComponent.vue';
import AboutMeComponent from '@/components/about_me/AboutMeComponent.vue';
import personal_info from '@/assets/data/me/personal.json';

const about_me = personal_info.aboutme;
</script>


<template>
    <!-- introduction row [personal column, about me column] -->
    <div class="intro-row">
        <IntroductionComponent />
        <div class="about-me-col">
            <AboutMeComponent :aboutme="about_me" />
        </div>
    </div>
    <!-- education row -->
</template>

<style scoped>
.intro-row {
    display: flex;
    flex-direction: row;
}

.about-me-col {
    margin-left: 50px;
}
</style>
