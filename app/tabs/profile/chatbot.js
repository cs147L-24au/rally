import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import TravelChatbot from "@/components/Chatbot";
import Theme from "@/assets/theme";

export default function ChatbotScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <TravelChatbot />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
});
