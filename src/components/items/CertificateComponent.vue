<script setup lang="ts">
import ItemComponent from "@/components/items/ItemComponent.vue";
import { Certificate, TestSection } from "@/data/types";
import TestSectionComponent from "./TestSectionComponent.vue";

const props = defineProps<{
  certificate: Certificate;
  modalWidth?: number;
}>();

const totalSection: TestSection = {
  name: "Total",
  points: props.certificate.testSections.map((section) => section.points).reduce((a, b) => a + b, 0),
  maxPoints: props.certificate.testSections.map((section) => section.maxPoints).reduce((a, b) => a + b, 0),
};

const cols = 2;
const grid: TestSection[][] = [];
for (let i = 0; i < props.certificate.testSections.length; i += cols) {
  grid.push(props.certificate.testSections.slice(i, i + cols));
}
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

    <template v-if="props.certificate.testSections.length" #content>
      <div class="row">
        <div v-for="(row, rowIndex) of grid" :key="rowIndex" :class="{ 'margin-right': rowIndex < grid.length - 1 }">
          <TestSectionComponent
            v-for="(section, sectionIndex) of row"
            :key="section.name"
            :section="section"
            :class="{ 'margin-bottom': sectionIndex < row.length - 1 }"
          />
        </div>
      </div>
      <div class="total">
        <TestSectionComponent :section="totalSection" />
      </div>
    </template>
  </ItemComponent>
</template>

<style scoped lang="css">
.row {
  display: flex;
  flex-direction: row;
}

.margin-bottom {
  margin-bottom: 20px;
}

.margin-right {
  margin-right: 20px;
}

.col {
  display: flex;
  flex-direction: column;
}

.total {
  margin-top: 30px;
}
</style>
