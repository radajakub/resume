<script setup lang="ts">
import MainModaledComponent from "@/components/MainModaledComponent.vue";
import { Data } from "@/data.ts";
import { inject } from "vue";

const data: Data | undefined = inject("data");
</script>

<template>
    <MainModaledComponent modalTitle="About Me" :modalWidth=80 :modalEnabled="true">
        <template #main>
            <div class="p-10">
                <div class="title mb-10">About me</div>
                <p class="text pb-10 ">
                    {{ data?.aboutMe[0] }}
                </p>
                <div class="text">
                    Click for more...
                </div>
            </div>
        </template>
        <template #modal>
            <div class="ph-20">
                <p v-for="(paragraph, index) in data?.aboutMe" class="text" :key="index">
                    {{ paragraph }}
                </p>
            </div>
        </template>
    </MainModaledComponent>
</template>

<style scoped>
</style>
