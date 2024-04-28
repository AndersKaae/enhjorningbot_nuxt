<template>
  <div v-if="loginStore.userName != null">
    <div class='login_button' @click="logout_session()">
      <span>Logout</span>
    </div>
  </div>
  <div v-else>
    <div class='login_button' @click="modalStore.openModal()">
      <span>Login</span>
    </div>
  </div>
</template>

<script setup>
const config = useRuntimeConfig()

const modalStore = useModalStore()
const loginStore = useLoginStore()

const logout_session = () => {
  const userCookie = useCookie('user_data')
    const tokenCookie = useCookie('access_token')
    console.log(userCookie.value, tokenCookie.value)
    userCookie.value = null 
    tokenCookie.value = null 
    console.log(userCookie.value, tokenCookie.value)
    loginStore.delUserName()
    navigateTo('/')
};

</script>

<style scoped>
  .userIcon {
    background-color: #A020F0;
    background-size: cover;
    width: 50px;
    height: 50px;
    border-radius: 30%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 22px;
    color: white;
  }
  .login_button {
    border: 1px solid #A020F0;
    padding: 10px;
    text-decoration: none;
    color: #A020F0;
    /* Use the click cursor */
    cursor: pointer;
  }

  .login_button a {
    text-decoration: none;
    color: #A020F0;
  }
</style>
