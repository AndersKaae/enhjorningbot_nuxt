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
  const config = useRuntimeConfig()
  const modal = useModalStore()
  const loginStore = useLoginStore()

  // Get the current cvr
  const route = useRoute()
  const cvrNo = ref(route.path.split('/').pop())

  var isLoading = ref(false);
  var isFollowing = ref(false);


  const callFollowAPI = async (action) => {
    const requestData = {"email": loginStore.userName , "cvr": cvrNo.value, "action": action};
    isLoading.value = true;
    try {
      const response = await $fetch(`${config.public.apiUrl}/api/v1/follow`, {
        method: 'POST',
        credentials: 'include', // Ensures cookies are sent with the request
        headers: {
          'Content-Type': 'application/json' // Specifies that you're sending JSON
        },
        body: JSON.stringify(requestData) // Converts the JavaScript object into a JSON string
      });

      console.log(response); // Log the response
      // HANDLE GET REQUESTS
      if (requestData.action === "get") {
          if (response.status == 'not_found') {
            isFollowing.value = false;
          }
          else if (response.status == 'found') {
            isFollowing.value = true;
          }
          else {
            console.error('Unexpected response:', response);
          }
      }
    } catch (error) {
      console.error('Failed to call follow API:', error);
      isFollowing.value = false;

    } finally {
      isLoading.value = false;
    }
  };

  onMounted(() => {
    if (loginStore.userName == null) {
      isFollowing.value = false;
    }
    else
    {
    callFollowAPI("get");
    }});

  const followCompany = () => {
    // If NOT LOGGED IN
    if (loginStore.userName == null) {
      modal.openModal()
    }
    else {
     // IF LOGGED IN
     if (isFollowing.value == false) {
        callFollowAPI("set");
        isFollowing.value = true;
        return;
      }
     if (isFollowing.value == true) {
        callFollowAPI("delete");
        isFollowing.value = false;
        return;
      }
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

@media (max-width: 640px) {
  .follow-button {
    margin-top: 1rem; /* Adds space above the button */
    margin-left: 0; /* Removes left margin */
    width: 100%; /* Makes the button full width */
  }
} 

</style>

