import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/context/ThemeProvider'; 
import ThemeToggle from '@/components/ThemeToggle';
import { ThemeColors } from 'ThemeTypes';

export default function Index() {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <SafeAreaView style={styles.container} className="flex-1 items-center justify-center">
      <View style={styles.header} className="flex-row justify-between items-center px-4 py-3 w-full border-b">
        <Text style={styles.headerText}>
          Welcome to Your App
        </Text>
        <ThemeToggle />
      </View>
      <View className="flex-1 items-center justify-center">
        <Text style={styles.text}>Your main content goes here.</Text>
      </View>
    </SafeAreaView>
  );
}

// Function to create styles
function createStyles(theme: ThemeColors) {
  return StyleSheet.create({
    container: {
      backgroundColor: theme.background,
    },
    header: {
      borderBottomColor: theme.surface,
    },
    headerText: {
      color: theme.onBackground, 
    },
    text: {
      color: theme.onBackground,
    },
  });
}
