import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { SetStateAction, useState } from "react";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

interface Props {
    handleRemovePress: (index: number) => void,
    handleEditPress: (index: number) => void,
    index: number,
    deletable: boolean,
    setDeletable: (index: number, state: boolean) => void
}
const ModsIconComponent: React.FC<Props> = ({ handleRemovePress, handleEditPress, index, deletable, setDeletable}) => {
  return (
    <View>
      {deletable ? (
        <TouchableOpacity
          style={[styles.iconTouchableStyling, { backgroundColor: "#ff0000" }]}
          onPress={() => {setDeletable(index, false), handleRemovePress(index)}}
        >
          <MaterialCommunityIcons
            name="trash-can"
            size={15}
            color={"#ffffff"}
            style={styles.iconStyling}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.iconTouchableStyling}
          onPress={() => {handleEditPress(index), setDeletable(index, true)}}
        >
          <MaterialIcons
            name="edit"
            size={15}
            color={"#fff"}
            style={styles.iconStyling}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ModsIconComponent;

const styles = StyleSheet.create({
  iconTouchableStyling: {
    backgroundColor: "#bbb",
    borderRadius: 50,
  },
  iconStyling: {
    margin: 5,
  },
});
