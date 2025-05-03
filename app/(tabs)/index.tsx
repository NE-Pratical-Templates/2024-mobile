import PostComponent from "@/components/post/PostComponent";
import { images } from "@/constants";
import { fetchPosts } from "@/services";
import { IPost } from "@/types";
import { Link } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, Image, RefreshControl, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useToast } from "react-native-toast-notifications";

function Home() {
  const [loading, setLoading] = useState<boolean>(false);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);

  const toast = useToast();
  const getPosts = async () => {
    setLoading(true);
    await fetchPosts({ toast, setPosts, setLoading });
  };
  useEffect(() => {
    getPosts();
  }, []);
  const handleLoadMore = () => {
    if (page * limit < posts.length) {
      setPage((prevPage) => prevPage + 1);
    }
  };
  const displayedPosts = posts.slice(0, page * limit);

  return (
    <SafeAreaView className="w-full flex flex-1 flex-col bg-white pt-12 px-3">
      <View className="w-full flex flex-row items-center justify-between px-1">
        <Link href={"/"} className="flex flex-row items-center">
          <Image className="w-10 h-10 rounded-full" source={images.Logo} />
        </Link>
        <Image
          className="w-10 h-10 rounded-full"
          source={{ uri: "https://picsum.photos/250/250" }}
        />
      </View>
      <Text className="text-lg font-semibold my-6">Hi there</Text>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={getPosts} />
        }
        scrollEnabled={true}
        data={displayedPosts}
        ListEmptyComponent={() => (
          <View className="h-full justify-center items-center rounded-lg">
            <Text className="text-lg text-gray-700 pt-3 ">
              No posts available
            </Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={1}
        renderItem={({ item }) => <PostComponent post={item} />}
      />
    </SafeAreaView>
  );
}

export default Home;
