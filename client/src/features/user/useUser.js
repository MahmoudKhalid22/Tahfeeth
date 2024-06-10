import { useQuery } from "@tanstack/react-query";
import { getAvatar, getUser } from "../../services/userApi";
import toast from "react-hot-toast";

function useUser(token) {
  const { isPending, data, error } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUser(token),
    onSuccess: () => {},
    onError: () => {
      toast.error("حدث بعض الخطأ");
    },
  });

  return { isPending, data, error };
}

function useAvatar(token) {
  const {
    isPending: isPendingAvatar,
    data: avatar,
    error: avatarErr,
  } = useQuery({
    queryKey: ["avatar", token],
    queryFn: () => getAvatar(token),
    onSuccess: () => {
      // console.log("test");
    },
    onError: () => {
      toast.error("حدث بعض الخطأ");
    },
  });

  return { isPendingAvatar, avatar, avatarErr };
}

export { useUser, useAvatar };
