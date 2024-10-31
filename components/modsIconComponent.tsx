import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

interface Props {
    handleRemovePress: (index: number) => void,
    handleEditPress: (index: number) => void,
    index: number
}
const ModsIconComponent: React.FC<Props> = ({ handleRemovePress, handleEditPress, index}) => {
  const [deletable, setDeletable] = useState<boolean>(false);
  return (
    <View>
      {deletable ? (
        <TouchableOpacity
          style={[styles.iconTouchableStyling, { backgroundColor: "#ff0000" }]}
          onPress={() => {handleRemovePress(index), setDeletable(false)}}
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
          onPress={() => {handleEditPress(index), setDeletable(true)}}
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
