export default defineNuxtPlugin(nuxtApp => {
    // Define a function to fetch the data
    const fetchTopInvestors = async () => {
      try {
        const response = await fetch('https://virk.oaktoad.dk/api/v1/top_investors');
        const data = await response.json();
        //console.log(data)
        // If using Vuex to store the data
        // If using an event to communicate with components
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('topInvestorsFetched', { detail: data }));
        }
      } catch (error) {
        console.error('Error fetching top investors:', error);
      }
    };
  
    // Automatically run the fetch operation when the app is initialized
    fetchTopInvestors();
  });
  