import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import BookedAppointmentCard from "../../components/ui/Appointments/BookedAppointmentCard";
import CustomHeader from "../../components/ui/CustomHeader";

const AppointmentsScreen = () => {
  const appointments = useSelector((state) => state.appointments?.items ?? []);

  useEffect(() => {
    console.log("booked appointments:", appointments);
  }, [appointments]);

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <MaterialCommunityIcons
        name="calendar-remove"
        size={100}
        color="#ccc"
        style={{ marginBottom: 20 }}
      />
      <Text style={styles.emptyText}>No booked appointments yet</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <CustomHeader showBack={false} title="Booked Appointments" />

      <FlatList
        data={appointments}
        keyExtractor={(item, index) => item.bookedAt + index}
        renderItem={({ item }) => <BookedAppointmentCard appointment={item} />}
        contentContainerStyle={{ paddingVertical: 10, flexGrow: 1 }}
        ListEmptyComponent={renderEmpty}
      />
    </SafeAreaView>
  );
};

export default AppointmentsScreen;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f5f5f5" },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#999",
    textAlign: "center",
  },
});
