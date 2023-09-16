<script setup lang="ts">
const props = defineProps<{ name: string, value: string }>();
</script>

<template>
    <div class="row">
        <div class="col text bold">
            {{ props.name }}
        </div>
        <div class="col text">
            {{ props.value }}
        </div>
    </div>
</template>

<style scoped>
.row {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-between;
}

.col {
    width: 50%;
    vertical-align: middle;
}
</style>
