import { removeAppointment } from "@/store/appointmentsSlice";
import { Zap } from "lucide-react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Toast from 'react-native-toast-message';
import { useDispatch } from "react-redux";
import Label from "../Label";
const BookedAppointmentCard = ({ appointment }) => {
  const dispatch = useDispatch();
  const { details, type, price, availableNow, fastConfirm, fromDate } =
    appointment;

  const handleCancel = () => {
    const identifier = appointment.id || appointment.bookedAt;
    if (!identifier) {
      Toast.show({ type: 'error', text1: 'Error', text2: 'Could not identify appointment to cancel' });
      return;
    }

    try {
      dispatch(removeAppointment(identifier));
      Toast.show({ type: 'success', text1: 'Cancelled', text2: 'Appointment cancelled' });
    } catch (err) {
      Toast.show({ type: 'error', text1: 'Error', text2: 'Failed to cancel appointment' });
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.type}>{type}</Text>
        {fastConfirm && (
          <Label
            title={"Fast Confirm"}
            icon={<Zap fill={"#04521b"} size={12} color={"#04521b"} />}
            bgColor={"#d4f5e1"}
          />
        )}
      </View>

      <Text style={styles.name}>{details.name}</Text>
      <Text style={styles.phone}>{details.phone}</Text>

          {details.notes ? <Text style={styles.notes}>{details.notes}</Text> : null}
          {details.amOutside ? (
            <Text style={styles.outside}>Booking from outside Lahore</Text>
          ) : null}

      <View style={styles.footer}>
        <Text style={styles.price}>PKR {price}</Text>
        {availableNow ? (
          <Text style={styles.available}>Available Now</Text>
        ) : fromDate ? (
          <Text style={styles.date}>From: {fromDate}</Text>
        ) : (
          <Text style={styles.date}>Booked</Text>
        )}
        <TouchableOpacity onPress={handleCancel} style={styles.cancelBtn}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BookedAppointmentCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 15,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  type: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4A90E2",
  },
  fastConfirm: {
    fontSize: 12,
    fontWeight: "500",
    color: "#FF6347",
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 2,
  },
  phone: {
    fontSize: 14,
    color: "#666",
    marginBottom: 2,
  },
  notes: {
    fontSize: 13,
    color: "#888",
    marginBottom: 4,
  },
  footer: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: "space-between",
    marginTop: 8,
  },
  price: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  available: {
    fontSize: 13,
    fontWeight: "500",
    color: "#28a745",
  },
  date: {
    fontSize: 13,
    fontWeight: "500",
    color: "#666",
  },
  cancelBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: "#fff0f0",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
  cancelText: {
    color: "#c9302c",
    fontWeight: "600",
  },
  outside: { color: '#d2691e', fontSize: 13, marginTop: 6 },
});
