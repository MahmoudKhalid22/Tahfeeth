import { useQuery } from "@tanstack/react-query";
import { getMessages } from "../../services/adminApi";

function useGetMessages(adminToken) {
  const { isPending, data, error } = useQuery({
    queryKey: ["messages"],
    queryFn: () => getMessages(adminToken),
  });

  return { isPending, data, error };
}

export { useGetMessages };
