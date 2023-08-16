<template>
    <div class="card-wrapper">
        <h2>Owners (above 5 %):</h2>
        <div v-for="owner in ownerList" :key="owner.name">
            <span v-if="owner.active == true" class="owner-container">
                <span class="name-container">
                    <p>{{ owner.name }}</p>
                </span>
                <span class="ownership-container">
                    <span><p>{{ calculateOwnership(owner.percentage) }} %</p></span>
                </span>
            </span>
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
    padding: 0 1.25rem 1.25rem;
    margin-top: 50px;
    margin-bottom: 50px;
}
.owner-container {
    display: flex;
    display: inline-flex;
}
.name-container {
    flex: 1;
    width: auto;
}

.owner-container {
    width: 40%;
    flex: 2;
}
</style>

<script setup>
const props = defineProps(["owners"]);
var ownerList = ref([])

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
    if (value == 0.15){
        return '15 - 19.99';
    }
    if (value == 0.10){
        return '10 - 14.99';
    }
    if (value == 0.05){
        return '5 - 9.99';
    }
    if (value ) {
        return 'Under 5';
    }
    return value;
};
onBeforeMount(() => {
    parseOwnerData(props.owners)
});

const parseOwnerData = (ownerData) => {
    //console.log(ownerData)
    for (let i = 0; i < ownerData.length; i++) {
        let ownerObject = {name: ownerData[i].name, percentage: 0, active: false};
        for (let j = 0; j < ownerData[i].values.length; j++) {
            if (ownerData[i].values[j].validTo == 'None') {
                ownerObject.active = true;
                ownerObject.percentage = ownerData[i].values[j].ownerPercentage;
            }
        }
        ownerList.value.push(ownerObject);
    }
};

</script>