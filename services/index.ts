import api from "@/lib/axios-config";
import { IComment, ICreatePostData, IPost, IUser } from "@/types";
import { router } from "expo-router";
import { UseFormReset } from "react-hook-form";
import { ToastType } from "react-native-toast-notifications";
export const fetchPosts = async ({
  toast,
  setPosts,
  setLoading,
}: {
  toast: ToastType;
  setPosts: React.Dispatch<React.SetStateAction<IPost[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  try {
    setLoading(true);
    const url = "/posts";
    const response = await api.get(url);
    setPosts(response.data);
  } catch (error) {
    console.log(error);
    return toast.show("Error fetching posts", {
      type: "danger",
      placement: "top",
    });
  } finally {
    setLoading(false);
  }
};

export const getUser = async ({
  id,
  setLoading,
  setUser,
  toast,
}: {
  id: number;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setUser: React.Dispatch<React.SetStateAction<IUser | undefined>>;
  toast: ToastType;
}) => {
  try {
    setLoading(true);
    const url = `/users/${id}`;
    const response = await api.get(url);
    setUser(response.data);
  } catch (error) {
    console.log(error);
    return toast.show("Error fetching user", {
      type: "danger",
      placement: "top",
    });
  } finally {
    setLoading(false);
  }
};

export const deletePost = async ({
  id,
  toast,
  setLoading,
}: {
  id: string;
  toast: ToastType;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  try {
    setLoading(true);
    const url = `/posts/${id}`;
    await api.delete(url);
    toast.show("Post deleted successfully", {
      type: "success",
      placement: "top",
    });
    router.navigate("/(tabs)");
  } catch (error) {
    console.log(error);
    return toast.show("Error deleting post", {
      type: "danger",
      placement: "top",
    });
  } finally {
    setLoading(false);
  }
};

export const fetchPostData = async ({
  id,
  setPost,
  setComments,
  toast,
  setLoading,
}: {
  id: string;
  setPost: React.Dispatch<React.SetStateAction<IPost | undefined>>;
  setComments: React.Dispatch<React.SetStateAction<IComment[]>>;
  toast: ToastType;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  try {
    setLoading(true);
    const postUrl = `/posts/${id}`;
    const commentsUrl = `posts/${id}/comments`;

    const postData = await api.get(postUrl);
    const commentsData = await api.get(commentsUrl);

    setPost(postData.data);
    setComments(commentsData.data);
  } catch (error) {
    console.log(error);
    return toast.show("Error fetching post data", {
      type: "danger",
      placement: "top",
    });
  } finally {
    setLoading(false);
  }
};

export const fetchUsers = async ({
  setLoading,
  toast,
  setUsers,
}: {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  toast: ToastType;
  setUsers: React.Dispatch<React.SetStateAction<IUser[]>>;
}) => {
  try {
    setLoading(true);
    const url = "/users";
    const response = await api.get(url);
    setUsers(response.data);
  } catch (error) {
    console.log(error);
    return toast.show("Error fetching users", {
      type: "danger",
      placement: "top",
    });
  } finally {
    setLoading(false);
  }
};

export const createPost = async ({
  setLoading,
  data,
  toast,
  reset,
  setSelectedUser,
}: {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  data: ICreatePostData;
  toast: ToastType;
  reset: UseFormReset<ICreatePostData>;
  setSelectedUser: React.Dispatch<React.SetStateAction<number | null>>;
}) => {
  try {
    setLoading(true);
    const url = "/posts";
    await api.post(url, data);
    toast.show("Post created successfully", {
      type: "success",
      placement: "top",
    });
    setLoading(false);
    reset();
    setSelectedUser(null);
    router.push("/(tabs)");
  } catch (error: any) {
    console.log(error);
    return toast.show("Error creating post", {
      type: "danger",
      placement: "top",
    });
  } finally {
    setLoading(false);
  }
};
