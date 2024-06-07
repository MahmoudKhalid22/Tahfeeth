import { QueryClient, useMutation } from "@tanstack/react-query";
import { updateUsername as updateUsernameApi } from "../../services/userApi";
import toast from "react-hot-toast";

function useUpdateUsername() {
  const queryClient = new QueryClient();
  const { isPending: isUpdating, mutate } = useMutation({
    mutationFn: updateUsernameApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
      toast.success("تم تحديث الاسم بنجاح");
    },
    onError: () => toast.error("حدث بعض الخطأ حاول لاحقا"),
  });

  return { isUpdating, mutate };
}

export { useUpdateUsername };
