<template>
    <div class="container">
        <Loader v-if="generalInfoData == null"></Loader>
        <div v-else>
            <GeneralInfo :generalInfo="generalInfoData"></GeneralInfo>
            <InvestmentContainer></InvestmentContainer>
            <div class="relations-container">
                <Management></Management>
                <Owners></Owners>
            </div>
            <FiscalData></FiscalData>
        </div>
    </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
const route = useRoute();
const generalInfoData = ref(null);
let loaded = ref(false);

const props = defineProps({
    loaded: Boolean
});

// Define the event emitter
const emit = defineEmits(['changeLoaded']);

const updateLoaded = (value) => {
    emit('changeLoaded', value);
};

onMounted(() => {
    fetchIncreases()
    updateLoaded(true)
})
const fetchIncreases = async () => {
    let api_url = `https://virk.oaktoad.dk/api/v1/company_info?cvr=` + route.params.id
    const response = await axios.get(api_url, { auth: { username: 'enhjorningbot@gmail.com', password: 'bf7f8df76a4443f2ae6de295f5fd3340' } })
    generalInfoData.value = response.data;
        if (generalInfoData.value.cvr == 'Not found') {
        return navigateTo('/404')
    }
};
</script>

<style scoped>
.container {
    margin: 0 auto 2rem;
    max-width: 960px;
    padding-left: 2rem;
    padding-right: 2rem;
    width: 100%;
}

.relations-container {
    margin-bottom: 2rem;
}

.valuation-container {
    width: 100%;
    padding-bottom: 50px;
}

@media (max-width: 640px) {
    .container {
        padding-left: 1rem;
        padding-right: 1rem;
        width: 100%;
    }

    .company-name {
        font-size: 2rem;
        margin-top: 1.5em;
    }

    .relations-container {
        flex-direction: column;
        width: 100%;
    }
}
</style>