<template>
    <div class="container">
        <h1>Top Investor</h1>
        <div v-if="!topData">
            <p>Loading...</p>
        </div>
        <div v-else>
            <table>
                <thead>
                    <tr>
                        <th>Investor</th>
                        <th>Investments</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="company in topData.result" :key="company.name">
                        <td><a v-bind:href="'/investor/' + company.cvr">{{ company.name }}</a></td>
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
let loaded = ref(false);

onMounted(() => {
    fetchData()
})

const fetchData = async () => {
    let api_url = `https://virk.oaktoad.dk/api/v1/top_investors`
    const response = await axios.get(api_url, { auth: { username: 'enhjorningbot@gmail.com', password: 'bf7f8df76a4443f2ae6de295f5fd3340' } })
    topData.value = response.data;
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
</style>