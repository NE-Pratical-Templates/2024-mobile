import React, { useEffect } from "react";
import { Text, View, ActivityIndicator, useColorScheme } from "react-native";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { ToastProvider } from "react-native-toast-notifications";
import { CustomToast } from "@/components/Custom-Toast";
import { useFonts } from 'expo-font';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    Rubik: require("../assets/fonts/Rubik-Regular.ttf"),
    RubikBold: require("../assets/fonts/Rubik-Bold.ttf"),
    RubikMedium: require("../assets/fonts/Rubik-Medium.ttf"),
    RubikSemibold: require("../assets/fonts/Rubik-SemiBold.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);
  return (
    <>
      {!loaded ? (
        <View className="flex flex-row justify-center items-center">
          <ActivityIndicator size="large" color="#0000ff" />
          <Text className="font-lekton-bold text-xl text-primary">
            Loading...
          </Text>
        </View>
      ) : (
        <ToastProvider
          placement="top"
          successColor="green"
          dangerColor="red"
          duration={4000}
          animationType="slide-in"
          renderToast={(toastOptions) => (
            <CustomToast
              message={toastOptions.message}
              id={toastOptions.id}
              type={toastOptions.type as "success" | "danger" | "warning"}
            />
          )}
        >
          <ThemeProvider
            value={colorScheme == "dark" ? DarkTheme : DefaultTheme}
          >
            <Stack>
              <Stack.Screen
                name="index"
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="(tabs)"
                options={{
                  headerShown: false,
                }}
              />
            </Stack>
          </ThemeProvider>
        </ToastProvider>
      )}
    </>
  );
}
