<script setup lang="ts">
import { computeAge, formatDate, profilePictureShowBorder, introComponentDottedSeparator } from '@/utils.ts';

import BadgeComponent from '@/components/BadgeComponent.vue';
import ProfilePictureComponent from '@/components/intro/ProfilePictureComponent.vue';
import SeparatorComponent from '@/components/SeparatorComponent.vue';
import InfoComponent from '@/components/intro/InfoComponent.vue';

import personal from '@/assets/data/me/personal.json';

const _dob = personal.date_of_birth;
const dateOfBirth = new Date(_dob.year, _dob.month, _dob.day)
const age = `${computeAge(dateOfBirth)}`;
const dateOfBirthFormatted = formatDate(dateOfBirth);

const location = personal.location;
var locationFormatted = `${location.city}, ${location.country}`;
// TODO: add flexible location
// if (location.flexible) {
//     locationFormatted += ' (flexible)';
// }

const contacts = personal.contacts;
const filteredContacts = contacts.filter((contact) => contact.use);

</script>

<template>
    <div class="thin-border rounded-border pv-20 frame">
        <!-- photo and name section -->
        <div class="pb-10 center-self">
            <ProfilePictureComponent :show-border="profilePictureShowBorder" />
        </div>
        <div class="center title ph-20">{{ personal.first_name }} {{ personal.last_name }}</div>
        <div class="ph-20">
            <BadgeComponent v-for="title in personal.titles" class="text">{{ title }}</BadgeComponent>
        </div>
        <div class="pv-10">
            <SeparatorComponent :dotted="introComponentDottedSeparator" />
        </div>
        <!-- personal information section -->
        <div class="ph-20">
            <InfoComponent :icon="personal.date_of_birth.icon" :heading="personal.date_of_birth.name"
                :value="dateOfBirthFormatted" />
            <InfoComponent :icon="personal.age.icon" :heading="personal.age.name" :value="age" />
            <InfoComponent :icon="personal.location.icon" :heading="personal.location.name" :value="locationFormatted" />
        </div>
        <div class="pv-10">
            <SeparatorComponent :dotted="introComponentDottedSeparator" />
        </div>
        <div class="ph-20">
            <InfoComponent v-for="contact in filteredContacts" :url="contact.link" :icon="contact.icon"
                :heading="contact.service" :value="contact.username" />
        </div>
        <!-- contacts information section -->
    </div>
</template>

<style scoped>
.frame {
    width: var(--intro-width);
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: start;
}
</style>
