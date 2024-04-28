import { ref, onMounted } from 'vue';

export default function useAuth(config) {
  const isLoggedIn = ref(false);
  const isLoading = ref(true);
  const userProfile = ref(null);

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

    // Exporting reactive state, user profile data, and any error message
  return { isLoggedIn, isLoading, userProfile, getSession};
}
