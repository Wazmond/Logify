import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const AboutPage = () => {
    const router = useRouter();
  return (
    <SafeAreaView>
      <View style={styles.aboutPage}>
        <TouchableWithoutFeedback onPress={() => router.back()}>
          <View style={styles.headerContainer}>
            <MaterialIcons
              name="arrow-back-ios-new"
              size={30}
              color={"#0E7AFE"}
            />

            <Text style={styles.headerTitle}>Settings</Text>
          </View>
        </TouchableWithoutFeedback>

        <View style={styles.bodyContainer}>
          <Text style={styles.bodyTitle}>About</Text>
          <Text style={styles.bodyText}>
            Welcome to Logify—a digital maintenance log app built for car
            enthusiasts and owners to effortlessly track maintenance,
            modifications, and upgrades on their vehicles. Designed to keep all
            your vehicle’s history organized and accessible, Logify is here as a
            backup for those times when your physical logbook goes missing (as
            mine did!).
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AboutPage;

const styles = StyleSheet.create({
  aboutPage: {
    // flex: 1
  },
  headerContainer: {
    marginVertical: 5,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: "bold",
  },
  bodyContainer: {
    // flex: 1,
  },
  bodyTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
    textAlign: "center",
  },
  bodyText: {
    fontSize: 16,
    textAlign: "center",
    marginHorizontal: 20,
    lineHeight: 25,
  },
});
