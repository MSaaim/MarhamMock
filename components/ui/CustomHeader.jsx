import { router } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const CustomHeader = ({
  title = "Title",
  showBack,
  rightButtonPress,
  rightButtonIcon,
}) => {
  return (
    <View style={styles.container}>
      {showBack ? (
        <TouchableOpacity onPress={() => router.back()}>
          <ChevronLeft size={30} color="#00507a" />
        </TouchableOpacity>
      ) : (
        <View style={{ width: 30 }} />
      )}

      <Text style={styles.title}>{title}</Text>
      <View>
        {rightButtonIcon ? (
          <TouchableOpacity onPress={rightButtonPress}>
            {rightButtonIcon}
          </TouchableOpacity>
        ) : (
          <View style={{ width: 30 }} />
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  title: { fontSize: 18, fontWeight: "bold", color: "#000" },
});
export default CustomHeader;
