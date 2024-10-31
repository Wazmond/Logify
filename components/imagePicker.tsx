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
import * as ImagePicker from "expo-image-picker";
import { useForm } from "@/constants/hooks";

interface imagePickerComponentProps {
  imgState: boolean;
  setImgState: React.Dispatch<SetStateAction<boolean>>;
  handleImageSave: (selectedImage: string) => void;
}
const ImagePickerComponent: React.FC<imagePickerComponentProps> = ({
  imgState,
  setImgState,
  handleImageSave,
}) => {
  const [selectedImage, setSelectedImage] = useState<string>("");
  // const { form, setForm } = useForm();

  const libraryPicker = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "No access to photos, please allow access in settings (Settings -> Privacy and Security -> Photos -> Logify -> All Photos)"
      );
      return;
    } else {
      try {
        let image = await ImagePicker.launchImageLibraryAsync({
          selectionLimit: 1,
          quality: 1,
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
        });
        if (!image.canceled) {
          setSelectedImage(image.assets[0].uri);
        }
      } catch (error) {
        Alert.alert(`${error}`);
      }
    }
  };

  const cameraPicker = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "No access to camera, please allow access in settings (Settings -> Privacy and Security -> Camera and enable for Logify)"
      );
      return;
    } else {
      try {
        let image = await ImagePicker.launchCameraAsync({
          quality: 1,
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
        });
        !image.canceled && setSelectedImage(image.assets[0].uri);
      } catch (error) {
        Alert.alert(`${error}`);
      }
    }
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

              {selectedImage && (
                <View style={{ alignItems: "center" }}>
                  <View style={styles.imageView}>
                    <Image
                      source={{ uri: selectedImage }}
                      style={styles.image}
                      resizeMode="contain"
                    />
                  </View>
                  <View>
                    <TouchableOpacity
                      style={styles.saveButton}
                      onPress={() => handleImageSave(selectedImage)}
                    >
                      <Text style={styles.saveText}>Save</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}

              <View style={styles.buttonContainer}>
                <View style={styles.buttonView}>
                  <TouchableOpacity onPress={libraryPicker}>
                    <Text style={styles.buttonText}>Choose from library</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.buttonView}>
                  <TouchableOpacity onPress={cameraPicker}>
                    <Text style={styles.buttonText}>Take Photo</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.buttonView}>
                  <TouchableOpacity onPress={() => setImgState(false)}>
                    <Text style={styles.buttonText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
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
  saveButton: {
    backgroundColor: "#007AFF",
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginTop: 20,
  },
  saveText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 18,
  },
  buttonContainer: {
    flexDirection: "column",
    width: "100%",
    marginTop: 20,
  },
  buttonView: {
    borderTopWidth: 1,
    borderColor: "#bbb",
  },
  buttonText: {
    color: "#007AFF",
    textAlign: "center",
    marginVertical: 10,
    fontSize: 18,
  },
  title: {
    fontSize: 20,
    marginTop: 20,
    fontWeight: "bold",
  },
  imageView: {
    paddingHorizontal: 10,
  },
  image: {
    height: 260,
    width: 260,
    marginTop: 20,
    borderRadius: 10,
  },
});
