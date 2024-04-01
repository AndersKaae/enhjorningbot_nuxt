
<script setup>
  const route = useRoute();
const token_status = ref(null);
const password = ref('');
const repeat_password = ref('');
const password_match = ref(true);

onBeforeMount(async () => {
  try {
    const response = await fetch('https://enhjorning.oaktoad.dk/api/v1/check_valid_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token: route.query.token })
    });
    const data = await response.json();
    token_status.value = data.status;
  } catch (error) {
    console.error("Fetch error: ", error);
  }
});

const SetNewPassword = async () => {
  if (password.value !== repeat_password.value) {
    password_match.value = false;
    return;
  }
  try {
    const response = await fetch('https://enhjorning.oaktoad.dk/api/v1/set_new_password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token: route.query.token, password: password.value })
    });
    const data = await response.json();
    // Use your data here
    if (data.status === 'success') {
      alert("Password reset successfully");
      navigateTo('/')
    } else {
      alert("Password reset failed");
    }
  } catch (error) {
    console.error("Fetch error: ", error);
  }
};

</script>

<template>
  <div class="container">
    <h1>Reset Password</h1>
    <Loader v-if="token_status === null"></Loader>
    <div v-if="token_status != null">
      <div v-if="token_status === 'success'">
        <p>Please enter your new password:</p>
        <Label for="password">New password:</Label>
        <input v-model="password" type="password" />
        <Label for="password">Repeat new password:</Label>
        <input v-model="repeat_password" type="password" />
        <button @click="SetNewPassword()" class="main-button">Reset password</button>
      </div>
      <div v-else>
        <p>The URL is not valid anymore. Please request a new password reset link.</p>
      </div>
    </div>
    <div v-if="!password_match" class="error-msg">Passwords do not match!</div>
  </div>
</template>

<style scoped>
.container {
  margin: 0 auto 2rem;
  max-width: 560px;
  padding-left: 2rem;
  padding-right: 2rem;
  width: 100%;
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
</style>

