<script setup lang="ts">
import LinkComponent from "@/components/LinkComponent.vue";

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
                <div class="light-text light-color">
                    {{ props.heading }}
                </div>
                <div class="subsubtitle value-color">
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
    font-size: 20px;
    margin: auto 20px auto 10px;
    height: 100%;
    width: 20px;
    text-align: center;
}

.column {
    display: flex;
    flex-direction: column;
    line-height: 1.2;
    margin: auto 0;
}

.light-color {
    color: var(--color-text-light);
}

.value-color {
    color: var(--color-text);
}
</style>
