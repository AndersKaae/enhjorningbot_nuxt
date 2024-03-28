<script setup>
  const email = ref('')
  const phone = ref('')
  const password = ref('')
  const { signIn } = useAuth()
  const spinner = ref(false)
  const login_failed = ref(false)

  async function signInWithCredentials() {
    spinner.value = true
    const credentials = {
      username: email.value,
      password: password.value
    }
    try {
      // This sends a POST request to the `auth.provider.endpoints.signIn` endpoint with `credentials` as the body
      await signIn(credentials, { callbackUrl: '/protected' })
    } catch (error) {
      // console.error(error) <--- This is a little bit weird. The signIn function expects a token and when it does not get ii, it throws an error. It is unclear to me how to distinquic between potetial real errors and wrong credentials.
      login_failed.value = true
    }
    finally {
      spinner.value = false
    }
  }
</script>
<template>
  <div class="login-form">
    <h1>Enter your credentials</h1>
    <label for="email">Email:</label>
    <input v-model="email" type="email" id="email"/>
    <label for="password">Password:</label>
    <input v-model="password" type="password" id="password"/>
    <button @click="signInWithCredentials()">
      <span v-if="spinner">Loading...</span>
      <span v-else>Sign In</span>
    </button>
    <div class="error-msg" v-if="login_failed">Login failed!</div>
  </div>
</template>

<style scoped>
.login-form {
  max-width: 400px;
  margin: 50px auto;
  padding: 30px;
  box-shadow: 4px 4px 10px 4px rgb(48 0 67 / 30%);
  border-radius: 8px;
  background-color: #faf7fa; 
}

.error-msg {
  color: red;
  text-align: center;
  margin-top: 15px;
}

h1 {
  color: #333;
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
}

input {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  border: 1px solid #ddd;
  box-sizing: border-box; /* Prevents the input from extending beyond its container */
}

button {
  width: 100%;
  padding: 10px;
  background-color: #f8eeff; 
  color: #A020F0;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  border: 1px solid #A020F0;
}

button:hover {
  background-color: #e6c2ff;
}
</style>
