import { useEffect, useState } from "react";
import { StyleSheet, FlatList, RefreshControl } from "react-native";

import Theme from "@/assets/theme";
import Post from "@/components/Suggestion";
import Loading from "@/components/Loading";

import timeAgo from "@/utils/timeAgo";
import db from "@/database/db";
import useSession from "@/utils/useSession";

export default function Feed({
  shouldNavigateToComments = false,
  fetchUsersPostsOnly = false,
}) {
  const [posts, setPosts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const session = useSession();
  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      // Fetch all posts (to be rendered in the main feed)
      const query = db
        .from("posts_with_counts")
        .select("*")
        .order("timestamp", { ascending: false });

      // Fetch all posts written by the current user
      if (fetchUsersPostsOnly) {
        query.eq("user_id", session.user.id);
      }

      const { data: fetchedPosts } = await query;

      // Fetch all likes and modify the posts rendered in the UI to display
      // which posts the users has upvoted and downvoted
      const { data: liked } = await db
        .from("likes")
        .select("*")
        .eq("user_id", session.user.id);

      fetchedPosts.forEach((post) => {
        const like = liked.find((like) => like.post_id === post.id);
        post.vote = like ? like.vote : 0;
      });
      setPosts(fetchedPosts);
    } catch (err) {
      console.error("Unexpected error: ", err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  // Fetch posts on initial load (dependency array = [])
  useEffect(() => {
    if (session) {
      fetchPosts();
    }
  }, [session]);

  if (isLoading && !isRefreshing) {
    return <Loading />;
  }

  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => (
        <Post
          shouldNavigateOnPress={shouldNavigateToComments}
          id={item.id}
          username={item.username}
          timestamp={timeAgo(item.timestamp)}
          text={item.text}
          score={item.like_count}
          vote={item.vote}
          commentCount={item.comment_count}
        />
      )}
      keyExtractor={(item) => item.id.toString()} // Use post ID as key
      contentContainerStyle={styles.posts}
      style={styles.postsContainer}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={() => {
            setIsRefreshing(true);
            fetchPosts();
          }}
          tintColor={Theme.colors.textPrimary} // only applies to iOS
        />
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Theme.colors.backgroundPrimary,
  },
  postsContainer: {
    width: "100%",
  },
  posts: {
    gap: 8,
  },
});

// A4 starter code 
// import { useState } from "react";
// import { StyleSheet, FlatList, RefreshControl } from "react-native";

// import Theme from "@/assets/theme";
// import Post from "@/components/Suggestion";
// import Loading from "@/components/Loading";

// import timeAgo from "@/utils/timeAgo";

// export default function Feed({
//   shouldNavigateToComments = false,
//   fetchUsersPostsOnly = false,
// }) {
//   const [posts, setPosts] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isRefreshing, setIsRefreshing] = useState(false);

//   const fetchPosts = async () => {
//     setIsLoading(true);
//     // TODO
//     setIsLoading(false);
//     setIsRefreshing(false);
//   };

//   if (isLoading && !isRefreshing) {
//     return <Loading />;
//   }

//   return (
//     <FlatList
//       data={posts}
//       renderItem={({ item }) => (
//         <Post
//           shouldNavigateOnPress={shouldNavigateToComments}
//           id={item.id}
//           username={item.username}
//           timestamp={timeAgo(item.timestamp)}
//           text={item.text}
//           score={item.like_count}
//           vote={item.vote}
//           commentCount={item.comment_count}
//         />
//       )}
//       contentContainerStyle={styles.posts}
//       style={styles.postsContainer}
//       refreshControl={
//         <RefreshControl
//           refreshing={isRefreshing}
//           onRefresh={() => {
//             setIsRefreshing(true);
//             fetchPosts();
//           }}
//           tintColor={Theme.colors.textPrimary} // only applies to iOS
//         />
//       }
//     />
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     backgroundColor: Theme.colors.backgroundPrimary,
//   },
//   postsContainer: {
//     width: "100%",
//   },
//   posts: {
//     gap: 8,
//   },
// });
