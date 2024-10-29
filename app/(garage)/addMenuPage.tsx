import {
  Alert,
  Image,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import "react-native-get-random-values";
import { MaterialIcons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import {
  GarageObject,
  addToGarage,
  initialGarageObject,
} from "@/slices/garageSlice";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import ModalPage from "./modalPage";
import { useForm } from "@/constants/hooks";
import ImagePickerComponent from "@/components/imagePicker";
import ClearModalComponent from "./clearModal";

const AddMenuPage = () => {
  const { form, setForm } = useForm();
  const [imgState, setImgState] = useState<boolean>(false);
  const [modalState, setModalState] = useState<boolean>(false);
  const [clearState, setClearState] = useState<boolean>(false);

  const yearRef = useRef<TextInput | null>(null);
  const makeRef = useRef<TextInput | null>(null);
  const modelRef = useRef<TextInput | null>(null);
  const variantRef = useRef<TextInput | null>(null);
  const regoRef = useRef<TextInput | null>(null);
  const nickRef = useRef<TextInput | null>(null);

  const router = useRouter();

  const dispatch = useDispatch();

  const handleAddPress = () => {
    const payload: GarageObject = {
      ...form,
      vehUUID: uuidv4(),
      name: `${form.car.year} ${form.car.make} ${form.car.model}`,
    };

    try {
      dispatch(addToGarage(payload));
      setForm(initialGarageObject);
      router.back();
    } catch (error) {
      console.error("Error adding vehicle:", error);
      Alert.alert(
        "Error",
        "There was a problem adding the vehicle. Please try again."
      );
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
          <View style={[styles.inputSection, { gap: 10 }]}>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              placeholder="Year"
              placeholderTextColor={"#bbbbbb"}
              textAlign="center"
              inputMode="numeric"
              value={form.car.year}
              maxLength={4}
              onChangeText={(e) =>
                setForm({ ...form, car: { ...form.car, year: e } })
              }
              onSubmitEditing={() => makeRef.current?.focus()}
              returnKeyType="done"
            />
            <TextInput
              style={[styles.input, { flex: 3 }]}
              placeholder="Make e.g Toyota"
              placeholderTextColor={"#bbbbbb"}
              textAlign="center"
              autoCapitalize="characters"
              value={form.car.make}
              onChangeText={(e) =>
                setForm({ ...form, car: { ...form.car, make: e } })
              }
              onSubmitEditing={() => modelRef.current?.focus()}
              ref={makeRef}
            />
          </View>
          <View style={styles.inputSection}>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              placeholder="Model e.g Corolla"
              placeholderTextColor={"#bbbbbb"}
              textAlign="center"
              autoCapitalize="characters"
              value={form.car.model}
              onChangeText={(e) =>
                setForm({ ...form, car: { ...form.car, model: e } })
              }
              onSubmitEditing={() => variantRef.current?.focus()}
              ref={modelRef}
            />
          </View>
          <View style={styles.inputSection}>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              placeholder="Variant e.g GR"
              placeholderTextColor={"#bbbbbb"}
              textAlign="center"
              autoCapitalize="characters"
              value={form.car.variant}
              onChangeText={(e) =>
                setForm({ ...form, car: { ...form.car, variant: e } })
              }
              onSubmitEditing={() => regoRef.current?.focus()}
              ref={variantRef}
            />
          </View>
          <View style={styles.inputSection}>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              placeholder="Rego e.g 123ABC"
              placeholderTextColor={"#bbbbbb"}
              textAlign="center"
              autoCapitalize="characters"
              value={form.rego}
              onChangeText={(e) => setForm({ ...form, rego: e })}
              maxLength={9}
              onSubmitEditing={() => nickRef.current?.focus()}
              ref={regoRef}
            />
          </View>
          <View style={styles.inputSection}>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              placeholder="Nickname"
              placeholderTextColor={"#bbbbbb"}
              textAlign="center"
              autoCapitalize="characters"
              value={form.nickName}
              onChangeText={(e) => setForm({ ...form, nickName: e })}
              ref={nickRef}
            />
          </View>
          <TouchableHighlight
            underlayColor={"#bbb"}
            style={styles.bigButtons}
            onPress={() => setModalState(true)}
          >
            <View style={{ alignItems: "center" }}>
              <Text>Modified or Personalised?</Text>
              <Text>Press here!</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor={"#bbb"}
            style={styles.bigButtons}
            onPress={() => setImgState(true)}
          >
            <View style={{ alignItems: "center" }}>
              <Text>Want to add a photo?</Text>
              <Text>Press here!</Text>
              {form.imageUri ? (
                <View>
                  <Image style={styles.image} src={form.imageUri} />
                </View>
              ) : (
                <View style={styles.photoButtonIcon}>
                  <MaterialIcons size={30} name="photo" color="#FFF" />
                </View>
              )}
            </View>
          </TouchableHighlight>
          <TouchableOpacity style={styles.clearTouchable} onPress={() => setClearState(true)}>
            <Text style={styles.clearText}>Clear Form</Text>
          </TouchableOpacity>
          <ClearModalComponent clearState={clearState} setClearState={setClearState} />
          <ImagePickerComponent imgState={imgState} setImgState={setImgState} />
        </View>
        <ModalPage modalState={modalState} setModalState={setModalState} />
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
    borderRadius: 13,
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
    flexWrap: "wrap",
    flexDirection: "row",
  },
  inputSection: {
    flexDirection: "row",
    width: "100%",
  },
  input: {
    height: 40,
    marginVertical: 5,
    padding: 10,
    borderRadius: 10,
    fontSize: 20,
    backgroundColor: "#ffffff",
  },
  bigButtons: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    marginVertical: 5,
    width: "100%",
  },
  photoButtonIcon: {
    backgroundColor: "#bbb",
    borderRadius: 50,
    padding: 10,
    marginTop: 10,
  },
  image: {
    marginTop: 10,
    borderRadius: 10,
    height: 195,
    width: 260,
  },
  clearTouchable: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#bbb',
    backgroundColor: '#fff',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginHorizontal: 'auto'
  },
  clearText: {
    color: '#ff0000',
    fontSize: 18,
    textAlign: "center",
  },
});
