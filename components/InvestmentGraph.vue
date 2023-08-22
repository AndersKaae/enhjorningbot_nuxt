<template>
    <div class="card-wrapper">
        <h2>Funding:</h2>
        <div style="height: 80%;">
            <Bar :data="chartData" :options="chartOptions" />
        </div>
    </div>
</template>

<script setup>
const props = defineProps(["graphData"]);

onBeforeMount(() => {
    populateDates(props.graphData);
    populateTypes(props.graphData);
    populateValues(props.graphData);
});

const populateDates = (graphData) => {
    for (let i = 0; i < graphData.length; i++) {
        // Populating the dates array
        if (graphData[i].type != 'decreased')
        {
            chartData.value.labels.push(graphData[i].validFrom);
        }
    }
};

const setColors = (type) => {
    let backgroundColor = 'rgba(75, 192, 192, 0.2)';
    let borderColor = 'rgba(75, 192, 192, 1)';

    if (type == 'Fusion') {
        backgroundColor = 'rgba(255, 99, 132, 0.2)';
        borderColor = 'rgba(255, 99, 132, 1)';
    }
    if (type == 'Spaltning') {
        backgroundColor = 'rgba(54, 162, 235, 0.2)';
        borderColor = 'rgba(54, 162, 235, 1)';
    }
    if (type == 'Indskud af bestemmende kapitalpost') {
        backgroundColor = 'rgba(153, 102, 255, 0.2)';
        borderColor = 'rgba(153, 102, 255, 1)';
    }
    if (type == 'Indskud af bestående virksomhed') {
        backgroundColor = 'rgba(255, 206, 86, 0.2)';
        borderColor = 'rgba(255, 206, 86, 1)';
    }
    if (type == 'Indbetalt i værdier') {
        backgroundColor = 'rgba(153, 102, 255, 0.2)';
        borderColor = 'rgba(153, 102, 255, 1)';
    }
    if (type == 'Konvertering af gæld') {
        backgroundColor = 'rgba(255, 159, 64, 0.2)';
        borderColor = 'rgba(255, 159, 64, 1)';
    }
    if (type == 'Overførte reserver / overskud') {
        backgroundColor = 'rgba(255, 99, 132, 0.2)';
        borderColor = 'rgba(255, 99, 132, 1)';
    }
    if (type == 'Ved fonds') {
        backgroundColor = 'rgba(54, 162, 235, 0.2)';
        borderColor = 'rgba(54, 162, 235, 1)';
    }
    if (type == 'Ombytning af konvertible obligationer') {
        backgroundColor = 'rgba(153, 102, 255, 0.2)';
        borderColor = 'rgba(153, 102, 255, 1)';
    }
    let colors = {
        backgroundColor,
        borderColor
    }
    return colors
};

const populateValues = (graphData) => {
    // The first entry is not an increase, but the start capital
    chartData.value.datasets[0].data.push(graphData[0].capital)
    // Then we loop over the rest of the data
    for (let i = 1; i < graphData.length; i++) {
        //console.log('--')
        for (let j = 0; j < chartData.value.datasets.length; j++) {
            //console.log('Chart: ' + chartData.value.datasets[j].label)
            let found = false;
            let value = 0;
            if (graphData[i].type == 'decreased'){
                continue;
            }
            for (let k = 0; k < graphData[i].virkIncrease.length; k++) {
                //console.log('Data: ' + graphData[i].virkIncrease[k].typeIncrease)
                if (chartData.value.datasets[j].label == graphData[i].virkIncrease[k].typeIncrease) {
                    //console.log('Match: ' + graphData[i].virkIncrease[k].typeIncrease)
                    //console.log('Value: ' + graphData[i].virkIncrease[k].investment)
                    value = value + graphData[i].virkIncrease[k].investment;
                    found = true;
                }
            }
            //console.log('TOTAL ' + chartData.value.datasets[j].label)
            //console.log(value)
            chartData.value.datasets[j].data.push(value)
        }
    }
};

const knownTypes = (type) => {
    for (let i = 0; i < chartData.value.datasets.length; i++) {
        if (chartData.value.datasets[i].label == type) {
            return true;
        }
    }
    return false;
};

const populateTypes = (graphData) => {
    for (let i = 1; i < graphData.length; i++) {
        if (graphData[i].type == 'decreased'){
            continue;
        } 
        for (let j = 0; j < graphData[i].virkIncrease.length; j++) {
            // Populating the types array
            if (!knownTypes(graphData[i].virkIncrease[j].typeIncrease)) {
                chartData.value.datasets.push({
                    label: graphData[i].virkIncrease[j].typeIncrease,
                    //backgroundColor: 'rgba(255, 159, 64, 0.2)',
                    backgroundColor: setColors(graphData[i].virkIncrease[j].typeIncrease).backgroundColor,
                    borderColor: setColors(graphData[i].virkIncrease[j].typeIncrease).borderColor,
                    borderWidth: 1,
                    data: [0],
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
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
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
    height: 400px;
    padding: 0 1.25rem 1.25rem;
    flex: 1;
}
</style>
