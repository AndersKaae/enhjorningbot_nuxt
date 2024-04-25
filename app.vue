<template>
  <div>
    <NavbarBar></NavbarBar>
    <NuxtPage :loaded="loaded" @change-loaded="updateLoaded"></NuxtPage>
    <Footer :loaded="loaded"></Footer>
  </div>
</template>

<script setup>
let loaded = ref(false)
const loginStore = useLoginStore()

const updateLoaded = (value) => {
  loaded.value = value;
};

onMounted(() => {
  if (loginStore.userName == null) {
    const cookieString = document.cookie;
    const cookies = cookieString.split('; ');
    const targetCookie = cookies.find(cookie => cookie.startsWith("user_data="));
    if (targetCookie !== undefined) {
    const decodedValue = decodeURIComponent(targetCookie.split('=')[1]);
    loginStore.setUserName(decodedValue);
    }
  }

  
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
