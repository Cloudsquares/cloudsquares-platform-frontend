import { PropertyOwner } from "@/shared/interfaces/PropertyOwner";
import { BasicDrawerMode } from "@/shared/interfaces/Shared";
import { create } from "zustand";

type DrawerMode = BasicDrawerMode.edit | BasicDrawerMode.delete;
interface PropertyOwnerDrawersStore {
  showPropertyOwnerDrawer: boolean;
  setShowPropertyOwnerDrawer: (v: boolean) => void;
  mode: DrawerMode;
  openPropertyOwnerDrawerWithMode: (
    v: DrawerMode,
    owner: PropertyOwner | null,
    property_id: string | null,
  ) => void;
  editablePropertyOwner: PropertyOwner | null;
  property_id: string | null;
}
export const usePropertyOwnerDrawersStore = create<PropertyOwnerDrawersStore>(
  (set) => ({
    showPropertyOwnerDrawer: false,
    setShowPropertyOwnerDrawer: (showPropertyOwnerDrawer) =>
      set({ showPropertyOwnerDrawer }),
    mode: BasicDrawerMode.edit,
    openPropertyOwnerDrawerWithMode: (
      mode,
      editablePropertyOwner,
      property_id,
    ) =>
      set({
        mode,
        editablePropertyOwner,
        property_id,
        showPropertyOwnerDrawer: true,
      }),
    editablePropertyOwner: null,
    property_id: null,
  }),
);
