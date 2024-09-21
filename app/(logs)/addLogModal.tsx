import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
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

interface LabelDropdown {
  label: string;
  value: string;
}

const AddLogModal: React.FC<AddLogModalProps> = ({
  modalState,
  setModalState,
}) => {
  const [formValid, setFormValid] = useState(false);
  const [logsVehicle, setLogsVehicle] = useState("");
  const [logsLabel, setLogsLabel] = useState("");
  const [logsTitle, setLogsTitle] = useState("");
  const [logsDesc, setLogsDesc] = useState("");
  const [logsPrice, setLogsPrice] = useState();
  const [logsLocation, setLogsLocation] = useState("");
  const [logsAdditNotes, setLogsAdditNotes] = useState("");

  const [textInput, setTextInput] = useState(false);

  const toggleTextInput = () => {
    setTextInput(true);
  };

  const vehicles: VehicleDropdownItem[] = useSelector(
    (state: any) => state.myGarage.garage
  ).map((veh: any) => {
    return { ...veh, name: `${veh.car.year} ${veh.car.make} ${veh.car.model}` };
  });
  const label: LabelDropdown[] = [
    // { label: "Alignment", value: "Alignment"},
    { label: "Check Up", value: "CheckUp" },
    { label: "Service", value: "Service" },
    { label: "Maintenance", value: "Maintenance" },
    { label: "Modification", value: "Modification" },
    { label: "Other", value: "Other" },
  ];

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
        <View style={[styles.inputViewContainer]}>
          <Text style={styles.inputTitle}>Vehicle</Text>
          <Dropdown
            data={vehicles}
            value={logsVehicle}
            labelField="name"
            valueField="vehUUID"
            placeholder="Select Vehicle"
            onChange={() => {
              setLogsVehicle(logsVehicle);
            }}
            style={styles.dropdown}
            placeholderStyle={styles.dropdownPlaceholder}
            selectedTextStyle={styles.dropdownSelectedText}
            containerStyle={styles.dropdownContainer}
            itemContainerStyle={styles.dropdownItemContainer}
            itemTextStyle={styles.dropdownItemText}
            onChangeText={setLogsVehicle}
          />
        </View>
        <View style={[styles.inputViewContainer, { marginBottom: 10 }]}>
          <Text style={styles.inputTitle}>Event</Text>
          <Dropdown
            data={label}
            value={logsLabel}
            labelField="label"
            valueField="value"
            placeholder="Select Label"
            onChange={() => {
              setLogsLabel(logsLabel);
            }}
            style={styles.dropdown}
            placeholderStyle={styles.dropdownPlaceholder}
            selectedTextStyle={styles.dropdownSelectedText}
            containerStyle={styles.dropdownContainer}
            itemContainerStyle={styles.dropdownItemContainer}
            itemTextStyle={styles.dropdownItemText}
            onChangeText={setLogsLabel}
          />
        </View>
        <View style={styles.inputViewContainer}>
          <TextInput
            style={[styles.textInputTitle, styles.textInput, { width: "100%" }]}
            inputMode="text"
            placeholder="Title"
            placeholderTextColor={"#9BA1A6"}
            onChangeText={setLogsTitle}
          />
        </View>
        <View
          style={[
            styles.inputViewContainer,
            {
              marginBottom: 10,
              // height: 200
            },
          ]}
        >
          <TextInput
            style={[styles.textInputDesc, styles.textInput, { width: "100%" }]}
            multiline={true}
            inputMode="text"
            placeholder="Description"
            placeholderTextColor={"#9BA1A6"}
            onChangeText={setLogsDesc}
          />
        </View>
        <View style={styles.inputViewContainer}>
          <Text style={styles.inputTitle}>Price</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ fontSize: 20 }}>$</Text>
            <TextInput
              style={[styles.textInput, { paddingLeft: 25 }]}
              inputMode="numeric"
              placeholderTextColor={"#9BA1A6"}
              placeholder="0.00"
            />
          </View>
        </View>
        <View style={styles.inputViewContainer}>
          <Text style={styles.inputTitle}>Location</Text>
          <TextInput
            style={[styles.textInput, {}]}
            inputMode="text"
            placeholderTextColor={"#9BA1A6"}
            placeholder="Enter Shop or location"
          />
        </View>
        <View
          style={[
            styles.inputViewContainer,
            { flexDirection: "column", alignItems: "flex-start" },
          ]}
        >
          <Text style={[styles.inputTitleAditNote, { marginLeft: 15 }]}>
            Additional Notes
          </Text>
          <TextInput
            style={[
              styles.textInput,
              { fontSize: 20, width: "100%", paddingVertical: 40 },
            ]}
            inputMode="text"
            multiline={true}
            placeholderTextColor={"#9BA1A6"}
            placeholder="Enter any additional notes or information..."
          />
        </View>
        <TouchableOpacity onPress={toggleTextInput}>
          <View>
            {textInput ? (
              <TextInput
                style={[
                  styles.textInput,
                  {
                    fontSize: 20,
                    width: "100%",
                    paddingVertical: 40,
                    borderWidth: 1,
                  },
                ]}
                inputMode="text"
                placeholderTextColor={"#9BA1A6"}
                placeholder="Enter your example text here..."
                autoFocus={true}
              />
            ) : (
              <Text
                style={{ textAlign: "center", justifyContent: "flex-start" }}
              >
                Testing Text Input variations
              </Text>
            )}
          </View>
        </TouchableOpacity>
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
    flexDirection: "row",
    marginBottom: 2,
  },
  inputTitle: {
    fontSize: 20,
    flex: 1,
    marginVertical: 20,
    marginLeft: 15,
  },
  inputTitleAditNote: {
    fontSize: 20,
    marginTop: 20,
  },
  dropdown: {
    flex: 3,
    zIndex: 5,
    backgroundColor: "white",
    height: 65,
    paddingHorizontal: 15,
  },
  dropdownPlaceholder: {
    textAlign: "right",
    paddingRight: 10,
    color: "#9BA1A6",
  },
  dropdownSelectedText: {
    textAlign: "center",
  },
  dropdownContainer: {},
  dropdownItemContainer: {
    // borderRadius: 15,
  },
  dropdownItemText: {
    textAlign: "center",
    fontSize: 16,
    flexWrap: "wrap",
  },
  textInputTitle: {
    fontSize: 20,
  },
  textInputDesc: {
    fontSize: 20,
    textAlign: "left",
    textAlignVertical: "top",
  },
  textInput: {
    color: "#000000",
    fontSize: 20,
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
});
