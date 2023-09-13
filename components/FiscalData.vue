<template>
    <div class="card-wrapper">
        <header class="card-header">
            <h2>Fiscal information</h2>
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
        <Loader v-if="!loaded"></Loader>

        <template v-if="loaded">
            <div v-if="activeTab == 'chart'" class="chart-wrapper">
                <Line :data="chartData" :options="chartOptions"/>
            </div>
            <div v-if="activeTab == 'table'" class="chart-data">
                <table class="table--valuation-data">
                    <thead>
                        <tr>
                            <th>Fiscal year end date</th>
                            <th>Result</th>
                            <th>Assets</th>
                            <th>Ebitda</th>
                            <th>Gross profit</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="year in fiscalData.results">
                            <td>{{ year.fiscal_end }}</td>
                            <td class="text-end">
                                <span class="denomination">DKK</span>
                                <span class="amount">{{ year.parsed_data.result.toLocaleString() }}</span>
                                </td>
                            <td class="text-end">
                                <span class="denomination">DKK</span>
                                <span class="amount">{{ year.parsed_data.assets.toLocaleString() }}</span>
                                </td>
                            <td class="text-end">
                                <span class="denomination">DKK</span>
                                <span class="amount">{{ year.parsed_data.ebitda.toLocaleString() }}</span>
                                </td>
                            <td class="text-end">
                                <span class="denomination">DKK</span>
                                <span class="amount">{{ year.parsed_data.gross_result_fortjeneste.toLocaleString() }}</span>
                                </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </template>
    </div>
</template>

<script setup>
import axios from "axios";
const fiscalData = ref();
const route = useRoute();
let loaded = ref(false);
let activeTab = ref('chart');

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
        height: 80%;
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

    .text-end{
        text-align: right;
    }
</style>