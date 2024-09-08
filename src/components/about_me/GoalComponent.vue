<script setup lang="ts">
import MainModaledComponent from "@/components/MainModaledComponent.vue";
import { Data } from "@/data/types";
import { inject } from "vue";

const data: Data | undefined = inject("data");
</script>

<template>
  <MainModaledComponent modal-title="Goals" :modal-width="80" :modal-enabled="false">
    <template #main>
      <div class="p-10 bold-text">
        {{ data?.goals }}
      </div>
    </template>
    <template #modal>
      <div class="ph-20"></div>
    </template>
  </MainModaledComponent>
</template>

<style scoped></style>
