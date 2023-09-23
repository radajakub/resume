<script setup lang="ts">
import { ref } from 'vue';

import ShadowComponent from '@/components/ShadowComponent.vue';
import ModalComponent from '../ModalComponent.vue';

const props = defineProps<{
    aboutme: { [key: string]: string[] }
}>();
const paragraphs: string[] = props.aboutme.paragraphs;

const modalVisible = ref(false);
</script>

<template>
    <ShadowComponent>
        <div class="white-bg thin-border sharp-border p-10 limited" @click="() => modalVisible = true">
            <div class="subtitle pb-10">About me</div>
            <div v-for="paragraph in paragraphs" class="text pb-10">
                {{ paragraph }}
            </div>
        </div>
        <ModalComponent :widthPerc=80 title="About me" @close="modalVisible = false" :show="modalVisible">
            <div v-for="paragraph in paragraphs" class="text pb-10">
                {{ paragraph }}
            </div>
        </ModalComponent>
    </ShadowComponent>
</template>

<style scoped>
.limited {
    text-overflow: ellipsis;
}
</style>
