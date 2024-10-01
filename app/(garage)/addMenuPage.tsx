import {
  Alert,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from "react-native";
import React, { useState } from "react";
import "react-native-get-random-values";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { GarageObject, addToGarage } from "@/slices/garageSlice";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";

const AddMenuPage = () => {
  const [year, setYear] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [variant, setVariant] = useState("");
  const [rego, setRego] = useState("");
  const [nickname, setNickname] = useState("");

  const router = useRouter();

  const dispatch = useDispatch();
  
  const handleAddPress = () => {
    const payload: GarageObject = {
      vehUUID: uuidv4(),
      name: `${year} ${make} ${model}`,
      car: {
        year: parseInt(year, 10),
        make: make,
        model: model,
      },
      rego: rego,
      nickName: nickname,
    };
    
    try {
      dispatch(addToGarage(payload));
      console.log("adding to garage : " + JSON.stringify(payload))
      router.back(); // Navigate back
    } catch (error) {
      console.error("Error adding vehicle:", error);
      Alert.alert("Error", "There was a problem adding the vehicle. Please try again.");
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.screenContainer}>
        <View style={styles.headerContainer}>
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

          <Text style={styles.titleText}>Vehicle Information</Text>

          <TouchableHighlight
            onPress={handleAddPress}
            underlayColor={"#0E7AFE"}
            style={styles.addVehicleButton}
          >
            <Text style={styles.addVehicleText}>Add Vehicle</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Year"
            placeholderTextColor={"#bbbbbb"}
            textAlign="center"
            inputMode="numeric"
            value={year}
            onChangeText={setYear}
          />
          <TextInput
            style={styles.input}
            placeholder="Make"
            placeholderTextColor={"#bbbbbb"}
            textAlign="center"
            autoCapitalize="characters"
            value={make}
            onChangeText={setMake}
          />
          <TextInput
            style={styles.input}
            placeholder="Model"
            placeholderTextColor={"#bbbbbb"}
            textAlign="center"
            autoCapitalize="characters"
            value={model}
            onChangeText={setModel}
          />
          <TextInput
            style={styles.input}
            placeholder="Variant"
            placeholderTextColor={"#bbbbbb"}
            textAlign="center"
            autoCapitalize="characters"
            value={variant}
            onChangeText={setVariant}
          />
          <TextInput
            style={styles.input}
            placeholder="Rego"
            placeholderTextColor={"#bbbbbb"}
            textAlign="center"
            autoCapitalize="characters"
            value={rego}
            onChangeText={setRego}
            maxLength={9}
          />
          <TextInput
            style={styles.input}
            placeholder="Nickname"
            placeholderTextColor={"#bbbbbb"}
            textAlign="center"
            autoCapitalize="characters"
            value={nickname}
            onChangeText={setNickname}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AddMenuPage;

const styles = StyleSheet.create({
  screenContainer: {
    padding: 10,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  addVehicleButton: {
    backgroundColor: "#0E7AFE",
    borderRadius: 50,
    paddingVertical: 4,
    paddingHorizontal: 6,
    marginLeft: "auto",
    height: 30,
  },
  addVehicleText: {
    color: "#ffffff",
    fontSize: 18,
  },
  inputContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  input: {
    height: 40,
    marginVertical: 5,
    // borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    fontSize: 20,
    backgroundColor: "#ffffff",
  },
});
