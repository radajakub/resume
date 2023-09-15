<script setup lang="ts">
const props = defineProps<{
    aboutme: { [key: string]: string[] }
}>();
const paragraphs: string[] = props.aboutme['paragraphs'];
</script>

<template>
    <div class="section-title">About Me</div>
    <div class="thin-border rounded-border text-box">
        <p v-for="paragraph in paragraphs">
            {{ paragraph }}
        </p>
    </div>
</template>

<style scoped>
.text-box {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: space-evenly;
}
</style>
