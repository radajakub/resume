<script setup lang="ts">
import { ref } from "vue";

import ShadowComponent from "@/components/ShadowComponent.vue";
import ModalComponent from "@/components/ModalComponent.vue";

const props = defineProps<{ modalTitle: string, modalWidth?: number, modalEnabled?: boolean }>();

const modalVisible = ref(false);
const modalEnabled = props.modalEnabled ?? true;

function openModal() {
    if (modalEnabled) {
        modalVisible.value = true;
        document.body.classList.add("modal-opened");
    }
}

function closeModal() {
    if (modalEnabled) {
        modalVisible.value = false;
        document.body.classList.remove("modal-opened");
    }
}

</script>

<template>
    <ShadowComponent :clickable="modalEnabled">
        <div class="container white-bg thin-border sharp-border" @click="openModal">
            <slot name="main"></slot>
        </div>
        <ModalComponent v-if="modalEnabled" :widthPerc="props.modalWidth" :title="props.modalTitle" @close="closeModal"
            :show="modalVisible">
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
