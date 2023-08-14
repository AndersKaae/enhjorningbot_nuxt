<template>
    <div class="card-wrapper">
        <h2>Management:</h2>
        <h3>Board:</h3>
        <p>Chairman:</p>
        <div v-for="member in company.board" :key="member.name">
            <span v-if="member.role == 'FORMAND' && member.validTo == 'None'">
                <p>{{ member.name }}</p>
            </span>
        </div>
        <p>Board Members:</p>
        <div v-for="member in company.board" :key="member.name">
            <span v-if="member.role == 'BESTYRELSESMEDLEM' && member.validTo == 'None'">
                <p>{{ member.name }}</p>
            </span>
        </div>
    </div>
</template>

<style scoped>
    .card-wrapper{
        background-color: #fff;
        border: 1px solid #ddd;
        box-shadow: 0 0 15px #0000001a;
        position: relative;
        z-index: 2;
        max-width: 40%;
        padding: 0 1.25rem 1.25rem;
        flex: 2;
    }
</style>

<script setup>
const props = defineProps(["company"]);
</script>