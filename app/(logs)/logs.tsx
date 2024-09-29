import {
  Button,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import { useState, useEffect } from "react";
import { Dropdown } from "react-native-element-dropdown";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import LogModal from "./logModal";
import VehicleDropdownItem from "@/customTypings";
import LogComponent from "./logComponent";
import { LogsObject, LogsState, clearLog } from "@/slices/logsSlice";
import LogDetails from "./logDetails";
import { GarageState, garageSelector } from "@/slices/garageSlice";

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
}

const LogsPage = () => {
  const [selectedVehicle, setSelectedVehicle] = useState("all");
  const [modalStateLD, setModalStateLD] = useState({
    state: false,
    log: logsInitialState
  });
  const [modalStateNL, setModalStateNL] = useState(false);

  const dispatch = useDispatch();

  const vehicles = Object.values(useSelector(garageSelector));

  const logsList = useSelector((state: any) => state.logs);
  const sortedLogsList =
    selectedVehicle === "all"
      ? Object.entries(logsList as LogsState)
          .flatMap(([logUUID, logs]) => Object.values(logs))
          .sort((a, b) => Number(b.logUUID) - Number(a.logUUID))
      : Object.entries((logsList[selectedVehicle] as LogsState) || {})
          .flatMap(([logUUID, log]) => Object.values([log]))
          .sort((a, b) => Number(b.logUUID) - Number(a.logUUID));

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Logs</Text>
        <Dropdown
          data={vehicles}
          value={selectedVehicle}
          labelField="name"
          valueField="vehUUID"
          placeholder="Select Vehicle"
          onChange={(car) => {
            setSelectedVehicle(car.vehUUID);
          }}
          style={styles.dropdown}
          placeholderStyle={styles.dropdownPlaceholder}
          selectedTextStyle={styles.dropdownSelectedText}
          containerStyle={styles.dropdownContainer}
          itemContainerStyle={styles.dropdownItemContainer}
          itemTextStyle={styles.dropdownItemText}
        />
        <View style={styles.iconContainer}>
          <View style={styles.iconCircle}>
            <TouchableHighlight
              underlayColor={"#bbbbbb"}
              style={{ borderRadius: 50 }}
              onPress={() => {
                setModalStateNL(true);
              }}
            >
              <AntDesign name="plus" size={30} style={styles.icon} />
            </TouchableHighlight>
          </View>
          <View style={[styles.iconCircle, styles.filterIcon]}>
            <TouchableHighlight
              underlayColor={"#bbbbbb"}
              style={{ borderRadius: 50 }}
              onPress={() => {}}
            >
              <AntDesign name="filter" size={30} style={styles.icon} />
            </TouchableHighlight>
          </View>
        </View>
      </View>

      <ScrollView style={styles.timelineContainer}>
        {sortedLogsList?.map((log, index) => {
          return (
            <View key={index}>
              <LogComponent log={log} setModalStateLD={setModalStateLD} />

            </View>
          );
        })}
      </ScrollView>
      <LogModal modalState={modalStateNL} setModalState={setModalStateNL} />
      <LogDetails
                modalState={modalStateLD}
                setModalState={setModalStateLD}
              />

      <Button title="clear log" onPress={() => dispatch(clearLog())} />
    </SafeAreaView>
  );
};

export default LogsPage;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    flexDirection: "row",
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    flex: 1,
  },
  dropdown: {
    height: 40,
    flex: 1.5,
    backgroundColor: "white",
    borderRadius: 15,
    marginHorizontal: 15,
  },
  dropdownPlaceholder: {
    textAlign: "center",
  },
  dropdownSelectedText: {
    textAlign: "center",
  },
  dropdownContainer: {
    borderRadius: 15,
  },
  dropdownItemContainer: {
    borderRadius: 15,
  },
  dropdownItemText: {
    textAlign: "center",
  },
  iconContainer: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
  },
  iconCircle: {
    backgroundColor: "#ffffff",
    borderRadius: 50,
  },
  filterIcon: {
    marginLeft: 10,
  },
  icon: {
    margin: 5,
  },
  timelineContainer: {
    padding: 20,
  },
});
