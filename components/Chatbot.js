import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Theme from "@/assets/theme";

const GEMINI_API_KEY = "AIzaSyBY7d8yTp5vAXc-LjALF7nx7YSoiXaQjqc";
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

export default function TravelChatbot() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hello! I'm Evelyn, your AI travel agent. How can I help you plan your group's next adventure?",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef();

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = { role: "user", content: inputText };
    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsLoading(true);

    try {
      // Construct the prompt with context from previous messages
      const conversationHistory = messages
        .map((msg) => `${msg.role}: ${msg.content}`)
        .join("\n");

      const prompt = `You are a highly trained travel agent who has been in the industry for years. You specialize in helping groups of friends plan their trips. Format your responses using markdown-style formatting:
- Use ** for bold text
- Use line breaks between paragraphs
- Use numbered lists where appropriate
- Keep the formatting clean and easy to read

Previous conversation:
${conversationHistory}

Client: ${inputText}

Please provide a helpful response while maintaining the role of a travel agent.`;

      const result = await model.generateContent(prompt);
      const assistantResponse = {
        role: "assistant",
        content: result.response.text(),
      };

      setMessages((prev) => [...prev, assistantResponse]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderFormattedText = (text) => {
    // Split the text into segments based on bold markers
    const segments = text.split(/(\*\*.*?\*\*)/g);

    return segments.map((segment, index) => {
      if (segment.startsWith("**") && segment.endsWith("**")) {
        // Remove the ** markers and render as bold
        const boldText = segment.slice(2, -2);
        return (
          <Text key={index} style={styles.boldText}>
            {boldText}
          </Text>
        );
      }
      return <Text key={index}>{segment}</Text>;
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        onContentSizeChange={() => scrollViewRef.current.scrollToEnd()}
      >
        {messages.map((message, index) => (
          <View
            key={index}
            style={[
              styles.messageBubble,
              message.role === "user"
                ? styles.userMessage
                : styles.assistantMessage,
            ]}
          >
            <Text
              style={[
                styles.messageText,
                message.role === "user" && styles.userMessageText,
              ]}
            >
              {message.content.split("\n\n").map((paragraph, i) => (
                <Text key={i}>
                  {renderFormattedText(paragraph)}
                  {i < message.content.split("\n\n").length - 1 ? "\n\n" : ""}
                </Text>
              ))}
            </Text>
          </View>
        ))}
        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color={Theme.colors.blue} />
          </View>
        )}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Ask me for travel recs!"
          placeholderTextColor={Theme.colors.gray}
          multiline
        />
        <TouchableOpacity
          style={[
            styles.sendButton,
            (!inputText.trim() || isLoading) && styles.sendButtonDisabled,
          ]}
          onPress={sendMessage}
          disabled={!inputText.trim() || isLoading}
        >
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  messagesContainer: {
    flex: 1,
    padding: 16,
  },
  messageBubble: {
    maxWidth: "80%",
    padding: 12,
    borderRadius: 16,
    marginBottom: 8,
  },
  userMessage: {
    backgroundColor: Theme.colors.blue,
    alignSelf: "flex-end",
  },
  assistantMessage: {
    backgroundColor: Theme.colors.white,
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: Theme.colors.borderGray,
  },
  messageText: {
    fontSize: 16,
    color: Theme.colors.textPrimary,
    lineHeight: 22,
  },
  userMessageText: {
    color: Theme.colors.white,
  },
  boldText: {
    fontWeight: "700",
  },
  inputContainer: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: Theme.colors.white,
    borderTopWidth: 1,
    borderTopColor: Theme.colors.borderGray,
  },
  input: {
    flex: 1,
    backgroundColor: Theme.colors.grayLight,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    fontSize: 16,
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: Theme.colors.blue,
    borderRadius: 20,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
  sendButtonText: {
    color: Theme.colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
  loadingContainer: {
    padding: 16,
    alignItems: "center",
  },
});
