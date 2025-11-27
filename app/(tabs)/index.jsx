import { router } from "expo-router";
import { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomHeader from "../../components/ui/CustomHeader";
import AppointmentModal from "../../components/ui/Dermatologists/AppointmentModal";
import HomeCard from "../../components/ui/Dermatologists/HomeCard";
import SymptomChecker from "../../components/ui/Dermatologists/SymptomChecker";
import { homeData } from "../../constants/common.js";

const index = () => {
  const [state, setState] = useState({
    appointmentPopupVisible: false,
    selectedAppointment: null,
  });

  return (
    <SafeAreaView>
      <CustomHeader
        title="Dermatologists"
        showBack={false}
        // rightButtonIcon={<Hospital size={20} color="#000" />}
        // rightButtonPress={() => console.log('Right button pressed')}
      />
      <FlatList
        data={[{ id: "1" }]}
        keyExtractor={(item) => item.id}
        renderItem={() => (
          <View style={styles.container}>
            <SymptomChecker />

            <View>
              {homeData.map((doctor) => (
                <View style={{ marginTop: 10 }} key={doctor.id}>
                  <HomeCard
                    key={doctor.id}
                    doctor={doctor}
                    onPress={() =>
                      router.push({
                        pathname: "/DoctorProfile",
                        params: { doctor: doctor },
                      })
                    }
                    onAppointmentPress={(appointment) =>
                      setState((prevState) => ({
                        ...prevState,
                        selectedAppointment: appointment,
                        appointmentPopupVisible: true,
                      }))
                    }
                  />
                </View>
              ))}
            </View>
          </View>
        )}
      />
      <AppointmentModal 
        visible={state.appointmentPopupVisible}
        appointment={state.selectedAppointment}
        onClose={() =>
          setState((prevState) => ({
            ...prevState,
            appointmentPopupVisible: false,
            selectedAppointment: null,
          }))
        }
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});

export default index;
