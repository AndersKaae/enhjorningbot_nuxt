import { defineStore } from 'pinia'

export const useLoginStore = defineStore('login', () => {

  const userName = ref(null)

  function setUsername(username) {
    userName.value = username  
  }

  function delUsername() {
    userName.value = null 
  }

  return { userName, setUsername, delUsername }
})
