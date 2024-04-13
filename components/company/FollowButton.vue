<template>
  <div class="follow-button" @click="followCompany()">
    <span v-if="isLoading">
      <font-awesome-icon :icon="['fas', 'spinner']" spin-pulse />
    </span>
    <span v-if="!isLoading">
      <span v-if="isFollowing">Unfollow</span>
      <span v-else>Follow Company</span>
    </span>
  </div> 
</template>

<script setup>
  const  modal = useModalStore()

  const config = useRuntimeConfig()
  var isLoading = ref(false);
  var isFollowing = ref(false);
  onBeforeMount(() => {
    if (!config.public.isLoggedin) {
      isFollowing.value = false;
    }
    else
    {
    setTimeout(() => {
      isLoading.value = false;
      isFollowing.value = true;
    }, 2000);
  }});

  const followCompany = () => {
    if (!config.public.isLoggedin) {
      modal.openModal()
    }
    else {
      isLoading.value = true;
      setTimeout(() => {
        isLoading.value = false;
        isFollowing.value = !isFollowing.value;
      }, 2000);
    }
  }
</script>

<style scoped>
.follow-button {
  display: flex; /* Turns the button into a flex container */
  justify-content: center; /* Centers children horizontally in the container */
  align-items: center; /* Centers children vertically in the container */
  background-color: #A020F0;
  color: white;
  padding: 10px;
  cursor: pointer;
  height: 50px; /* Ensures the button has a fixed height */
  width: fit-content; /* Optional: Adjusts width based on content size */
  border: none; /* Optional: Removes border if any */
  min-width: 150px; /* Optional: Sets a minimum width */
  margin-left: 20px;
}

.follow-button:hover {
  background-color: #bd53ff;
}
</style>

