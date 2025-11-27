import { X } from "lucide-react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const DURATION = 200;

const AppointmentModal = ({
  visible = false,
  onClose = () => {},
  appointment = null,
}) => {
  const [show, setShow] = useState(visible);

  // Common unified form state
  const [form, setForm] = useState({
    name: "",
    phone: "",
    notes: "",
  });

  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      setShow(true);
      Animated.timing(opacity, {
        toValue: 1,
        duration: DURATION,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(opacity, {
        toValue: 0,
        duration: DURATION,
        useNativeDriver: true,
      }).start(() => setShow(false));
    }
  }, [visible]);

  if (!show) return null;

  // Format the date
  const formattedDate = (() => {
    if (appointment?.availableNow) {
      return `Today • ${new Date().toLocaleDateString()}`;
    }

    if (appointment?.fromDate) {
      return appointment.fromDate;
    }

    return new Date().toLocaleDateString();
  })();

  return (
    <Modal visible={show} transparent statusBarTranslucent onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.backdrop} />
      </TouchableWithoutFeedback>

      <View style={styles.centered} pointerEvents="box-none">
        <Animated.View style={[styles.modal, { opacity }]}>

          {/* HEADER */}
          <View style={styles.header}>
            <Text style={{ ...styles.title, color: "#000" }}>
              Book Appointment Now
            </Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X size={20} color="#00507a" />
            </TouchableOpacity>
          </View>

          {/* DETAILS */}
          <View style={styles.appointmentDetails}>
            <Text style={styles.title}>{appointment?.type}</Text>
            <Text style={styles.label}>
              {appointment?.availableNow ? "Online" : "Offline"}
            </Text>

            <Text style={styles.value}>{formattedDate}</Text>
          </View>

          {/* FORM */}
          <View style={styles.appointmentForm}>
            <TextInput
              placeholder="Full Name"
              style={styles.input}
              placeholderTextColor="#777"
              value={form.name}
              onChangeText={(v) => setForm({ ...form, name: v })}
            />

            <TextInput
              placeholder="Phone Number"
              style={styles.input}
              keyboardType="phone-pad"
              placeholderTextColor="#777"
              value={form.phone}
              onChangeText={(v) => setForm({ ...form, phone: v })}
            />

            <TextInput
              placeholder="Additional Notes"
              style={[styles.input, { height: 90 }]}
              placeholderTextColor="#777"
              value={form.notes}
              onChangeText={(v) => setForm({ ...form, notes: v })}
              multiline
              textAlignVertical="top"
            />

            <TouchableOpacity style={styles.bookBtn}>
              <Text style={styles.bookBtnText}>Confirm Booking</Text>
            </TouchableOpacity>
          </View>

        </Animated.View>
      </View>
    </Modal>
  );
};

export default AppointmentModal;

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  modal: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#00507a",
  },
  closeButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  appointmentDetails: {
    paddingHorizontal: 20,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 15,
  },
  label: {
    fontSize: 12,
    color: "#666",
    marginTop: 8,
  },
  value: {
    marginTop: 10,
    fontSize: 16,
    color: "#000",
  },
  appointmentForm: {
    marginTop: 10,
  },
  input: {
    backgroundColor: "#f1f5f7",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    color: "#000",
  },
  bookBtn: {
    backgroundColor: "#00507a",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 5,
  },
  bookBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
