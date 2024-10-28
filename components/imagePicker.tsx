import React, { SetStateAction, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  Alert,
  Modal,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import {
  launchImageLibrary,
  launchCamera,
  ImageLibraryOptions,
  CameraOptions,
} from "react-native-image-picker";

interface imagePickerComponentProps {
  imgState: boolean;
  setImgState: React.Dispatch<SetStateAction<boolean>>;
}
const ImagePickerComponent: React.FC<imagePickerComponentProps> = ({
  imgState,
  setImgState,
}) => {
  const [selectedImage, setSelectedImage] = useState("");

  const launchImagePicker = () => {
  };

  const launchCameraPicker = () => {
  };

  return (
    <Modal
      visible={imgState}
      presentationStyle="overFullScreen"
      transparent
      animationType="fade"
      onRequestClose={() => setImgState(false)}
    >
      <TouchableWithoutFeedback onPress={() => setImgState(false)}>
        <View style={styles.modal}>
          <TouchableWithoutFeedback onPress={undefined}>
            <View style={styles.container}>
              <Text style={styles.title}>Add an Image</Text>
              <View style={styles.buttonContainer}>
                <View style={styles.buttonView}>
                  <TouchableOpacity onPress={launchImagePicker}>
                    <Text style={styles.buttonText}>Choose from library</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.buttonView}>
                  <TouchableOpacity onPress={launchCameraPicker}>
                    <Text style={styles.buttonText}>Take Photo</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.buttonView}>
                  <TouchableOpacity onPress={() => setImgState(false)}>
                    <Text style={styles.buttonText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
              {selectedImage && (
                <Image source={{ uri: selectedImage }} style={styles.image} />
              )}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ImagePickerComponent;

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 15,
    width: "80%",
    overflow: "hidden",
  },
  buttonContainer: {
    flexDirection: "column",
    width: "100%",
  },
  buttonView: {
    borderWidth: 1,
    borderColor: "#bbb",
  },
  buttonText: {
    color: "#007AFF",
    textAlign: "center",
    marginVertical: 10,
  },
  title: {
    fontSize: 20,
    marginVertical: 20,
    fontWeight: "bold",
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
    borderRadius: 10,
  },
});
