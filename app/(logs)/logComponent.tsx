import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

interface LogComponentProps {
  log: any;
}
const LogComponent: React.FC<LogComponentProps> = ({ log }) => {
  console.log("log.data : " + log.data)
  return (
    <View style={styles.container}>
      {/* <View style={styles.timelineView}>
        <View style={styles.timelineDot} />
        <View style={styles.timelineLine} />
      </View> */}
      <View style={styles.touchableContainer}>
        <TouchableOpacity style={styles.logsTouchable}>
          <Text style={[styles.title]}>{log.data.title}</Text>
          <Text>{log.data.desc}</Text>
          <Text>
            {log.date} {log.time}
          </Text>
          <View style={{ backgroundColor: "grey" }} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LogComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    // borderWidth: 1,
    flex: 1,
  },
  touchableContainer: {
    paddingBottom: 20,
    flex: 1,
    height: 100,
  },
  logsTouchable: {
    backgroundColor: "#ffffff",
    borderRadius: 15,
    padding: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
  },
  timelineView: {
    marginRight: 20,
    paddingTop: 20,
  },
  timelineDot: {
    height: 10,
    width: 10,
    backgroundColor: "#000000",
    borderRadius: 50,
  },
  timelineLine: {
    borderRadius: 25,
    marginTop: 20,
    width: 10,
    flex: 1,
    backgroundColor: "#000000",
  },
});
