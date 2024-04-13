<template>
  <div v-if="show_login_modal" class="modal" @click.self="modal.closeModal()" tabindex="-1">
    <div class="modal-content" @click.stop>
      <button @click="modal.closeModal()" class="close-button">&times;</button>
      <slot>
        <LoginForm></LoginForm>
      </slot>
    </div>
  </div>
</template>

<script setup>
const show_login_modal = ref(false);
const  modal = useModalStore()

watch(() => modal.showModal, (value) => {
  show_login_modal.value = value;
})

</script>


<style scoped>
.modal {
  display: block;
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0,0,0,0.5);
  padding-top: 100px;
}

.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 30%;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
  animation-name: animatetop;
  animation-duration: 0.4s;
  min-height: 200px;
  width: 500px;
}

  @keyframes animatetop {
    from {top: -300px; opacity: 0}
    to {top: 0; opacity: 1}
  }

  .modal-header, .modal-footer {
    padding: 2px 16px;
  }

  .close-button {
    color: grey;
    background-color: transparent; /* Example to remove any background color */
    border: none; /* Example to remove the border */
    float: right;
    font-size: 28px;
    font-weight: 100;
  }

  .close-button:hover,
  .close-button:focus {
    color: #000;
    text-decoration: none;
    cursor: pointer;
  }

  .modal-footer {
    background-color: #f9f9f9;
    text-align: right;
  }
  @media (max-width: 640px) {
    .modal-content {
      width: 95%;
    }
  }
</style>
