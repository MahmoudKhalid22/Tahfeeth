import { QueryClient, useMutation } from "@tanstack/react-query";
import { addStudent } from "../../services/teacherApi";
import toast from "react-hot-toast";

function useAddStudent() {
  const queryClient = new QueryClient();
  const { isPending, mutate, error } = useMutation({
    mutationFn: addStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["students"],
      });
      toast.success("تمت إضافة الطالب بنجاج");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isPending, mutate, error };
}

export { useAddStudent };
