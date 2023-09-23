<script setup lang="ts">
import ShadowComponent from '@/components/ShadowComponent.vue';

const props = defineProps<{
    aboutme: { [key: string]: string[] }
}>();
const paragraphs: string[] = props.aboutme.paragraphs;
</script>

<template>
    <ShadowComponent>
        <div class="white-bg thin-border sharp-border p-10 limited">
            <div class="subtitle pb-10">About me</div>
            <div v-for="paragraph in paragraphs" class="text pb-10">
                {{ paragraph }}
            </div>
        </div>
    </ShadowComponent>
</template>

<style scoped>
.limited {
    text-overflow: ellipsis;
}
</style>
