<script setup lang="ts">
import { openLink } from "@/utils.ts";
import { computed } from "vue";

const props = defineProps<{ url?: string; border?: boolean; whiteBg?: boolean }>();

const whiteBg = props.whiteBg ?? false;
var hoverBgColor = "var(--color-background-hover)";
var clickBgColor = "var(--color-border)";
var clickColor = "var(--color-background)";
if (whiteBg) {
  hoverBgColor = "var(--color-background-hover-white)";
  clickBgColor = "var(--color-background-click-white)";
  clickColor = "var(--color-text)";
}

const hasLink = computed<boolean>(() => props.url !== undefined && props.url !== "");

const onClick = () => {
  if (props.url != null) {
    openLink(props.url);
  }
};
</script>

<template>
  <div @click.stop="onClick">
    <div :class="{ border: props.border, 'hover-box': hasLink }">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.hover-box {
  display: block;
  border-radius: var(--border-radius);
  cursor: pointer;
  background-color: transparent;
}

.hover-box:hover {
  background: v-bind("hoverBgColor");
}

.hover-box:active {
  background: v-bind("clickBgColor");
  color: v-bind("clickColor");
}

.border {
  border: var(--border-thickness) solid var(--color-border);
}
</style>
