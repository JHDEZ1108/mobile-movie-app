import { useState, useEffect } from "react";

// Define a custom hook 'useFetch' that handles fetching data, managing state, and lifecycle for async operations.
const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch = true) => {
  // State hooks to manage the data, loading status, and any errors
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Async function to execute the fetching process
  const fetchData = async () => {
    try {
      setLoading(true); // Set loading before the operation
      setError(null); // Clear previous errors

      const result = await fetchFunction(); // Execute the passed fetch function
      setData(result); // Update state with the result of the fetch
    } catch (err) {
      // Handle any errors that occur during the fetch
      setError(
        err instanceof Error ? err : new Error("An unknown error occurred")
      );
    } finally {
      setLoading(false); // Ensure loading is set to false after fetch completes
    }
  };

  // Function to reset the state back to initial values
  const reset = () => {
    setData(null);
    setError(null);
    setLoading(false);
  };

  // useEffect hook to trigger the fetch operation when the component mounts if autoFetch is true
  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, []);

  // Return the state data, loading and error states, and functions for refetching and resetting
  return { data, loading, error, refetch: fetchData, reset };
};

export default useFetch;  // Export the hook for reuse in other components
