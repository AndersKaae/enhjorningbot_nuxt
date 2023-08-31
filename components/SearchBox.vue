<template>
<div class="search-wrappper">
    <input v-model="message" placeholder="Company name" class="search-input"/>
    <span
      v-if="message != ''"
      class="btn--clear-search-input"
      v-on:click="clearSearchInput()"
      >×</span>
    <div v-if="searchResult.length > 0" class="results-box">
        <div v-for="company in searchResult" :key="company.name" class="result-item">
            <a class="result-link" :href="/company/+ company.cvr">
              {{ company.name }}
            </a>
        </div>
    </div>
</div>
</template>

<script setup>
import axios from "axios";

let message = ref("")
let searchResult = ref([])
let loading = ref(false)

watch(message, (name) => {
  if (name.length > 2 && loading.value == false) {
    loading.value = true
    FetchSearchResult(name)
  }
  if (name.length == 0)
  {
    searchResult.value = []
  }
})

function clearSearchInput(){
  this.message = "";
}

const FetchSearchResult = async (name) => {
  let url = `https://virk.oaktoad.dk/api/v1/search?query=${name}`
  const response = await axios.get(url, {auth: {username: 'enhjorningbot@gmail.com',password: 'bf7f8df76a4443f2ae6de295f5fd3340'}})  
  console.log(url)
  // save response.data.result to searchResult
    searchResult.value = response.data.result
    loading.value = false
}
</script>

<style>
  .result-link{
      text-decoration: none;
      color: black;
  }

  .result-item:hover{
      background-color: #f9eff9;
      cursor: pointer;
  }

  .result-item{
      padding: 0.5rem;
      border-bottom: 1px solid #ddd;
      font-size: 0.9rem;
  }

  .result-item:last-child{
    border-bottom: none;
  }

  .results-box{
      border: 1px solid #ddd;
      border-radius: 5px;
      padding: 0.5rem;
      margin-top: 0.5rem;
      text-align: left;
      position: absolute;
      z-index: 9;
      background-color: #fff;
      width: 100%;
  }

  .search-wrappper {
      height: 100%;
      margin-bottom: 2rem;
      position: relative;
      width: 300px;
      margin-top: auto;
      margin-bottom: auto;
      margin-left: auto;
      margin-right: auto;
  }
  .search-input{
    width: 100%;
    padding: 0.75rem;
    font-size: 1rem;
    border-radius: 5px;
    border: 1px solid #ddd;
  }

  .btn--clear-search-input{
    position: absolute;
    top: 5px;
    right: 15px;
    font-size: 24px;
    color: #888;
  }
  .btn--clear-search-input:hover{
    color: #222;
    cursor: pointer;
  }
  @media (max-width: 640px) {
    .search-wrappper {
      margin-bottom: 2rem;
    }
    .results-box{
      width: 100%;
    }
  }
</style>