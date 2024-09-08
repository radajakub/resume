<script setup lang="ts">
import ItemComponent from "@/components/items/ItemComponent.vue";
import { Publication } from "@/data/types";

const props = defineProps<{
  publication: Publication;
  modalWidth?: number;
}>();

const publication = props.publication;
</script>

<template>
  <ItemComponent
    :top-left="publication.getCategoryString()"
    :title="publication.title"
    :logo-path="publication.logoPath"
    :logo-link="publication.link"
    :subtitles="[]"
    :short-text="publication.shortDescription"
    :bottom-left="publication.date.format(false)"
    :bottom-right="publication.publisher"
    :modal-title="publication.title"
    :modal-width="modalWidth"
  >
    <template #modal> </template>
  </ItemComponent>
</template>

<style scoped></style>
