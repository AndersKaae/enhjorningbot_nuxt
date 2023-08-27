<template>
    <div class="container">
        <Loader v-if="loading"></Loader>
        <div v-if="!loading">
            <h1 class="company-name">{{ companyData.name }}</h1>
            <div class="top-row-container">
                <GeneralInfo :company="companyData"></GeneralInfo>
            </div>
            <div class="relations-container">
                <Management :company="companyData"></Management>
                <Owners :owners="companyData.owner"></Owners>
            </div>
            <div v-if="companyData.increases.length > 1">
                <div class="valuation-container">
                    <ValuationGraph :graphData="companyData.increases"></ValuationGraph>
                </div>
                <InvestmentGraph :graphData="companyData.increases"></InvestmentGraph>
            </div>
            <div v-else>
                <h2>The company does not have any registered funding.</h2>
            </div>
            <FiscalData></FiscalData>
        </div>
    </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
const companyData = ref();
const loading = ref(true);
const route = useRoute();

const props = defineProps({
  loaded: Boolean
});

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
    console.log(api_url)
    const response = await axios.get(api_url, { auth: { username: 'enhjorningbot@gmail.com', password: 'bf7f8df76a4443f2ae6de295f5fd3340' } })
    companyData.value = response.data;
    loading.value = false;
    updateLoaded(true)
}
</script>

<style scoped>
.company-name{
    font-size: 3rem;
    margin-bottom: 1rem ;
}
.container {
    padding-left: 2rem;
    padding-right: 2rem;
}

.relations-container{
    display: flex;
    justify-content: space-between;
    margin-bottom: 2rem;
}

.valuation-container {
    width: 100%;
    padding-bottom: 50px;
}
</style>