import { icons } from "@/constants/icons";
import { View, Text, Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useTheme } from '@/context/ThemeProvider'; 
import { ThemeColors } from 'ThemeTypes';


// Function to create styles
function createStyles(theme: ThemeColors) {
  return StyleSheet.create({
    container: {
      backgroundColor: theme.background,
    },
    text: {
      color: theme.onBackground,
    },
  });
}

const Profile = () => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
    
  return (
    <SafeAreaView style={styles.container} className="flex-1 px-10">
      <View className="flex justify-center items-center flex-1 flex-col gap-5">
        <Image source={icons.person} className="size-8" tintColor={`${theme.primary}`} />
        <Text style={styles.text} className="text-lg font-bold">Profile</Text>
        <Text style={styles.text} className="text-sm mt-2">This page is currently under development.</Text>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
