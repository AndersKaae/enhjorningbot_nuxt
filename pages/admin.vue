<script setup>

async function get_session_data() {
  const response = await fetch('https://enhjorning.oaktoad.dk/api/v1/session', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include' // Include cookies with the request
  })
  const data = await response.json()
  console.log(data)

}</script>

<template>
  <button @click="get_session_data">Get session data</button>

</template>
