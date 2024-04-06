<script setup>
  const email = ref('')
  const password = ref('')
  const repeat_password = ref('')
  const spinner = ref(false)
  const login_failed = ref(false)
  const userExists = ref(null)
  const password_match = ref(true)
  const password_complex_enough = ref(true)
  const valid_email = ref(true)
  const password_incorrect = ref(false)
  const forgot_password = ref(false)
  const token_created = ref(null)
  const account_created = ref(false)
  const marketing_consent = ref(false)

  import { useCookie } from '#app'

  const login_or_crate_user = ref(true)

  const emit = defineEmits(['update:show-login-modal'])

  const url = 'https://api.enhjorning.bot'
  //const url = 'http://localhost:43690'

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
  const response = await fetch(url + '/api/v1/check_user_exists', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email: email.value })
  })
  const data = await response.json()
  userExists.value = data.exists
  login_or_crate_user.value = false
  spinner.value = false

  }

  async function createUser() {
    spinner.value = true
    const credentials = {
      username: email.value,
      password: password.value,
      marketing_consent: marketing_consent.value
      }

    // Check if the passwords match 
    if (password.value !== repeat_password.value) {
      password_match.value = false
      spinner.value = false
      return
    }
    // Check if the password is complex password_complex_enough
    if (password.value.length < 8) {
      password_complex_enough.value = false
      spinner.value = false
      return
    }
      const response = await fetch('/api/v1/create_user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email.value, password: password.value, marketing_consent: marketing_consent.value})
      })
      const data = await response.json()
      let created_status = data.created
      spinner.value = false
      if (created_status=='user_created') {
        account_created.value = true
      }
      if (created_status=='email_exists') {
        userExists.value = true
      }
  }

const signInWithCredentials = async () => {
  spinner.value = true
  const credentials = {
    username: email.value,
    password: password.value,
  }
  try {
    const response = await fetch(url + '/api/v1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })
    if (!response.ok) {
      throw new Error('Login failed')
    }
    const data = await response.json()

    if (data.access_token) {
      // Use the useCookie composable to manage cookies
      const tokenCookie = useCookie('access_token', {
        path: '/',
        domain: '.enhjorning.bot',
        secure: true,
        sameSite: 'None',

      })
      tokenCookie.value = data.access_token
      emit('update:show-login-modal', false)
    }
    // Handle login success, e.g., redirect or load user data
  } catch (error) {
    console.error('Error during login:', error)
    // Handle login error, e.g., show a message to the user
  } finally {
    spinner.value = false
  }
}


  async function enableForgotPassword() {
    forgot_password.value = true
    password_incorrect.value = false
  }

 async function initiatePasswordReset() {
    spinner.value = true
    const response = await fetch('/api/v1/initiate_reset_password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email.value })
    })
    const data = await response.json()
    spinner.value = false
    token_created.value = data.status
    }

</script>

<template>
  <!-- SELECT LOGIN OR CREATE USER -->
  <div v-if="login_or_crate_user == true">
    <h1>Login or create a user:</h1>
    <label for="email">Email:</label>
    <input v-model="email" type="email" id="email"/>
    <!-- Check if the user exists in the database -->
    <button v-if="userExists==null" @click="checkIfUserExists()" class="main-button">
      <span v-if="spinner">Loading...</span>
      <span v-else>Sign In</span>
    </button>
    <span v-if="!valid_email" class="error-msg">Invalid email!</span>
  </div>
  <!-- PASSWORD LOGIN EXISTING USER -->
  <div v-if="userExists == true && forgot_password == false">
    <h1>Login to your account:</h1>
    <label for="email">Email:</label>
    <input v-model="email" type="email" id="email"/>
    <label for="password">Password:</label>
    <input v-model="password" type="password" id="password"/>
    <div @click="enableForgotPassword()" id="forgotten_pass">
      Forgot your password?
    </div>
    <button @click="signInWithCredentials()" class="main-button">
      <span v-if="spinner">Loading...</span>
      <span v-else>Sign In</span>
    </button>
  </div>
  <!-- PASSWORD RESET -->
  <div v-if="forgot_password == true && token_created == null">
    <h1>Forgotten password:</h1>
    <label for="email">Email:</label>
    <input v-model="email" type="email" id="email"/>
    <div class="buttons-container">
      <button @click="forgot_password = false" class="secondary-button">
        <span>Back</span>
      </button>
      <button @click="initiatePasswordReset()" class="main-button">
        <span v-if="spinner">Loading...</span>
        <span v-else>Reset password</span>
      </button>
    </div>
    <span v-if="token_created != null && token_created != 'success'" class="error-msg">System Error!</span>
    <div v-if="token_created == 'success'">Password reset initiated! Please check you email.</div>
  </div>
  <!-- PASSSWORD RESET CONFIRMATION SCREEN -->
  <div v-if="token_created == 'success'">
    <h1>Password reset initiated!</h1>
    <p>Please check your email for the password reset link.</p>
    <p>The email should arrive in a few minutes. If it has not, please check your spam folder.</p>
  </div>
  <!-- CREATE USER -->
  <div v-if="userExists == false && account_created == false">
    <h1>Create a new user:</h1>
    <label for="email">Email:</label>
    <input v-model="email" type="email" id="email"/>
    <label for="new_password">New Password:</label>
    <input v-model="password" type="password" id="new_password"/>
    <label for="repeat_password">Repeat Password:</label>
    <input v-model="repeat_password" type="password" id="repeat_password"/>
    <input v-model="marketing_consent" type="checkbox" id="consent">
    <label for="consent">Keep me posted on new updates!</label>
    <button @click="createUser()" class="main-button">
      <span v-if="spinner">Loading...</span>
      <span v-else>Create User</span>
    </button>
    <span v-if="!password_match" class="error-msg">Passwords do not match!</span>
    <div class="error-msg" v-if="userExists == true">User already exists!</div>
    <div class="error-msg" v-if="!password_complex_enough">Password must be at least 8 characters long!</div>
  </div>
  <!-- ACCOUNT CREATED -->
  <div v-if="account_created">
    <h1>🎉 Account created! 🎉</h1>
    Congratulations! Your new account was just created. You can now login.
    <div class="success-img">
      <img src="/account_created.webp" alt="Account created" />
    </div>
  </div>

  <!-- ERROR MESSAGES -->
  <div class="error-msg" v-if="login_failed">Login failed!</div>
  <div class="error-msg" v-if="password_incorrect">Password incorrect!</div>
</template>

<style scoped>
#consent,
label[for="consent"] {
  display: inline-block;
  width: auto;
  padding-left: 10px;
}

.success-img {
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
}

img {
  width: 100%;
  max-width: 300px;
}

.buttons-container {
  display: flex;
  justify-content: flex-start; /* Adjust this to center, space-between, etc., as needed */
  gap: 20px;
}

#forgotten_pass {
  padding-bottom: 10px;
  font-size: 12px;
  cursor: pointer;
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

.main-button {
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

.secondary-button {
  width: 50%;
  padding: 10px;
  background-color: white; 
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
