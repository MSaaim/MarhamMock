import { Star } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";

const DoctorStats = ({ data, count }) => {
  const getWidth = (value) => `${(value / 5) * 100}%`;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{count} Reviews</Text>

      <View style={styles.starRow}>
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <Star key={i} size={18} color="#f5a623" fill="#f5a623" />
          ))}
      </View>

      <View style={styles.averageBox}>
        <Text style={styles.averageScore}>5/5</Text>
        <Text style={styles.averageText}>
          Average rating based on {count} reviews.
        </Text>
      </View>

      <View style={styles.timeRow}>
        <View style={styles.timeBox}>
          <Text style={styles.timeHeading}>Wait Time</Text>
          <Text style={styles.timeValue}>{data?.waitTime} mins</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.timeBox}>
          <Text style={styles.timeHeading}>Avg. Time to Patient</Text>
          <Text style={styles.timeValue}>
            {data?.averageTimeToPatient} mins
          </Text>
        </View>
      </View>

      <View style={styles.ratingRow}>
        <Text style={styles.ratingLabel}>Patient Satisfaction</Text>
        <View style={styles.barContainer}>
          <View
            style={[
              styles.barFill,
              { width: getWidth(data?.patientSatisfaction) },
            ]}
          />
        </View>
        <Text style={styles.ratingValue}>{data?.patientSatisfaction}/5</Text>
      </View>

      <View style={styles.ratingRow}>
        <Text style={styles.ratingLabel}>Diagnosis</Text>
        <View style={styles.barContainer}>
          <View
            style={[styles.barFill, { width: getWidth(data?.diagnosis) }]}
          />
        </View>
        <Text style={styles.ratingValue}>{data?.diagnosis}/5</Text>
      </View>

      <View style={styles.ratingRow}>
        <Text style={styles.ratingLabel}>Staff Behaviour</Text>
        <View style={styles.barContainer}>
          <View
            style={[styles.barFill, { width: getWidth(data?.staffBehaviour) }]}
          />
        </View>
        <Text style={styles.ratingValue}>{data?.staffBehaviour}/5</Text>
      </View>

      <View style={styles.ratingRow}>
        <Text style={styles.ratingLabel}>Clinic Environment</Text>
        <View style={styles.barContainer}>
          <View
            style={[styles.barFill, { width: getWidth(data?.clinicEnv) }]}
          />
        </View>
        <Text style={styles.ratingValue}>{data?.clinicEnv}/5</Text>
      </View>
    </View>
  );
};

export default DoctorStats;

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
  },

  heading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },

  starRow: {
    flexDirection: "row",
    marginTop: 5,
  },

  averageBox: {
    backgroundColor: "#eaf6ff",
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },

  averageScore: {
    backgroundColor: "#0057a3",
    color: "#fff",
    fontWeight: "bold",
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginRight: 10,
  },

  averageText: {
    fontSize: 14,
    color: "#000",
    flex: 1,
  },

  timeRow: {
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
  },

  timeBox: {
    flex: 1,
  },

  divider: {
    width: 1,
    height: 40,
    backgroundColor: "#ddd",
    marginHorizontal: 20,
  },

  timeHeading: {
    color: "#777",
    fontSize: 14,
  },

  timeValue: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#000",
    marginTop: 5,
  },

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 18,
  },

  ratingLabel: {
    flex: 1,
    fontSize: 14,
    color: "#000",
  },

  barContainer: {
    height: 8,
    backgroundColor: "#eee",
    borderRadius: 10,
    flex: 2,
    marginHorizontal: 12,
    overflow: "hidden",
  },

  barFill: {
    height: "100%",
    backgroundColor: "#1aa76f",
    borderRadius: 10,
  },

  ratingValue: {
    fontSize: 14,
    color: "#000",
    width: 50,
    textAlign: "right",
  },
});
