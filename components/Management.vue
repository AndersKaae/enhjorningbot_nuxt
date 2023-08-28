<template>
    <div class="card-wrapper">
        <div class="management-container">
            <div v-if="company.board.length > 0" class="board-container">
                <h2>Board:</h2>
                <div v-for="member in company.board" :key="member.name">
                    <span v-if="member.role == 'FORMAND' && member.validTo == 'None'">
                        <p>{{ member.name }} (Chairman)</p>
                    </span>
                </div>
                <div v-for="member in company.board" :key="member.name">
                    <span v-if="member.role == 'BESTYRELSESMEDLEM' && member.validTo == 'None'">
                        <p>{{ member.name }}</p>
                    </span>
                </div>
            </div>
            <div class="excutive-container">
                <h2>Executives:</h2>
                <div v-for="member in company.ceo" :key="member.name">
                    <span v-if="member.role == 'ADM. DIR.' && member.validTo == 'None'">
                        <p>{{ member.name }}</p>
                    </span>
                    <span v-if="member.role == 'DIREKTØR' && member.validTo == 'None'">
                        <p>{{ member.name }}</p>
                    </span>
                </div>
            </div>
        </div>
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

    .management-container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .board-container,
    .excutive-container {
        width: 50%;
    }
    @media (max-width: 640px){
        .card-wrapper{
            margin-bottom: 2rem;
            width: 100%;
        }
        .management-container{
            flex-direction: column;
        }
        .board-container,
        .excutive-container{
            width: 100%;
        }
    }
</style>

<script setup>
const props = defineProps(["company"]);
</script>