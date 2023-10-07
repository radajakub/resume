<script setup lang="ts">
import MainModaledComponent from "@/components/MainModaledComponent.vue";
import LinkComponent from "@/components/LinkComponent.vue";
import RowComponent from "@/components/items/RowComponent.vue";
import ProgressBarComponent from "../ProgressBarComponent.vue";

const props = defineProps<{
    modalTitle: string,
    modalWidth?: number,
    topLeft?: string,
    topRight?: string,
    percentage?: number,
    title: string,
    subtitles: string[],
    shortText?: string,
    logoPath?: string,
    logoLink?: string,
    midLeft?: string,
    midRight?: string,
    bottomLeft?: string,
    bottomRight?: string,
}>();

const showMiddleRow = props.midLeft != null || props.midRight != null;
const showBottomRow = props.bottomLeft != null || props.bottomRight != null;


const logo = props.logoPath != null ? "/pictures/" + props.logoPath : "";
</script>

<template>
    <div class="mr-10 mb-10">
        <MainModaledComponent :modalTitle="props.modalTitle" :modalWidth="props.modalWidth" class="sized">
            <template #main>
                <div class="main-col">
                    <RowComponent :bottomSeparator=true :bottomSeparatorDotted=true>
                        <div class="text">{{ props.topLeft }}</div>
                        <div v-if="props.percentage == null" class="text">{{ props.topRight }}</div>
                        <div v-if="props.percentage != null" class="progress">
                            <ProgressBarComponent :percentage="props.percentage" />
                        </div>
                    </RowComponent>
                    <div class="main-row">
                        <div class="ph-10 pt-10 pb-5">
                            <div class="subtitle">{{ props.title }}</div>
                        </div>
                        <RowComponent>
                            <div class="title-col pr-20">
                                <div class="text" v-for="(subtitle, index) in props.subtitles" :key="index"
                                    :class="{ 'pb-5': index < props.subtitles.length - 1 }">
                                    {{ subtitle }}
                                </div>
                            </div>
                            <div class="logo-col" v-if="props.logoPath != null">
                                <LinkComponent :url="props.logoLink" :white-bg=true>
                                    <img :src="logo" class="img-link p-5">
                                </LinkComponent>
                            </div>
                        </RowComponent>
                        <div class="ph-10 pb-10 pt-5">
                            {{ props.shortText }}
                        </div>
                    </div>
                    <RowComponent :topSeparator=true :topSeparatorDotted=true v-if="showMiddleRow">
                        <div class="text">{{ props.midLeft }}</div>
                        <div class="text">{{ props.midRight }}</div>
                    </RowComponent>
                    <RowComponent :topSeparator=true :topSeparatorDotted=true v-if="showBottomRow">
                        <div class="text">{{ props.bottomLeft }}</div>
                        <div class="text">{{ props.bottomRight }}</div>
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
    height: 350px;
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
