<script setup>
import { ref } from 'vue'

const userProfile = ref(null)
const error = ref(null)

const getSession = async () => {
  try {
    const data = await $fetch('https://api.enhjorning.bot/api/v1/session', {
      method: 'GET',
      credentials: 'include', // Ensure cookies are sent with the request
    })

    if (!data) {
      throw new Error('Session invalid or expired')
    }

    userProfile.value = data
  } catch (err) {
    error.value = err.message
    console.error('Error verifying session:', err.message)
  }
}
</script>

<template>
  <button @click="getSession">Get session data</button>
</template>

