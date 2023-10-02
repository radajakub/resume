<script setup lang="ts">
import SeparatorComponent from "@/components/SeparatorComponent.vue";

const props = defineProps<{ title: string, icon: string, skills: string[] }>();
</script>

<template>
    <div class="skill sharp-border thin-border">
        <div class="header-line subsubtitle center p-10">
            <div class="mr-10 header-icon">
                <font-awesome-icon :icon="props.icon" />
            </div>
            <div class="header-title">
                {{ props.title }}
            </div>
        </div>
        <SeparatorComponent no-vertical-padding />
        <div class="skill-list p-10">
            <div v-for="(skill, index) in props.skills" :key="index" class="text bold"> {{ skill }}</div>
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
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: flex-start;
    line-height: 1.5;
}

.skill {
    display: flex;
    flex-direction: column;
    width: 250px;
    height: 100%;
}
</style>
