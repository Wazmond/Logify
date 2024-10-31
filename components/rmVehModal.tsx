import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { SetStateAction } from "react";
import { useGarage } from "@/constants/hooks";
import { useRouter } from "expo-router";

interface Props {
  rmModal: boolean;
  setRmModal: React.Dispatch<SetStateAction<boolean>>;
  vehUUID: string;
}

const RmVehModal: React.FC<Props> = ({ rmModal, setRmModal, vehUUID }) => {
  const { rmVeh } = useGarage();
  const router = useRouter();

  const handleRmVeh = () => {
    setRmModal(false);
    router.back();
    rmVeh(vehUUID);
  };
  return (
    <Modal visible={rmModal} presentationStyle="overFullScreen" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modal}>
          <Text style={styles.titleText}>
            Are you sure you want to remove this vehicle?
          </Text>
          <Text style={styles.titleDesc}>
            Note: Any logs assigned to this vehicle will not be deleted. 
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.buttons} onPress={handleRmVeh} activeOpacity={0.7}>
              <Text style={[styles.buttonText, { color: '#ff0000' }]}>Remove</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttons}
              onPress={() => setRmModal(false)}
              activeOpacity={0.7}
            >
              <Text style={[styles.buttonText, { color: '#007AFF'}]}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default RmVehModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(00,00,00,0.7)",
    paddingHorizontal: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: 'hidden'
  },
  titleText: {
    fontSize: 20,
    marginVertical: 15,
    marginHorizontal: 30,
    textAlign: 'center'
  },
  titleDesc: {
    fontSize: 16,
    marginHorizontal: 30,
    marginBottom: 15,
    textAlign: 'center'
  },
  buttonContainer: {
    flexDirection: "row",
    backgroundColor: "#000",
    gap: 1
  },
  buttons: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderTopWidth: 1,
    padding: 10,
    backgroundColor: '#fff'
  },
  buttonText: {
    fontSize: 18,
  },
});
