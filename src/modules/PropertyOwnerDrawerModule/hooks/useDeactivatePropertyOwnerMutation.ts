import { useAxiosMutation } from "@/configs/useAxiosMutation";
import { apiPropertyOwnerDrawerModule } from "@/modules/PropertyOwnerDrawerModule/api";
import { showApiError } from "@/shared/utils";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface MutationFnProps {
  property_id: string;
  owner_id: string;
  onError?: () => void;
  onSuccess?: () => void;
}

export const useDeactivatePropertyOwnerMutation = () => {
  const queryClient = useQueryClient();
  return useAxiosMutation({
    mutationFn: ({ property_id, owner_id }: MutationFnProps) =>
      apiPropertyOwnerDrawerModule.deletePropertyOwner(property_id, owner_id),
    onSuccess: (response, { onSuccess, property_id }) => {
      toast.success(response.success.message);
      queryClient.invalidateQueries({
        queryKey: ["get-all-property-owners-by-property-id", property_id],
      });
      queryClient.invalidateQueries({
        queryKey: [["get-property-details", property_id]], // todo: вместо айди сюда нужен slug
      });

      if (onSuccess) onSuccess();
      return response;
    },
    onError: (error, { onError }) => {
      if (onError) onError();
      showApiError(error);
      return error;
    },
  });
};
