<template>
    <div class="card-wrapper">
        <h2>Fiscal information:</h2>
        <Loader v-if="!loaded"></Loader>
        <div style="height: 80%;">
            <span v-if="loaded">
            <Line :data="chartData" :options="chartOptions"/>
            </span>
        </div>
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
    fiscalData.value.results = fiscalData.value.results.reverse();
    for (let i = 0; i < fiscalData.value.results.length; i++) {
        chartData.value.labels.push(fiscalData.value.results[i].fiscal_end);
        chartData.value.datasets[0].data.push(fiscalData.value.results[i].parsed_data.result);
        chartData.value.datasets[1].data.push(fiscalData.value.results[i].parsed_data.revenue);
        chartData.value.datasets[2].data.push(fiscalData.value.results[i].parsed_data.assets);
        chartData.value.datasets[3].data.push(fiscalData.value.results[i].parsed_data.ebitda);
        chartData.value.datasets[4].data.push(fiscalData.value.results[i].parsed_data.gross_result_fortjeneste);
  }
  for (let i = 0; i < chartData.value.datasets.length; i++) {
    let delete_item = true;
    for (let j = 0; j < chartData.value.datasets[i].data.length; j++) {
        if (chartData.value.datasets[i].data[j] != null) {
            delete_item = false;
        }
    }
    if (delete_item == true) {
        chartData.value.datasets.splice(i, 1);
    }
  }
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
            label: 'Result',
            fill: false,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(75, 192, 192, 0.2)',
            data: [],
            tension: 0.1,
        },
        {
            label: 'Revenue',
            fill: false,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(255, 99, 132, 0.2)',
            data: [],
            tension: 0.1,
        },
        {
            label: 'Assets',
            fill: false,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(54, 162, 235, 0.2)',
            data: [],
            tension: 0.1,
        },
        {
            label: 'Ebitda',
            fill: false,
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(153, 102, 255, 0.2)',
            data: [],
            tension: 0.1,
        },
        {
            label: 'Gross profit',
            fill: false,
            backgroundColor: 'rgba(255, 206, 86, 0.2)',
            borderColor: 'rgba(255, 206, 86, 1)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(255, 206, 86, 0.2)',
            data: [],
            tension: 0.1,
        }
    ],
});

const chartOptions = ref({
    responsive: true,
    maintainAspectRatio: true,
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