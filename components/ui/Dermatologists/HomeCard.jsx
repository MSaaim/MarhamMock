import { Star } from "lucide-react-native";
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import AppointmentCard from "../AppointmentCard";
import Label from "../Label";

const HomeCard = ({ doctor = null, onPress, onAppointmentPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.topContainer}>
        <View style={styles.personalContainer}>
          <Image source={doctor.profileImage} style={styles.profileImage} />
          <View style={styles.personalDetails}>
            <Text style={[styles.text, styles.bold]}>{doctor?.name}</Text>
            <Text
              style={[
                styles.text,
                styles.bold,
                { color: "#4ca585", fontSize: 12, marginVertical: 2 },
              ]}
            >
              {doctor?.verified ? "PMDC Verified" : null}
            </Text>
            <Text style={[styles.text, { fontSize: 12, marginBottom: 2 }]}>
              {doctor?.specialization}
            </Text>
            <Text style={[styles.text, { fontSize: 12, marginBottom: 2 }]}>
              {doctor?.degree}
            </Text>
          </View>
        </View>

        <View style={styles.ratingSection}>
          <View style={styles.rating}>
            <Text style={[styles.text, styles.bold, { color: "#ed8a19" }]}>
              {doctor?.reviews}
            </Text>
            <Star fill={"#ed8a19"} size={16} color="#ed8a19" />
          </View>
          <Text style={[styles.text, styles.bold, { marginBottom: 3 }]}>
            {doctor?.experience} Yrs
          </Text>
          <Text style={[styles.text, styles.bold, { marginBottom: 3 }]}>
            {doctor?.satisfaction} %
          </Text>
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <View style={styles.labelContainer}>
          {doctor?.tags.map((tag, index) => (
            <Label
              key={index}
              title={tag}
              color={"#00507a"}
              bgColor={"#00507a1a"}
            />
          ))}
        </View>

        <View>
          <FlatList
            data={doctor?.quickAppointments}
            horizontal
            showsHorizontalScrollIndicator={false}
            decelerationRate="fast"
            contentContainerStyle={styles.quickAppointmentsContainer}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <AppointmentCard
                data={item}
                onPress={() => onAppointmentPress(item)}
              />
            )}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default HomeCard;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  personalContainer: {
    flexDirection: "row",
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 20,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  placeholder: {
    backgroundColor: "#eee",
  },
  bold: {
    fontWeight: "bold",
  },
  text: {
    fontSize: 16,
    color: "#000",
  },
  personalDetails: {
    marginLeft: 10,
  },
  rating: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    marginBottom: 3,
  },
  ratingSection: {
    justifyContent: "center",
    alignItems: "center",
  },
  bottomContainer: {},
  labelContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  quickAppointmentsContainer: {
    paddingHorizontal: 12,
    paddingTop: 20,
    paddingBottom: 8,
    paddingRight: 20,
  },
});
