import { Link, router } from "expo-router";
import {
  Text,
  View,
  StyleSheet,
  Button,
  TouchableHighlight,
  ScrollView,
  TouchableOpacity,
  Modal,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import cars from "../../cars.json";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { useSelector } from "react-redux";
import { GarageObject } from "@/slices/garageSlice";

export default function Index() {
  const [addMenu, setAddMenu] = useState(false);
  // const garage = useGarageStore((state) => state.garage);
  const garage = useSelector((state: any) => state.myGarage.garage)
  // const garage = cars;
  // const handleAddPress = () => {
  //   setAddMenu(!addMenu);
  // };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          height: 60,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 20,
          flexDirection: "row",
        }}
      >
        <View style={{ flex: 1, justifyContent: "flex-start" }}>
          <Text
            style={{
              fontSize: 30,
              fontWeight: "bold",
            }}
          >
            My Garage
          </Text>
        </View>
        <View style={{ borderRadius: 50 }}>
          <Link href="./addMenuPage">
            <AntDesign name="plus" size={30} style={{ borderRadius: 50 }} />
          </Link>
        </View>
      </View>

      <ScrollView
        style={{
          marginTop: 10,
          marginHorizontal: 60,
        }}
        showsVerticalScrollIndicator={false}
      >
        {Array.isArray(garage) &&
          garage.map((vehicle, index) => {
            const vehicleName = `${vehicle.car.year} ${vehicle.car.make} ${vehicle.car.model}`;
            return (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  router.navigate({
                    pathname: "/car/[car]",
                    params: { car: vehicleName },
                  })
                }
                style={{
                  marginBottom: 25,
                }}
              >
                <View
                  style={{
                    // borderWidth: 1,
                    borderColor: "#555555",
                    borderRadius: 25,
                    paddingVertical: 10,
                    height: 100,
                    backgroundColor: "#ffffff",
                  }}
                >
                  <View
                    style={{
                      alignItems: "center",
                      flex: 1,
                      paddingHorizontal: 10,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 22,
                      }}
                    >
                      {vehicleName}
                    </Text>
                    <Text
                      style={{
                        fontSize: 40,
                        letterSpacing: 5,
                        textTransform: "uppercase",
                        marginTop: "auto",
                      }}
                    >
                      {vehicle.rego ? vehicle.rego : vehicle.nickName}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flexDirection
  },
});
