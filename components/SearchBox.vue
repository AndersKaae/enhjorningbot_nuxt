<template>
  <div class="search-wrappper">
    <input v-model="message" placeholder="Seach for a company" class="search-input" />

    <!-- Spinner Element inside search box -->
    <div v-if="loading" class="spinner"></div>

    <span v-if="message != ''" class="btn--clear-search-input" v-on:click="clearSearchInput()">×</span>

    <!-- Results or No Results Message -->
    <div v-if="searchResult.length > 0" class="results-box">
      <div v-for="company in searchResult" :key="company.name" class="result-item">
        <a class="result-link" :href="'/company/' + company.cvr">
          {{ company.name }}
        </a>
      </div>
    </div>
    <div v-if="message != '' && !loading && searchResult.length === 0" class="results-box">
      <div class="result-item">
        No company found.
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import debounce from 'lodash/debounce';

let message = ref("");
let searchResult = ref([]);
let loading = ref(false);

const debouncedFetchSearchResult = debounce((name) => {
  if (name.length > 2) {
    loading.value = true;
    FetchSearchResult(name);
  }
}, 500); // 500 ms delay

watch(message, (newValue) => {
  if (newValue.length == 0) {
    searchResult.value = [];
    loading.value = false;
  } else {
    debouncedFetchSearchResult(newValue);
  }
});

function clearSearchInput() {
  message.value = "";
}

const FetchSearchResult = async (name) => {
  let url = `https://virk.oaktoad.dk/api/v1/search?query=${name}`;
  try {
    const response = await axios.get(url);
    searchResult.value = response.data.result;
  } catch (error) {
    // Handle the error appropriately
    console.error("Error fetching search results:", error);
  } finally {
    loading.value = false;
  }
};
</script>

<style>
.search-wrappper {
  position: relative;
  /* other styles... */
}

.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top-color: #09f;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: spin 1s linear infinite;
  position: absolute;
  top: 50%;
  right: 35px;
  /* Adjust this value based on the size of your search box */
  transform: translateY(-50%);
}

@keyframes spin {
  0% {
    transform: translateY(-50%) rotate(0deg);
  }

  100% {
    transform: translateY(-50%) rotate(360deg);
  }
}

.result-link {
  text-decoration: none;
  color: black;
}

.result-item:hover {
  background-color: #f9eff9;
  cursor: pointer;
}

.result-item {
  padding: 0.5rem;
  border-bottom: 1px solid #ddd;
  font-size: 0.9rem;
}

.result-item:last-child {
  border-bottom: none;
}

.results-box {
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
  width: 500px;
  margin-top: auto;
  margin-bottom: auto;
  margin-left: auto;
  margin-right: auto;
}

.search-input {
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border-radius: 20px;
  border: 1px solid #ddd;
  background-color: #f3f3f3;
  padding-left: 34px; /* Add padding to make space for the icon */
  background-image: url('/magnifying-glass-solid2.svg');
  background-position: 10px center; /* Position the icon */
  background-repeat: no-repeat; /* Prevent the icon from repeating */
  background-size: 16px; /* Adjust the size of the icon */
}

.btn--clear-search-input {
  position: absolute;
  top: 5px;
  right: 15px;
  font-size: 24px;
  color: #888;
}

.btn--clear-search-input:hover {
  color: #222;
  cursor: pointer;
}

@media (max-width: 640px) {
  .search-wrappper {
    margin-bottom: 2rem;
    width: 300px;

  }

  .results-box {
    width: 100%;
  }
}</style>