<template>
  <div v-if="status === 'authenticated'">
    <div class='login_button' @click="logout()">
      <span>Logout</span>
    </div>
  </div>
  <div v-else>
    <div class='login_button'>
    <router-link to="/login">Login</router-link>
    </div>
  </div>
</template>

<script setup>
const { status, signOut, user } = useAuth()
import { useRouter } from 'vue-router'

const router = useRouter()

const logout = () => {
  signOut({ callbackUrl: '/' })
}

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
