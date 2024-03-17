<script setup>
import { ref, onMounted, onBeforeMount } from 'vue'
import axios from "axios";
import Loader from './Loader.vue'
import CompanyCard from './CompanyCard.vue'

const props = defineProps({
  loaded: Boolean
});

// Define the event emitter
const emit = defineEmits(['changeLoaded']);
const checkboxValues = reactive({
    investmentCompany: true,
    holdingCompany: true,
    realestate: true
});

const updateLoaded = (value) => {
  emit('changeLoaded', value);
};

const companiesList = ref([]);
let loadingMore =ref(false);
let firstLoad = true;
let offset = 0;

const handleCheckboxValuesUpdate = (updatedValues) => {
  // Update each property in the checkboxValues object
  for (const key in updatedValues) {
    if (checkboxValues.hasOwnProperty(key)) {
      checkboxValues[key] = updatedValues[key];
    }
  }
  let hideList = []
  if (checkboxValues.holdingCompany == false) {
    hideList.push(64)
    hideList.push(65)
    hideList.push(66)
  }
  if (checkboxValues.realestate == false) {
    hideList.push(68)
    hideList.push(69)
  }  
};

const filteredCompaniesList = computed(() => {
  let hideList = [];
  if (!checkboxValues.holdingCompany) {
    hideList.push(64, 65, 66);
  }
  if (!checkboxValues.realestate) {
    hideList.push(68, 69);
  }

  return companiesList.value.filter(company => {
    let code_int = Number(String(company.business_code).substring(0, 2));
    return !hideList.includes(code_int);
  });
});

// Function that feches the data from the API appends it to pokemons constant and console.log the list of pokemons
const fetchCompanies = async (limit) => {
try {
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
} catch (error) {
 console.error('Error fetching companies:', error);
    // Redirect the user to an error page
    window.location.href = '/500'; 
}
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
      <div v-if="loaded" class="filtering-wrapper">
        <Filtering :checkboxValues="checkboxValues" @update:checkboxValues="handleCheckboxValuesUpdate"></Filtering>
      </div>
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
          <tr v-for="company in filteredCompaniesList" :key="company.name">
            <CompanyCard :company="company"></CompanyCard>
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
    min-width: 110px;
  }

  .col-investment,
  .col-valuation,
  .col-round{
    text-align: right;
  }
  .filtering-wrapper{
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
