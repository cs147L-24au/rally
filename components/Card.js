import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import Theme from "@/assets/theme";

export default function Card({ imageUri, title, description, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.content}>
        {/* Title at the top */}
        <Text style={styles.title}>{title}</Text>

        {/* Image in the middle */}
        {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}

        {/* Description at the bottom, centered */}
        {description && <Text style={styles.description}>{description}</Text>}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Theme.colors.white, // Ensure cards have a white background
    borderRadius: 25, // Rounded corners
    overflow: "hidden",
    marginVertical: 12, // Add spacing between cards
    shadowColor: "#000", // Shadow for better visibility
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3, // Shadow for Android
    alignItems: "center",
    width: 325,
    alignSelf: "center"
  },
  content: {
    padding: 16, // Add padding inside the card
    alignItems: "center", // Center content horizontally
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: Theme.colors.black,
    marginBottom: 8,
    alignSelf: "center", // Horizontally centered
  },
  image: {
    width: "80%", // Image takes up 80% of the card's width
    height: 150, // Fixed height for consistency
    resizeMode: "contain", // Ensure the image scales properly
    marginVertical: 12, // Even spacing between title and description
  },
  description: {
    fontSize: 14,
    color: Theme.colors.gray,
    textAlign: "center", // Center the text horizontally
    marginTop: 8, // Add spacing between image and description
  },
});