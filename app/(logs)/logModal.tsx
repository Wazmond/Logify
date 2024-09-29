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
  ScrollView,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import { useDispatch, useSelector } from "react-redux";
import { LogsObject, addLog } from "@/slices/logsSlice";
import { Colors } from "@/constants/Colors";
import { garageSelector } from "@/slices/garageSlice";

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

const initialForm: LogsObject = {
  logUUID: 0,
  vehUUID: "",
  date: "",
  time: "",
  label: "",
  data: {
    title: "",
    desc: "",
  },
  additionals: {
    odo: "",
    location: "",
    price: "",
    notes: "",
  },
};

const LogModal: React.FC<NewLogModalProps> = ({
  modalState,
  setModalState,
}) => {
  const [formValid, setFormValid] = useState(false);
  const [form, setForm] = useState<LogsObject>(initialForm);

  const dispatch = useDispatch();

  useEffect(() => {
    form.vehUUID && form.label && form.data.title && form.data.desc
      ? setFormValid(true)
      : setFormValid(false);
  }, [form.vehUUID, form.label, form.data.title, form.data.desc]);

  useEffect(() => {
    setForm(initialForm);
    setFormValid(false);
  }, [modalState]);

  const vehicleRef = useRef<any>(null);
  const labelRef = useRef<any>(null);
  const titleRef = useRef<any>(null);
  const descRef = useRef<any>(null);
  const odoRef = useRef<any>(null);
  const priceRef = useRef<any>(null);
  const locationRef = useRef<any>(null);
  const notesRef = useRef<any>(null);

  const vehicles = Object.values(useSelector(garageSelector));

  const label: LabelDropdown[] = [
    { label: "Inspection", value: "Inspection" },
    { label: "Maintenance", value: "Maintenance" },
    { label: "Modification", value: "Modification" },
    { label: "Other", value: "Other" },
    // { label: "Service", value: "Service" },
  ];

  const handleAddPress = (form: LogsObject) => {
    const newDate = new Date();
    const formatNumber = (number: number) => {
      return number < 10 ? `0${number}` : `${number}`;
    };

    const day = formatNumber(newDate.getDate());
    const month = formatNumber(newDate.getMonth() + 1);
    const year = String(newDate.getFullYear());
    const hours = String(newDate.getHours()).padStart(2, "0");
    const minutes = String(newDate.getMinutes()).padStart(2, "0");
    const seconds = String(newDate.getSeconds()).padStart(2, "0");
    // console.log(day + month + year + hours + minutes + seconds)
    const log: LogsObject = {
      ...form,
      logUUID: Number(`${year}${month}${day}${hours}${minutes}${seconds}`),
      date: day + "-" + month + "-" + year,
      time: hours + ":" + minutes,
    };
    formValid
      ? (dispatch(addLog({ vehUUID: form.vehUUID, log })), setModalState(false))
      : console.log("form is invalid");
  };

  return (
    <Modal
      visible={modalState}
      animationType="slide"
      transparent={false}
      presentationStyle="formSheet"
      style={{ backgroundColor: "#F0F0F0" }}
    >
      <View style={styles.modalHeader}>
        <TouchableOpacity
          onPress={() => {
            setModalState(false), setForm(initialForm);
          }}
        >
          <Text style={styles.modalHeaderCancelText}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.modalHeaderTitleText}>New Log</Text>
        <TouchableOpacity onPress={() => handleAddPress(form)}>
          <Text
            style={[
              styles.modalHeaderAddText,
              { color: formValid ? "#0E7AFE" : "#bbbbbb" },
            ]}
          >
            Add
          </Text>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={100}>
        <ScrollView>
          <View style={{ backgroundColor: "#F0F0F0", height: "100%" }}>
            <TouchableWithoutFeedback onPress={() => vehicleRef.current.open()}>
              <View style={styles.box}>
                <Text style={styles.formTitles}>Vehicle:</Text>
                <Dropdown
                  data={vehicles}
                  value={form.vehUUID}
                  labelField="name"
                  valueField="vehUUID"
                  placeholder="Select Vehicle"
                  onChange={(e) => setForm({ ...form, vehUUID: e.vehUUID })}
                  ref={vehicleRef}
                />
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => labelRef.current.open()}>
              <View style={[styles.box, { marginBottom: 15 }]}>
                <Text style={styles.formTitles}>Label:</Text>
                <Dropdown
                  data={label}
                  value={form.label}
                  labelField="label"
                  valueField="value"
                  placeholder="Select Label"
                  onChange={(e) => {
                    setForm({ ...form, label: e.label });
                  }}
                  ref={labelRef}
                />
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => titleRef.current.focus()}>
              <View style={styles.box}>
                <Text style={styles.formTitles}>Title:</Text>
                <TextInput
                  ref={titleRef}
                  inputMode="text"
                  placeholder="Enter the title of your log..."
                  placeholderTextColor={"#9BA1A6"}
                  value={form.data.title}
                  onChangeText={(e) =>
                    setForm({ ...form, data: { ...form.data, title: e } })
                  }
                  onSubmitEditing={() => descRef.current.focus()}
                />
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => descRef.current.focus()}>
              <View style={[styles.box, { marginBottom: 15 }]}>
                <Text style={styles.formTitles}>Description:</Text>
                <TextInput
                  ref={descRef}
                  inputMode="text"
                  placeholder="Enter description..."
                  multiline={true}
                  placeholderTextColor={"#9BA1A6"}
                  value={form.data.desc}
                  onChangeText={(e) =>
                    setForm({ ...form, data: { ...form.data, desc: e } })
                  }
                  onSubmitEditing={() => odoRef.current.focus()}
                />
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => odoRef.current.focus()}>
              <View style={styles.box}>
                <Text style={styles.formTitles}>Odometer:</Text>
                <View style={styles.inlineView}>
                  <TextInput
                    ref={odoRef}
                    inputMode="numeric"
                    placeholder="0"
                    placeholderTextColor={"#9BA1A6"}
                    value={
                      form.additionals.odo &&
                      Number(form.additionals.odo).toLocaleString()
                    }
                    onChangeText={(e) =>
                      setForm({
                        ...form,
                        additionals: {
                          ...form.additionals,
                          odo: e.replaceAll(",", ""),
                        },
                      })
                    }
                    onSubmitEditing={() => priceRef.current.focus()}
                    returnKeyType="done"
                  />
                  <Text>Km</Text>
                </View>
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => priceRef.current.focus()}>
              <View style={styles.box}>
                <Text style={styles.formTitles}>Price:</Text>
                <View style={styles.inlineView}>
                  <Text>$</Text>
                  <TextInput
                    ref={priceRef}
                    inputMode="decimal"
                    placeholder="0.00"
                    placeholderTextColor={"#9BA1A6"}
                    value={form.additionals.price}
                    onChangeText={(e) =>
                      setForm({
                        ...form,
                        additionals: { ...form.additionals, price: e },
                      })
                    }
                    onSubmitEditing={() => locationRef.current.focus()}
                    returnKeyType="done"
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback
              onPress={() => locationRef.current.focus()}
            >
              <View style={styles.box}>
                <Text style={styles.formTitles}>Location:</Text>
                <TextInput
                  ref={locationRef}
                  inputMode="text"
                  placeholder="Enter a location or shop name..."
                  placeholderTextColor={"#9BA1A6"}
                  value={form.additionals.location}
                  onChangeText={(e) =>
                    setForm({
                      ...form,
                      additionals: { ...form.additionals, location: e },
                    })
                  }
                  onSubmitEditing={() => notesRef.current.focus()}
                />
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => notesRef.current.focus()}>
              <View style={styles.box}>
                <Text style={styles.formTitles}>Additional Notes:</Text>
                <TextInput
                  ref={notesRef}
                  inputMode="text"
                  placeholder="Enter any additional notes..."
                  placeholderTextColor={"#9BA1A6"}
                  value={form.additionals.notes}
                  onChangeText={(e) =>
                    setForm({
                      ...form,
                      additionals: { ...form.additionals, notes: e },
                    })
                  }
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </ScrollView>
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
    zIndex: 10,
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
  formTitles: {
    color: Colors.light.text,
    fontSize: 16,
    marginBottom: 5,
  },
  placeholderTextStyling: {
    color: "#9BA1A6",
  },
  inlineView: {
    flexDirection: "row",
    gap: 5,
  },
});
