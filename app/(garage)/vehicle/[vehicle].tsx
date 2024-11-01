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
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useGarage } from "@/constants/hooks";
import RmVehModal from "@/components/rmVehModal";
import ImagePickerComponent from "@/components/imagePicker";

const CarPage = () => {
  // const [editable, setEditable] = useState<boolean>(false);
  const [rmModal, setRmModal] = useState<boolean>(false);
  const [imgState, setImgState] = useState<boolean>(false);

  const { garage, editVeh } = useGarage();

  const { vehicle } = useLocalSearchParams();
  const vehUUID = vehicle as string;
  const veh = garage[vehUUID];

  const router = useRouter();

  const handleImageSave = (selectedImage: string) => {
    editVeh({ ...veh, imageUri: selectedImage });
    setImgState(false);
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
            <Text style={styles.headerText}>My Garage</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setRmModal(true)}>
          <Text style={[styles.headerText, { color: "#ff0000" }]}>Delete</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
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
        </TouchableOpacity> */}
      </View>

      <View style={styles.imageContainer}>
        {veh.imageUri ? (
          <Image
            style={styles.image}
            source={{ uri: veh.imageUri }}
            resizeMode="contain"
          />
        ) : (
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.bigButtons}
            onPress={() => setImgState(true)}
          >
            <Text style={styles.imgText}>Press here to add a photo</Text>
            <View style={{ alignItems: "center" }}>
              <View style={styles.photoButtonIcon}>
                <MaterialIcons size={30} name="photo" color="#FFF" />
              </View>
            </View>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>{veh?.name}</Text>
        </View>
        <View style={styles.pressablesContainer}>
          <View>
            <TouchableOpacity style={styles.pressables}
            onPress={() => {router.navigate({
              pathname: "/(garage)/addMenuPage",
              params: { vehUUID }
            })}}>
              <Text style={styles.text}>View and edit details</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              onPress={() =>
                router.navigate({
                  pathname: "/(logs)/logs",
                  params: { vehUUID },
                })
              }
              style={styles.pressables}
            >
              <Text style={styles.text}>View logs of vehicle</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ImagePickerComponent
        imgState={imgState}
        setImgState={setImgState}
        handleImageSave={handleImageSave}
      />
      <RmVehModal rmModal={rmModal} setRmModal={setRmModal} vehUUID={vehUUID} />
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
  headerText: {
    fontSize: 20,
    color: "#0E7AFE",
  },
  imgText: {
    fontSize: 14,
    textAlign: "center",
  },
  bigButtons: {
    borderRadius: 10,
    paddingVertical: 25,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    marginVertical: 5,
    marginHorizontal: 50,
  },
  photoButtonIcon: {
    backgroundColor: "#bbb",
    borderRadius: 50,
    padding: 10,
    marginTop: 10,
  },
  backPage: {
    flexDirection: "row",
    alignItems: "center",
  },
  imageContainer: {
    shadowOffset: { width: 0, height: 2 },
    shadowColor: "#000",
    shadowRadius: 3,
    shadowOpacity: 0.2,
    flex: 1,
  },
  image: {
    width: "100%",
    flex: 1,
  },
  infoContainer: {
    flex: 2,
    alignItems: "center",
  },
  titleContainer: {
    marginVertical: 30,
  },
  titleText: {
    fontSize: 20,
    letterSpacing: 1,
  },
  pressablesContainer: {
    flex: 1,
    gap: 15,
  },
  pressables: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 40,
    shadowOffset: { width: 0, height: 2 },
    shadowColor: "#000",
    shadowRadius: 3,
    shadowOpacity: 0.2,
  },
  text: {
    fontSize: 16,
    textAlign: "center",
  },
});
