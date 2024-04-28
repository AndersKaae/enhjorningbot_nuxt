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
    const userCookie = useCookie('user_data')
    const tokenCookie = useCookie('access_token')
    //setCookie('access_token', '', -1);
    //setCookie('user_data', '', -1);
    userCookie.value = null 
    tokenCookie.value = null 
    loginStore.delUserName()
    navigateTo('/')
  };

  // Exporting reactive state, user profile data, and any error message
  return { isLoggedIn, isLoading, userProfile, logOutUser, getSession};
}
