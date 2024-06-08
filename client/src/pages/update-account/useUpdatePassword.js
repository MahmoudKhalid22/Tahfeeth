import { QueryClient, useMutation } from "@tanstack/react-query";
import { updatePassword as updatePasswordApi } from "../../services/userApi";
import toast from "react-hot-toast";

function useUpdatePassword() {
  const queryClient = new QueryClient();
  const { isPending, mutate: updatePassword } = useMutation({
    mutationFn: updatePasswordApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
      toast.success("تم تحديث كلمة السر");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isPending, updatePassword };
}

export { useUpdatePassword };
