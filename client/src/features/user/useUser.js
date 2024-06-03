import { QueryClient, useQuery } from "@tanstack/react-query";
import { getAvatar, getUser } from "../../services/userApi";

function useUser(token) {
  const { isPending, data, error } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUser(token),
  });
  return { isPending, data, error };
}

function useAvatar(token) {
  const {
    isPending: isPendingAvatar,
    data: avatar,
    error: avatarErr,
  } = useQuery({
    queryKey: ["users", token],
    queryFn: () => getAvatar(token),
    onSuccess: () => {
      console.log("test");
    },
  });

  return { isPendingAvatar, avatar, avatarErr };
}

export { useUser, useAvatar };
