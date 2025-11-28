import { StyleSheet, Text, View } from "react-native";
import Label from "../Label";

const ReviewCard = ({ review }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{review.userInitial}</Text>
        </View>
        <Text style={styles.date}>{review.date}</Text>
      </View>

      <Text style={styles.title}>{review.title}</Text>

      <Text style={styles.description}>{review.description}</Text>

      <View style={styles.tagsContainer}>
        {review.tags.map((tag, index) => (
          <Label title={tag} key={index} color={'#0f8a3a'} bgColor={'#0f8a3a20'}/>
        ))}
      </View>
    </View>
  );
};

export default ReviewCard;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#e6e6e6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  avatarText: {
    color: "#666",
    fontWeight: "bold",
    fontSize: 14,
  },
  date: {
    color: "#888",
    fontSize: 13,
  },
  title: {
    color: "#0f8a3a",
    fontSize: 17,
    fontWeight: "600",
    marginBottom: 6,
  },
  description: {
    color: "#444",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 10,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  tag: {
    borderWidth: 1,
    borderColor: "#0f8a3a",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 13,
    color: "#0f8a3a",
  },
});
