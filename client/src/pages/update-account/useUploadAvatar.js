import { QueryClient, useMutation } from "@tanstack/react-query";
import { uploadAvatarApi } from "../../services/userApi";
import toast from "react-hot-toast";

function useUploadAvatar() {
  const queryClient = new QueryClient();
  const {
    isPending: isUploadingAvatar,
    mutate: uploadAvatar,
    error,
  } = useMutation({
    mutationFn: uploadAvatarApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["avatar"],
      });
      toast.success("تم تغيير الصورة بنجاح");
    },
    onError: () => {
      toast.error("حدث بعض الخطأ");
    },
  });

  console.log(isUploadingAvatar);
  return { isUploadingAvatar, uploadAvatar, error };
}

export { useUploadAvatar };
