import { useLocalSearchParams } from "expo-router";
import { Send } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
    FlatList,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import Animated, { FadeInUp, Layout } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomHeader from "../../components/ui/CustomHeader";

const SymptomChat = () => {
  const { query } = useLocalSearchParams();

  const [messages, setMessages] = useState([
    {
      id: "1",
      sender: "ai",
      text: "Hello! I am your AI health assistant. How can I help you today?",
    },
  ]);

  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  // Add first query message
  useEffect(() => {
    if (query) {
      sendUserQuery(query);
    }
  }, [query]);

  const sendUserQuery = (text) => {
    const newMsg = {
      id: Date.now().toString(),
      sender: "user",
      text,
    };

    setMessages((prev) => [newMsg, ...prev]);
    triggerAIReply();
  };

  const triggerAIReply = () => {
    setTyping(true);

    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [
        {
          id: Date.now().toString(),
          sender: "ai",
          text: "Sample Response",
        },
        ...prev,
      ]);
    }, 1500);
  };

  const handleSend = () => {
    if (!input.trim()) return;

    sendUserQuery(input.trim());
    setInput("");
  };

  const renderItem = ({ item }) => {
    const isUser = item.sender === "user";

    return (
      <Animated.View
        entering={FadeInUp}
        layout={Layout.springify()}
        style={[
          styles.messageContainer,
          isUser ? styles.userMessage : styles.aiMessage,
        ]}
      >
        <Text style={styles.messageText}>{item.text}</Text>
      </Animated.View>
    );
  };

  const TypingIndicator = () => (
    <View style={styles.typingWrapper}>
      <View style={styles.typingBubble}>
        <View style={styles.dot} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <CustomHeader showBack={true} title={"Ask Concerns"} />
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          inverted={true}
          contentContainerStyle={{ padding: 15 }}
          showsVerticalScrollIndicator={false}
        />

        {typing && <TypingIndicator />}

        <View style={styles.inputBar}>
          <TextInput
            style={styles.input}
            placeholder="Ask your concern..."
            placeholderTextColor="#999"
            value={input}
            onChangeText={setInput}
          />

          <TouchableOpacity style={styles.sendBtn} onPress={handleSend} disabled={!input}>
            <Send size={28} color={input ? "#4A90E2": "#808080"} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SymptomChat;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#fff",
  },

  container: {
    flex: 1,
  },

  messageContainer: {
    maxWidth: "75%",
    padding: 12,
    borderRadius: 14,
    marginBottom: 12,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },

  userMessage: {
    backgroundColor: "#4A90E2",
    alignSelf: "flex-end",
    borderBottomRightRadius: 0,
  },

  aiMessage: {
    backgroundColor: "#E0E0E0",
    alignSelf: "flex-start",
    borderBottomLeftRadius: 0,
  },

  messageText: {
    fontSize: 15,
    color: "#000",
  },

  inputBar: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#ddd",
  },

  input: {
    flex: 1,
    backgroundColor: "#F2F2F2",
    paddingHorizontal: 15,
    borderRadius: 25,
    height: 45,
    fontSize: 15,
  },

  sendBtn: {
    justifyContent: "center",
    paddingHorizontal: 15,
  },

  typingWrapper: {
    paddingLeft: 20,
    paddingBottom: 8,
  },

  typingBubble: {
    flexDirection: "row",
    backgroundColor: "#E0E0E0",
    padding: 10,
    borderRadius: 20,
    width: 60,
    justifyContent: "space-between",
  },

  dot: {
    width: 8,
    height: 8,
    backgroundColor: "#888",
    borderRadius: 50,
  },
});
