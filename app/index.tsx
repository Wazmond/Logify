import { StatusBar, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Redirect } from "expo-router";

const index = () => {
  return (
    <View>
      <StatusBar animated={true} 
      barStyle={'dark-content'}
      />
      <Redirect href={"/(garage)/myGarage"} />
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
