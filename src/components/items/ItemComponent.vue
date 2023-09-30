<script setup lang="ts">
import MainModaledComponent from '@/components/MainModaledComponent.vue';
import SeparatorComponent from '@/components/SeparatorComponent.vue';
import LinkComponent from '@/components/LinkComponent.vue';

const props = defineProps<{
    modalTitle: string,
    modalWidth: number,
    topLeft: string,
    topRight?: string,
    title: string,
    subtitles: string[],
    logoPath?: string,
    logoLink?: string,
}>();

const link = '@/assets/pictures/' + props.logoPath;
console.log(link);
</script>

<template>
    <MainModaledComponent :modalTitle="props.modalTitle" :modalWidth="props.modalWidth" class="main-size">
        <template #main>
            <div class="main-col">
                <div class="header-row pv-5 ph-10">
                    <div class="text">{{ props.topLeft }}</div>
                    <div class="text">{{ props.topRight }}</div>
                </div>
                <SeparatorComponent :dotted="true" :noVerticalPadding="true" />
                <div class="main-row pv-5 ph-10">
                    <div class="title-col">
                        <div class="subsubtitle">
                            {{ props.title }}
                        </div>
                        <div class="text" v-for="subtitle in props.subtitles">
                            {{ subtitle }}
                        </div>
                    </div>
                    <div class="logo-col" v-if="props.logoPath != null">
                        <div class="logo-link">
                            <LinkComponent :url="props.logoLink">
                                <img :src="link" class="img-link p-10">
                            </LinkComponent>
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <template #modal></template>
    </MainModaledComponent>
</template>

<style scoped>
.main-size {
    width: 400px;
    height: 300px;
}

.header-row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.main-row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.img-link {
    width: 40px;
    height: 40px;
}
</style>
