import { Zap } from "lucide-react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Label from "./Label";

const AppointmentCard = ({ data, onPress = () => {}, selected = false }) => {
  return (
    <TouchableOpacity
      style={[styles.container, selected ? styles.selected : null]}
      onPress={onPress}
    >
      <View style={styles.row}>
        <Text style={styles.title}>{data?.type}</Text>
        {data?.fastConfirm ? (
          <Label
            title={"Fast Confirm"}
            icon={<Zap fill={"#04521b"} size={12} color={"#04521b"} />}
            bgColor={"#d4f5e1"}
          />
        ): <View style={{width: 100}}/>
      }
      </View>

      <View style={{ ...styles.row, marginTop: 10 }}>
        <Text style={styles.text}>
          {data?.availableNow ? "Available Now" : data?.fromDate}
        </Text>
        <Text style={styles.text}>Rs. {data?.price}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default AppointmentCard;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    marginRight: 10,
    flex: 1,
  },
  selected: {
    borderColor: "#4ca585",
    borderWidth: 2,
  },
  title: {
    color: "#00507a",
    fontSize: 14,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
});
