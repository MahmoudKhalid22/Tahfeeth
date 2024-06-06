import { QueryClient, useMutation } from "@tanstack/react-query";
import { deleteTable as deleteTableApi } from "../../services/tableApi";
import toast from "react-hot-toast";

const useDeleteTable = (token, tableId) => {
  const queryClient = new QueryClient();
  const { isPending: isDeletingTable, mutate: deleteTable } = useMutation({
    mutationFn: deleteTableApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tables"],
      });
      toast.success("تم حذف الجدول بنجاح");
      window.location.reload();
    },
  });

  return { isDeletingTable, deleteTable };
};

export default useDeleteTable;
