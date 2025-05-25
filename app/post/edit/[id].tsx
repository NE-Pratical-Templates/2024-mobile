import { AntDesign } from "@expo/vector-icons";
import { useLocalSearchParams, router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useToast } from "react-native-toast-notifications";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IComment, IPost, IUpdatePostData } from "@/types";
import { fetchPostData, updatePost } from "@/services";

const EditPostSchema = yup.object({
  userId: yup.number().required().label("user ID"),
  postId: yup.number().required().label("post ID"),
  title: yup.string().required().label("Title"),
  body: yup.string().required().label("Body"),
});

export default function EditPostScreen() {
  const { id } = useLocalSearchParams();
  const toast = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const [post, setPost] = useState<IPost>();
  const [comments, setComments] = useState<IComment[]>([]);
  const [selectedUser, setSelectedUser] = useState<number | null>(null);

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<IUpdatePostData>({
    resolver: yupResolver(EditPostSchema),
    mode: "onTouched",
  });
const handleSetPost = (postData: IPost) => {
  setPost(postData);
  setValue("title", postData.title);
  setValue("body", postData.body);
  setValue("userId", postData.userId);
  setValue("postId", postData.id);
};
 const getPostData = async () => {
  await fetchPostData({
    id: id as string,
    setPost:handleSetPost,
    setComments,
    toast,
    setLoading,
  });
};


  const onSubmit = async (data: IUpdatePostData) => {
    await updatePost({
      postId: Number(id),
      setLoading,
      data,
      toast,
      reset,
    });
  };

  useEffect(() => {
    getPostData();
  }, []);

  return (
    <SafeAreaView className="flex-1 pt-12 bg-white">
      <TouchableOpacity onPress={() => router.back()} className="left-4 mb-4">
        <AntDesign name="arrowleft" size={24} color="black" />
      </TouchableOpacity>
      <ScrollView className="px-4">
        <Text className="text-xl font-bold mb-4">Edit Post</Text>

        <View className="mb-4">
          <Text className="mb-1">Title</Text>
          <Controller
            control={control}
            name="title"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Enter post title"
                className="border p-2 rounded-lg border-slate-400"
              />
            )}
          />
          <Text className="text-red-500">{errors.title?.message}</Text>
        </View>

        <View className="mb-4">
          <Text className="mb-1">Body</Text>
          <Controller
            control={control}
            name="body"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Enter post body"
                multiline
                numberOfLines={5}
                textAlignVertical="top"
                className="border p-2 rounded-lg border-slate-400"
              />
            )}
          />
          <Text className="text-red-500">{errors.body?.message}</Text>
        </View>

        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          className="bg-primary py-3 rounded-lg items-center mt-4"
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white font-semibold text-lg">Update</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
