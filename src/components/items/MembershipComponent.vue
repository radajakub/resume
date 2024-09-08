<script setup lang="ts">
import ItemComponent from "@/components/items/ItemComponent.vue";
import { Membership } from "@/data/types";

const props = defineProps<{
  membership: Membership;
  modalWidth?: number;
}>();

const membership = props.membership;

const subtitles: string[] = [];
</script>

<template>
  <ItemComponent
    :top-left="membership.category"
    :title="membership.name"
    :logo-path="membership.logoPath"
    :logo-link="membership.link"
    :subtitles="subtitles"
    :short-text="membership.shortDescription"
    :bottom-left="membership.date.format()"
    :bottom-right="membership.validity"
    :modal-title="membership.name"
    :modal-enabled="false"
  >
    <template #modal> </template>
  </ItemComponent>
</template>

<style scoped></style>
