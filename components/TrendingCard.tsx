import { Link, RelativePathString } from "expo-router";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

import { useTheme } from '@/context/ThemeProvider'; 
import { ThemeColors } from 'ThemeTypes';

const TrendingCard = ({
  movie: { movie_id, title, poster_url },
  index,
}: TrendingCardProps) => {

  function createStyles(theme: ThemeColors) {
    return StyleSheet.create({
      primaryText: {
        color: theme.primary
      },
      text: {
        color: theme.onBackground,
      },
    });
  }
  
  const { theme } = useTheme();
  const styles = createStyles(theme)

  return (
    <Link href={`/movies/${movie_id}`} asChild>
      <TouchableOpacity className="w-32 relative pl-5">
        <Image
          source={{ uri: poster_url }}
          className="w-32 h-48 rounded-lg"
          resizeMode="cover"
        />

        <View className="absolute bottom-9 -left-2 px-2 py-1 rounded-full">
          <Text style={styles.primaryText} className="font-bold text-6xl">{index + 1}</Text>
        </View>

        <Text
          style={styles.text}
          className="text-sm font-bold mt-2"
          numberOfLines={2}
        >
          {title}
        </Text>
      </TouchableOpacity>
    </Link>
  );
};

export default TrendingCard;