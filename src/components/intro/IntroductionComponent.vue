<script setup lang="ts">
import ProfilePictureComponent from '@/components/intro/ProfilePictureComponent.vue';
import personal from '@/assets/data/me/personal.json';

function computeAge(dateOfBirth: Date) {
    const diff = Date.now() - dateOfBirth.getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

const _dob = personal.date_of_birth;
const age = computeAge(new Date(_dob.year, _dob.month, _dob.day));

</script>

<template>
    <div class="thin-border rounded-border frame">
        <ProfilePictureComponent />
        <hr class="wide lined" />
    </div>
</template>

<style scoped>
.frame {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: start;
}
</style>
