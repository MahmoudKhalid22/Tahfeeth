import { QueryClient, useMutation } from "@tanstack/react-query";
import { addTable } from "../../services/tableApi";

function useAddTable() {
  const queryClient = new QueryClient();

  const { isPending, data, error } = useMutation({
    mutationFn: addTable,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["tables"],
      });
    },
  });

  return { isPending, data, error };
}

export { useAddTable };
