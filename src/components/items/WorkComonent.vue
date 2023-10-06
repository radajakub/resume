<script setup lang="ts">
import ItemComponent from "@/components/items/ItemComponent.vue";
import { Work } from "@/data.ts";

const props = defineProps<{
    work: Work,
    modalWidth?: number,
}>();

const work = props.work;

const subtitles: string[] = [];
subtitles.push(work.field);

</script>

<template>
    <ItemComponent :topLeft="work.companyName" :topRight="work.mode" :title="work.title" :logoPath="work.logoPath"
        :logo-link="work.logoLink" :subtitles="subtitles" :short-text="work.shortDescription"
        :midLeft="work.programmingLanguages.splice(0, 2).join(',')" :bottomLeft="work.interval.yearRange()"
        :modalTitle="work.title" :modalWidth="props.modalWidth">
        <template #modal>
        </template>
    </ItemComponent>
</template>

<style scoped>
</style>
