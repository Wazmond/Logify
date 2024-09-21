import {
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import { useDispatch, useSelector } from "react-redux";
import { LogsObject, addLog } from "@/slices/logsSlice";

interface NewLogModalProps {
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

const LogModal: React.FC<NewLogModalProps> = ({
  modalState,
  setModalState,
}) => {
  const [formValid, setFormValid] = useState(false);
  const [logsVehicle, setLogsVehicle] = useState("");
  const [logsLabel, setLogsLabel] = useState("");
  const [logsTitle, setLogsTitle] = useState("");
  const [logsDesc, setLogsDesc] = useState("");
  const [logsOdo, setLogsOdo] = useState("");
  const [logsPrice, setLogsPrice] = useState("");
  const [logsLocation, setLogsLocation] = useState("");
  const [logsAdditNotes, setLogsAdditNotes] = useState("");
  const [textInputState, setTextInputState] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (logsVehicle && logsLabel && logsTitle && logsDesc) {
      console.log("Form is valid");
      setFormValid(true);
    } else {
      console.log(
        "Form is invalid" + logsVehicle + logsLabel + logsTitle + logsDesc
      );
      setFormValid(false);
    }
  }, [logsVehicle, logsLabel, logsTitle, logsDesc]);

  // const initState = [false, false, false, false, false];

  const vehicleRef = useRef<any>(null);
  const labelRef = useRef<any>(null);

  const vehicles: VehicleDropdownItem[] = useSelector(
    (state: any) => state.myGarage.garage
  ).map((veh: any) => {
    return { ...veh, name: `${veh.car.year} ${veh.car.make} ${veh.car.model}` };
  });

  const label: LabelDropdown[] = [
    { label: "Check Up", value: "CheckUp" },
    { label: "Service", value: "Service" },
    { label: "Maintenance", value: "Maintenance" },
    { label: "Modification", value: "Modification" },
    { label: "Other", value: "Other" },
  ];

  const toggleTextInput = (index: number) => {
    Keyboard.dismiss();
    setTextInputState(() => {
      const newState = [false, false, false, false, false];
      newState[index] = true;
      return newState;
    });
  };

  const handleAddPress = () => {
    const newDate = new Date();
    const day = newDate.getDate();
    const month = newDate.getMonth() + 1;
    const year = newDate.getFullYear();
    const hours = String(newDate.getHours()).padStart(2, "0");
    const minutes = String(newDate.getMinutes()).padStart(2, "0");
    const seconds = String(newDate.getSeconds()).padStart(2, "0");

    const log: LogsObject = {
      logUUID:
        logsVehicle + "-" + day + month + year + hours + minutes + seconds,
      vehUUID: logsVehicle,
      date: day + "-" + month + "-" + year,
      time: hours + ":" + minutes,
      label: logsLabel,
      data: {
        title: logsTitle,
        desc: logsDesc,
      },
      additionals: {
        location: logsLocation,
        price: logsPrice,
        notes: logsAdditNotes,
      },
    };
    formValid && dispatch(addLog({vehUUID: logsVehicle, log}));
  };
  return (
    <Modal
      visible={modalState}
      animationType="slide"
      transparent={false}
      presentationStyle="formSheet"
      style={{ backgroundColor: "#F0F0F0" }}
    >
      <KeyboardAvoidingView>
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={() => setModalState(false)}>
            <Text style={styles.modalHeaderCancelText}>Cancel</Text>
          </TouchableOpacity>
          <Text style={styles.modalHeaderTitleText}>New Log</Text>
          <TouchableOpacity>
            <Text
              style={[
                styles.modalHeaderAddText,
                // formValid ? { color: "#0E7AFE" } : { color: "#bbbbbb" },
                { color: formValid ? "#0E7AFE" : "#bbbbbb" },
              ]}
            >
              Add
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ backgroundColor: "#F0F0F0", height: "100%" }}>
          <TouchableWithoutFeedback onPress={() => vehicleRef.current.open()}>
            <View style={styles.box}>
              <Text>Vehicle:</Text>
              <Dropdown
                data={vehicles}
                value={logsVehicle}
                labelField="name"
                valueField="vehUUID"
                placeholder="Select Vehicle"
                onChange={(vehicle) => setLogsVehicle(vehicle.vehUUID)}
                ref={vehicleRef}
              />
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={() => labelRef.current.open()}>
            <View style={styles.box}>
              <Text>Label:</Text>
              <Dropdown
                data={label}
                value={logsLabel}
                labelField="label"
                valueField="value"
                placeholder="Select Label"
                onChange={(label) => {
                  setLogsLabel(label.value);
                }}
                ref={labelRef}
              />
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={() => toggleTextInput(0)}>
            <View style={styles.box}>
              <Text>Title:</Text>
              {textInputState[0] ? (
                <TextInput
                  autoFocus={true}
                  inputMode="text"
                  placeholder="Enter the title of your log..."
                  placeholderTextColor={"#9BA1A6"}
                  value={logsTitle}
                  onChangeText={setLogsTitle}
                />
              ) : logsTitle ? (
                <Text>{logsTitle}</Text>
              ) : (
                <Text style={styles.placeholderTextStyling}>
                  Enter the title of your log...
                </Text>
              )}
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={() => toggleTextInput(1)}>
            <View style={styles.box}>
              <Text>Description:</Text>
              {textInputState[1] ? (
                <TextInput
                  autoFocus={true}
                  inputMode="text"
                  placeholder="Enter description..."
                  placeholderTextColor={"#9BA1A6"}
                  value={logsDesc}
                  onChangeText={setLogsDesc}
                />
              ) : logsDesc ? (
                <Text>{logsDesc}</Text>
              ) : (
                <Text style={styles.placeholderTextStyling}>
                  Enter description...
                </Text>
              )}
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={() => toggleTextInput(2)}>
            <View style={styles.box}>
              <Text>Odometer:</Text>
              {textInputState[2] ? (
                <TextInput
                  autoFocus={true}
                  inputMode="numeric"
                  placeholder="0"
                  placeholderTextColor={"#9BA1A6"}
                  value={logsOdo}
                  onChangeText={setLogsOdo}
                />
              ) : logsOdo ? (
                <Text>{logsOdo}</Text>
              ) : (
                <Text style={styles.placeholderTextStyling}>0</Text>
              )}
              <Text>Km</Text>
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={() => toggleTextInput(3)}>
            <View style={styles.box}>
              <Text>Price:</Text>
              <Text>$</Text>
              {textInputState[3] ? (
                <TextInput
                  autoFocus={true}
                  inputMode="decimal"
                  placeholder="0.00"
                  placeholderTextColor={"#9BA1A6"}
                  value={logsPrice}
                  onChangeText={setLogsPrice}
                />
              ) : logsPrice ? (
                <Text>{logsPrice}</Text>
              ) : (
                <Text style={styles.placeholderTextStyling}>0.00</Text>
              )}
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={() => toggleTextInput(4)}>
            <View style={styles.box}>
              <Text>Location:</Text>
              {textInputState[4] ? (
                <TextInput
                  autoFocus={true}
                  inputMode="text"
                  placeholder="Enter a location or shop name..."
                  placeholderTextColor={"#9BA1A6"}
                  value={logsLocation}
                  onChangeText={setLogsLocation}
                />
              ) : logsLocation ? (
                <Text>{logsLocation}</Text>
              ) : (
                <Text style={styles.placeholderTextStyling}>
                  Enter a location or shop name...
                </Text>
              )}
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={() => toggleTextInput(5)}>
            <View style={styles.box}>
              <Text>Additional Notes:</Text>
              {textInputState[5] ? (
                <TextInput
                  autoFocus={true}
                  inputMode="text"
                  placeholder="Enter any additional notes..."
                  placeholderTextColor={"#9BA1A6"}
                  value={logsAdditNotes}
                  onChangeText={setLogsAdditNotes}
                />
              ) : logsAdditNotes ? (
                <Text>{logsAdditNotes}</Text>
              ) : (
                <Text style={styles.placeholderTextStyling}>
                  Enter any additional notes...
                </Text>
              )}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default LogModal;

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
  box: {
    // borderWidth: 1,
    backgroundColor: "#FFFFFF",
    marginBottom: 2,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  placeholderTextStyling: {
    color: "#9BA1A6",
  },
});
