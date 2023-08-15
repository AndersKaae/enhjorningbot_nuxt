<template>
    <div class="container">
        <Loader v-if="loading"></Loader>
        <div v-if="!loading">
            <h1>{{ companyData.name }}</h1>
            <div class="top-row-container">
                <GeneralInfo :company="companyData"></GeneralInfo>
                <Management :company="companyData"></Management>
            </div>
            <div class="valuation-container">
                <ValuationGraph :graphData="companyData.increases"></ValuationGraph>
            </div>
            <InvestmentGraph :graphData="companyData.increases"></InvestmentGraph>
            <p>{{ companyData }}</p>
        </div>
    </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
const companyData = ref();
const loading = ref(true);
const route = useRoute();

// Define the event emitter
const emit = defineEmits(['changeLoaded']);

const updateLoaded = (value) => {
  emit('changeLoaded', value);
};

onMounted(() => {
    fetchCompanies()
})

const fetchCompanies = async () => {
    loading.value = true;
    let api_url = `https://enhjorning.oaktoad.dk/api/v1/enhjorning/company?cvr=` + route.params.id
    const response = await axios.get(api_url, { auth: { username: 'enhjorningbot@gmail.com', password: 'bf7f8df76a4443f2ae6de295f5fd3340' } })
    companyData.value = response.data;
    loading.value = false;
    updateLoaded(true)
}
</script>

<style scoped>
.container{
    padding-left: 2rem;
    padding-right: 2rem;
}
.top-row-container{
    display: flex;
    width: 100%;
    padding-bottom: 50px;
}

.valuation-container{
    width: 100%;
    padding-bottom: 50px;
}
</style>