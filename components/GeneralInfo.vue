<template>
    <div v-if="generalInfo != ''" class="info-box">
        <h1 class="company-name">{{ generalInfo.name }}</h1>
        <span class="company-info-item">CVR-no.: <strong>{{ generalInfo.cvr }}</strong></span>
        <span class="company-info-item">Founded: <strong>{{ generalInfo.start }}</strong></span>
        <span class="company-info-item">Industry: <strong>{{ generalInfo.branchekode }}</strong></span>
        <template v-if="generalInfo.Website != null">
            <span class="company-info-item">Website: <strong>{{ generalInfo.Website }}</strong></span>
        </template>
        <span class="company-info-item">Adress: <strong>{{ generalInfo.adress }}</strong></span>
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
import axios from "axios";
let generalInfo = ref("");
const route = useRoute();

onBeforeMount(() => {
    getGeneralInfo();
});

const getGeneralInfo = async () => {
    let api_url = `https://virk.oaktoad.dk/api/v1/company_info?cvr=` + route.params.id
    const response = await axios.get(api_url, { auth: { username: 'enhjorningbot@gmail.com', password: 'bf7f8df76a4443f2ae6de295f5fd3340' } })
    generalInfo.value = response.data;
    if (generalInfo.value.cvr == 'Not found') {
        return navigateTo('/404')
    }
}

</script>