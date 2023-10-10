<template>
    <div class="container">
        <Loader v-if="!loaded"></Loader>
        <div v-else>
            <!-- Use optional chaining to avoid errors -->
            <h1>{{ investments?.result?.[0].investor_name }}</h1>
            <table>
                <tr>
                    <th>Investment date</th>
                    <th>Target</th>
                    <th>Ownership stake</th>
                </tr>
                <tr v-for="investment in investments.result" :key="investment.id">
                    <td>{{ investment.earliest_valid_from }}</td>
                    <td><a v-bind:href="'/company/' + investment.target_cvr">{{ investment.target_name }}</a></td>
                    <td><FormatPercentage :percentage="investment.value"></FormatPercentage></td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script setup>
    import axios from "axios";
    const route = useRoute();
    const investments = ref(null);
    
    const props = defineProps({
        loaded: Boolean
    });

    const emit = defineEmits(['changeLoaded']);

    const updateLoaded = (value) => {
        emit('changeLoaded', value);
    };

    onMounted(async () => {
        await fetchData(); // Wait for data to be fetched
        updateLoaded(true); // Then update loaded state
    });
    
    const fetchData = async () => {
        let api_url = `https://virk.oaktoad.dk/api/v1/investor_investments?cvr=` + route.params.id;
        const response = await axios.get(api_url);
        investments.value = response.data;
    };
</script>

<style scoped>
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

    .container {
    margin: 0 auto 2rem;
    max-width: 960px;
    padding-left: 2rem;
    padding-right: 2rem;
    width: 100%;
}

@media (max-width: 640px) {
    .container {
        padding-left: 1rem;
        padding-right: 1rem;
        width: 100%;
    }
}
</style>
