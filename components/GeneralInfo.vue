<template>
    <div v-if="generalInfo != ''" class="info-box">
        <h1 class="company-name">{{ generalInfo.name }}</h1>
        <span class="company-info-item">CVR-no.: <strong>{{ generalInfo.cvr }}</strong></span>
        <span class="company-info-item">Founded: <strong>{{ generalInfo.start.split(' ')[0] }}</strong></span>
        <span class="company-info-item">Industry: <strong>{{ generalInfo.branchekode }}</strong></span>
        <template v-if="generalInfo.Website != null">
            <span class="company-info-item">Website: <strong>{{ generalInfo.Website }}</strong></span>
        </template>
        <span class="company-info-item">Address: <strong>{{ generalInfo.adress }}</strong></span>
    </div>
</template>

<style scoped>
.company-name {
    font-size: 3rem;
    margin-bottom: 1rem;
}

.company-info-item {
    margin-right: 1em;
}

@media (max-width: 640px) {
    .company-name{
        font-size: 2rem;
    }

    .company-info-item {
        display: block;
        margin-bottom: .5rem;
        margin-right: 0;
    }
}
</style>

<script setup>
const props = defineProps(["generalInfo"]);
let generalInfo = ref(props.generalInfo);


</script>
