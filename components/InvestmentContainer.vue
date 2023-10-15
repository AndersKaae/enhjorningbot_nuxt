<template>
    <CompanyStats :increases="increases"></CompanyStats>
    <div v-if="increases">
        <div class="valuation-container">
            <ValuationGraph :graphData="increases"></ValuationGraph>
        </div>
        <InvestmentGraph :graphData="increases"></InvestmentGraph>
    </div>
</template>

<script setup>
    import axios from "axios";
    import { ref, onMounted } from "vue";
    const route = useRoute();
    const increases = ref(null);

    onMounted(() => {
    fetchIncreases()
    })
    
    const fetchIncreases = async () => {
    let api_url = `https://enhjorning.oaktoad.dk/api/v1/enhjorning/increases?cvr=` + route.params.id
    const response = await axios.get(api_url, { auth: { username: 'enhjorningbot@gmail.com', password: 'bf7f8df76a4443f2ae6de295f5fd3340' } })
    increases.value = response.data;
    };

</script>

<style scoped>
.valuation-container {
    width: 100%;
    padding-bottom: 50px;
}
</style>