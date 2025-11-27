import { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import CustomButton from "../CustomButton";
const SymptomChecker = () => {
  const placeholderArray = [
    "Meri skin uneven or dull lagti he",
    "Mujhe acne ya pimples ho rahe hain",
    "Meri skin bohat zyada dry hai",
    "Meri skin oily lagti hai",
    "Mujhe dark circles ya puffiness hai",
    "Mujhe rashes ya irritation ho raha hai",
  ];
  const [state, setState] = useState({
    symptomQuery: "",
    placeholderText: "",
  });

  useEffect(() => {
    cyclePlaceholder();
  }, []);
  
  //cycle placeholders text every 3 seconds
  const cyclePlaceholder = () => {
    let index = 0;
    setInterval(() => {
      setState((p) => ({
        ...p,
        placeholderText: placeholderArray[index],
      }));
      index = (index + 1) % placeholderArray.length;
    }, 3000);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Trusted Doctor chchiye? Apni symptoms batayein
      </Text>
      <TextInput
        style={styles.input}
        placeholder={state.placeholderText}
        numberOfLines={4}
        multiline={true}
        value={state.symptomQuery}
        onChangeText={(i) => setState((p) => ({ ...p, symptomQuery: i }))}
      />
      <CustomButton
        title="Enter Symptoms"
        onPress={() => {}}
        buttonStyle={ state?.symptomQuery ? styles.button: styles.disabledButton}
      />
      <Text style={styles.subText}>Your information is private and secure</Text>
    </View>
  );
};

export default SymptomChecker;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#00507a",
  },
  input: {
    marginVertical: 20,
    borderWidth: 1,
    borderColor: "#00507ac8",
    borderRadius: 10,
    padding: 10,
    height: 100,
    textAlignVertical: "top",
    shadowColor: "#00507ac8",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  button: {
    backgroundColor: "#00507a",
    marginBottom: 20,
  },
  disabledButton: {
    backgroundColor: "#cccccc",
    marginBottom: 20,
  },
  subText: {
    fontSize: 12,
    color: "#666",
  },
});
