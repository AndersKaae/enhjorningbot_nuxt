<template>
  <div>
    <NavbarBar></NavbarBar>
    <NuxtPage :loaded="loaded" @change-loaded="updateLoaded"></NuxtPage>
    <Footer :loaded="loaded"></Footer>
  </div>
</template>

<script setup>
let loaded = ref(false)

const updateLoaded = (value) => {
  loaded.value = value;
};

onMounted(() => {
  document.addEventListener('topInvestorsFetched', (event) => {
    // Update your component's state or props as necessary
    loaded.value = true; // Update loaded state if required
  });
});

useSeoMeta({
  title: 'Enhjørning.bot',
  ogTitle: 'Enhjørning.bot',
  description: 'Explore the Funding Landscape: Discover Angel and Venture Investments in Danish Startups and mature businesses with our comprehensive database.',
  ogDescription: 'Explore the Funding Landscape: Discover Angel and Venture Investments in Danish Startups and mature businesses with our comprehensive database.',
  //ogImage: 'https://example.com/image.png',
  //twitterCard: 'summary_large_image',
})
</script>
