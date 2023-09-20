<script setup lang="ts">
import LinkComponent from '@/components/LinkComponent.vue';

const props = defineProps<{ icon: string, heading: string, value: string, url?: string, border?: boolean }>();

// const targetLink = ;
</script>

<template>
    <LinkComponent :url="props.url != null ? props.url : '#'" :border="border">
        <div class="row pv-5">
            <div class="icon">
                <font-awesome-icon :icon="props.icon" />
            </div>
            <div class="column">
                <div class="heading">
                    {{ props.heading }}
                </div>
                <div class="value">
                    {{ props.value }}
                </div>
            </div>
        </div>
    </LinkComponent>
</template>

<style scoped>
.row {
    display: flex;
    flex-direction: row;
    height: fit-content
}

.icon {
    margin: auto 10px;
    height: 100%;
    width: 20px;
}

.column {
    display: flex;
    flex-direction: column;
    line-height: 1;
    margin: auto 0;
}

.heading {
    font-size: 15px;
    font-weight: normal;
    color: var(--color-text-light);
}

.value {
    font-size: 20px;
    font-weight: bold;
    color: var(--color-text);
}
</style>
