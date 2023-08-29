<script setup>
const props = defineProps({
  loaded: Boolean
});
</script>

<template>
  <img v-if="!loaded" src="../assets/loader.gif" alt="Loading..."/>
</template>

<style scoped>
  img {
    height: 100px;
    width: auto;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
</style>
