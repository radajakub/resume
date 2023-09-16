<script setup lang="ts">
const props = defineProps<{ link: string, icon: string }>();
</script>

<template>
    <div class="row">
        <div class="pr-20 text icon"><font-awesome-icon :icon="icon" class="" /></div>
        <div class="text">{{ props.link }}</div>
    </div>
</template>

<style scoped>
.icon {
    width: 10%;
    text-align: center;
}

.row {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    width: 100%;
}
</style>
