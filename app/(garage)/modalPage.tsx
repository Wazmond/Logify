import {
  Button,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, {useState } from "react";
import { Feather } from "@expo/vector-icons";
import ModsComponent from "../../components/modsComponent";

interface Props {
  modalState: boolean;
  setModalState: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalPage: React.FC<Props> = ({
  modalState,
  setModalState,
}) => {
  const [isOpen, setIsOpen] = useState("");

  return (
    <Modal
      visible={modalState}
      presentationStyle="formSheet"
      animationType="slide"
      style={styles.modalPage}
    >
      <View style={styles.headerContainer}>
        <View>
          <TouchableOpacity
            onPress={() => setModalState(false)}
            style={styles.icon}
          >
            <Feather name="x" size={30} style={styles.closeIcon} />
          </TouchableOpacity>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Modifications and changes</Text>
        </View>
      </View>

      <ScrollView style={styles.componentsContainer}>
        <ModsComponent
          property={"body"}
          setIsOpen={setIsOpen}
          isOpen={isOpen}
        />
        <ModsComponent
          property={"braking"}
          setIsOpen={setIsOpen}
          isOpen={isOpen}
        />
        <ModsComponent
          property={"drivetrain"}
          setIsOpen={setIsOpen}
          isOpen={isOpen}
        />
        <ModsComponent
          property={"electricals"}
          setIsOpen={setIsOpen}
          isOpen={isOpen}
        />
        <ModsComponent
          property={"engine"}
          setIsOpen={setIsOpen}
          isOpen={isOpen}
        />
        <ModsComponent
          property={"interior"}
          setIsOpen={setIsOpen}
          isOpen={isOpen}
        />
        <ModsComponent
          property={"suspension"}
          setIsOpen={setIsOpen}
          isOpen={isOpen}
        />
        <ModsComponent
          property={"wheels"}
          setIsOpen={setIsOpen}
          isOpen={isOpen}
        />
      </ScrollView>
    </Modal>
  );
};

export default ModalPage;

const styles = StyleSheet.create({
  modalPage: { backgroundColor: "#f0f0f0" },
  titleContainer: {

  },
  titleText: {
    fontSize: 20,
  },
  headerContainer: {
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center",
    height: 60,
    backgroundColor: "#f0f0f0",
    flexDirection: "row",
  },
  closeIcon: { margin: 5 },
  icon: {
    backgroundColor: "#fff",
    borderRadius: 50,
  },
  componentsContainer: {
    paddingHorizontal: 30,
    backgroundColor: "#f0f0f0",
  },
});
