import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { FC, useState } from "react";
import * as React from "react";
import { Dropdown } from "react-native-element-dropdown";
import cars from '../../cars.json';
import { AntDesign } from "@expo/vector-icons";

const LogsPage = () => {
  const [value, setValue] = useState("");

  return (
    <SafeAreaView>
      <View
        style={{
          height: 60,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 20,
          flexDirection: "row",
        }}
      >
        <Text
          style={{
            fontSize: 30,
            fontWeight: "bold",
            flex: 1,
          }}
        >
          Logs
        </Text>
        <Dropdown
          data={cars}
          value={value}
          labelField="nickName"
          valueField="nickName"
          placeholder="Select Vehicle"
          onChange={(car) => {
            setValue(car.nickName);
          }}
          style={{
            height: 40,
            flex: 1.5,
            backgroundColor: "white",
            borderRadius: 15,
            paddingLeft: 15,
          }}
          placeholderStyle={{ textAlign: "center"}}
          selectedTextStyle={{ textAlign: "center" }}
          containerStyle={{ borderRadius: 15 }}
          itemContainerStyle={{ borderRadius: 15 }}
          itemTextStyle={{ textAlign: "center" }}
        />
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            justifyContent: "flex-end",
          }}
        >
          <AntDesign name="plus" size={30} style={{ backgroundColor: '#ffffff', borderRadius: 50}}/>
          <AntDesign
            name="filter"
            size={30}
            style={{
              marginLeft: 10,
            }}
          />
        </View>
      </View>
      {/* {value && LogList(CarPro)} */}
    </SafeAreaView>
  );
};

export default LogsPage;

const styles = StyleSheet.create({});
