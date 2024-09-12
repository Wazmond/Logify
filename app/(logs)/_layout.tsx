import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const LogsLayout = () => {
  return (
    <Stack>
        <Stack.Screen 
        name='logs'
        options={{
          headerShown: false
        }} />
    </Stack>
  );
};

export default LogsLayout;

const styles = StyleSheet.create({});
