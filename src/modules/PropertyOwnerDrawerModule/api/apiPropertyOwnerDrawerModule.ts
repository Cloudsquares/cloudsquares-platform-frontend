import { axiosBaseWrap } from "@/configs/api";

export interface DeletePropertyOwnerResponseData {
  success: {
    key: "property_owners.deleted";
    message: "Владелец недвижимости деактивирован";
    code: 200;
    status: "ok";
  };
}

export const apiPropertyOwnerDrawerModule = {
  deletePropertyOwner(
    property_id: string,
    owner_id: string,
  ): Promise<DeletePropertyOwnerResponseData> {
    return axiosBaseWrap
      .delete("/properties/" + property_id + "/owners/" + owner_id)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  },
};
