import { Picker } from "@react-native-picker/picker";
import { StyleSheet, View } from "react-native";

const DateTimeSelector = ({ date, time, onChangeDate, onChangeTime }) => {
  const dates = [
    "Thu - 27 Nov",
    "Fri - 28 Nov",
    "Sat - 29 Nov",
    "Sun - 30 Nov",
  ];

  const times = [
    "10:00 AM",
    "10:15 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
  ];

  return (
    <View style={styles.wrapper}>
      <View style={styles.row}>

        {/* DATE PICKER */}
        <View style={styles.box}>
          <Picker
            selectedValue={date}
            onValueChange={onChangeDate}
            style={styles.picker}
          >
            {dates.map((d, i) => (
              <Picker.Item key={i} label={d} value={d} />
            ))}
          </Picker>
        </View>

        {/* TIME PICKER */}
        <View style={styles.box}>
          <Picker
            selectedValue={time}
            onValueChange={onChangeTime}
            style={styles.picker}
          >
            {times.map((t, i) => (
              <Picker.Item key={i} label={t} value={t} />
            ))}
          </Picker>
        </View>

      </View>
    </View>
  );
};

export default DateTimeSelector;

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    marginTop: 15,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  box: {
    flex: 1,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#d9d9d9",
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  picker: {
    height: 45,
    width: "100%",
  },
});
