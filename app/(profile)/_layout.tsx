import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const ProfileLayout = () => {
  return (
    <Stack>
        <Stack.Screen 
        name='profile'
        options={{
          headerShown: false
        }} />
    </Stack>
  );
};

export default ProfileLayout;

const styles = StyleSheet.create({});
