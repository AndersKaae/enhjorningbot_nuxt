export default function useModal() {
  const isModal = ref(false);

  const openModal = () => {
    isModal.value = true;
  };

  const closeModal = () => {
    isModal.value = false;
  };

  return { isModal, openModal, closeModal };
}
