import { QueryClient, useMutation } from "@tanstack/react-query";
import { addTable } from "../../services/tableApi";
import toast from "react-hot-toast";

function useAddTable() {
  const queryClient = new QueryClient();

  const { isPending, mutate, error } = useMutation({
    mutationFn: addTable,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tables"],
      });
      toast.success("تمت إضافة الجدول بنجاح");
      window.location.reload();
    },
    onError: () => {
      toast.error("حدث بعض الخطأ");
    },
  });

  return { isPending, mutate, error };
}

export { useAddTable };
