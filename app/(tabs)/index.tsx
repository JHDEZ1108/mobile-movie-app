import React from 'react';
import { StyleSheet, View, Image, ScrollView, ActivityIndicator, Text, FlatList } from 'react-native';
import { useRouter } from "expo-router";
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTheme } from '@/context/ThemeProvider'; 
import ThemeToggle from '@/components/ThemeToggle';
import { ThemeColors } from 'ThemeTypes';

import SearchBar from '@/components/SearchBar';
import MovieCard from '@/components/MovieCard';
import TrendingCard from "@/components/TrendingCard";

import useFetch from '@/services/useFetch';
import { fetchMovies } from "@/services/api";
import { getTrendingMovies } from "@/services/appWrite";

export default function Index() {
  const router = useRouter();
  const { theme } = useTheme();
  const styles = createStyles(theme);
  
  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchMovies({ query: "" }));
  
  const {
    data: trendingMovies,
    loading: trendingLoading,
    error: trendingError,
  } = useFetch(getTrendingMovies);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
        <ThemeToggle />
      </View>
      <View className="flex-1">
        <ScrollView
          className="flex-1 px-5"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
        >
          <View className='flex-1 mt-5'>
            {moviesLoading || trendingLoading ? (
              <ActivityIndicator
                size="large"
                color={theme.primary}
                className="mt-10 self-center"
              />
          ) : moviesError || trendingError ? (
            <Text>Error: {moviesError?.message}</Text>
          ) : (
            <View className="flex-1 mt-5">
              <SearchBar
                onPress={() => {
                  router.push("/search");
                }}
                placeholder="Search for a movie"
              />
              {trendingMovies && (
                <View className="mt-10">
                  <Text style={styles.text} className="text-lg font-bold mb-3">
                    Trending Movies
                  </Text>
                  <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    className="mb-4 mt-3"
                    data={trendingMovies}
                    contentContainerStyle={{
                      gap: 26,
                    }}
                    renderItem={({ item, index }) => (
                      <TrendingCard movie={item} index={index} />
                    )}
                    keyExtractor={(item) => item.movie_id.toString()}
                    ItemSeparatorComponent={() => <View className="w-4" />}
                  />
                </View>
              )}
              <>
                <Text style={styles.text} className="text-lg font-bold mt-5 mb-3">
                  Latest Movies
                </Text>
                <FlatList
                  data={movies}
                  renderItem={({ item }) => <MovieCard {...item} />}
                  keyExtractor={(item) => item.id.toString()}
                  numColumns={3}
                  columnWrapperStyle={{
                    justifyContent: "flex-start",
                    gap: 20,
                    paddingRight: 5,
                    marginBottom: 10,
                  }}
                  className="mt-2 pb-32"
                  scrollEnabled={false}
                />
              </>
            </View>
          )}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

// Function to create styles
function createStyles(theme: ThemeColors) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 12,
      width: '100%',
      borderBottomWidth: 1,
      borderBottomColor: theme.surface,
    },
    logo: {
      width: 100, 
      height: 40,  
      resizeMode: 'contain',
    },
    content: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      color: theme.onBackground,
    },
  });
}
