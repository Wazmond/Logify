import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import { GarageObject, initialGarageObject } from "@/slices/garageSlice";

const Specs = () => {
  const [form, setForm] = useState<GarageObject>(initialGarageObject)

  const router = useRouter();
  return (
    <SafeAreaView>
      <View style={styles.headerContainer}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableHighlight
            onPress={() => router.back()}
            underlayColor={"#dddddd"}
            style={{
              borderRadius: 50,
            }}
          >
            <MaterialIcons
              name="arrow-back-ios-new"
              size={30}
              color={"#0E7AFE"}
            />
          </TouchableHighlight>
          <Text style={styles.titleText}>New Vehicle</Text>
        </View>

        <TouchableHighlight
          // onPress={handleAddPress}
          style={{ backgroundColor: "#0E7AFE", padding: 5, borderRadius: 25 }}
          underlayColor={"#0E7AFE"}
          // style={styles.addVehicleButton}
        >
          <Text style={{ color: "#fff" }}>Save changes</Text>
        </TouchableHighlight>
      </View>

      <ScrollView>
        <View>
          <TouchableOpacity>
            <Text>Engine: </Text>
            {/* <TextInput placeholder="RB26" value={} onChangeText={(e) => void}/> */}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Specs;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
});
