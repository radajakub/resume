<script setup lang="ts">
import ItemComponent from "@/components/items/ItemComponent.vue";
import { Achievement } from "@/data.ts";

const props = defineProps<{
    achievement: Achievement,
    modalWidth?: number,
}>();

const achievement = props.achievement;

const subtitles: string[] = [];
subtitles.push(achievement.achievement);

</script>

<template>
    <ItemComponent :topLeft="achievement.category" :title="achievement.name" :logoPath="achievement.logoPath"
        :logo-link="achievement.link" :subtitles="subtitles" :short-text="achievement.shortDescription"
        :bottomLeft="achievement.interval.yearRange()" :bottom-right="achievement.awardingInstitution"
        :modalTitle="achievement.name" :modalWidth="props.modalWidth">
        <template #modal>
        </template>
    </ItemComponent>
</template>

<style scoped>
</style>
