<template>
  <!-- you'll need to handle a loading state -->
  <div v-if="pending">
    <div class="loader">Loading ...</div>
  </div>
  <div class="container investments" v-else>
    <div v-for="post in posts['feed']">
        <feed-card />
    </div>
  </div>
</template>

<script setup>
  const { pending, data: posts } = useLazyFetch('https://enhjorningbotapi-production.up.railway.app/api/v1/enhjorning/feed?page=1&filtered=true')
  watch(posts, (newPosts) => {
    // Because posts starts out null, you won't have access
    // to its contents immediately, but you can watch it.
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
.loader{
  font-size: 20px;
  padding-top: 20px;
  text-align: center;
}
</style>
