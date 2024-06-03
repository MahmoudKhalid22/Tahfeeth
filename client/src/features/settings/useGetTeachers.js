import { useQuery } from "@tanstack/react-query";
import { getTeachers } from "../../services/allowedApi";

function useGetTeachers() {
  const { isPending, data, error } = useQuery({
    queryKey: ["teachers"],
    queryFn: getTeachers,
  });

  return { isPending, data, error };
}

export { useGetTeachers };
