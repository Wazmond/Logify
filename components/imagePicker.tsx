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

interface imagePickerComponentProps {
  imgState: boolean;
  setImgState: React.Dispatch<SetStateAction<boolean>>;
}
const ImagePickerComponent: React.FC<imagePickerComponentProps> = ({
  imgState,
  setImgState,
}) => {
  const [selectedImage, setSelectedImage] = useState("");

  const libraryPermission = () => {
    const permission = ImagePicker.getMediaLibraryPermissionsAsync();
  };

  // const launchImagePicker = () => {
  //   const options: ImageLibraryOptions = {
  //     mediaType: "photo",
  //     includeBase64: false,
  //     quality: 1,
  //   };

  //   ImagePicker.launchImageLibraryAsync(options, (response) => {
  //     if (response.didCancel) {
  //       console.log("User cancelled image picker");
  //     } else if (response.errorCode) {
  //       console.log("Image picker error: ", response.errorMessage);
  //       Alert.alert("Error", response.errorMessage);
  //     } else {
  //       let imageUri = response.assets?.[0]?.uri || "";
  //       setSelectedImage(imageUri);
  //     }
  //   });
  // };

  const libraryPicker = async () => {
    let image = await ImagePicker.launchImageLibraryAsync({
      selectionLimit: 1,
      aspect: [4, 3],
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
    !image.canceled && setSelectedImage(image.assets[0].uri);
    console.log(selectedImage);
  };

  const launchCameraPicker = async () => {
    return null
  };

  const handleImageSave = () => { 
    setImgState(false)
   }

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
                <View style={{alignItems: 'center'}}>
                  <View style={styles.imageView}>
                    <Image
                      source={{ uri: selectedImage }}
                      style={styles.image}
                    />
                  </View>
                  <View>
                    <TouchableOpacity style={styles.saveButton} onPress={() => handleImageSave()}>
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
                  <TouchableOpacity onPress={undefined}>
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
    marginTop: 20
  },
  saveText: { 
    textAlign: 'center',
    color: "#fff", 
    fontSize: 18 
  },
  buttonContainer: {
    flexDirection: "column",
    width: "100%",
    marginTop: 20,
  },
  buttonView: {
    borderWidth: 1,
    borderColor: "#bbb",
  },
  buttonText: {
    color: "#007AFF",
    textAlign: "center",
    marginVertical: 10,
    fontSize: 18
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
    height: 185,
    width: 260,
    marginTop: 20,
    borderRadius: 10,
  },
});
