import { View, TextInput, Image, StyleSheet } from "react-native";
import { useTheme } from '@/context/ThemeProvider'; 
import { ThemeColors } from "ThemeTypes";

import { icons } from "@/constants/icons";

interface Props {
  placeholder: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onPress?: () => void;
}

function createStyles(theme: ThemeColors) {
  return StyleSheet.create({
    text: {
      color: theme.surface,
    },
    searchBarContainer: {
      backgroundColor: theme.surface,
      borderRadius: 30,
      borderColor: theme.primary,
      borderWidth: 1
    },
    TextInput: {
      color: theme.onBackground,
    }
  });
}

const SearchBar = ({ placeholder, value, onChangeText, onPress }: Props) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  
  return (
    <View style={styles.searchBarContainer} className="flex-row items-center px-5 py-2">
      <Image
        source={icons.search}
        className="w-5 h-5"
        resizeMode="contain"
        tintColor={`${theme.primaryVariant}`}
      />
      <TextInput
        onPress={onPress}
        style={styles.TextInput}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        className="flex-1 ml-2"
        placeholderTextColor={`${theme.onBackground}`}
      />
    </View>
  );
};

export default SearchBar;