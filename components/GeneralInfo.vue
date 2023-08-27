<template>
    <div class="info-box">
        <span class="company-info-item">CVR-no.: <strong>{{ company.cvr }}</strong></span>
        <span class="company-info-item">Founded: <strong>{{ company.increases[0].validFrom }}</strong></span>
        <span class="company-info-item">Industry: <strong>{{ company.businessCode }}</strong></span>
        <template v-if="company.Website != null">
            <span class="company-info-item">Website: <strong>{{ company.Website }}</strong></span>
        </template>
        <span class="company-info-item">Adress:  <strong>[missing from API]</strong></span>
        <span class="company-info-item">Employees:  <strong>[missing from API]</strong></span>
    </div>

    <div class="company-stats">
        <div class="company-total-rounds">
            <div>
                <soan class="amount">{{ company.increases.length -1 }}</soan>
            </div>
            <div>Rounds</div>
        </div>
        <div class="company-total-funding">
            <div>
                <span class="denomination">DKK</span>
                <span class="amount">{{ formattedFunding }}</span> 
            </div>
            <div>In total Funding</div>
        </div>
    </div>

</template>

<style scoped>

    .company-stats{
        display: flex;
        justify-content: space-around;
        margin: 2em 0;
    }

    .company-total-funding,
    .company-total-rounds{
        padding: 2em;
        text-align: center;
    }

    .amount{
        color: #337592;
        font-size: 4rem;
        font-weight: 700;
    }


    .company-info-item{
        margin-right: 1em;
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