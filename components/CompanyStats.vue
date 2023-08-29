<template>
    <div class="company-stats">
        <div class="company-total-rounds">
            <div>
                <span class="amount">{{ company.increases.length -1 }}</span>
            </div>
            <div>Rounds</div>
        </div>
        <div class="company-total-funding">
            <div>
                <span class="amount">{{ formattedFunding }}</span> 
            </div>
            <div><span class="denomination">DKK</span> in total Funding</div>
        </div>
    </div>
</template>

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

    @media (max-width: 640px){
        .company-stats{
            flex-direction: column;
        }
        .amount{
            font-size: 2.5rem;
        }
    }
</style>