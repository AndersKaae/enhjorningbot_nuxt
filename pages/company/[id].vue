<template>
    <div class="container">
        <div class="top-row-container">
            <GeneralInfo></GeneralInfo>
            <CompanyStats :increases="increases"></CompanyStats>

        </div>
        <div v-if="increases">
            <div class="valuation-container">
                <ValuationGraph :graphData="increases"></ValuationGraph>
            </div>
            <InvestmentGraph :graphData="increases"></InvestmentGraph>
        </div>
        <div class="relations-container">
            <Management></Management>
            <Owners></Owners>
        </div>
        <FiscalData></FiscalData>
    </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
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