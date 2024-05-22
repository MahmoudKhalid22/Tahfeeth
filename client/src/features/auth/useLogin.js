import { QueryClient, useMutation } from "@tanstack/react-query";
import { loginUserApi } from "../../services/userApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useContext } from "react";
import { AuthContext } from "../../utils/context";

function useLogin() {
  const { isLogin, setIsLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const queryClient = new QueryClient();
  const { isPending, mutate: loginUser } = useMutation({
    mutationFn: loginUserApi,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
      localStorage.setItem("data", JSON.stringify(data));
      setIsLogin(true);
      console.log(isLogin);
      navigate("/details");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isPending, loginUser };
}

export default useLogin;
