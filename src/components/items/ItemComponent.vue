<script setup lang="ts">
import MainModaledComponent from "@/components/MainModaledComponent.vue";
import LinkComponent from "@/components/LinkComponent.vue";
import RowComponent from "@/components/items/RowComponent.vue";
import ProgressBarComponent from "@/components/ProgressBarComponent.vue";

const props = defineProps<{
  modalTitle: string;
  modalWidth?: number;
  modalEnabled?: boolean;
  topLeft?: string;
  topRight?: string;
  percentage?: number;
  title: string;
  subtitles: string[];
  shortText?: string;
  logoPath?: string;
  logoLink?: string;
  midLeft?: string;
  midRight?: string;
  bottomLeft?: string;
  bottomRight?: string;
}>();

const modalEnabled = props.modalEnabled ?? false;

const showMiddleRow = props.midLeft != null || props.midRight != null;
const showBottomRow = props.bottomLeft != null || props.bottomRight != null;

const logo = props.logoPath != null ? "/pictures/" + props.logoPath : "";
</script>

<template>
  <div class="mr-20 mb-20">
    <MainModaledComponent
      :modal-title="modalTitle"
      :modal-width="modalWidth"
      :modal-enabled="modalEnabled"
      class="sized"
    >
      <template #main>
        <div class="main-col">
          <RowComponent :bottom-separator="true" :bottom-separator-dotted="true">
            <div class="text">{{ topLeft }}</div>
            <div v-if="percentage == null" class="text">{{ topRight }}</div>
            <div v-if="percentage != null" class="progress">
              <ProgressBarComponent :percentage="percentage" />
            </div>
          </RowComponent>
          <div class="main-row">
            <div class="ph-10 pt-10 pb-5">
              <div class="subtitle-smaller">{{ title }}</div>
            </div>
            <RowComponent>
              <div class="title-col pr-20">
                <template v-if="subtitles.length > 0">
                  <div
                    v-for="(subtitle, index) in subtitles"
                    :key="index"
                    class="text"
                    :class="{ 'pb-5': index < subtitles.length - 1 }"
                  >
                    {{ subtitle }}
                  </div>
                </template>
                <template v-else>
                  <slot name="content"></slot>
                </template>
              </div>
              <div v-if="logoPath != null" class="logo-col">
                <LinkComponent :url="logoLink" :white-bg="true">
                  <img :src="logo" class="img-link p-5" />
                </LinkComponent>
              </div>
            </RowComponent>
            <div class="ph-10 pb-10 pt-5 smaller-text">
              {{ shortText }}
            </div>
          </div>
          <RowComponent v-if="showMiddleRow" :top-separator="true" :top-separator-dotted="true">
            <div class="text">{{ midLeft }}</div>
            <div class="text">{{ midRight }}</div>
          </RowComponent>
          <RowComponent v-if="showBottomRow" :top-separator="true" :top-separator-dotted="true">
            <div class="text">{{ bottomLeft }}</div>
            <div class="text">{{ bottomRight }}</div>
          </RowComponent>
        </div>
      </template>
      <template #modal>
        <slot name="modal"></slot>
      </template>
    </MainModaledComponent>
  </div>
</template>

<style scoped>
.progress {
  width: 100px;
}

.sized {
  width: 400px;
  height: 400px;
}

.main-col {
  display: flex;
  flex-direction: column;
  align-content: space-between;
  height: 100%;
}

.main-row {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.title-col {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.img-link {
  display: block;
  max-width: 80px;
  max-height: 80px;
}
</style>
