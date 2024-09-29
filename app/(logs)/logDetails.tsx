import {
  KeyboardAvoidingView,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  Feather,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import {
  LogsObject,
  addLog,
  editLog,
  logSelector,
  removeLog,
} from "@/slices/logsSlice";
import { Dropdown } from "react-native-element-dropdown";
import { Colors } from "@/constants/Colors";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import {
  GarageObject,
  GarageState,
  garageSelector,
} from "@/slices/garageSlice";

const logsInitialState: LogsObject = {
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

interface props {
  modalState: {
    state: boolean;
    log: LogsObject;
  };
  setModalState: any;
}

interface LabelDropdown {
  label: string;
  value: string;
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

const LogDetails: React.FC<props> = ({ modalState, setModalState }) => {
  const [editable, setEditable] = useState(false);
  const [form, setForm] = useState<LogsObject>(logsInitialState);

  const dispatch = useDispatch();

  useEffect(() => {
    modalState.state === true
      ? setForm(modalState.log)
      : setForm(logsInitialState);
  }, [modalState]);

  const label: LabelDropdown[] = [
    { label: "Inspection", value: "Inspection" },
    { label: "Maintenance", value: "Maintenance" },
    { label: "Modification", value: "Modification" },
    { label: "Other", value: "Other" },
  ];

  const vehicleRef = useRef<any>(null);
  const labelRef = useRef<any>(null);
  const titleRef = useRef<any>(null);
  const descRef = useRef<any>(null);
  const odoRef = useRef<any>(null);
  const priceRef = useRef<any>(null);
  const locationRef = useRef<any>(null);
  const notesRef = useRef<any>(null);

  const garage: GarageState = useSelector(garageSelector);
  const vehicleNames: GarageObject[] = Object.values(garage);

  const handleSave = () => {
    console.log("handle save as been pressed");
    const oldVehUUID = modalState.log.vehUUID;
    oldVehUUID !== form.vehUUID
      ? (dispatch(removeLog({ vehUUID: oldVehUUID, logUUID: form.logUUID })),
        dispatch(addLog({ vehUUID: form.vehUUID, log: form })))
      : dispatch(editLog({ log: form }));
    setForm(logsInitialState);
    setModalState({ state: false });
  };

  return (
    <Modal
      visible={modalState.state}
      animationType="slide"
      transparent={false}
      presentationStyle="formSheet"
      style={{ backgroundColor: "#F0F0F0" }}
    >
      <View style={styles.modalheader}>
        <View>
          <TouchableHighlight
            underlayColor={"#bbbbbb"}
            onPress={() => {
              setEditable(false), setModalState({ state: false, log: {} });
            }}
            style={styles.iconBackground}
          >
            <Feather name="x" size={30} style={styles.icon} />
          </TouchableHighlight>
        </View>
        <Text style={styles.modalHeaderTitle}>
          {modalState.state && modalState.log.data.title}
        </Text>
        <View>
          {editable ? (
            <TouchableHighlight
              underlayColor={"#bbbbbb"}
              onPress={() => handleSave()}
              style={[styles.iconBackground, { backgroundColor: "#0E7AFE" }]}
            >
              <MaterialIcons
                name="check"
                size={30}
                style={[styles.icon, { color: "#fff" }]}
              />
            </TouchableHighlight>
          ) : (
            <TouchableHighlight
              underlayColor={"#bbbbbb"}
              onPress={() => setEditable(true)}
              style={styles.iconBackground}
            >
              <MaterialIcons name="edit" size={30} style={styles.icon} />
            </TouchableHighlight>
          )}
        </View>
      </View>

      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={100}>
        <ScrollView>
          <View style={{ backgroundColor: "#F0F0F0", height: "100%" }}>
            <TouchableWithoutFeedback
              onPress={() => editable && vehicleRef.current.open()}
            >
              <View style={styles.box}>
                <Text style={styles.formTitles}>Vehicle:</Text>
                {editable ? (
                  <Dropdown
                    data={vehicleNames}
                    value={garage[form.vehUUID]?.name}
                    labelField="name"
                    valueField="vehUUID"
                    placeholder={garage[form.vehUUID]?.name}
                    onChange={(e) => setForm({ ...form, vehUUID: e.vehUUID })}
                    ref={vehicleRef}
                  />
                ) : (
                  <Text>{garage[form.vehUUID]?.name}</Text>
                )}
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback
              onPress={() => editable && labelRef.current.open()}
            >
              <View style={[styles.box, { marginBottom: 15 }]}>
                <Text style={styles.formTitles}>Label:</Text>
                {editable ? (
                  <Dropdown
                    data={label}
                    value={form?.label}
                    labelField="label"
                    valueField="value"
                    placeholder={form?.label}
                    onChange={(e) => {
                      setForm({ ...form, label: e.label });
                    }}
                    ref={labelRef}
                  />
                ) : (
                  <Text>{form?.label}</Text>
                )}
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback
              onPress={() => editable && titleRef.current.focus()}
            >
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

            <TouchableWithoutFeedback
              onPress={() => editable && descRef.current.focus()}
            >
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

            <TouchableWithoutFeedback
              onPress={() => editable && odoRef.current.focus()}
            >
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

            <TouchableWithoutFeedback
              onPress={() => editable && priceRef.current.focus()}
            >
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
              onPress={() => editable && locationRef.current.focus()}
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

            <TouchableWithoutFeedback
              onPress={() => editable && notesRef.current.focus()}
            >
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

export default LogDetails;

const styles = StyleSheet.create({
  modalheader: {
    backgroundColor: "#F0F0F0",
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  modalHeaderTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  iconBackground: {
    backgroundColor: "#FFF",
    borderRadius: 50,
  },
  icon: {
    margin: 5,
  },
  inputViewContainer: {
    backgroundColor: "#ffffff",
    flexDirection: "row",
    marginBottom: 2,
  },
  box: {
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
