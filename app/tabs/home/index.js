import { StyleSheet, ScrollView, View, SafeAreaView } from "react-native";
import Theme from "@/assets/theme";
import Card from "@/components/Card";
import { Link } from "expo-router";

export default function Home() {
  return (
    <ScrollView style={styles.container}>
      {/* Start A Trip Section */}
      <Card
        title="Start A Trip"
        description="Pick a location, invite your friends, and we’ll build your itinerary for you!"
        onPress={() => {
          console.log("Navigating to Start A Trip");
        }}
      />
      {/* Popular Places Section */}
      <Card
        imageUri="https://stock.adobe.com/search?k=japan" // Replace with actual image URL
        title="Explore Popular Places"
        description="Japan is really popular this time of year!"
        onPress={() => {
          console.log("Navigating to Popular Places");
        }}
      />
      {/* Last Trip Summary Section */}
      <Card
        title="Your Last Trip Summary"
        description=""
        onPress={() => {
          console.log("Navigating to Last Trip Summary");
        }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
    padding: 16,
  },
});

// IGNORE: Starter code from A4
// // Home page
// import { StyleSheet, View } from "react-native";

// import FontAwesome from "@expo/vector-icons/FontAwesome";
// import { StatusBar } from "expo-status-bar";
// import { Link } from "expo-router";

// import Theme from "@/assets/theme";
// import Feed from "@/components/Feed";

// export default function Home() {
//   return (
//     <View style={styles.container}>
//       <StatusBar style="light" />
//       <Feed shouldNavigateToComments={true} fetchUsersPostsOnly={false} />
//       <Link href="tabs/feed/newpost" style={styles.postButtonContainer}>
//         <View style={styles.postButton}>
//           <FontAwesome size={32} name="plus" color={Theme.colors.textPrimary} />
//         </View>
//       </Link>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     backgroundColor: Theme.colors.backgroundPrimary,
//   },
//   postButtonContainer: {
//     position: "absolute",
//     right: 8,
//     bottom: 8,
//   },
//   postButton: {
//     backgroundColor: Theme.colors.iconHighlighted,
//     height: 48,
//     width: 48,
//     borderRadius: 24,
//     alignItems: "center",
//     justifyContent: "center",
//     // FontAwesome 'plus' icon is a bit off-center, so we manually center it by
//     // tweaking the padding
//     paddingTop: 2,
//     paddingLeft: 1,
//   },
// });
