<script setup lang="ts">
import { profilePictureShowBorder, introComponentDottedSeparator } from "@/utils.ts";

import BadgeComponent from "@/components/BadgeComponent.vue";
import ProfilePictureComponent from "@/components/intro/ProfilePictureComponent.vue";
import SeparatorComponent from "@/components/SeparatorComponent.vue";
import InfoComponent from "@/components/intro/InfoComponent.vue";
import { ContactType, Data } from "@/data/types";
import { inject } from "vue";

const data: Data | undefined = inject("data");

const filteredContacts = [...(data?.contacts.values() ?? [])].filter((contact) => contact.use && contact.type !== ContactType.web);
</script>

<template>
  <div class="wrapper">
    <div class="thin-border rounded-border pv-20 frame">
      <!-- photo and name section -->
      <div class="pb-10 center-self">
        <ProfilePictureComponent :show-border="profilePictureShowBorder" />
      </div>
      <div class="center heading ph-20">{{ data?.firstName }} {{ data?.lastName }}</div>
      <div class="ph-20">
        <BadgeComponent v-for="(title, index) in data?.titles" :key="index" class="text">{{ title }} </BadgeComponent>
      </div>
      <div class="pv-10">
        <SeparatorComponent :dotted="introComponentDottedSeparator" />
      </div>
      <!-- personal information section -->
      <div class="ph-20">
        <InfoComponent :icon="data?.dateOfBirth.icon!" :heading="data?.dateOfBirth.name!" :value="data?.dateOfBirth.date.format()!" />
        <InfoComponent :icon="data?.age.icon!" :heading="data?.age.name!" :value="data?.dateOfBirth.date.computeAge().toString()!" />
        <InfoComponent :icon="data?.location.icon!" :heading="data?.location.name!" :value="data?.location.format()!" badge="FLEXIBLE" />
      </div>
      <div class="pv-10">
        <SeparatorComponent :dotted="introComponentDottedSeparator" />
      </div>
      <div class="ph-20">
        <InfoComponent
          v-for="(contact, index) in filteredContacts"
          :key="index"
          :url="contact.link"
          :icon="contact.icon"
          :heading="contact.name"
          :value="contact.username"
        />
      </div>
      <!-- contacts information section -->
    </div>
  </div>
</template>

<style scoped>
.frame {
  width: var(--intro-width);
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: start;
  height: fit-content;
}
</style>
