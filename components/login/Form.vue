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
  const forgot_password = ref(false)
  const token_created = ref(null)
  const account_created = ref(false)
  const marketing_consent = ref(false)

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
      marketing_consent: marketing_consent.value
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

  async function enableForgotPassword() {
    forgot_password.value = true
    password_incorrect.value = false
  }

 async function initiatePasswordReset() {
    spinner.value = true
    const response = await fetch('https://enhjorning.oaktoad.dk/api/v1/initiate_reset_password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email.value })
    })
    const data = await response.json()
    spinner.value = false
    console.log(data)
    token_created.value = data.status
    }

</script>

<template>
  <h1 v-if="forgot_password == false && account_created == false">Login or create a user:</h1>
  <h1 v-if="forgot_password == true && account_created == false">Forgotten password:</h1>
  <h1 v-if="account_created">🎉 Account created! 🎉</h1>
  <div v-if="token_created != 'success' && account_created != true">
    <label for="email">Email:</label>
    <input v-model="email" type="email" id="email"/>
  </div>
  <span v-if="!valid_email" class="error-msg">Invalid email!</span>
  <!-- Check if the user exists in the database -->
  <button v-if="userExists==null" @click="checkIfUserExists()" class="main-button">
    <span v-if="spinner">Loading...</span>
    <span v-else>Sign In</span>
  </button>
  <div v-if="userExists == true && forgot_password == false">
    <label for="password">Password:</label>
    <input v-model="password" type="password" id="password"/>
    <div @click="enableForgotPassword()" id="forgotten_pass">
      Forgot your password?
    </div>
    <div>
      <button @click="signInWithCredentials()" class="main-button">
        <span v-if="spinner">Loading...</span>
        <span v-else>Sign In</span>
      </button>
    </div>
  </div>
  <!-- PASSWORD REST -->
  <div v-if="forgot_password == true && token_created != 'success'" class="buttons-container">
    <button @click="forgot_password = false" class="secondary-button">
      <span>Back</span>
    </button>
    <button @click="initiatePasswordReset()" class="main-button">
      <span v-if="spinner">Loading...</span>
      <span v-else>Reset password</span>
    </button>
    <span v-if="token_created != null && token_created != 'success'" class="error-msg">System Error!</span>
  </div>
  <div v-if="token_created == 'success'">Password reset initiated! Please check you email.</div>

  <!-- CREATE USER -->
  <div v-if="userExists == false && account_created == false">
    <label for="new_password">New Password:</label>
    <input v-model="password" type="password" id="new_password"/>
    <label for="repeat_password">Repeat Password:</label>
    <input v-model="repeat_password" type="password" id="repeat_password"/>
    <span v-if="!password_match" class="error-msg">Passwords do not match!</span>
    <input v-model="marketing_consent" type="checkbox" id="consent">
    <label for="consent">Keep me posted on new updates!</label>
    <button @click="createUser()" class="main-button">
      <span v-if="spinner">Loading...</span>
      <span v-else>Create User</span>
    </button>
    <div class="error-msg" v-if="userExists == true">User already exists!</div>
  </div>
  <div v-if="account_created">
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
  max-width: 400px;
}

img {
  width: 100%;
  max-width: 400px;
}

.buttons-container {
  display: flex;
  justify-content: start; /* Adjust this to center, space-between, etc., as needed */
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
