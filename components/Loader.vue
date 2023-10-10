<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({
  loaded: Boolean
});

let loaderText = ref("Ponying up the data..."); // Initial text
let counter = 0;

// Function to change the loader text
const changeLoaderText = () => {
  const texts = ["Sprinkeling magic dust...", "Gallevanting across the meadows...", "Wow this is taking a while!", "Zzzz... just kidding still trying!"];
  counter = (counter + 1) % texts.length;
  loaderText.value = texts[counter];
};

let intervalId;

onMounted(() => {
  // Set interval to change the loader text every 2 seconds
  intervalId = setInterval(changeLoaderText, 2000);
});

onBeforeUnmount(() => {
  // Clear interval when component is destroyed
  clearInterval(intervalId);
});
</script>

<template>
  <img v-if="!loaded" src="../assets/loader.gif" alt="Loading..."/>
  <p class="loader-text">{{ loaderText }}</p>
</template>

<style scoped>
  img {
    height: 100px;
    width: auto;
    display: block;
    margin-top: 50px;
    margin-left: auto;
    margin-right: auto;
  }

  .loader-text {
    text-align: center;
    font-size: 1.4rem;
    font-weight: 500;
    margin-top: 20px;
  }
</style>
