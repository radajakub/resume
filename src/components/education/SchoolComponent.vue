<script setup lang="ts">

const props = defineProps(['education'])
const education = props.education;
console.log(education)

// show the school detail page
function showDeatil() {
    console.log("show detail");
}

function hideDetail() {
    console.log("hide detail");
}

</script>

<template>
    <div class="thin-border rounded-border padded wrapper" @click="showDeatil()">
        <h1>{{ education.school }}</h1>
    </div>
</template>

<style scoped>
.wrapper:hover {
    background-color: black;
}
</style>
