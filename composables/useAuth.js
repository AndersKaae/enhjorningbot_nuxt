import { ref, onMounted } from 'vue';

export default function useAuth(config) {
  const isLoggedIn = ref(false);
  const isLoading = ref(true);
  const userProfile = ref(null);

  const getSession = async () => {
    isLoading.value = true;
    try {
      const data = await $fetch(config.public.apiUrl + '/api/v1/session', {
        method: 'GET',
        credentials: 'include', // Ensures cookies are sent with the request
      });

      if (!data) {
        throw new Error('Session invalid or expired');
      }

      isLoggedIn.value = true;
      userProfile.value = data;
    } catch (err) {
      isLoggedIn.value = false;
      userProfile.value = null;
    } finally {
      isLoading.value = false;
    }
  };

  const logInUser = () => {
    isLoggedIn.value = true;
    console.log('isLoggedIn changed to:', 'true');
  };

  const logOutUser = () => {
    isLoggedIn.value = false;
  };

  onMounted(() => {
    getSession();
  });

  // Exporting reactive state, user profile data, and any error message
  return { isLoggedIn, isLoading, userProfile, logInUser, logOutUser};
}
