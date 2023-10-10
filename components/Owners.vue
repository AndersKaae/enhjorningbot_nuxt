<template>
    <div class="card-wrapper">
        <h2>Owners (above 5 %):</h2>
        <span v-if="owner != ''">
            <div v-for="owner in owner.result" :key="owner.name">
                <div class="owner-container">

                    <span v-if="owner.cvr != null" class="name-container"><a v-bind:href="'/investor/' + owner.cvr">{{ owner.name }}</a></span>
                    <span v-else class="name-container">{{ owner.name }}</span>
                    <span class="ownership-container"><FormatPercentage :percentage="owner.value"></FormatPercentage></span>
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
    width: 100%;
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

a {
    color: #337592;
    text-decoration: none;
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

onBeforeMount(() => {
    getOwner();
});

const getOwner = async () => {
    let api_url = `https://virk.oaktoad.dk/api/v1/owners?cvr=` + route.params.id
    const response = await axios.get(api_url, { auth: { username: 'enhjorningbot@gmail.com', password: 'bf7f8df76a4443f2ae6de295f5fd3340' } })
    owner.value = response.data;
}

</script>