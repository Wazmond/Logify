import { StatusBar, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack, Tabs } from "expo-router";

const GarageTab = () => {
  return (
    <Stack>
      <Stack.Screen
        name="myGarage"
        options={{
          headerShown: false,
          headerTitle: "My Garage",
        }}
      />
      <Stack.Screen
        name="vehicle/[vehicle]"
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
      name="addMenuPage"
      options={{
        headerShown: false,
        headerTitle: "Add to Garage"
      }} />
      <Stack.Screen
      name="specs"
      options={{
        headerShown: false,
      }} />
    </Stack>
  );
};

export default GarageTab;

const styles = StyleSheet.create({});
