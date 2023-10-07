<script setup lang="ts">
import SeparatorComponent from "@/components/SeparatorComponent.vue";
import { Skill } from "@/data.ts";

const props = defineProps<{ skill: Skill }>();
</script>

<template>
    <div class="skill sharp-border thin-border white-bg mr-10 mb-10">
        <div class="header-line subtitle center p-10">
            <div class="mr-10 header-icon">
                <font-awesome-icon :icon="props.skill.icon" />
            </div>
            <div class="header-title">
                {{ props.skill.name }}
            </div>
        </div>
        <SeparatorComponent no-vertical-padding />
        <div class="skill-list m-10">
            <div v-for="(skill, index) in props.skill.skills" :key="index" class="subsubtitle bold ph-10"> {{ skill }}</div>
        </div>
    </div>
</template>

<style scoped>
.header-line {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-between;
    text-align: right;
}

.skill-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    align-content: center;
    line-height: 1.5;
    height: 100%;
    overflow: scroll;
}

.skill {
    display: flex;
    flex-direction: column;
    width: 280px;
    height: 200px;
}
</style>
