import React from 'react';
import { StyleSheet, View, Image, ScrollView } from 'react-native';
import { useRouter } from "expo-router";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/context/ThemeProvider'; 
import ThemeToggle from '@/components/ThemeToggle';
import { ThemeColors } from 'ThemeTypes';
import SearchBar from '@/components/SearchBar';

export default function Index() {
  const router = useRouter();
  const { theme } = useTheme();
  const styles = createStyles(theme);

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
            <SearchBar              
              onPress={() => {
                router.push("/search");
              }}
              placeholder="Search for a movie"
            />
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
      width: 100, // Ajusta según el tamaño deseado
      height: 40,  // Ajusta según el tamaño deseado
      resizeMode: 'contain', // Esto asegura que el logo se ajuste dentro de las dimensiones especificadas sin distorsionarse
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
