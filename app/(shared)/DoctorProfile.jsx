import { useLocalSearchParams } from "expo-router";
import { Share } from "lucide-react-native";
import { useState } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppointmentCard from "../../components/ui/AppointmentCard";
import CustomButton from "../../components/ui/CustomButton";
import CustomCheckbox from "../../components/ui/CustomCheckBox";
import CustomHeader from "../../components/ui/CustomHeader";
import CustomTextInput from "../../components/ui/CustomTextInput";
import ReviewSection from "../../components/ui/Dermatologists/ReviewSection";
import PickerInput from "../../components/ui/PickerInput";
import SelectionModal from "../../components/ui/selectionModal";

const DoctorProfile = () => {
  const { doctor } = useLocalSearchParams();
  const data = doctor ? JSON.parse(doctor) : null;
  
  const [state, setState] = useState({
    selectedAppointment: null,
    patientName: "",
    patientPhone: "",
    amOutside: false,
    selectedAppointmentIndex: null,
    isTimeModalVisible: false,
    selectedTime: "",
    isDateModalVisible: false,
    selectedDate: "",
  });

  const dates = [
    "Thu - 27 Nov",
    "Fri - 28 Nov",
    "Sat - 29 Nov",
    "Sun - 30 Nov",
  ];

  const times = ["10:00 AM", "10:15 AM", "10:30 AM", "11:00 AM", "11:30 AM"];

  const handleDateSelect = (selectedValue) => {
    console.log("first");
    setState((prev) => ({
      ...prev,
      selectedDate: selectedValue,
      isDateModalVisible: false,
    }));
  };

  const handleTimeSelect = (selectedValue) => {
    setState((prev) => ({
      ...prev,
      selectedTime: selectedValue,
      isTimeModalVisible: false,
    }));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <CustomHeader showBack={true} title={"Profile"} />
      <FlatList
        style={styles.list}
        contentContainerStyle={styles.container}
        data={[{ id: "1" }]}
        keyExtractor={(item) => item.id}
        renderItem={() => (
          <View style={styles.content}>
            <View style={styles.personalDetails}>
              {data?.profileImage ? (
                <Image
                  source={
                    typeof data.profileImage === "string"
                      ? { uri: data.profileImage }
                      : data.profileImage
                  }
                  style={styles.profileImage}
                />
              ) : null}

              <Text
                style={[
                  styles.text,
                  styles.bold,
                  { marginTop: 10, fontSize: 18 },
                ]}
              >
                {data?.name}
              </Text>
              <Text
                style={[
                  styles.text,
                  styles.bold,
                  { marginTop: 10, color: "#4ca585" },
                ]}
              >
                {data?.verified ? "PMDC Verified" : null}
              </Text>
              <Text style={[styles.text, { fontSize: 14, marginTop: 10 }]}>
                {data?.specialization}
              </Text>
              <Text style={[styles.text, { fontSize: 14, marginVertical: 10 }]}>
                {data?.degree}
              </Text>
              <View style={styles.ratingSection}>
                <View style={{ alignItems: "center" }}>
                  <Text style={[styles.text, styles.bold]}>Reviews</Text>
                  <Text style={{ ...styles.text, color: "#ed8a19" }}>
                    {data?.reviews}
                  </Text>
                </View>
                <View style={{ alignItems: "center" }}>
                  <Text style={[styles.text, styles.bold]}>Experience</Text>
                  <Text style={styles.text}>{data?.experience} Years</Text>
                </View>
                <View style={{ alignItems: "center" }}>
                  <Text style={[styles.text, styles.bold]}>Satisfaction</Text>
                  <Text style={styles.text}>{data?.satisfaction}%</Text>
                </View>
              </View>

              <View style={styles.btnContainer}>
                <CustomButton
                  title={"Share Profile"}
                  onPress={() => {}}
                  buttonStyle={styles.shareBtn}
                  textStyle={{ color: "#00507a" }}
                  icon={<Share color={"#00507a"} size={16} />}
                />
                <CustomButton
                  title={data?.phoneNo}
                  onPress={() => {}}
                  buttonStyle={{
                    flex: 1,
                    marginHorizontal: 5,
                    backgroundColor: "#c11f1e",
                  }}
                />
              </View>
            </View>

            <View style={styles.appointmentsSection}>
              <Text style={[styles.text, styles.bold]}>
                Get Confirmed Appointment Online
              </Text>
              <View style={styles.bulletPoint}>
                <View style={styles.bullet}>
                  <Text style={{ ...styles.text, color: "#fff" }}>1</Text>
                </View>
                <Text style={{ ...styles.text, marginLeft: 10 }}>
                  Select Hospital/Clinic
                </Text>
              </View>

              {data?.quickAppointments.map((appt, index) => (
                <View style={{ marginTop: 10 }} key={index}>
                  <AppointmentCard
                    data={appt}
                    selected={state.selectedAppointmentIndex === index}
                    onPress={() =>
                      setState((prevState) => ({
                        ...prevState,
                        selectedAppointment: appt,
                        selectedAppointmentIndex: index,
                      }))
                    }
                  />
                </View>
              ))}

              <View style={styles.bulletPoint}>
                <View style={styles.bullet}>
                  <Text style={{ ...styles.text, color: "#fff" }}>2</Text>
                </View>
                <Text style={{ ...styles.text, marginLeft: 10 }}>
                  Select Date & Time
                </Text>
              </View>

              <View style={styles.appoitmentForm}>
                <View style={styles.dateSection}>
                  <PickerInput
                    placeholder={"Date"}
                    value={state.selectedDate}
                    onPress={() =>
                      setState((prevState) => ({
                        ...prevState,
                        isDateModalVisible: true,
                      }))
                    }
                    style={{ marginHorizontal: 5 }}
                  />
                  <PickerInput
                    placeholder={"Time"}
                    value={state.selectedTime}
                    onPress={() =>
                      setState((prevState) => ({
                        ...prevState,
                        isTimeModalVisible: true,
                      }))
                    }
                    style={{ marginHorizontal: 5 }}
                  />
                </View>
                <CustomTextInput
                  value={state.patientPhone}
                  onChangeText={(i) =>
                    setState((prev) => ({
                      ...prev,
                      patientPhone: i,
                    }))
                  }
                  placeholder={"Enter Phone Number"}
                />
                <CustomTextInput
                  value={state.patientName}
                  onChangeText={(i) =>
                    setState((prev) => ({
                      ...prev,
                      patientName: i,
                    }))
                  }
                  placeholder={"Patient Name"}
                />

                <View style={styles.check}>
                  <CustomCheckbox
                    checked={state?.amOutside}
                    onChange={() =>
                      setState((prev) => ({
                        ...prev,
                        amOutside: !state?.amOutside,
                      }))
                    }
                    label="Are you booking from outside Lahore?"
                  />
                </View>

                <CustomButton title={'Book Video Consultation'} buttonStyle={{marginTop: 15, backgroundColor:'#4ca585' }}/>
              </View>
            </View>
            <ReviewSection data={data?.reviewData} count={data?.reviews}/>
          </View>

          
        )}
      />

      <SelectionModal
        visible={state.isTimeModalVisible || state.isDateModalVisible}
        array={state?.isTimeModalVisible ? times : dates}
        onSelect={(value) => {
          if (state?.isTimeModalVisible) {
            handleTimeSelect(value);
          } else {
            handleDateSelect(value);
          }
        }}
        onClose={() =>
          setState((prev) => ({
            ...prev,
            isTimeModalVisible: false,
            isDateModalVisible: false,
          }))
        }
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexGrow: 1,
  },
  list: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 90,
  },
  personalDetails: {
    alignItems: "center",
    justifyContent: "center",
  },
  bold: {
    fontWeight: "bold",
  },
  text: {
    fontSize: 16,
    color: "#000",
  },
  ratingSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginTop: 20,
  },
  btnContainer: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-between",
    width: "100%",
  },
  shareBtn: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: "#fff",
    borderColor: "#00507a",
    borderWidth: 1,
  },
  appointmentsSection: {
    marginTop: 30,
    flex: 1,
  },
  bullet: {
    backgroundColor: "#000",
    width: 20,
    height: 20,
    borderRadius: 90,
    alignItems: "center",
    justifyContent: "center",
  },
  bulletPoint: {
    flexDirection: "row",
    marginTop: 10,
  },
  dateSection: {
    marginTop: 10,
    flexDirection: "row",
    flex: 1,
  },
  check: {
    flexDirection: "row",
    gap: 5,
  },
});
export default DoctorProfile;
