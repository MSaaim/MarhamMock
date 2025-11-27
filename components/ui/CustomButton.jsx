import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const CustomButton = ({
  title,
  onPress,
  icon,
  iconPosition = "left", // can be 'left' or 'right'
  buttonStyle,
  textStyle,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        buttonStyle,
        disabled && { opacity: 0.6 },
      ]}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled}
    >
      {icon && iconPosition === "left" && (
        <View style={styles.iconContainer}>{icon}</View>
      )}

      <Text style={[styles.text, textStyle]}>{title}</Text>

      {icon && iconPosition === "right" && (
        <View style={styles.iconContainer}>{icon}</View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00507a",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  iconContainer: {
    marginHorizontal: 6,
  },
});

export default CustomButton;
