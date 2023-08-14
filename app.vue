<template>
  <div>
    <Navbar></Navbar>
      <NuxtPage :loaded="loaded" @change-loaded="updateLoaded"></NuxtPage>
    <Footer :loaded="loaded"></Footer>
  </div>
</template>

<script setup>
  let loaded = ref(false)

  const updateLoaded = (value) => {
    loaded.value = value;
  };
</script>