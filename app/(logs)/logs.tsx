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
import { useState } from "react";
import * as React from "react";
import { Dropdown } from "react-native-element-dropdown";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import LogModal from "./logModal";
import VehicleDropdownItem from "@/customTypings";
import LogComponent from "./logComponent";
import { clearLog } from "@/slices/logsSlice";

const LogsPage = () => {
  const [selectedVehicle, setSelectedVehicle] = useState("all");
  const [modalState, setModalState] = useState(false);
  const dispatch = useDispatch();

  const vehicles: VehicleDropdownItem[] = [
    { vehUUID: "all", name: "All Vehicles" },
    ...useSelector((state: any) => state.myGarage.garage).map((veh: any) => {
      return {
        ...veh,
        name: `${veh.car.year} ${veh.car.make} ${veh.car.model}`,
      };
    }),
  ];

  const handleClearLog = () => {
    dispatch(clearLog());
  };

  const logsList = useSelector((state: any) => state.logs);
  
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
                setModalState(true);
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
        {selectedVehicle === "all"
          ? Object.entries(logsList).map(
              ([vehUUID, logsForVehicle]: [string, any]) => (
                <View key={vehUUID}>
                  {Object.entries(logsForVehicle).map(
                    ([logKey, log]: [string, any]) => (
                      <LogComponent key={logKey} log={log} />
                    )
                  )}
                </View>
              )
            )
          : logsList[selectedVehicle] &&
            Object.entries(logsList[selectedVehicle]).map(
              ([logKey, log]: [string, any]) => (
                <LogComponent key={logKey} log={log} />
              )
            )}
      </ScrollView>

      <LogModal modalState={modalState} setModalState={setModalState} />

      <Button title="clear log" onPress={handleClearLog} />
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
