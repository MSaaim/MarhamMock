import { StyleSheet, Text, View } from "react-native";

const Label = ({ title, icon, bgColor, color }) => {
  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      {icon && icon}
      <Text style={{ ...styles.text, color: color }}>{title}</Text>
    </View>
  );
};

export default Label;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 5,
    gap: 5,
  },
  text: {
    color: "#00507a",
    fontSize: 12,
  },
});
