import { QueryClient, useMutation } from "@tanstack/react-query";
import { loginUserApi } from "../../services/userApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function useLogin() {
  const navigate = useNavigate();
  const queryClient = new QueryClient();
  const { isPending, mutate: loginUser } = useMutation({
    mutationFn: loginUserApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
      navigate("/details");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isPending, loginUser };
}

export default useLogin;
