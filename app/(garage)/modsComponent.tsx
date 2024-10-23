import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { SetStateAction, useEffect, useRef, useState } from "react";
import { GarageObject } from "@/slices/garageSlice";
import { useForm } from "@/constants/hooks";

interface props {
  property: keyof GarageObject["modifications"];
  setIsOpen: React.Dispatch<React.SetStateAction<string>>;
  isOpen: string;
}

const ModsComponent: React.FC<props> = ({ property, setIsOpen, isOpen }) => {
  const [inputValue, setInputValue] = useState("");
  const { form, setForm } = useForm();

  const inputRef = useRef<TextInput | null>(null);

  useEffect(() => {
    isOpen === property && setTimeout(() => inputRef.current?.focus(), 1);
  }, [isOpen, property, form.modifications]);

  const handleTextSubmit = () => {
    inputValue &&
      setForm({
        ...form,
        modifications: {
          ...form.modifications,
          [property]: [...(form.modifications[property] || []), inputValue],
        },
      });
    setInputValue("");
  };

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
              <View style={styles.modsComponent}>
                {form.modifications[property]?.length > 0 &&
                  form.modifications[property].map((value, index) => (
                    <View key={index}>
                      <Text>{value}</Text>
                    </View>
                  ))}
              </View>
              <TextInput
                ref={inputRef}
                placeholder="Enter details..."
                value={inputValue}
                onChangeText={(e) => {
                  setInputValue(e);
                }}
                style={styles.inputBox}
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
    borderRadius: 10,
  },
  container: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  title: {
    textTransform: "capitalize",
    marginLeft: 5,
    fontSize: 20,
  },
  modsComponent: {
    marginVertical: 5,
    paddingHorizontal: 10,
    gap: 5,
  },
  inputBox: {
    marginTop: 5,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
});
