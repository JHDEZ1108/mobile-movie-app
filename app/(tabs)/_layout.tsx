import { Tabs } from "expo-router";
import { Image, Text, View, StyleSheet, ImageSourcePropType } from "react-native";
import { useTheme } from '@/context/ThemeProvider'; 
import { ThemeColors } from 'ThemeTypes';

import { icons } from "@/constants/icons";

interface TabIconProps {
  focused: boolean;
  icon: ImageSourcePropType;
  title: string;
}

function createStyles(theme: ThemeColors) {
  return StyleSheet.create({
    text: {
      color: theme.surface,
    }
  });
}

function TabIcon({ focused, icon, title }: TabIconProps) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  if (focused) {
    return (
      <View
        className="flex flex-row w-full flex-1 min-w-[114px] min-h-16 justify-center items-center rounded-full overflow-hidden"
        style={{ marginTop: 16, backgroundColor: theme.primary }}
      >
        <Image source={icon} tintColor={`${theme.surface}`} className="size-5" />
        <Text style={styles.text} className="text-base font-semibold ml-2">
          {title}
        </Text>
      </View>
    );
  }

  return (
    <View style={{ marginTop: 16 }} className="size-full justify-center items-center rounded-full">
      <Image source={icon} tintColor={`${theme.primary}`} className="size-5" />
    </View>
  );
}

export default function TabsLayout() {
  const { theme } = useTheme();
  
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarStyle: {
          backgroundColor: theme.background,
          borderRadius: 50,
          marginHorizontal: 20,
          marginBottom: 36,
          height: 52,
          position: "absolute",
          overflow: "hidden",
          borderWidth: 1,
          borderColor: theme.primary,
        },
      }}
    >
      <Tabs.Screen
        name='index'
        options={{ 
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.home} title="Home" />
          ),
        }}
      />
      
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.search} title="Search" />
          ),
        }}
      />
      
      <Tabs.Screen
        name="save"
        options={{
          title: "Save",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.save} title="Save" />
          ),
        }}
      />
      
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.person} title="Profile" />
          ),
        }}
      />
    </Tabs>
  )
}