import {
  Button,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import {
  useLocalSearchParams,
  useRouter,
} from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useGarage } from "@/constants/hooks";

const CarPage = () => {
  const [editable, setEditable] = useState(false);
  const {garage, editVeh, rmVeh} = useGarage();

  const { vehicle } = useLocalSearchParams();
  const vehUUID = vehicle as string;

  const veh = garage[vehUUID]

  const router = useRouter();

  const handleRemoveVehicle = () => {
    console.log("Vehicle Removed");
    router.back();
    rmVeh(vehUUID);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => router.back()}>
          <View style={styles.backPage}>
            <MaterialIcons
              name="arrow-back-ios-new"
              size={30}
              color={"#0E7AFE"}
            />
            <Text style={{ fontSize: 20, color: "#0E7AFE" }}>My Garage</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            editable && console.log("Saving form");
            setEditable(!editable);
          }}
        >
          <View>
            {editable ? (
              <Text style={{ fontSize: 20, color: "#0E7AFE" }}>Save</Text>
            ) : (
              <Text style={{ fontSize: 20, color: "#0E7AFE" }}>Edit</Text>
            )}
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.imageContainer}>
        <View style={styles.image} />
      </View>

      <View style={styles.buttonContainer}>
        <View>
          <Text>{veh?.name}</Text>
          <Text>{veh?.rego}</Text>
        </View>
        <View>
          <Text>Vehicle Logs</Text>
        </View>
        <Text style={styles.text}>CarPage, params: {veh?.name}</Text>
      </View>
      <View>
        <Button title="Remove Vehicle" onPress={handleRemoveVehicle} />
      </View>
    </SafeAreaView>
  );
};

export default CarPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  backPage: {
    flexDirection: "row",
    alignItems: "center",
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    backgroundColor: "green",
    height: "100%",
    width: "100%",
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
