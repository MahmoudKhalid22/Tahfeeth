import { QueryClient, useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../utils/context";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export function useLogout() {
  const queryClient = new QueryClient();

  const { setIsLogin } = useContext(AuthContext);

  const navigate = useNavigate();

  const { isPending, mutate: logoutUser } = useMutation({
    mutationFn: () => Cookies.remove("accessToken"),
    onSuccess: () => {
      queryClient.invalidateQueries("users");

      setIsLogin(false);

      toast.success("you logged out");

      navigate("/");
      window.location.reload();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isPending, logoutUser };
}
