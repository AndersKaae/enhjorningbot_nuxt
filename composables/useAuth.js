import { ref, watchEffect } from 'vue';

// Function to get a cookie by name
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

// Function to set a cookie
function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days*24*60*60*1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

// Initialize isLoggedIn from cookies or default to false
const isLoggedIn = ref(getCookie('isLoggedIn') === 'true');

// Watch for changes in isLoggedIn and update cookies accordingly
watchEffect(() => {
  setCookie('isLoggedIn', isLoggedIn.value, 7); // Expires in 7 days
});

// Function to log the user in
const login = () => {
  isLoggedIn.value = true;
};

// Function to log the user out
const logout = () => {
  isLoggedIn.value = false;
};

export const useAuth = () => {
  return {
    isLoggedIn,
    login,
    logout,
  };
};
