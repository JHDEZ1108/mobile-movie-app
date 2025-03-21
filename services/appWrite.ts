import { Client, Databases, ID, Query } from "react-native-appwrite";

// Environment variables for database and collection IDs
const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;

// Set up Appwrite client with the endpoint and project ID from environment variables
const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

// Initialize the database service with the configured client
const database = new Databases(client);

// Updates the search count in the database for a given movie and query
export const updateSearchCount = async (query: string, movie: Movie) => {
  try {
    // Search for documents that match the given query string
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("searchTerm", query),
    ]);

    // Check if the document already exists
    if (result.documents.length > 0) {
      const existingMovie = result.documents[0];
      // Increment the count of the existing document
      await database.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        existingMovie.$id,
        {
          count: existingMovie.count + 1,
        }
      );
    } else {
      // Create a new document if no existing document matches the search term
      await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchTerm: query,
        movie_id: movie.id,
        title: movie.title,
        count: 1,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      });
    }
  } catch (error) {
    console.error("Error updating search count:", error);
    throw error;
  }
};

// Retrieves the top trending movies based on the count of searches
export const getTrendingMovies = async (): Promise<TrendingMovie[] | undefined> => {
  try {
    // List documents sorted by descending count, limiting to the top 5
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.limit(5),
      Query.orderDesc("count"),
    ]);

    // Convert the results to TrendingMovie array type
    return result.documents as unknown as TrendingMovie[];
  } catch (error) {
    console.error(error);
    return undefined;
  }
};
