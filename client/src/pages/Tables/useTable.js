import { useQuery } from "@tanstack/react-query";
import { getTables } from "../../services/tableApi";

const useGetTable = (token, stdId) => {
  const { isPending, data, error } = useQuery({
    queryKey: ["tables"],
    queryFn: () => getTables(token, stdId),
  });

  return { isPending, data, error };
};

export { useGetTable };
