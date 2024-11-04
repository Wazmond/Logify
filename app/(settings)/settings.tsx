import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useRouter } from "expo-router";

const SettingsScreen = () => {
    const router = useRouter()

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
      </View>
      {/* <ScrollView style={styles.scrollView}> */}
        <View style={styles.scrollContainer}>
          <View>
            <TouchableOpacity style={styles.button} onPress={() => router.navigate("/(settings)/about")}>
              <Text style={styles.buttonText}>About this app</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Reset data</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* <View>
            <TouchableOpacity>
                <Text>
                    About this app
                </Text>
            </TouchableOpacity>
        </View>
        <View>
            <TouchableOpacity>
                <Text>
                    About this app
                </Text>
            </TouchableOpacity>
        </View> */}
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    marginVertical: 5,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
  scrollView: {},
  scrollContainer: {
    flexDirection: "column",
    gap: 10,
    paddingHorizontal: 30,
    paddingVertical: 20
  },
  button: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowColor: "#000",
    shadowRadius: 3,
    shadowOpacity: 0.2,
  },
  buttonText: {
    fontSize: 18,
    textAlign: "left",
  },
});
