<template>
  <!-- you'll need to handle a loading state -->
  <div v-if="pending">
    <loader />
  </div>
  <div class="container investments" v-else>
    <div v-for="item in companies['feed']">
      <feed-card :companyData = "item" />
    </div>
  </div>
</template>

<script setup>
  const { pending, data: companies } = useLazyFetch('https://enhjorningbotapi-production.up.railway.app/api/v1/enhjorning/feed?page=1&filtered=true')
  watch(companies, (newPosts) => {
    console.log(newPosts['feed'].length)
})
</script>

<style scoped>
.container {
    margin: 0 auto;
    max-width: 1100px;
    padding-left: 11px;
    padding-right: 11px;
    position: relative;
}
.container.investments {
    padding-top: 3rem;
}
.investments .investment__ownership {
    padding: 0 1.25rem;
    text-align: center;
}
.investments .investment-box-title {
    font-weight: 400;
    margin-bottom: 1.25rem/2;
}
.investments .investment__content {
    display: flex;
    justify-content: space-between;
    padding-bottom: 1.875rem;
}
</style>
