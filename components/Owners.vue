<template>
    <div class="card-wrapper">
        <h2>Owners (above 5 %):</h2>
        <span v-if="owner != ''">
            <div v-for="owner in owner.result" :key="owner.name">
                <div class="owner-container">
                    <span class="name-container">{{ owner.name }}</span>
                    <span class="ownership-container">{{ calculateOwnership(owner.value) }}%</span>
                </div>
            </div>
        </span>
    </div>
</template>

<style scoped>
.card-wrapper {
    background-color: #fff;
    border: 1px solid #ddd;
    box-shadow: 0 0 15px #0000001a;
    padding: 0 1.25rem 1.25rem;
    width: 48%;
}

.owner-container {
    border-bottom: 1px solid transparent;
    display: flex;
    padding: .5rem 0;
}

.owner-container:hover {
    border-bottom: 1px solid #666;
}

.name-container {
    flex: 1;
    width: auto;
}

@media (max-width: 640px) {
    .card-wrapper {
        width: 100%;
    }
}
</style>

<script setup>
import axios from "axios";
let owner = ref("");
const route = useRoute();

const calculateOwnership = (value) => {
    if (value == 1) {
        return '100';
    }
    if (value == 0.6667) {
        return '66.67 - 99.99';
    }
    if (value == 0.5) {
        return '50 - 66.66';
    }
    if (value == 0.3333) {
        return '33.33 - 49.99';
    }
    if (value == 0.25) {
        return '25 - 33.32';
    }
    if (value == 0.2) {
        return '20 - 24.99';
    }
    if (value == 0.15) {
        return '15 - 19.99';
    }
    if (value == 0.10) {
        return '10 - 14.99';
    }
    if (value == 0.05) {
        return '5 - 9.99';
    }
    if (value) {
        return 'Under 5';
    }
    return value;
};

onBeforeMount(() => {
    getOwner();
});

const getOwner = async () => {
    let api_url = `https://virk.oaktoad.dk/api/v1/owners?cvr=` + route.params.id
    const response = await axios.get(api_url, { auth: { username: 'enhjorningbot@gmail.com', password: 'bf7f8df76a4443f2ae6de295f5fd3340' } })
    owner.value = response.data;
}

</script>