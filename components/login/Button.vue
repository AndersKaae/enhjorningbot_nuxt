<template>
  <div v-if="isLoading == false">
    <div v-if="isLoggedIn == true">
      <div class='login_button' @click="logout_session()">
        <span>Logout</span>
      </div>
    </div>
    <div v-else>
      <div class='login_button' @click="modal.openModal()">
        <span>Login</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const config = useRuntimeConfig()

const  modal = useModalStore()

const { isLoggedIn, isLoading, logOutUser } = useAuth(config)

const logout_session = () => {
  // Function to set a cookie
  function setCookie(name, value, days) {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }

  // Delete 'access_token' cookie by setting its expiration to a past date
  setCookie('access_token', '', -1);
  logOutUser();
  // Assuming `router` is available in the scope, redirect to the homepage
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
