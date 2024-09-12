import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Dropdown } from "react-native-element-dropdown";

interface AddLogModalProps {
  modalState: boolean;
  setModalState: (state: boolean) => void;
}

interface VehicleDropdownItem {
    vehUUID: string;
    car: {
      year: number;
      make: string;
      model: string;
    };
    rego: string;
    nickName: string;
    name: string; // Add the calculated name field
  }
  

const AddLogModal: React.FC<AddLogModalProps> = ({modalState, setModalState}) => {
  const [formValid, setFormValid] = useState(false);
  const [logsVehicle, setLogsVehicle] = useState("");

  const vehicles: VehicleDropdownItem[] = useSelector((state: any) => state.myGarage.garage).map((veh: any) => {return {...veh, name: `${veh.car.year} ${veh.car.make} ${veh.car.model}`}})
//   const vehNames = vehicles.map((veh: any) => {veh.car.year + " " + veh.car.make + " " + veh.car.model})

  return (
    <Modal
      visible={modalState}
      animationType="slide"
      transparent={false}
      presentationStyle="formSheet"
    >
      <View style={styles.modalHeader}>
        <TouchableOpacity onPress={() => setModalState(false)}>
          <Text style={styles.modalHeaderCancelText}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.modalHeaderTitleText}>Add a new log</Text>
        <TouchableOpacity>
          <Text
            style={[
              styles.modalHeaderAddText,
              formValid ? { color: "#0E7AFE" } : { color: "#bbbbbb" },
            ]}
          >
            Add
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ backgroundColor: "#F0F0F0", height: "100%" }}>
        <View style={[styles.inputViewContainer, { justifyContent: 'space-between', marginBottom: 10}]}>
          <Text style={styles.inputTitle}>Vehicle</Text>
          <Dropdown 
          data={vehicles} 
          value={logsVehicle}
          labelField="name"
          valueField="vehUUID"
          placeholder="Select Vehicle"
          onChange={() => {
            setLogsVehicle(logsVehicle)
          }}
          style={styles.dropdown}
          placeholderStyle={styles.dropdownPlaceholder}
          selectedTextStyle={styles.dropdownSelectedText}
          containerStyle={styles.dropdownContainer}
          itemContainerStyle={styles.dropdownItemContainer}
          itemTextStyle={styles.dropdownItemText}
          />
        </View>
        <View style={[styles.inputViewContainer, {marginBottom: 10}]}>
          <Text style={styles.inputTitle}>Event</Text>
        </View>
        <View style={styles.inputViewContainer}>
          <Text style={styles.inputTitle}>Title</Text>
        </View>
        <View style={[styles.inputViewContainer, {marginBottom: 10}]}>
          <Text style={styles.inputTitle}>Description</Text>
        </View>
        <View style={styles.inputViewContainer}>
          <Text style={styles.inputTitle}>Price</Text>
        </View>
        <View style={styles.inputViewContainer}>
          <Text style={styles.inputTitle}>Location</Text>
        </View>
        <View style={styles.inputViewContainer}>
          <Text style={styles.inputTitle}>Additional Notes</Text>
        </View>
      </View>
    </Modal>
  );
};

export default AddLogModal;

const styles = StyleSheet.create({
  modalHeader: {
    flexDirection: "row",
    paddingHorizontal: 15,
    paddingVertical: 20,
    justifyContent: "space-between",
    backgroundColor: "#f0f0f0",
  },
  modalHeaderTitleText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  modalHeaderCancelText: {
    textAlign: "left",
    fontSize: 20,
    width: 70,
    color: "#0E7AFE",
  },
  modalHeaderAddText: {
    textAlign: "right",
    fontSize: 20,
    width: 70,
    color: "#0E7AFE",
  },
  inputViewContainer: {
    backgroundColor: "#ffffff",
    height: 65 ,
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2
  },
  inputTitle: {
    fontSize: 20,
    flex: 3,
  },
  dropdown: {
    flex: 2,
    backgroundColor: "white",
  },
  dropdownPlaceholder: {
    textAlign: "right",
    paddingRight: 10,
    color: '#9BA1A6'
  },
  dropdownSelectedText: {
    textAlign: "center",
  },
  dropdownContainer: {
    // borderRadius: 15,
  },
  dropdownItemContainer: {
    // borderRadius: 15,
  },
  dropdownItemText: {
    textAlign: "center",
    fontSize: 16,
    flexWrap: 'wrap'
  },
});
