import {
  Alert,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { SetStateAction, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useGarage } from "@/constants/hooks";
import { clearLog } from "@/slices/logsSlice";
import { useDispatch } from "react-redux";

interface Props {
  isVisible: boolean;
  setIsVisible: React.Dispatch<SetStateAction<boolean>>;
  titleText: string | null;
  resetVar: string | null;
  location: string | null;
}
const CheckModal: React.FC<Props> = ({
  isVisible,
  setIsVisible,
  titleText,
  resetVar,
  location,
}) => {
  console.log("Modal should be visible: " + isVisible);

  const router = useRouter();
  const dispatch = useDispatch();
  const { clrVeh } = useGarage();

  const reset = (resetVar: string | null) => {
    switch (resetVar) {
      case "resetGarage":
        clrVeh();
        Alert.alert("Garage have been reset");
        break;
      case "resetLogs":
        dispatch(clearLog());
        Alert.alert("Logs have been reset");
        break;
      case "resetAll":
        clrVeh();
        dispatch(clearLog());
        Alert.alert("All data have been reset");
        break;
      default:
        break;
    }
  };

  return (
    <Modal visible={isVisible} presentationStyle="overFullScreen" transparent>
      <View style={styles.modalComponent}>
        <TouchableWithoutFeedback onPress={() => setIsVisible(false)}>
          <View style={styles.modal}>
            <TouchableWithoutFeedback onPress={undefined}>
              <View>
                <View>
                  <Text style={styles.modalTitle}>Reset {titleText}</Text>
                </View>
                <View>
                  <Text style={styles.modalDesc}>
                    Are you sure you want to reset your {titleText}? (Doing this
                    will delete all your {location})
                  </Text>
                </View>
                <View style={styles.modalButtonsBackground}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                      setIsVisible(false);
                      reset(resetVar);
                    }}
                    style={styles.modalButtonsContainer}
                  >
                    <Text
                      style={[
                        styles.modalButtonsText,
                        { color: "rgba(255,00,00,10)" },
                      ]}
                    >
                      Remove
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                      setIsVisible(false);
                    }}
                    style={styles.modalButtonsContainer}
                  >
                    <Text
                      style={[styles.modalButtonsText, { color: "#0E7AFE" }]}
                    >
                      Cancel
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </Modal>
  );
};

const AboutPage = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [resetVar, setResetVar] = useState<string | null>(null);
  const [titleText, setTitleText] = useState<string | null>(null);
  const [location, setLocation] = useState<string | null>(null);
  const router = useRouter();

  const resetGarage = () => {
    console.log("ResetGarage Pressed");
    setIsVisible(true);
    setResetVar("resetGarage");
    setTitleText("garage");
    setLocation("vehicles from the garage");
  };

  const resetLogs = () => {
    console.log("resetLogs Pressed");
    setIsVisible(true);
    setResetVar("resetLogs");
    setTitleText("logs");
    setLocation("logs from the app");
  };
  const resetAll = () => {
    console.log("reset all Pressed");
    setIsVisible(true);
    setResetVar("resetAll");
    setTitleText("app data");
    setLocation("data (vehicles + logs) from the app");
  };
  return (
    <SafeAreaView>
      <View style={styles.aboutPage}>
        <TouchableWithoutFeedback onPress={() => router.back()}>
          <View style={styles.headerContainer}>
            <MaterialIcons
              name="arrow-back-ios-new"
              size={30}
              color={"#0E7AFE"}
            />

            <Text style={styles.headerTitle}>Settings</Text>
          </View>
        </TouchableWithoutFeedback>

        <View style={styles.bodyContainer}>
          <Text style={styles.bodyTitle}>Reset your data here</Text>
          <Text style={styles.bodyDesc}>
                After resetting, you will not be able to retreive the old data.
            </Text>
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.buttons}>
            <TouchableOpacity
              onPress={() => {
                resetGarage();
              }}
            >
              <Text style={styles.bodyText}>Reset garage</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttons}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                resetLogs();
              }}
            >
              <Text style={styles.bodyText}>Reset logs</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttons}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.buttonTouchable}
              onPress={() => {
                resetAll();
              }}
            >
              <Text style={styles.bodyText}>Reset everything</Text>
            </TouchableOpacity>
          </View>
        </View>
        <CheckModal
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          titleText={titleText}
          resetVar={resetVar}
          location={location}
        />
      </View>
    </SafeAreaView>
  );
};

export default AboutPage;

const styles = StyleSheet.create({
  aboutPage: {},
  headerContainer: {
    marginVertical: 5,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: "bold",
  },
  bodyContainer: {
    padding: 20
  },
  bodyTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
    marginBottom: 25,
    textAlign: "center",
  },
  bodyDesc: {
    textAlign: 'center'
  },
  bodyText: {
    fontSize: 16,
    textAlign: "center",
    marginHorizontal: 20,
    lineHeight: 25,
  },
  buttonTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "column",
    gap: 20,
    paddingHorizontal: 20,
  },
  buttons: {
    backgroundColor: "#fff",
    borderRadius: 15,
    paddingVertical: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowColor: "#000",
    shadowRadius: 3,
    shadowOpacity: 0.2,
  },
  buttonTouchable: {
    backgroundColor: "#fff",
  },
  buttonsText: {
    textAlign: "center",
  },

  modalComponent: {
    flex: 1,
    backgroundColor: "rgba(00,00,00,0.7)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  modal: {
    backgroundColor: "#fff",
    borderRadius: 15,
    overflow: "hidden",
  },
  modalTitle: {
    textAlign: "center",
    fontSize: 24,
    marginVertical: 20,
    textTransform: "capitalize"
  },
  modalDesc: {
    fontSize: 18,
    textAlign: "center",
    marginHorizontal: 20,
    marginBottom: 20,
  },
  modalButtonsBackground: {
    flexDirection: "row",
    backgroundColor: "#000",
    gap: 1,
  },
  modalButtonsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderTopWidth: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  modalButtonsText: {
    fontSize: 18,
  },
});
