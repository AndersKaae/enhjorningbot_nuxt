<template>
    <div class="card-wrapper">
        <h2>Overview:</h2>
        <p>CVR-no.: {{ company.cvr }}</p>
        <p>Founded: {{ company.increases[0].validFrom }}</p>
        <p>Industry: {{ company.businessCode }}</p>
        <span v-if="company.Website != null">
        <p>Website: {{ company.Website }}</p>
        </span>
        <span v-else>
            Website: Not provided
        </span>
        <p>Number of rounds: {{ company.increases.length -1 }}</p>
        <p>Total Funding Amount: DKK {{ formattedFunding }}</p>
        <p>Adress: [missing from API]</p>
        <p>Employees: [missing from API]</p>
    </div>
</template>

<style scoped>
    .card-wrapper{
        background-color: #fff;
        border: 1px solid #ddd;
        box-shadow: 0 0 15px #0000001a;
        position: relative;
        z-index: 2;
        max-width: 45%;
        padding: 0 1.25rem 1.25rem;
        flex: 1;
        margin-right: 50px
    }
</style>

<script setup>

    const props = defineProps(["company"]);
    let total_funding = ref(0);
    onBeforeMount(() => {
        totalInvestment();
    });

    const formattedFunding = computed(() => {
        return total_funding.value.toLocaleString();
    });

    // write an arrow function that loops over the capital increases and return the total investment
    const totalInvestment = () => {
        let total = 0;
        for (let i = 1; i < props.company.increases.length; i++) {
            if (props.company.increases[i].type == "decreased") {
                continue;
            }
            for (let j = 0; j < props.company.increases[i].virkIncrease.length; j++) {
                total += props.company.increases[i].virkIncrease[j].investment;
            }
        }
        total_funding.value = total;
    }

</script>