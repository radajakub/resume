<script setup lang="ts">
import ItemComponent from "@/components/items/ItemComponent.vue";
import { Publication } from "@/data.ts";

const props = defineProps<{
    publication: Publication,
    modalWidth?: number,
}>();

const publication = props.publication;

</script>

<template>
    <ItemComponent :topLeft="publication.getCategoryString()" :title="publication.title" :logoPath="publication.logoPath"
        :logo-link="publication.link" :subtitles="[]" :short-text="publication.shortDescription"
        :bottom-left="publication.date.format(false)" :bottom-right="publication.publisher" :modalTitle="publication.title"
        :modalWidth="props.modalWidth">
        <template #modal>
        </template>
    </ItemComponent>
</template>

<style scoped>
</style>
