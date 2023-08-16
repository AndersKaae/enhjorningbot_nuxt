<template>
    <div class="card-wrapper">
        <h2>Valuation:</h2>
        <div style="height: 80%;">
            <Line :data="chartData" :options="chartOptions"/>
        </div>
    </div>
</template>

<script setup>
const props = defineProps(["graphData"]);

onBeforeMount(() => {
    getDates(props.graphData);
});

const getDates = (graphData) => {
    for (let i = 0; i < graphData.length; i++) {
        chartData.value.labels.push(graphData[i].validFrom);
        if (i == 0) {
            chartData.value.datasets[0].data.push(graphData[i].capital);
        } else {
            chartData.value.datasets[0].data.push(graphData[i].valuation);
        }
    }
};

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
    max-width: 100%;
    height: 400px;
    padding: 0 1.25rem 1.25rem;
    flex: 1;
}
</style>