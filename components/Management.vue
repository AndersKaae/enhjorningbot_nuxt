<template>
    <div class="card-wrapper">
        <span v-if="management != ''">
            <div class="management-container">
                <div v-if="management.result.board.length > 0" class="board-container">
                    <h2>Board:</h2>
                    <div v-for="member in management.result.board" :key="member.name">
                        <span v-if="member.role == 'FORMAND'">
                            <p>{{ member.name }} (Chairman)</p>
                        </span>
                    </div>
                    <div v-for="member in management.result.board" :key="member.name">
                        <span v-if="member.role == 'BESTYRELSESMEDLEM'">
                            <p>{{ member.name }}</p>
                        </span>
                    </div>
                </div>
                <div class="excutive-container">
                    <h2>Executives:</h2>
                    <div v-for="member in management.result.management" :key="member.name">
                        <span v-if="member.role == 'ADM. DIR.'">
                            <p>{{ member.name }}</p>
                        </span>
                        <span v-if="member.role == 'DIREKTØR'">
                            <p>{{ member.name }}</p>
                        </span>
                    </div>
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
    min-height: 200px;
}

.management-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.board-container,
.excutive-container {
    width: 50%;
}

@media (max-width: 640px) {
    .card-wrapper {
        margin-bottom: 2rem;
        width: 100%;
    }

    .management-container {
        flex-direction: column;
    }

    .board-container,
    .excutive-container {
        width: 100%;
    }
}
</style>

<script setup>
import axios from "axios";
let management = ref("");
const route = useRoute();

onBeforeMount(() => {
    getManagement();
});

const getManagement = async () => {
    let api_url = `https://virk.oaktoad.dk/api/v1/management?cvr=` + route.params.id
    //console.log(api_url)
    const response = await axios.get(api_url, { auth: { username: 'enhjorningbot@gmail.com', password: 'bf7f8df76a4443f2ae6de295f5fd3340' } })
    management.value = response.data;
}
</script>