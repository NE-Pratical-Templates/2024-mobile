import api from "@/lib/axios-config";
import { IPost, IUser } from "@/types";
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
    toast
}: {
    id: number,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setUser: React.Dispatch<React.SetStateAction<IUser | undefined>>,
    toast: ToastType
}) => {
    try {
        setLoading(true)
        const url = `/users/${id}`
        const response = await api.get(url)
        setUser(response.data)
    } catch (error) {
        console.log(error);
        return toast.show("Error fetching user", {
            type: "danger",
            placement: "top"
        })
    } finally {
        setLoading(false)
    }
}
