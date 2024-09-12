import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect } from "react";
import { Stack, useLocalSearchParams, useNavigation } from "expo-router";

const CarPage = () => {
  const { car } = useLocalSearchParams();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: car || "default title",
    });
  }, [navigation, car]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <View style={styles.image}/>
      </View>
      <View style={styles.buttonContainer}>
        <View>
          <Text>Edit vehicle details</Text>
        </View>
        <View>
          <Text>Vehicle Logs</Text>
        </View>
        <Text style={styles.text}>CarPage, params: {car}</Text>
      </View>
    </SafeAreaView>
  );
};

export default CarPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    flex: 1,
  },
  image: { 
    backgroundColor: 'green',
    height: '100%',
    width: '100%'
  },
  buttonContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "#333",
  },
});
