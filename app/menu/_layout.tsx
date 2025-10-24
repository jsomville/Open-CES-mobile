import { Stack } from 'expo-router';

const MenuLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "All Menu",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="transactions"
        options={{
          title: "Transactions",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="send"
        options={{
          title: "Send",
          headerShown: true,
        }}
      />
       <Stack.Screen
        name="receive"
        options={{
          title: "Receive",
          headerShown: true,
        }}
      />
       <Stack.Screen
        name="pay"
        options={{
          title: "Pay",
          headerShown: true,
        }}
      />
    </Stack>
  );
};

export default MenuLayout;