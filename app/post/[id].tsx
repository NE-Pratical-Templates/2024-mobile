import { AntDesign } from "@expo/vector-icons";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { deletePost, fetchPostData } from "@/services";
import { useToast } from "react-native-toast-notifications";
import { IComment, IPost } from "@/types";

function PostScreen() {
  const { id } = useLocalSearchParams();
  const [post, setPost] = useState<IPost>();
  const [comments, setComments] = useState<IComment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const toast = useToast();
  const router = useRouter();
  const removePost = async () => {
    await deletePost({ id: id as string, toast, setLoading });
  };
  const handleMore = () => {
    if (comments.length < page * limit) {
      setPage((prevPage) => prevPage + 1);
    }
  };
  const getPostData = async () => {
    await fetchPostData({
      id: id as string,
      setPost,
      setComments,
      toast,
      setLoading,
    });
  };
  useEffect(() => {
    getPostData();
  }, []);
  // each comment
  const renderComment = ({ item }: { item: IComment }) => (
    <View className="w-full bg-gray-300 p-3 my-2 rounded-lg">
      <Text className="text-sm italic">{item.body}</Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 pt-12 px-3">
      <Stack.Screen options={{ headerShown: false }} />
      <View className="flex flex-row justify-between items-center">
        <TouchableOpacity
          onPress={() => router.back()}
          className="ml-4 bg-primary rounded-full w-10 h-10 flex items-center justify-center"
        >
          <AntDesign name="arrowleft" size={24} color="white" />
        </TouchableOpacity>
        <View className="flex flex-row items-center">
          <TouchableOpacity
            onPress={() => router.push(`/post/edit/${id}`)}
            className="mr-4 bg-blue-600 rounded-full w-10 h-10 flex items-center justify-center"
          >
            <AntDesign name="edit" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={removePost}
            className="mr-4 bg-red-600 rounded-full w-10 h-10 flex items-center justify-center"
          >
            <AntDesign name="delete" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <Text className="text-lg my-4 font-semibold">{post?.title}</Text>
      <Text className="mb-4 italic text-slate-700">Written By: John Doe</Text>
      <ScrollView>
        <Image
          className="w-full h-44 rounded-lg"
          source={{ uri: "https://picsum.photos/500/500" }}
        />
        <Text className="my-4 text-[15px]">{post?.body}</Text>
        <Text className="my-3 font-semibold">Comments</Text>
        <FlatList
          data={comments.slice(0, page * limit)}
          scrollEnabled={false}
          keyExtractor={(item) => item.id.toString()}
          onEndReached={handleMore}
          onEndReachedThreshold={1}
          horizontal={false}
          ListEmptyComponent={() => (
            <View className="items-center py-3">
              <Text className="text-gray-700">No comments available</Text>
            </View>
          )}
          renderItem={renderComment}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

export default PostScreen;
