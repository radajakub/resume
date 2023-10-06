<script setup lang="ts">
const props = defineProps<{ showBorder: boolean }>();
</script>

<template>
    <div class="avatar" :class="{ bordered: props.showBorder }"></div>
</template>

<style scoped>
.avatar {
    background-image: url("/pictures/profile_photo.jpg");
    width: var(--profile-picture-size);
    height: var(--profile-picture-size);
    background-size: cover;
    background-position: center;
    border-radius: 50%;
    border: none;
}

.bordered {
    border: var(--profile-picture-border-thickness) solid var(--profile-picture-border-color);
}
</style>
