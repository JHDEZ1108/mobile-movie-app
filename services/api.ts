// Configuration for The Movie Database API
export const TMDB_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3", // Base URL of the TMDB API
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY, // API key, stored in environment variables for security
  headers: {
    accept: "application/json", // Ensures that the server sends back JSON-formatted responses
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`, // Authorization header using a bearer token
  },
};

// Fetches a list of movies based on a query or gets popular movies if no query is provided
export const fetchMovies = async ({
  query,
}: {
  query: string;
}): Promise<Movie[]> => {
  // Determines the endpoint to use based on whether a search query is provided
  const endpoint = query
    ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}` // URL for searching movies by query
    : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`; // URL for discovering popular movies

  // Makes a GET request to the endpoint using the predefined headers
  const response = await fetch(endpoint, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  // Throws an error if the response is not OK
  if (!response.ok) {
    throw new Error(`Failed to fetch movies: ${response.statusText}`);
  }

  // Parses the JSON response and returns the results
  const data = await response.json();
  return data.results;
};

// Fetches detailed information for a specific movie by its ID
export const fetchMovieDetails = async (
  movieId: string
): Promise<MovieDetails> => {
  try {
    // Fetches data from TMDB for a specific movie using its ID
    const response = await fetch(
      `${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}`,
      {
        method: "GET",
        headers: TMDB_CONFIG.headers,
      }
    );

    // Checks response status and throws an error if not OK
    if (!response.ok) {
      throw new Error(`Failed to fetch movie details: ${response.statusText}`);
    }

    // Parses the JSON response and returns it
    const data = await response.json();
    return data;
  } catch (error) {
    // Logs and rethrows the error for further handling
    console.error("Error fetching movie details:", error);
    throw error;
  }
};
