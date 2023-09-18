<script setup lang="ts">
import ProfilePictureComponent from '@/components/intro/ProfilePictureComponent.vue';
import SeparatorComponent from '@/components/SeparatorComponent.vue';
import InfoComponent from '@/components/intro/InfoComponent.vue';
import ContactComponent from '@/components/intro/ContactComponent.vue';

import personal from '@/assets/data/me/personal.json';

function computeAge(dateOfBirth: Date) {
    const diff = Date.now() - dateOfBirth.getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

function formatDate(date: Date) {
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
}

const _dob = personal.date_of_birth;
const dateOfBirth = new Date(_dob.year, _dob.month, _dob.day)
const age = computeAge(dateOfBirth);
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
            <ProfilePictureComponent :show-border="true" />
        </div>
        <div class="center title ph-20">{{ personal.first_name }} {{ personal.last_name }}</div>
        <div class="ph-20">
            <div v-for="title in personal.titles" class="center text">{{ title }}</div>
        </div>
        <div class="pv-10">
            <SeparatorComponent />
        </div>
        <!-- personal information section -->
        <div class="ph-20">
            <InfoComponent name="Date of birth" :value="dateOfBirthFormatted" />
            <InfoComponent name="Age" :value="`${age} years`" />
            <InfoComponent name="Location" :value="locationFormatted" />
        </div>
        <div class="pv-10">
            <SeparatorComponent />
        </div>
        <div class="ph-20">
            <ContactComponent v-for="contact in filteredContacts" :link="contact.link" :icon="contact.icon" />
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
