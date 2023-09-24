<script setup lang="ts">
import { ref } from 'vue';

import ShadowComponent from '@/components/ShadowComponent.vue';
import ModalComponent from '@/components/ModalComponent.vue';

const props = defineProps<{
    aboutme: { [key: string]: string[] }
}>();
const paragraphs: string[] = props.aboutme.paragraphs;

const modalVisible = ref(false);
</script>

<template>
    <ShadowComponent>
        <div class="container white-bg thin-border sharp-border" @click="() => modalVisible = true">
            <div class="p-10">
                <div class="subtitle mb-10">About me</div>
                <p v-for="paragraph in paragraphs" class="text pb-10 limited">
                    {{ paragraph }}
                </p>
            </div>
        </div>
        <ModalComponent :widthPerc=80 title="About me" @close="modalVisible = false" :show="modalVisible">
            <p v-for="paragraph in paragraphs" class="text">
                {{ paragraph }}
            </p>
        </ModalComponent>
    </ShadowComponent>
</template>

<style scoped>
.container {
    overflow: hidden;
    width: 100%;
    height: 100%;
}

.limited {
    overflow: hidden;
}
</style>
