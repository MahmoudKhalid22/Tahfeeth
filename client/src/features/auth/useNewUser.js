import { QueryClient, useMutation } from "@tanstack/react-query";
import { newUser } from "../../services/userApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useNewUser() {
  const queryClient = new QueryClient();
  const navigate = useNavigate();

  const { isPending, mutate: createNewUser } = useMutation({
    mutationFn: newUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      navigate("/verify");
    },
    onError: (err) => toast.error(err?.message),
  });
  return { isPending, createNewUser };
}

export default useNewUser;
