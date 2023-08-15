<template>
    <div class="card-wrapper">
        <h2>Management:</h2>
        <div class="management-container">
            <div class="board-container">
                <h3>Board:</h3>
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
                <h3>Executives:</h3>
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
    position: relative;
    z-index: 2;
    max-width: 45%;
    padding: 0 1.25rem 1.25rem;
    flex: 2;
}

.management-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.board-container {
  width: 50%;
}
.excutive-container {
  width: 50%;
}
</style>

<script setup>
const props = defineProps(["company"]);
</script>