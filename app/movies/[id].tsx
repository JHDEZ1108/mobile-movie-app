import {
  View,
  Text,
  Image,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

import { icons } from "@/constants/icons";
import useFetch from "@/services/useFetch";
import { fetchMovieDetails } from "@/services/api";

import { useTheme } from '@/context/ThemeProvider'; 
import { ThemeColors } from 'ThemeTypes';

interface MovieInfoProps {
  label: string;
  value?: string | number | null;
}

// Function to create styles
function createStyles(theme: ThemeColors) {
  return StyleSheet.create({
    container: {
      backgroundColor: theme.background,
    },
    text: {
      color: theme.onBackground,
    },
    secondaryText:{
      color: theme.primaryVariant
    },
    playButton:{
      backgroundColor: theme.onPrimary
    },
    buttonText:{
      color: theme.onPrimary
    },
    primaryColor: {
      color: theme.primary
    },
    primaryColorBg: {
      backgroundColor: theme.primary
    },
    surfaceColor: {
      backgroundColor: theme.surface
    }
  });
}

const MovieInfo = ({ label, value }: MovieInfoProps) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View className="flex-col items-start justify-center mt-5">
      <Text style={styles.primaryColor} className="font-bold text-sm">{label}</Text>
      <Text style={styles.secondaryText} className="font-normal text-sm mt-2">
        {value || "N/A"}
      </Text>
    </View>
  );
};

const MovieDetails = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const { theme } = useTheme();
  const styles = createStyles(theme);

  const { data: movie, loading } = useFetch(() =>
    fetchMovieDetails(id as string)
  );

  if (loading)
    return (
      <SafeAreaView style={styles.container} className="flex-1">
        <ActivityIndicator />
      </SafeAreaView>
    );

  return (
    <View style={styles.container} className="flex-1">
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
            }}
            className="w-full h-[550px]"
            resizeMode="stretch"
          />

          <TouchableOpacity style={styles.playButton} className="absolute bottom-5 right-5 rounded-full size-14 flex items-center justify-center">
            <FontAwesome5
              name="play-circle" 
              size={24} 
              style={styles.primaryColor}
            />
          </TouchableOpacity>
        </View>

        <View className="flex-col items-start justify-center mt-5 px-5">
          <Text style={styles.text} className="font-bold text-xl">{movie?.title}</Text>
          <View className="flex-row items-center gap-x-1 mt-2">
            <Text style={styles.secondaryText} className="text-sm">
              {movie?.release_date?.split("-")[0]} •
            </Text>
            <Text style={styles.secondaryText} className="text-sm">{movie?.runtime}m</Text>
          </View>

          <View style={styles.surfaceColor} className="flex-row items-center px-2 py-1 rounded-md gap-x-1 mt-2">
            <Image source={icons.star} className="size-4" />

            <Text style={styles.text} className="font-bold text-sm">
              {Math.round(movie?.vote_average ?? 0)}/10
            </Text>

            <Text style={styles.secondaryText} className="text-sm">
              ({movie?.vote_count} votes)
            </Text>
          </View>

          <MovieInfo label="Overview" value={movie?.overview} />
          <MovieInfo
            label="Genres"
            value={movie?.genres?.map((g) => g.name).join(" • ") || "N/A"}
          />

          <View className="flex flex-row justify-between w-1/2">
            <MovieInfo
              label="Budget"
              value={`$${(movie?.budget ?? 0) / 1_000_000} million`}
            />
            <MovieInfo
              label="Revenue"
              value={`$${Math.round(
                (movie?.revenue ?? 0) / 1_000_000
              )} million`}
            />
          </View>

          <MovieInfo
            label="Production Companies"
            value={
              movie?.production_companies?.map((c) => c.name).join(" • ") ||
              "N/A"
            }
          />
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.primaryColorBg}
        className="absolute bottom-5 left-0 right-0 mx-5 rounded-lg py-3.5 flex flex-row items-center justify-center z-50"
        onPress={router.back}
      >
        <Image
          source={icons.arrow}
          className="size-5 mr-1 mt-0.5 rotate-180"
          tintColor={`${theme.onPrimary}`}
        />
        <Text style={styles.buttonText} className="text-white font-semibold text-base">Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MovieDetails;