import { useQuery } from "@tanstack/react-query";
import { getStudents } from "../../services/teacherApi";

export function useGetStudents(teacherId, token) {
  const { isPending, data, error } = useQuery({
    queryKey: ["students"],
    queryFn: () => getStudents(teacherId, token),
  });

  return { isPending, data, error };
}
