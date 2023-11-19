<script setup lang="ts">
const props = defineProps<{ showBorder: boolean }>();

function showCV() {
    window.open("resume.pdf", "_blank");
}
</script>

<template>
    <div class="wrapper" @click="showCV()">
        <div class="avatar" :class="{ bordered: props.showBorder }"></div>
        <div class="title inner">Print Resumé</div>
    </div>
</template>

<style scoped>
.wrapper {
    position: relative;
    width: var(--profile-picture-size);
    height: var(--profile-picture-size);
    cursor: pointer;
}

.avatar {
    position: absolute;
    z-index: 1;
    width: var(--profile-picture-size);
    height: var(--profile-picture-size);
    background-image: url("/pictures/profile_photo.jpg");
    background-size: cover;
    background-position: center;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    display: flex;
}

.inner {
    position: absolute;
    z-index: 2;
    text-align: center;
    top: 50%;
    transform: translateY(-50%);
    vertical-align: middle;
    visibility: hidden;
}

.wrapper:hover>.avatar {
    opacity: 0.5;
}

.wrapper:hover>.inner {
    visibility: visible;
}

.bordered {
    border: var(--profile-picture-border-thickness) solid var(--profile-picture-border-color);
}
</style>
