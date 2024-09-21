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
import { FC, useState } from "react";
import * as React from "react";
import { Dropdown } from "react-native-element-dropdown";
import cars from "../../cars.json";
import { AntDesign } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import LogModal from "./logModal";

const LogsPage = () => {
  const [value, setValue] = useState("");
  const [modalState, setModalState] = useState(false);

  const logsList = useSelector((state: any) => state.logs);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Logs</Text>
        <Dropdown
          data={cars}
          value={value}
          labelField="nickName"
          valueField="nickName"
          placeholder="Select Vehicle"
          onChange={(car) => {
            setValue(car.nickName);
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

      <ScrollView>
        {Array.isArray(logsList) &&
          logsList.map((log, index) => {
            return (
              <View key={index}>
                <Text>{log.title}</Text>
              </View>
            );
          })}
      </ScrollView>

      <LogModal modalState={modalState} setModalState={setModalState}/>
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
    marginHorizontal: 15
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
});
