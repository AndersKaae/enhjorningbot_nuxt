import { defineStore } from 'pinia'

export const useLoginStore = defineStore('login', () => {

  const userName = ref(null)

  function setUserName(username) {
    userName.value = username  
  }

  function delUserName() {
    userName.value = null 
  }

  return { userName, setUserName, delUserName }
})
