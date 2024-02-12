<template>
    <div class="container">
        <h1>Top Investor</h1>
        <p>Most active investors in the past 24 months.</p>
        <div v-if="!topData">
            <Loader></Loader>
        </div>
        <div v-else>
            <table>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Investor</th>
                        <th>Investments</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(company, index) in topData.result" :key="company.name">
                        <td>{{ index + 1 }}</td>
                        <td><a :href="'/investor/' + company.cvr">{{ formatName(company.name) }}</a></td>
                        <td>{{ company.companies }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import axios from "axios";
const topData = ref(null);

const props = defineProps({
        loaded: Boolean
    });

    const emit = defineEmits(['changeLoaded']);

    const updateLoaded = (value) => {
        emit('changeLoaded', value);
    };

onMounted(() => {
    fetchData()
    updateLoaded(true); // Then update loaded state
})

const fetchData = async () => {
    let api_url = `https://virk.oaktoad.dk/api/v1/top_investors`
    const response = await axios.get(api_url, { auth: { username: 'enhjorningbot@gmail.com', password: 'bf7f8df76a4443f2ae6de295f5fd3340' } })
    topData.value = response.data;
};

const formatName = (name) => {
    return name.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
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

table {
        border-collapse: collapse;
        width: 100%;
        background-color: #fff;
        border: 1px solid #ddd;
        box-shadow: 0 0 15px #0000001a;
        position: relative;
        z-index: 2;
        max-width: 100%;
    }

    th,
    td {
        padding: 0.5rem;
        text-align: left;
        border-bottom: 1px solid #ddd;
    }

    tr:hover td {
        border-bottom-color: #555;
    }

    th {
        background-color: #eee;
    }

    a {
        color: #337592;
        text-decoration: none;
    }
</style>