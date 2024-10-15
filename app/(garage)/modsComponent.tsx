import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { SetStateAction, useEffect, useState } from "react";
import { modsOpenState } from "./modalPage";
import { GarageObject } from "@/slices/garageSlice";

interface props {
  property: keyof GarageObject["modifications"];
  setIsOpen: React.Dispatch<React.SetStateAction<string>>;
  isOpen: string;
  setForm: React.Dispatch<React.SetStateAction<GarageObject>>;
  form: GarageObject;
}

const ModsComponent: React.FC<props> = ({
  property,
  setIsOpen,
  isOpen,
  setForm,
  form,
}) => {
  const [listItem, setListItem] = useState("");

  const handleTextSubmit = () => {
    if (listItem.trim() === "") return;
    setForm((prevForm) => ({
      ...prevForm,
      modifications: {
        ...prevForm.modifications,
        [property]: [...(prevForm.modifications[property] || []), listItem],
      },
    }));
    setListItem("");
  };
  console.log(JSON.stringify(form));
  return (
    <View style={styles.component}>
      <TouchableOpacity
        onPress={() => {
          setIsOpen(property);
        }}
      >
        <View style={styles.container}>
          <Text style={styles.title}>{property}</Text>
          {isOpen === property && (
            <View>
              <Text>isOpen is set to property(${property})</Text>
              {form.modifications[property]?.length > 0 &&
                form.modifications[property].map((value, index) => (
                  <View key={index}>
                    <Text>{value}</Text>
                  </View>
                ))}
              <TextInput
                placeholder="Enter details..."
                value={listItem}
                onChangeText={(e) => {
                  setListItem(e);
                }}
                onSubmitEditing={handleTextSubmit}
              />
            </View>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ModsComponent;

const styles = StyleSheet.create({
  component: {
    backgroundColor: "#fff",
    marginBottom: 10,
    borderRadius: 15,
  },
  container: {
    padding: 10,
  },
  title: {
    textTransform: "capitalize",
    fontSize: 18,
  },
});
