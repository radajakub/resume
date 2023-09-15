<script setup lang="ts">
import picture from '@/assets/pictures/profile_photo.jpg';
</script>

<template>
    <div class="outer-div">
        <img :src="picture" alt="Profile photo" class="circular" />
    </div>
</template>

<style scoped>
.outer-div {
    overflow: hidden;
}

.circular {
    clip-path: circle();
    width: 20rem;
}
</style>
