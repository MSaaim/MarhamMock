import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import {
  Button,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const SelectionModal = ({ visible, onClose, array = [], onSelect, title }) => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleSelect = () => {
    if (selectedValue) {
      onSelect(selectedValue);
      onClose();
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
              <Text style={styles.title}>{title || "Title"}</Text>

              <Picker
                selectedValue={selectedValue}
                onValueChange={(value) => setSelectedValue(value)}
                style={styles.picker}
              >
                <Picker.Item label="Choose a location..." value="" />
                {array.map((loc, index) => (
                  <Picker.Item key={index} label={loc} value={loc} />
                ))}
              </Picker>

              <View style={styles.actions}>
                <Button title="Cancel" onPress={onClose} />
                <Button title="Select" onPress={handleSelect} />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "transparent", // no dark overlay
  },
  modalContainer: {
    width: "100%",
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 15,

    marginBottom: Platform.OS === "ios" ? 30 : 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  picker: {
    width: "100%",
    marginBottom: 20,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default SelectionModal;
