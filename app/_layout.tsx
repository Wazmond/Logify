import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useState } from "react";
import AuthPage from "./(auth)/auth";

import { Provider } from "react-redux";
import { persistor, store } from "@/store/store";
import { PersistGate } from "redux-persist/integration/react";

function StackLayout() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Tabs>
          <Tabs.Screen
            name="(garage)"
            options={{
              headerShown: false,
              headerTitle: "My Garage",
              tabBarLabel: "My Garage",
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="garage" color={color} size={30} />
              ),
            }}
          />
          <Tabs.Screen
            name="(logs)"
            options={{
              headerShown: false,
              headerTitle: "Logs",
              tabBarLabel: "Logs",
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="notes" color={color} size={30} />
              ),
            }}
          />
          <Tabs.Screen
          name="(settings)"
          options={{
            headerShown: false,
            tabBarLabel: "Settings",
            tabBarIcon: ({color, size}) => (
              <MaterialIcons name="settings" color={color} size= {30} />
            )
          }}
          />
          <Tabs.Screen
            name="(profile)"
            options={{
              headerShown: false,
              href: null,
              headerTitle: "Profile",
              tabBarLabel: "Profile",
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="account-circle" color={color} size={30} />
              ),
            }}
          />
          <Tabs.Screen
            name="(auth)/auth"
            options={{
              headerShown: false,
              href: null,
            }}
          />
          <Tabs.Screen
            name="index"
            options={{
              headerShown: false,
              href: null,
            }}
          />
        </Tabs>
      </PersistGate>
    </Provider>
  );
}

export default StackLayout;
