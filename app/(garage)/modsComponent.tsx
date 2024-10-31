import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { GarageObject } from "@/slices/garageSlice";
import { useForm } from "@/constants/hooks";
import ModsIconComponent from "@/components/modsIconComponent";

interface props {
  property: keyof GarageObject["modifications"];
  setIsOpen: React.Dispatch<React.SetStateAction<string>>;
  isOpen: string;
}

const ModsComponent: React.FC<props> = ({ property, setIsOpen, isOpen }) => {
  const [inputValue, setInputValue] = useState("");
  const [propertyIndex, setPropertyIndex] = useState<number | null>(null);
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
          [property]:
            propertyIndex !== null
              ? [
                  ...form.modifications[property].slice(0, propertyIndex),
                  inputValue,
                  ...form.modifications[property].slice(propertyIndex + 1),
                ]
              : [...(form.modifications[property] || []), inputValue],
        },
      });
    setInputValue("");
    setPropertyIndex(null);
  };

  const handleEditPress = (index: number) => {
    setPropertyIndex(index);
    setInputValue(form.modifications[property][index]);
  };
  const handleRemovePress = (index: number) => {
    setPropertyIndex(null);
    setForm({
      ...form,
      modifications: {
        ...form.modifications,
        [property]: form.modifications[property].filter(
          (item, itemIndex) => itemIndex !== index
        ),
      },
    });
  };

  return (
    <View style={styles.component}>
      <TouchableOpacity
        onPress={() => {
          isOpen !== property && setIsOpen(property);
        }}
      >
        <View style={styles.container}>
          <Text style={styles.title}>{property}</Text>
          {isOpen === property && (
            <View>
              <View style={styles.modsComponent}>
                {form.modifications[property]?.length > 0 &&
                  form.modifications[property].map((value, index) => (
                    <View key={index} style={styles.modsMapViewStyling}>
                      <Text>{value}</Text>
                      <ModsIconComponent
                        handleRemovePress={handleRemovePress}
                        handleEditPress={handleEditPress}
                        index={index}
                      />
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
  modsMapViewStyling: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
