import { Check } from "lucide-react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const CustomCheckbox = ({ checked, onChange, label }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.7}
      onPress={() => onChange(!checked)}
    >
      <View style={[styles.checkbox, checked && styles.checkedBox]}>
        {checked && <Check color={"#000"} size={12}/>}
      </View>

      {label && <Text style={styles.label}>{label}</Text>}
    </TouchableOpacity>
  );
};

export default CustomCheckbox;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },

  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 2,
    borderColor: "#4ca585",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  checkedBox: {
    backgroundColor: "#4ca585",
    borderColor: "#4ca585",
  },

  innerDot: {
    width: 10,
    height: 10,
    backgroundColor: "#fff",
    borderRadius: 3,
  },

  label: {
    fontSize: 16,
    color: "#000",
  },
});
