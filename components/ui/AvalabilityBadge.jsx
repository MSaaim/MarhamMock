import { StyleSheet, Text, View } from "react-native";

const AvalabilityBadge = ({ isOnline, size , fontSize}) => {
  return (
    <View style={styles.availability}>
      <View
        style={[
          styles.dot,
          { backgroundColor: isOnline ? "#28a745" : "#c92a2a" , height: size|| 8, width: size|| 8},
        ]}
      />
        <Text style={{...styles.availabilityText, fontSize: fontSize|| 12}}>
        {isOnline ? "Online" : "Offline"}
      </Text>
    </View>
  );
};

export default AvalabilityBadge;

const styles = StyleSheet.create({
  availability: {
    flexDirection: "row",
    alignItems: "center",
    
  },
  dot: {
   
    borderRadius: 90,
    marginRight: 6,
  },
  availabilityText: {
    
    color: "#666",
  },
});
