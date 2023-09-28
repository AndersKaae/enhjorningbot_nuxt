<script setup>
import { ref, onMounted, onBeforeMount, defineProps, defineEmits } from 'vue'
import axios from "axios";
import Loader from './Loader.vue'
import Company from './CompanyCard.vue'

const props = defineProps({
  loaded: Boolean
});

// Define the event emitter
const emit = defineEmits(['changeLoaded']);

const updateLoaded = (value) => {
  emit('changeLoaded', value);
};

const companiesList = ref([]);
let loadingMore =ref(false);
let firstLoad = true;
let offset = 0;

// Function that feches the data from the API appends it to pokemons constant and console.log the list of pokemons
const fetchCompanies = async (limit) => {
  //console.log('Fetching companies')
  let url = `https://enhjorning.oaktoad.dk/api/v1/enhjorning/feed?offset=${offset}&limit=${limit}&filtered=true`
  const response = await axios.get(url, {auth: {username: 'enhjorningbot@gmail.com',password: 'bf7f8df76a4443f2ae6de295f5fd3340'}})  
  companiesList.value = [...companiesList.value, ...response.data.feed]
  offset += limit + 1
  updateLoaded(true)
  loadingMore.value = false;
  // This function makes sure that we have enought records to fill the screen
  if (firstLoad == true) {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (clientHeight / 35 > companiesList.value.length && firstLoad == true) {
    fetchCompanies(100)
  }
}
  firstLoad = false;
}

// Call the function in onMounted
onMounted(() => {
  fetchCompanies(150)
})

const handleScroll = () => {
  const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

  const footerHeight = document.querySelector('.site-footer').offsetHeight;
  const navbarHeight = document.querySelector('.site-header').offsetHeight;
  let myScrollHeight = scrollHeight
  let isMobile = window.matchMedia("only screen and (max-width: 640px)").matches;

  if (isMobile == true) {
    myScrollHeight = scrollHeight - (footerHeight + navbarHeight) // subtract footer and navbar height from scrollHeight if mobile. Not sure why I have too, but it seems to work.
  }

  //console.log((scrollTop + clientHeight), myScrollHeight)
  if (scrollTop + clientHeight >= myScrollHeight) {
    if (!props.loaded) {
      return; // already loading data, do nothing
    }
    console.log('loading more')
    loadingMore.value = true;
    fetchCompanies(100);
  }
}

// call infinite scroll function
onBeforeMount(() => {
  window.addEventListener('scroll', handleScroll)
  window.addEventListener('touchmove', handleScroll) // Add touchmove event listener for mobile devices
})

</script>

<template>
    <div id="feed" class="feed-wrapper">
      <Loader v-if="!loaded"></Loader>
      <table class="table--feed" v-if="loaded">
        <thead class="feed-header">
          <tr>
            <th class="col-date">Date</th>
            <th class="col-company">Company</th>
            <th class="col-investment">Investment</th>
            <th class="col-valuation">Valuation</th>
            <th class="col-round">Round</th>
          </tr>
        </thead> 
        <tbody class="feed-body">
          <tr v-for="company in companiesList" :key="company.name">
              <Company :company="company"></Company>
          </tr>
        </tbody>
      </table>
      <Loader v-if="loadingMore"></Loader>
    </div>  
</template>

<style scoped>
  .feed-wrapper{
    margin: 0 auto 1em;
    max-width: 960px;
    width: 100%;
  }

  .table--feed{
    border-collapse: collapse;
    width: 100%;
  }

  .table--feed th{
    padding: .5em;
  }

  .col-date,
  .col-company{
    text-align: left;
  }

  .col-investment,
  .col-valuation,
  .col-round{
    text-align: right;
  }

  @media (max-width: 640px) {
    .feed-wrapper{
      padding: 0 1em;
    }
    thead{
      display: none;
    }
    tr{
      border: 1px solid #ddd;
      display: block;
      margin-bottom: 1em;
      padding-bottom: 0.75em;
    }
  }

</style>