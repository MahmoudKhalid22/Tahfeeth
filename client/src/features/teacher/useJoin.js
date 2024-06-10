import { QueryClient, useMutation } from "@tanstack/react-query";
import { joinStudent } from "../../services/teacherApi";
import toast from "react-hot-toast";

function useJoin() {
  const queryClient = new QueryClient();
  const { isPending: isJoining, mutate: joinToTeacher } = useMutation({
    mutationFn: joinStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["students-teachers"],
      });
      toast.success("تم انضمامك للمعلم");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isJoining, joinToTeacher };
}

export { useJoin };
