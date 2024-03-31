<script setup>
  const email = ref('')
  const password = ref('')
  const repeat_password = ref('')
  const { signIn } = useAuth()
  const spinner = ref(false)
  const login_failed = ref(false)
  const userExists = ref(null)
  const password_match = ref(true)
  const valid_email = ref(true)
  const password_incorrect = ref(false)

  const emit = defineEmits(['update:show-login-modal'])

  async function checkIfUserExists() {
  spinner.value = true
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email.value)) {
    valid_email.value = false;
    spinner.value = false;
    return;
  } else {
    valid_email.value = true;
  }
  // post email to endpoint and console.log the response 
  const response = await fetch('https://enhjorning.oaktoad.dk/api/v1/check_user_exists', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email: email.value })
  })
  const data = await response.json()
  userExists.value = data.exists
  spinner.value = false

  }

  async function createUser() {
    spinner.value = true
    const credentials = {
      username: email.value,
      password: password.value,
      }

    // Check if the passwords match 
    if (password.value !== repeat_password.value) {
      password_match.value = false
      spinner.value = false
      return
    } else {
      password_match.value = true
    }


      const response = await fetch('https://enhjorning.oaktoad.dk/api/v1/create_user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email.value, password: password.value })
      })
      const data = await response.json()
      let created_status = data.created
      spinner.value = false
      if (created_status=='user_created') {
       signInWithCredentials()
      }
      if (created_status=='email_exists') {
        userExists.value = true
      }
  }

  async function signInWithCredentials() {
    spinner.value = true
    const credentials = {
      username: email.value,
      password: password.value
    }
    try {
      // This sends a POST request to the `auth.provider.endpoints.signIn` endpoint with `credentials` as the body
      await signIn(credentials, { callbackUrl: '/' })
      emit('update:show-login-modal', true)
    } catch (error) {
    // This is what is returned if the password is incorrect 
    if (error.message.includes('Invalid reference token')) {
      password_incorrect.value = true
    } else { 
      login_failed.value = true
    }
    }
    finally {
      spinner.value = false
    }
  }
</script>

<template>
  <h1>Login or create a user:</h1>
  <label for="email">Email:</label>
  <input v-model="email" type="email" id="email"/>
  <span v-if="!valid_email" class="error-msg">Invalid email!</span>
  <!-- Check if the user exists in the database -->
  <button v-if="userExists==null" @click="checkIfUserExists()">
    <span v-if="spinner">Loading...</span>
    <span v-else>Sign In</span>
  </button>
  <div v-if="userExists == true">
    <label for="password">Password:</label>
    <input v-model="password" type="password" id="password"/>
    <div id="forgotten_pass">
      <a href="/forgot_password">Forgot your password?</a>
    </div>
    <div>
      <button @click="signInWithCredentials()">
        <span v-if="spinner">Loading...</span>
        <span v-else>Sign In</span>
      </button>
    </div>
  </div>
  <div v-if="userExists == false">
    <label for="new_password">New Password:</label>
    <input v-model="password" type="password" id="new_password"/>
    <label for="repeat_password">Repeat Password:</label>
    <input v-model="repeat_password" type="password" id="repeat_password"/>
    <span v-if="!password_match" class="error-msg">Passwords do not match!</span>
    <button @click="createUser()">
      <span v-if="spinner">Loading...</span>
      <span v-else>Create User</span>
    </button>
    <div class="error-msg" v-if="userExists == true">User already exists!</div>
  </div>
  <div class="error-msg" v-if="login_failed">Login failed!</div>
  <div class="error-msg" v-if="password_incorrect">Password incorrect!</div>
</template>

<style scoped>
.error-msg {
  color: red;
  text-align: center;
  margin-top: 15px;
}

#forgotten_pass {
  padding-bottom: 10px;
}

#forgotten_pass a {
  text-decoration: none;
  font-size: 12px;
  color: black;
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
