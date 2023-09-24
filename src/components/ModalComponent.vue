<script setup lang="ts">
import SeparatorComponent from '@/components/SeparatorComponent.vue';
import LinkComponent from '@/components/LinkComponent.vue';

const props = defineProps<{ show: boolean, title: string, widthPerc?: number }>();
const emit = defineEmits<{ (e: 'close'): void }>();

const actual_width = (props.widthPerc ?? 60);
const actual_width_string = actual_width.toString() + "%";
const left_string = ((100 - actual_width) / 2).toString() + "%";
</script>

<template>
    <Teleport to="body">
        <Transition name="modal">
            <div v-if="props.show" class="modal-mask">
                <div class="modal thin-border rounded-border" :style="{ width: actual_width_string, left: left_string }">
                    <div class="subtitle center pv-10">
                        {{ props.title }}
                    </div>
                    <SeparatorComponent />
                    <div class="p-20">
                        <slot></slot>
                    </div>
                    <SeparatorComponent />
                    <LinkComponent @click="$emit('close')">
                        <div class="center subsubtitle pv-5">
                            Close
                        </div>
                    </LinkComponent>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<style scoped>
.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--modal-transparency-color);
    display: flex;
    transition: opacity var(--modal-translation-time) ease;
}

.modal {
    position: fixed;
    z-index: 999;
    top: 20%;
    background-color: var(--color-background-modal);
    box-shadow: 0 0 var(--modal-shadow-size) var(--modal-shadow-color);
    transition: all var(--modal-translation-time) ease;
}

.modal-body {}

.modal-enter-from {
    opacity: 0;
}

.modal-leave-to {
    opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
    -webkit-transform: scale(2);
    transform: scale(2);
}
</style>