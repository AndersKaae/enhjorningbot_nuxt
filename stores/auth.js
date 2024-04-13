import { defineStore } from 'pinia'
export const useauthStore = defineStore('modal', () => {
const isLogIn = ref(false)
function logIn() {
isLogIn.value = true
}
function logOut() {
isLogIn.value = false
}
  return { isLogIn, logIn, logOut }
})

