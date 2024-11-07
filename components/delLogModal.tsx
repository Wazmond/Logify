import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { SetStateAction } from "react";
import { useDispatch } from "react-redux";
import { logsInitialState, LogsObject, removeLog } from "@/slices/logsSlice";

interface props {
  delState: boolean;
  setDelState: React.Dispatch<SetStateAction<boolean>>;
  vehUUID: string;
  logUUID: number;
  setModalState: React.Dispatch<SetStateAction<{state: boolean, log: LogsObject}>>
}
const DelLogComponent: React.FC<props> = ({
  delState,
  setDelState,
  vehUUID,
  logUUID,
  setModalState
}) => {

    const dispatch = useDispatch()


  const handleDelLog = () => {
    dispatch(removeLog({vehUUID, logUUID}))
};
  return (
    <Modal
      visible={delState}
      presentationStyle="overFullScreen"
      transparent
      animationType="fade"
      onRequestClose={() => setDelState(false)}
    >
      <View style={styles.modalBackground}>
        <View style={styles.clearContainer}>
          <Text style={styles.clearTitleText}>Delete log?</Text>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                handleDelLog(), 
                setDelState(false);
                setModalState({state: false, log: logsInitialState})
              }}
              activeOpacity={0.8}
            >
              <Text style={[styles.buttonText, { color: '#ff0000' }]}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setDelState(false)}
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

export default DelLogComponent;

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
