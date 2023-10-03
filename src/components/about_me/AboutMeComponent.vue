<script setup lang="ts">
import MainModaledComponent from "@/components/MainModaledComponent.vue";
import { Data } from "@/data.ts";
import { inject } from "vue";

const data: Data | undefined = inject("data");
</script>

<template>
    <MainModaledComponent modalTitle="About Me" :modalWidth=80>
        <template #main>
            <div class="p-10">
                <div class="title mb-10">About me</div>
                <p class="text pb-10 ">
                    {{ data?.aboutMe[0] }}
                </p>
            </div>
        </template>
        <template #modal>
            <p v-for="(paragraph, index) in data?.aboutMe" class="text" :key="index">
                {{ paragraph }}
            </p>
        </template>
    </MainModaledComponent>
</template>

<style scoped>
</style>
