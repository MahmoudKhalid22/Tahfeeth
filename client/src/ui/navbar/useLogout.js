import { QueryClient, useMutation } from "@tanstack/react-query";
import { logoutUser as logoutUserApi } from "../../services/userApi";
import { useContext } from "react";
import { AuthContext } from "../../utils/context";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const queryClient = new QueryClient();

  const { setIsLogin } = useContext(AuthContext);

  const navigate = useNavigate();

  const { isPending, mutate: logoutUser } = useMutation({
    mutationFn: logoutUserApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
      setIsLogin(false);
      toast.success("you logged out");
      navigate("/");
    },
    onError: () => {
      toast.error("some error occured, try again later");
    },
  });
  return { isPending, logoutUser };
}
