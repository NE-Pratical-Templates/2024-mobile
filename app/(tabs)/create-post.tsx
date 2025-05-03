import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Controller, Resolver, useForm, SubmitHandler } from "react-hook-form";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ICreatePostData, IUser } from "@/types";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Picker } from "@react-native-picker/picker";
import { useToast } from "react-native-toast-notifications";
import { createPost, fetchUsers } from "@/services";

function CreatePost() {
  const [loading, setLoading] = useState<boolean>(false);
  const [usersLoading, setUsersLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<IUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<number | null>(null);

  const toast = useToast();

  const RegisterPostSchema = yup.object({
    userId: yup.number().required().label("User ID"),
    title: yup.string().required().label("Title"),
    body: yup.string().required().label("Body"),
  });
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ICreatePostData>({
    resolver: yupResolver(RegisterPostSchema),
    mode: "onTouched",
  });

  const onSubmit: SubmitHandler<ICreatePostData> = async (data) => {
    await createPost({ toast, setLoading, data, reset, setSelectedUser });
  };
  const getUsers = async () => {
    await fetchUsers({ toast, setUsers, setLoading: setUsersLoading });
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <SafeAreaView className="w-full flex-1 pt-12 bg-white">
      <View className="w-full flex-row items-center justify-between px-4">
        <View className="flex flex-row items-center">
          <Image
            className="w-10 h-10 rounded-full"
            source={require("./../../assets/images/logo.png")}
          />
        </View>
        <Image
          className="w-10 h-10 rounded-full"
          source={{ uri: "https://picsum.photos/250/250" }}
        />
      </View>
      <TouchableOpacity onPress={() => router.back()} className="mt-14 left-4">
        <AntDesign name="arrowleft" size={24} color="black" />
      </TouchableOpacity>
      <ScrollView className="w-full p-4">
        <Text className="text-xl font-bold">Create A New Post</Text>
        <View className="my-2 w-full">
          <View className="w-full flex flex-col my-2">
            <Text className="mb-1">Title</Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  className="border w-full p-2 rounded-lg border-slate-400"
                  placeholder="e.g: Elections ahead, what's on the streets?"
                />
              )}
              name="title"
            />
            <Text className=" text-red-500">{errors?.title?.message}</Text>
          </View>
          <View className="w-full flex flex-col my-2">
            <Text className="mb-1">User</Text>
            <View className="w-full rounded-lg border border-slate-400">
              <Picker
                selectedValue={selectedUser}
                style={{ height: 50, width: "100%" }}
                onValueChange={(itemValue) => {
                  setValue("userId", itemValue as number);
                  setSelectedUser(itemValue as number);
                }}
                className="border w-full p-2 rounded-lg border-slate-400"
              >
                <Picker.Item label="Select a user" value={null} />
                {users.map((user) => (
                  <Picker.Item
                    key={user.id}
                    label={user.name}
                    value={user.id}
                  />
                ))}
              </Picker>
            </View>
            <Text className=" text-red-500">{errors?.userId?.message}</Text>
          </View>
          <View className="w-full flex flex-col my-2">
            <Text className="mb-1">Body</Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Enter your body here"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                  className="border w-full p-2 rounded-lg border-slate-400"
                />
              )}
              name="body"
            />
            <Text className=" text-red-500">{errors?.body?.message}</Text>
          </View>
        </View>
        <TouchableOpacity
          className="flex items-center justify-center mx-auto w-10/12 bg-primary text-white rounded-lg p-2 my-2"
          onPress={handleSubmit(onSubmit)}
        >
          <Text className="text-center text-white text-lg font-semibold">
            {loading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              "Save"
            )}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

export default CreatePost;
