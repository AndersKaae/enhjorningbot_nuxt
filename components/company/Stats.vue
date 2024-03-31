<template>
    <div class="company-stats">
        <div class="company-total-rounds">
            <div>
                <span >
                    <span v-if="increases != undefined && increases.increases.length > 0" class="amount">{{ increases.increases.length - 1 }}</span>
                    <span v-else class="amount">0</span>
                </span>
            </div>
            <div>Rounds</div>
        </div>
        <div class="company-total-funding">
            <div>
                <span v-if="increases != undefined" class="amount">{{ formattedFunding }}</span>
                <span v-else class="amount">0</span>
            </div>
            <div><span class="denomination">DKK</span> in total Funding</div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps(["increases"]);
let total_funding = ref(0); // This ensures total_funding is initialized with a value

const formattedFunding = computed(() => {
    total_funding.value = totalInvestment();
    return (total_funding.value || 0).toLocaleString(); // This ensures that if total_funding.value is undefined, it will default to 0
});

const totalInvestment = () => {
    console.log(props.increases);
    let total = 0;
    if (!props.increases || !props.increases.increases) return total; // Check for potential undefined values

    for (let i = 1; i < props.increases.increases.length; i++) {
        if (props.increases.increases[i].type == "decreased") {
            continue;
        }
        for (let j = 0; j < props.increases.increases[i].virkIncrease.length; j++) {
            total += props.increases.increases[i].virkIncrease[j].investment;
        }
    }
    return total; // Make sure to return the total
}
</script>

<style scoped>
.company-stats {
    display: flex;
    justify-content: space-around;
    margin: 2em 0;
}

.company-total-funding,
.company-total-rounds {
    padding: 2em;
    text-align: center;
}

.amount {
    color: #337592;
    font-size: 4rem;
    font-weight: 700;
}

@media (max-width: 640px) {
    .company-stats {
        flex-direction: column;
    }

    .amount {
        font-size: 2.5rem;
    }
}
</style>