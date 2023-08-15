<template>
    <div class="card-wrapper">
        <Bar :data="chartData" :options="chartOptions" />
    </div>
</template>

<script setup>
const props = defineProps(["graphData"]);

onBeforeMount(() => {
    getDates(props.graphData);
});

const getDates = (graphData) => {
    for (let i = 0; i < graphData.length; i++) {
        // Populating the dates array
        chartData.value.labels.push(graphData[i].validFrom);
        console.log(chartData.value.labels[i])
        if (i == 0) {
            chartData.value.datasets[0].data.push(graphData[i].capital);
        }
        else {
            let found = false;
            for (let j = 0; j < chartData.value.datasets.length; j++) {
                for (let g = 0; g < graphData[i].virkIncrease.length; g++) {
                    if (chartData.value.datasets[j].label == graphData[i].virkIncrease[g].typeIncrease) {
                        chartData.value.datasets[j].data.push(graphData[i].investment);
                        found = true;
                    }
                }
                if (found == false){
                    chartData.value.datasets[j].data.push(0);
                }
            }
            if (!found) {
                chartData.value.datasets.push({
                    label: graphData[i].typeIncrease,
                    backgroundColor: 'rgba(255, 159, 64, 0.2)',
                    borderColor: 'rgba(255, 159, 64, 1)',
                    borderWidth: 1,
                    data: [graphData[i].investment],
                });
            }
        }
    }
};

import { Bar } from 'vue-chartjs';
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
} from 'chart.js';
import { ref } from 'vue';

ChartJS.register(
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
);

const chartData = ref({
    labels: [],
    datasets: [
        {
            label: 'Kontant',
            backgroundColor: 'rgba(255, 159, 64, 0.2)',
            borderColor: 'rgba(255, 159, 64, 1)',
            borderWidth: 1,
            data: [],
        }
    ],
});

const chartOptions = ref({
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        x: {
            stacked: true,
        },
        y: {
            stacked: true
        }
    }
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
    height: 300px;
    padding: 0 1.25rem 1.25rem;
    flex: 1;
}
</style>
