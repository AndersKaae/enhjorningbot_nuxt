// stores/counter.js
import { defineStore } from 'pinia'

export const useModalStore = defineStore('modal', {
  state: () => {
    return { showModal: false }
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    openModal() {
      this.showModal = true
    },
    closeModal() {
      this.showModal = false
    },
  },
})
