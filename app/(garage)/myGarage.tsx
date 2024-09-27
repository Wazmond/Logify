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
import {
  GarageObject,
  clearGarage,
  garageSelector,
} from "@/slices/garageSlice";

export default function Index() {
  const [addMenu, setAddMenu] = useState(false);
  const garage: GarageObject[] = useSelector(garageSelector) || [];

  const dispatch = useDispatch();

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
        {garage.length === 0 ? (
          <Text>No vehicles in the garage</Text>
        ) : (
          garage.map((vehicle, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  router.navigate({
                    pathname: "/car/[car]",
                    params: { car: vehicle.name },
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
                      {vehicle.rego ? vehicle.rego : vehicle.nickName}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })
        )}

        <Button title="Clear Vehicles" onPress={() => dispatch(clearGarage())} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flexDirection
  },
});
