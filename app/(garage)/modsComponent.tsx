import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { SetStateAction, useEffect, useState } from "react";
import { GarageObject } from "@/slices/garageSlice";
import { useForm } from "@/constants/hooks";

interface props {
  property: keyof GarageObject["modifications"];
  setIsOpen: React.Dispatch<React.SetStateAction<string>>;
  isOpen: string;
}

const ModsComponent: React.FC<props> = ({
  property,
  setIsOpen,
  isOpen,
}) => {
  const [ inputValue, setInputValue ] = useState("")
  const { form, setForm } = useForm()

  const handleTextSubmit = () => {
    inputValue && setForm({...form, modifications: {...form.modifications, 
    [property]: [...form.modifications[property] || [], inputValue]}})
    setInputValue("")
  }

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
              {form.modifications[property]?.length > 0 &&
                form.modifications[property].map((value, index) => (
                  <View key={index}>
                    <Text>{value}</Text>
                  </View>
                ))}
              <TextInput
                placeholder="Enter details..."
                value={inputValue}
                onChangeText={(e) => {
                  setInputValue(e)
                }}
                onSubmitEditing={() => handleTextSubmit()}
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
