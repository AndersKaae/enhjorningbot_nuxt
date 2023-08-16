<script setup lang="ts">
const route = useRoute()
const props = defineProps({
  loaded: Boolean
});
</script>

<template>
  <Feed :loaded="loaded"></Feed>
</template>
