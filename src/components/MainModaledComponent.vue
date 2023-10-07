<script setup lang="ts">
import { ref } from "vue";

import ShadowComponent from "@/components/ShadowComponent.vue";
import ModalComponent from "@/components/ModalComponent.vue";

const props = defineProps<{ modalTitle: string, modalWidth?: number, modalEnabled?: boolean }>();

const modalVisible = ref(false);
const modalEnabled = props.modalEnabled ?? true;
</script>

<template>
    <ShadowComponent>
        <div class="container white-bg thin-border sharp-border" @click="() => modalVisible = true">
            <slot name="main"></slot>
        </div>
        <ModalComponent v-if="modalEnabled" :widthPerc="props.modalWidth" :title="props.modalTitle"
            @close="modalVisible = false" :show="modalVisible">
            <slot name="modal"></slot>
        </ModalComponent>
    </ShadowComponent>
</template>

<style scoped>
.container {
    overflow: hidden;
    width: 100%;
    height: 100%;
}
</style>
