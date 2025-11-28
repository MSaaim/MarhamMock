import { addAppointment } from "@/store/appointmentsSlice";
import { useLocalSearchParams } from "expo-router";
import { Share } from "lucide-react-native";
import { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";
import AppointmentCard from "../../components/ui/AppointmentCard";
import AvalabilityBadge from "../../components/ui/AvalabilityBadge";
import CustomButton from "../../components/ui/CustomButton";
import CustomCheckbox from "../../components/ui/CustomCheckBox";
import CustomHeader from "../../components/ui/CustomHeader";
import CustomTextInput from "../../components/ui/CustomTextInput";
import DoctorStats from "../../components/ui/Dermatologists/DoctorStats";
import ReviewCard from "../../components/ui/Dermatologists/ReviewCard";
import PickerInput from "../../components/ui/PickerInput";
import SelectionModal from "../../components/ui/selectionModal";

const DoctorProfile = () => {
  const { doctor } = useLocalSearchParams();
  const data = doctor ? JSON.parse(doctor) : null;

  const [state, setState] = useState({
    selectedAppointment: null,
    patientName: "",
    patientPhone: "",
    patientNotes: "",
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

  useEffect(() => {
    if (
      data?.quickAppointments &&
      data.quickAppointments.length > 0 &&
      !state.selectedAppointment
    ) {
      setState((prev) => ({
        ...prev,
        selectedAppointment: data.quickAppointments[0],
        selectedAppointmentIndex: 0,
      }));
    }
  }, [data]);

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

  const dispatch = useDispatch();

  const handleBookAppointment = () => {
    const e = {};
    if (!state.patientName || !state.patientName.trim())
      e.name = "Name is required";
    if (!state.patientPhone || !state.patientPhone.trim())
      e.phone = "Phone is required";
    if (Object.keys(e).length) {
      const messages = Object.values(e).join(". ");
      Toast.show({ type: "error", text1: "Validation error", text2: messages });
      return;
    }

    const appt = state.selectedAppointment || {};
    const booking = {
      type: appt.type || "Video Consultation",
      price: appt.price || 0,
      availableNow: appt.availableNow || false,
      fastConfirm: appt.fastConfirm || false,
      fromDate: state.selectedDate || appt.fromDate || null,
      bookedAt: new Date().toISOString(),
      details: {
        name: state.patientName,
        phone: state.patientPhone,
        notes: state.patientNotes || "",
        amOutside: !!state.amOutside,
      },
    };

    try {
      dispatch(addAppointment(booking));
      Toast.show({
        type: "success",
        text1: "Booked",
        text2: "Appointment booked successfully",
      });
      setState((prev) => ({
        ...prev,
        patientName: "",
        patientPhone: "",
        patientNotes: "",
        amOutside: false,
        selectedDate: "",
        selectedTime: "",
      }));
    } catch (err) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Could not book appointment",
      });
    }
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
                  { marginTop: 10, fontSize: 18, marginBottom: 10 },
                ]}
              >
                {data?.name}
              </Text>

              <AvalabilityBadge
                isOnline={data.isOnline}
                size={12}
                fontSize={14}
              />
              {data?.verified && (
                <Text
                  style={[
                    styles.text,
                    styles.bold,
                    { marginTop: 10, color: "#4ca585" },
                  ]}
                >
                  {data?.verified ? "PMDC Verified" : null}
                </Text>
              )}
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
                <CustomTextInput
                  value={state.patientNotes}
                  onChangeText={(i) =>
                    setState((prev) => ({
                      ...prev,
                      patientNotes: i,
                    }))
                  }
                  placeholder={"Additional Notes"}
                  multiline={true}
                  numberOfLines={4}
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

                <CustomButton
                  title={"Book Video Consultation"}
                  buttonStyle={{ marginTop: 15, backgroundColor: "#4ca585" }}
                  onPress={handleBookAppointment}
                />
              </View>
            </View>
            <DoctorStats data={data?.doctorStats} count={data?.reviews} />

            {data?.patientReviews.map((rev, index) => (
              <View key={index}>
                <ReviewCard review={rev} />
              </View>
            ))}
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
