<script setup lang="ts">
import SeparatorComponent from "@/components/SeparatorComponent.vue";
import LinkComponent from "@/components/LinkComponent.vue";

const props = defineProps<{ show: boolean; title: string; widthPerc?: number }>();
defineEmits<{ (e: "close"): void }>();

const actual_width = props.widthPerc ?? 80;
const actual_width_string = actual_width.toString() + "%";
const left_string = ((100 - actual_width) / 2).toString() + "%";
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="props.show" class="modal-mask">
        <div
          class="modal-container thin-border rounded-border"
          :style="{ width: actual_width_string, left: left_string }"
        >
          <div class="title center pv-10">
            {{ props.title }}
          </div>
          <SeparatorComponent :no-vertical-padding="true" />
          <div class="pv-20 modal-body">
            <slot></slot>
          </div>
          <SeparatorComponent :no-vertical-padding="true" />
          <LinkComponent @click="$emit('close')">
            <div class="center subtitle pv-5">Close</div>
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
  transition: opacity var(--modal-translation-time) ease;
}

.modal-container {
  position: fixed;
  z-index: 999;
  top: 10%;
  height: 80%;
  background-color: var(--color-background);
  box-shadow: 0 0 var(--modal-shadow-size) var(--modal-shadow-color);
  transition: all var(--modal-translation-time) ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.modal-body {
  overflow-x: hidden;
  overflow-y: scroll;
  flex: 1;
}

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(0.5);
  transform: scale(0.5);
}
</style>
