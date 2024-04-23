import { ref, onMounted } from 'vue';

export default function useAuth(config) {
  const isLoggedIn = ref(false);
  const isLoading = ref(true);
  const userProfile = ref(null);
  const loginStore = useLoginStore()

  function setCookie(name, value, days) {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }

  const getCookie = async (cookieName) => {
    const cookieString = document.cookie;
    const cookies = cookieString.split('; ');
    const targetCookie = cookies.find(cookie => cookie.startsWith(cookieName + "="));

    if (targetCookie) {
      isLoggedIn.value = true;
    } else {
      isLoggedIn.value = false;

    }
  };

  const getSession = async () => {
    const config = useRuntimeConfig()
    isLoading.value = true;
    try {
      const data = await $fetch(config.public.apiUrl + '/api/v1/session', {
        method: 'GET',
        credentials: 'include', // Ensures cookies are sent with the request
      });

      if (!data) {
        throw new Error('Session invalid or expired');
      }
      userProfile.value = data;
    } catch (err) {
      console.error(err);
      userProfile.value = null;
    } finally {
      isLoading.value = false;
    }
  };

  const logOutUser = () => {
    setCookie('access_token', '', -1);
    loginStore.delUsername()
    navigateTo('/')
  };

  // Exporting reactive state, user profile data, and any error message
  return { isLoggedIn, isLoading, userProfile, logOutUser, getCookie, getSession};
}
