import { Link, router } from "expo-router";
import {
  Text,
  View,
  StyleSheet,
  Button,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGarage } from "@/constants/hooks";

export default function Index() {
  const [addMenu, setAddMenu] = useState(false);
  const { garage, clrVeh } = useGarage();

  const vehicles = Object.values(garage);

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
        <View
          style={{ borderRadius: 50, backgroundColor: "#ffffff", padding: 5 }}
        >
          <TouchableOpacity
            onPress={() =>
              router.navigate({
                pathname: "/addMenuPage",
              })
            }
          >
            <AntDesign name="plus" size={30} style={{ borderRadius: 50 }} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.garageContainer}
        showsVerticalScrollIndicator={false}
      >
        {vehicles.length === 0 ? (
          <View
            style={{
              backgroundColor: "#fff",
              borderRadius: 25,
              justifyContent: "center",
            }}
          >
            <Link href="./addMenuPage">
              <Text style={{ textAlign: "center", margin: 20 }}>
                Add a vehicle to get started
              </Text>
            </Link>
          </View>
        ) : (
          vehicles.map((vehicle) => {
            return (
              <TouchableOpacity
                key={vehicle.vehUUID}
                onPress={() =>
                  router.navigate({
                    pathname: "/vehicle/[vehicle]",
                    params: { vehicle: vehicle.vehUUID },
                  })
                }
                style={{
                  marginBottom: 25,
                }}
              >
                <View
                  style={{
                    borderColor: "#555555",
                    borderRadius: 25,
                    paddingVertical: 10,
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
                        textAlign: "center",
                      }}
                    >
                      {vehicle.name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 40,
                        letterSpacing: 5,
                        textTransform: "uppercase",
                        marginTop: "auto",
                      }}
                    >
                      {vehicle.rego ? vehicle.rego : vehicle.nickName || ""}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })
        )}

        <Button
          title="Clear Vehicles"
          onPress={() => clrVeh()}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flexDirection
  },
  garageContainer: {
    marginTop: 10,
    paddingHorizontal: 60,
  },
});
