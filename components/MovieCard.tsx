import { Link, RelativePathString } from "expo-router";
import { Text, Image, TouchableOpacity, View, StyleSheet } from "react-native";
import { useTheme } from '@/context/ThemeProvider'; 
import { ThemeColors } from "ThemeTypes";

import { icons } from "@/constants/icons";

const MovieCard = ({
  id,
  poster_path,
  title,
  vote_average,
  release_date,
}: Movie) => {

  const { theme } = useTheme();
  const styles = createStyles(theme);
  
  // Function to create styles
  function createStyles(theme: ThemeColors) {
    return StyleSheet.create({
      text: {
        color: theme.onBackground,
      },
      secondaryText: {
        color: theme.disabled,
      }
    });
  }

  return (
    <Link href={`/movie/${String(id)}` as RelativePathString} asChild>
      <TouchableOpacity className="w-[30%]">
        <Image
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : "https://placehold.co/600x400/1a1a1a/FFFFFF.png",
          }}
          className="w-full h-52 rounded-lg"
          resizeMode="cover"
        />

        <Text style={styles.text} className="text-sm font-bold mt-2" numberOfLines={1}>
          {title}
        </Text>

        <View className="flex-row items-center justify-between">
          <Text style={styles.secondaryText} className="text-xs font-medium mt-1">
            {release_date?.split("-")[0]}
          </Text>
          
          <View className="flex-row items-center justify-start gap-x-1">
            <Image source={icons.star} className="size-4" />
            <Text style={styles.text} className="text-xs font-bold uppercase">
              {Math.round(vote_average / 2)}
            </Text>
          </View>
          
          <Text style={styles.secondaryText} className="text-xs font-medium ">
            Movie
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;