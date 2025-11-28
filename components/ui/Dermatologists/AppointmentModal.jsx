import { addAppointment } from "@/store/appointmentsSlice";
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
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";
import CustomCheckbox from "../CustomCheckBox";

const DURATION = 200;

const AppointmentModal = ({
  visible = false,
  onClose = () => {},
  appointment = null,
}) => {
  const [state, setState] = useState({
    visible: visible,
    form: {
      name: "",
      phone: "",
      notes: "",
      amOutside: false,
    },
    errors: {},
  });

  const dispatch = useDispatch();

  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      setState((s) => ({ ...s, visible: true }));
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
      }).start(() => setState((s) => ({ ...s, visible: false })));
    }
  }, [visible]);

  const handleConfirm = () => {
    const e = {};
    if (!state.form.name || !state.form.name.trim())
      e.name = "Name is required";
    if (!state.form.phone || !state.form.phone.trim())
      e.phone = "Phone is required";
    setState((s) => ({ ...s, errors: e }));
    if (Object.keys(e).length) {
      const messages = Object.values(e).join(". ");
      Toast.show({ type: "error", text1: "Validation error", text2: messages });
      return;
    }

    const booking = {
      ...appointment,
      bookedAt: new Date().toISOString(),
      details: { ...state.form },
    };

    try {
      dispatch(addAppointment(booking));
      Toast.show({
        type: "success",
        text1: "Booked",
        text2: "Appointment booked successfully",
      });
      setState((s) => ({
        ...s,
        form: { name: "", phone: "", notes: "" },
        errors: {},
      }));
      onClose();
    } catch (err) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Could not book appointment",
      });
    }
  };

  if (!state.visible) return null;

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
    <Modal
      visible={state.visible}
      transparent
      statusBarTranslucent
      onRequestClose={onClose}
    >
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
              value={state.form.name}
              onChangeText={(v) =>
                setState((s) => ({ ...s, form: { ...s.form, name: v } }))
              }
            />
            {state.errors.name ? (
              <Text style={{ color: "red", marginBottom: 8 }}>
                {state.errors.name}
              </Text>
            ) : null}

            <TextInput
              placeholder="Phone Numbernnb"
              style={styles.input}
              keyboardType="phone-pad"
              placeholderTextColor="#777"
              value={state.form.phone}
              onChangeText={(v) =>
                setState((s) => ({ ...s, form: { ...s.form, phone: v } }))
              }
            />
            {state.errors.phone ? (
              <Text style={{ color: "red", marginBottom: 8 }}>
                {state.errors.phone}
              </Text>
            ) : null}

            <TextInput
              placeholder="Additional Notes"
              style={[styles.input, { height: 90 }]}
              placeholderTextColor="#777"
              value={state.form.notes}
              onChangeText={(v) =>
                setState((prev) => ({ ...prev, form: { ...prev.form, notes: v } }))
              }
              multiline
              textAlignVertical="top"
            />

            <CustomCheckbox
              checked={state.form.amOutside}
              onChange={() =>
                setState((prev) => ({
                  ...prev,
                  form: { ...prev.form, amOutside: !prev.form.amOutside },
                }))
              }
              label="Booking from outside Lahore?"
            />

            <TouchableOpacity style={styles.bookBtn} onPress={handleConfirm}>
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
