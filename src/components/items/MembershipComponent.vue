<script setup lang="ts">
import ItemComponent from "@/components/items/ItemComponent.vue";
import { Membership } from "@/data/types";

const props = defineProps<{
  membership: Membership;
  modalWidth?: number;
}>();

const membership = props.membership;
</script>

<template>
  <ItemComponent
    :top-left="membership.category"
    :title="membership.name"
    :logo-path="membership.logoPath"
    :logo-link="membership.link"
    :short-text="membership.shortDescription"
    :subtitles="[]"
    :bottom-left="membership.interval.format()"
    :bottom-right="membership.interval.length()"
    :modal-title="membership.name"
    :modal-enabled="false"
  >
    <template #modal> </template>
  </ItemComponent>
</template>

<style scoped></style>
