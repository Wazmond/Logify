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
import { useGarage } from "@/constants/hooks";

export default function Index() {
  const { garage, clrVeh } = useGarage();

  const vehicles = Object.values(garage);

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
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

      {vehicles.length === 0 ? (
        <View style={styles.altContainer}>
          <TouchableOpacity
            onPress={() => {
              router.navigate("./addMenuPage");
            }}
          >
            <Text style={styles.altText}>Add a vehicle to get started</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView
          style={styles.garageContainer}
          showsVerticalScrollIndicator={false}
        >
          {vehicles.map((vehicle) => {
            return (
              <TouchableOpacity
                key={vehicle.vehUUID}
                onPress={() =>
                  router.navigate({
                    pathname: "/vehicle/[vehicle]",
                    params: { vehicle: vehicle.vehUUID },
                  })
                }
                style={styles.vehicleMapContainer}
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
          })}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {},
  garageContainer: {
    marginTop: 10,
    paddingHorizontal: 60,
  },
  altContainer: {
    backgroundColor: "#fff",
    borderRadius: 15,
    justifyContent: "center",
    marginHorizontal: 30,
    marginTop: 25,
  },
  altText: {
    shadowOffset: { width: 0, height: 2 },
    shadowColor: "#000",
    shadowRadius: 3,
    shadowOpacity: 0.2,
    textAlign: "center",
    margin: 20,
    fontSize: 18,
  },
  vehicleMapContainer: {
    marginBottom: 25,
    shadowOffset: { width: 0, height: 2 },
    shadowColor: "#000",
    shadowRadius: 3,
    shadowOpacity: 0.2,
  },
});
