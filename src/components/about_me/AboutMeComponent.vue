<script setup lang="ts">
import MainModaledComponent from "@/components/MainModaledComponent.vue";

const props = defineProps<{
    aboutme: { [key: string]: string[] }
}>();
const paragraphs: string[] = props.aboutme.paragraphs;
</script>

<template>
    <MainModaledComponent modalTitle="About Me" :modalWidth=80>
        <template #main>
            <div class="p-10">
                <div class="title mb-10">About me</div>
                <p class="text pb-10 ">
                    {{ paragraphs[0] }}
                </p>
            </div>
        </template>
        <template #modal>
            <p v-for="(paragraph, index) in paragraphs" class="text" :key="index">
                {{ paragraph }}
            </p>
        </template>
    </MainModaledComponent>
</template>

<style scoped>
</style>
