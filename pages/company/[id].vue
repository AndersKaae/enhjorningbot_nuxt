<template>
    <div class="container">
        <div class="top-row-container">
            <GeneralInfo></GeneralInfo>
            <CompanyStats :increases="increases"></CompanyStats>
            
        </div>
        <div class="relations-container">
            <Management></Management>
            <Owners></Owners>
        </div>
        <span v-if="increases">
            <div v-if="increases.increases.length > 1">
                <div class="valuation-container">
                    <ValuationGraph :graphData="increases.increases"></ValuationGraph>
                </div>
                <InvestmentGraph :graphData="increases.increases"></InvestmentGraph>
            </div>
            <div v-else>
                <h2>The company does not have any registered funding.</h2>
            </div>
            <FiscalData></FiscalData>
        </span>
    </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
const companyData = ref();
const loading = ref(true);
const route = useRoute();
const increases = ref(null);

const props = defineProps({
    loaded: Boolean
});

// Define the event emitter
const emit = defineEmits(['changeLoaded']);

const updateLoaded = (value) => {
    emit('changeLoaded', value);
};

onMounted(() => {
    fetchIncreases()
    updateLoaded(true)
})
const fetchIncreases = async () => {
    let api_url = `https://enhjorning.oaktoad.dk/api/v1/enhjorning/increases?cvr=` + route.params.id
    const response = await axios.get(api_url, { auth: { username: 'enhjorningbot@gmail.com', password: 'bf7f8df76a4443f2ae6de295f5fd3340' } })
    increases.value = response.data;
    console.log(api_url)
};
</script>

<style scoped>
.container {
    margin: 0 auto 2rem;
    max-width: 960px;
    padding-left: 2rem;
    padding-right: 2rem;
    width: 100%;
}

.relations-container {
    display: flex;
    justify-content: space-between;
    margin-bottom: 2rem;
}

.valuation-container {
    width: 100%;
    padding-bottom: 50px;
}

@media (max-width: 640px) {
    .container {
        padding-left: 1rem;
        padding-right: 1rem;
        width: 100%;
    }

    .company-name {
        font-size: 2rem;
        margin-top: 1.5em;
    }

    .relations-container {
        flex-direction: column;
        width: 100%;
    }
}
</style>