import { QueryClient, useMutation } from "@tanstack/react-query";
import { addStudent, addTeacher } from "../../services/adminApi";
import toast from "react-hot-toast";

function useAddTeacher() {
  const queryClient = new QueryClient();
  const { isPending, mutate } = useMutation({
    mutationFn: addTeacher,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["teachers"],
      });
      toast.success("تمت إضافة المعلم");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isPending, mutate };
}
function useAddStudent() {
  const queryClient = new QueryClient();
  const { isPending, mutate } = useMutation({
    mutationFn: addStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["teachers"],
      });
      toast.success("تمت إضافة الطالب للمعلم");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isPending, mutate };
}

export { useAddTeacher, useAddStudent };
