import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="login" options={{ title: "Login", headerShown: false}} />
      <Stack.Screen name="menu" options={{ title: "Menu", headerShown: false}} />
    </Stack>
  );
}