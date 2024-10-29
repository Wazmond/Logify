import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { SetStateAction } from "react";
import { useForm } from "@/constants/hooks";
import { initialGarageObject } from "@/slices/garageSlice";

interface props {
  clearState: boolean;
  setClearState: React.Dispatch<SetStateAction<boolean>>;
}
const ClearModalComponent: React.FC<props> = ({
  clearState,
  setClearState,
}) => {
  const { setForm } = useForm();

  const handleClearForm = () => {
    setForm(initialGarageObject);
  };
  return (
    <Modal
      visible={clearState}
      presentationStyle="overFullScreen"
      transparent
      animationType="fade"
      onRequestClose={() => setClearState(false)}
    >
      <View style={styles.modalBackground}>
        <View style={styles.clearContainer}>
          <Text style={styles.clearTitleText}>Clear form</Text>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                handleClearForm(), setClearState(false);
              }}
              activeOpacity={0.8}
            >
              <Text style={[styles.buttonText, { color: '#ff0000' }]}>Clear</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setClearState(false)}
              activeOpacity={0.8}
            >
              <Text style={[styles.buttonText, { color: '#007AFF'}]}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ClearModalComponent;

const styles = StyleSheet.create({
  modalBackground: {
    backgroundColor: "rgba(0,0,0,0.5)",
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    paddingHorizontal: 50,
  },
  clearContainer: {
    backgroundColor: "#fff",
    borderRadius: 15,
    flexDirection: "column",
    overflow: 'hidden'
  },
  clearTitleText: {
    marginVertical: 20,
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    backgroundColor: '#000',
    borderTopWidth: 1,
    gap: 1
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  buttonText: {
    fontSize: 18,
  },
});
