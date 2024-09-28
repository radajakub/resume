<script setup lang="ts">
import ItemComponent from "@/components/items/ItemComponent.vue";
import { Certificate } from "@/data/types";

defineProps<{
  certificate: Certificate;
  modalWidth?: number;
}>();
</script>

<template>
  <ItemComponent
    :top-left="certificate.category"
    :title="certificate.name"
    :logo-path="certificate.logoPath"
    :logo-link="certificate.link"
    :short-text="certificate.shortDescription"
    :subtitles="[]"
    :bottom-left="certificate.interval.format()"
    :bottom-right="certificate.interval.length()"
    :modal-title="certificate.name"
    :modal-enabled="false"
  >
    <template #modal> </template>

    <template #content>
      <!-- TODO add here -->
    </template>
  </ItemComponent>
</template>

<style scoped></style>
