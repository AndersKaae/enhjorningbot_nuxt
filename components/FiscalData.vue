<template>
    <div class="card-wrapper">
        <h2>Fiscal</h2>
        <Loader v-if="!loaded"></Loader>
        <div style="height: 80%;">
            <Line :data="chartData" :options="chartOptions"/>
        </div>
        <p>{{ fiscalData }}</p>
    </div>
</template>

<script setup>
import axios from "axios";
const fiscalData = ref();
const route = useRoute();
let loaded = ref(false);

onMounted(() => {
    fetchFiscalData();
})

watch(
  () => loaded.value,
  () => {
    console.log(fiscalData.value.results)
    for (let i = 0; i < fiscalData.value.results.length; i++) {
        
        chartData.value.labels.push(fiscalData.value.results[i].fiscal_end);
    }
    console.log(chartData.value)
  }
)

const fetchFiscalData = async () => {
    let api_url = `https://fiscal.oaktoad.dk/api/v1/cvr?cvr=` + route.params.id
    const response = await axios.get(api_url)
    fiscalData.value = response.data;
    loaded.value = true;
}

import { Line } from 'vue-chartjs';
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Filler
} from 'chart.js';
import { ref } from 'vue';

ChartJS.register(
    Title,
    Tooltip,
    Legend,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Filler
);

const chartData = ref({
    labels: [],
    datasets: [
        {
            label: 'Valuation',
            fill: true,
            borderColor: 'rgba(255, 159, 64, 1)',
            backgroundColor: 'rgba(255, 159, 64, 0.2)',
            borderWidth: 1,
            pointBackgroundColor: '#f87979',
            data: [],
            tension: 0.1,
        },
    ],
});

const chartOptions = ref({
    responsive: true,
    maintainAspectRatio: false,
});

</script>

<style scoped>
.card-wrapper {
    background-color: #fff;
    border: 1px solid #ddd;
    box-shadow: 0 0 15px #0000001a;
    position: relative;
    z-index: 2;
    padding: 0 1.25rem 1.25rem;
    margin-top: 50px;
    margin-bottom: 50px;
}
</style>