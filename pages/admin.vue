<script setup>
import { ref } from 'vue'

const userProfile = ref(null)
const error = ref(null)

const url = 'https://api.enhjorning.bot'
//const url = 'http://localhost:43690'


const getSession = async () => {
  try {
    const data = await $fetch(url + '/api/v1/session', {
      method: 'GET',
      credentials: 'include', // Ensure cookies are sent with the request
    });

    if (!data) {
      throw new Error('Session invalid or expired');
    }

    userProfile.value = data;
  } catch (err) {
    // Assuming $fetch provides an error object similar to the Fetch API
    if (err.response) { // Check if the error object has a response property
      const { status, statusText } = err.response;
      error.value = `Error ${status}: ${statusText}`;
      console.error(`Error verifying session: ${status} ${statusText}`, err);
      // Optionally, inspect and log the response body for more details
      err.response.json().then(body => {
        console.error('Response body:', body);
      }).catch(jsonError => {
        console.error('Error parsing response body:', jsonError);
      });
    } else {
      // Handle non-HTTP errors (e.g., network problems, invalid JSON)
      error.value = 'An error occurred while verifying the session.';
      console.error('Error verifying session:', err.message, err);
    }
  }
};
</script>

<template>
  <button @click="getSession">Get session data</button>
</template>

