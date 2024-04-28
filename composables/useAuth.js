import { ref, onMounted } from 'vue';

export default function useAuth(config) {
  const isLoggedIn = ref(false);
  const isLoading = ref(true);
  const userProfile = ref(null);
  const loginStore = useLoginStore()

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
    console.log(userCookie.value, tokenCookie.value)
    userCookie.value = null 
    tokenCookie.value = null 
    console.log(userCookie.value, tokenCookie.value)
    loginStore.delUserName()
    navigateTo('/')
  };

  // Exporting reactive state, user profile data, and any error message
  return { isLoggedIn, isLoading, userProfile, logOutUser, getSession};
}
