import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const PickerInput = ({
    
  value,
  placeholder = "Select",
  onPress,
  error = "", 
  disabled = false,
  style
}) => {
  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        style={[styles.input, error ? styles.inputError : null]}
        disabled={disabled}
        onPress={onPress}
      >
        <Text style={{ color: value ? "#000" : "#aaa" }}>
          {value || placeholder}
        </Text>
      </TouchableOpacity>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    flex: 1
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 14,
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
  },
  inputError: {
    borderColor: "#d9534f", 
  },
  errorText: {
    color: "#d9534f",
    fontSize: 12,
    marginTop: 4,
  },
});

export default PickerInput;