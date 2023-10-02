<script setup lang="ts">
import MainModaledComponent from "@/components/MainModaledComponent.vue";
import LinkComponent from "@/components/LinkComponent.vue";
import RowComponent from "@/components/items/RowComponent.vue";
import { ref, watchEffect } from "vue";

const props = defineProps<{
    modalTitle: string,
    modalWidth: number,
    topLeft: string,
    topRight?: string,
    title: string,
    subtitles: string[],
    logoPath?: string,
    logoLink?: string,
    midLeft?: string,
    midRight?: string,
    bottomLeft?: string,
    bottomRight?: string,
}>();

const showMiddleRow = props.midLeft != null || props.midRight != null;
const showBottomRow = props.bottomLeft != null || props.bottomRight != null;

const logo = ref();
watchEffect(async () => {
    if (props.logoPath != null) {
        logo.value = (await import(/* @vite-ignore */ "../../assets/pictures/" + props.logoPath)).default;
    }
});

</script>

<template>
    <MainModaledComponent :modalTitle="props.modalTitle" :modalWidth="props.modalWidth" class="sized">
        <template #main>
            <div class="main-col">
                <RowComponent :bottomSeparator=true :bottomSeparatorDotted=true>
                    <div class="text">{{ props.topLeft }}</div>
                    <div class="text">{{ props.topRight }}</div>
                </RowComponent>
                <div class="main-row">
                    <div class="ph-10 pt-10 pb-5">
                        <div class="subtitle">{{ props.title }}</div>
                    </div>
                    <RowComponent :expand=true>
                        <div class="title-col pr-20">
                            <div class="text" v-for="(subtitle, index) in props.subtitles" :key="index">
                                {{ subtitle }}
                            </div>
                        </div>
                        <div class="logo-col" v-if="props.logoPath != null">
                            <LinkComponent :url="props.logoLink" :hoverColor="'var(--light-gray)'"
                                :clickColor="'var(--darker-gray)'">
                                <img :src="logo" class="img-link p-10">
                            </LinkComponent>
                        </div>
                    </RowComponent>
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
        <template #modal></template>
    </MainModaledComponent>
</template>

<style scoped>
.sized {
    width: 400px;
    height: 300px;
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
}

.title-col {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.img-link {
    max-width: 80px;
    max-height: 80px;
}
</style>
