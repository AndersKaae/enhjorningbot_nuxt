<template>
<div v-if="pending">
    <loader />
</div>
<div class="container investments" v-else>
    <CompanyBody />
</div> 
</template>

<script setup>
    const route = useRoute()
    const { pending, data: company } = useLazyFetch(`https://enhjorningbotapi-production.up.railway.app/api/v1/enhjorning/company?cvr=${route.params.cvr}`)
</script>