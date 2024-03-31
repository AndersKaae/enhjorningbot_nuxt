<template>
    <div class="card-wrapper">
        <header class="card-header">
            <h2>Funding</h2>
            <div class="actions">
                <button
                    v-on:click="activeTab = 'chart'"
                    class="btn--action"
                    :class="[activeTab == 'chart' ? 'active' : '']"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path d="M24 3.875l-6 1.221 1.716 1.708-5.351 5.358-3.001-3.002-7.336 7.242 1.41 1.418 5.922-5.834 2.991 2.993 6.781-6.762 1.667 1.66 1.201-6.002zm0 16.125v2h-24v-20h2v18h22z"/></svg>
                </button>
                <button
                    v-on:click="activeTab = 'table'"
                    class="btn--action"
                    :class="[activeTab == 'table' ? 'active' : '']"
                >
                    <svg style="height: 16px; width: 16px;top: 1px; position: relative;" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m22 17.75c0-.414-.336-.75-.75-.75h-14.5c-.414 0-.75.336-.75.75s.336.75.75.75h14.5c.414 0 .75-.336.75-.75zm-18.953-1.494c-.621 0-.578.751-.06.751.108.003.371-.076.52.079.218.228.07.693-.293.693-.258 0-.349-.202-.456-.488-.123-.355-.758-.26-.758.203 0 .34.416 1.006 1.21 1.006.187 0 .358-.03.514-.09.474-.181.765-.619.765-1.054 0-.29-.129-.58-.418-.794.671-.726.046-1.562-.815-1.562-.75 0-1.162.49-1.162.864 0 .306.254.404.376.404.395 0 .329-.283.494-.482.104-.13.501-.124.501.174 0 .358-.518.306-.418.296zm18.953-2.506c0-.414-.336-.75-.75-.75h-14.5c-.414 0-.75.336-.75.75s.336.75.75.75h14.5c.414 0 .75-.336.75-.75zm-18.785-1.032c.214-.21.511-.426.8-.686.805-.713.535-2.002-.77-2.002-.813 0-1.24.596-1.24 1.028 0 .478.513.548.708.308.176-.212.152-.595.519-.595.346 0 .517.373.097.792-.065.065-1.065.825-1.258 1.246-.043.096-.071.19-.071.283 0 .159.127.438.494.438h1.597c.344 0 .434-.256.434-.404 0-.314-.284-.408-.497-.408zm18.785-2.968c0-.414-.336-.75-.75-.75h-14.5c-.414 0-.75.336-.75.75s.336.75.75.75h14.5c.414 0 .75-.336.75-.75zm-19.04-1.738c0 .226.113.497.439.497.015 0 .443.032.443-.58v-2.45c0-.335-.206-.479-.401-.479-.224 0-.272.108-.414.306-.183.254-.369.387-.631.511-.23.108-.396.181-.396.428 0 .208.173.388.378.388.18 0 .434-.169.582-.271zm19.04-2.262c0-.414-.336-.75-.75-.75h-14.5c-.414 0-.75.336-.75.75s.336.75.75.75h14.5c.414 0 .75-.336.75-.75z" fill-rule="nonzero"/></svg></button>
            </div>
        </header>
        <div v-if="activeTab == 'chart'" class="chart-wrapper">
            <Bar :data="chartData" :options="chartOptions" />
        </div>

        <div v-if="activeTab == 'table'" class="chart-data">
            <table class="table--valuation-data">
                <thead>
                    <tr>
                        <th></th>
                        <th>Date</th>
                        <th>Investment</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(increase, index) in graphData.increases" :key="increase.id || index">
                        <td>{{index+1}}</td>
                        <td>{{ increase.validFrom}}</td>
                        <td class="valuation">
                            <span v-if="index != 0" class="denomination">DKK</span>
                            <span v-if="index != 0" class="amount">{{ increase.investment.toLocaleString() }}</span>
                        </td>
                    </tr>
                </tbody>
            </table>
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
    for (let i = 0; i < graphData.increases.length; i++) {
        // Populating the dates array
        if (graphData.increases[i].type != 'decreased')
        {
            chartData.value.labels.push(graphData.increases[i].validFrom);
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

let activeTab = ref('chart');

const populateValues = (graphData) => {
    // The first entry is not an increase, but the start capital
    //chartData.value.datasets[0].data.push(graphData.increases[0].capital)
    // Then we loop over the rest of the data
    for (let i = 0; i < graphData.increases.length; i++) {
        //console.log('--')
        for (let j = 0; j < chartData.value.datasets.length; j++) {
            //console.log('Chart: ' + chartData.value.datasets[j].label)
            let found = false;
            let value = 0;
            if (graphData.increases[i].type == 'decreased'){
                continue;
            }
            for (let k = 0; k < graphData.increases[i].virkIncrease.length; k++) {
                //console.log('Data: ' + graphData[i].virkIncrease[k].typeIncrease)
                if (chartData.value.datasets[j].label == graphData.increases[i].virkIncrease[k].typeIncrease) {
                    //console.log('Match: ' + graphData[i].virkIncrease[k].typeIncrease)
                    //console.log('Value: ' + graphData[i].virkIncrease[k].investment)
                    value = value + graphData.increases[i].virkIncrease[k].investment;
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
    for (let i = 1; i < graphData.increases.length; i++) {
        if (graphData.increases[i].type == 'decreased'){
            continue;
        } 
        for (let j = 0; j < graphData.increases[i].virkIncrease.length; j++) {
            // Populating the types array
            if (!knownTypes(graphData.increases[i].virkIncrease[j].typeIncrease)) {
                chartData.value.datasets.push({
                    label: graphData.increases[i].virkIncrease[j].typeIncrease,
                    //backgroundColor: 'rgba(255, 159, 64, 0.2)',
                    backgroundColor: setColors(graphData.increases[i].virkIncrease[j].typeIncrease).backgroundColor,
                    borderColor: setColors(graphData.increases[i].virkIncrease[j].typeIncrease).borderColor,
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
        
        padding: 0 1.25rem 1.25rem;
        flex: 1;
    }

    .card-header{
        align-items: center;
        display: flex;
        justify-content: space-between;
    }

    .btn--action{
        background: transparent;
        border: 1px solid #ddd;
        padding: 5px 8px;
    }

    .btn--action.active{
        border-color: #337592;
        color: #337592;        
    }

    .btn--action:hover{
        border-color: #222;
    }

    .actions .btn--action:first-child{
        border-bottom-left-radius: 5px;
        border-top-left-radius: 5px;
    }

    .actions .btn--action:last-child{
        border-bottom-right-radius: 5px;
        border-top-right-radius: 5px;
    }

    .chart-wrapper{
        height: 300px;
    }
    .table--valuation-data{
        border-collapse: collapse;
        width: 100%;
    }

    .table--valuation-data th{
        padding: .5em;
        text-align: left;
    }

    tr:hover td{
        border-bottom-color: #555;
    }

    .table--valuation-data td{
        background-color: #fff;
        border: 1px solid #ddd;
        border-collapse: collapse;
        padding: 0.5em;
    }

    .valuation{
        text-align: right;
    }

    .denomination{
        color: #666;
        font-size: .75em;
        margin-right: .25em;
    }

    .amount{
        font-variant: tabular-nums;
        -moz-font-feature-settings: "tnum";
        -webkit-font-feature-settings: "tnum";
        font-feature-settings: "tnum"
    }
</style>
