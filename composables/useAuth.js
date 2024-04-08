import { ref, onMounted } from 'vue';

export default function useAuth(config) {
  const isLoggedIn = ref(false);
  const isLoading = ref(true);
  const userProfile = ref(null);
  const error = ref('');

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

      if (err.response) { // Check if the error object has a response property
        const { status, statusText } = err.response;
        error.value = `Error ${status}: ${statusText}`;
        console.error(`Error verifying session: ${status} ${statusText}`, err);
        // Optionally, inspect and log the response body for more details
        err.response.json().then(body => {
          console.error('Response body:', body);
        }).catch(jsonError => {
          console.error('Error parsing response body:', jsonError);
        });
      } else {
        // Handle non-HTTP errors (e.g., network problems, invalid JSON)
        error.value = 'An error occurred while verifying the session.';
        console.error('Error verifying session:', err.message, err);
      }
    } finally {
      isLoading.value = false;
    }
  };

  onMounted(() => {
    getSession();
  });

  // Exporting reactive state, user profile data, and any error message
  return { isLoggedIn, isLoading, userProfile, error };
}
