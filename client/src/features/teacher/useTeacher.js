import { useQuery } from "@tanstack/react-query";
import { getTeacher } from "../../services/allowedApi";

export function useTeacher(id) {
  const { isPending, data, error } = useQuery({
    queryKey: ["teacher", id],
    queryFn: () => getTeacher(id),
  });
  return { isPending, data, error };
}
