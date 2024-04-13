import { defineStore } from 'pinia'
export const useModalStore = defineStore('modal', () => {
  const showModal = ref(false)
  function openModal() {
    showModal.value = true
  }
  function closeModal() {
    showModal.value = false
  }
  return { showModal, openModal, closeModal }
})
