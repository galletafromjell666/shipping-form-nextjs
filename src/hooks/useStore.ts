"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { initialRecollectionOptions } from "../utils/form";
import { ShippingForm } from "@/types/shippingForm";
import { Parcel } from "@/types/parcel";


interface State {
  shippingForm: ShippingForm;
  parcels: Parcel[];
}

type Actions = {
  addShippingForm: (shippingForm: ShippingForm) => void;
  addParcel: (parcel: Parcel) => void;
  removeParcel: (id: string) => void;
  updateParcel: (id: string, parcel: Parcel) => void;
  addParcelBulk: (parcel: Parcel[]) => void;
};

type Store = State & {
  actions: Actions;
};

const initialState: State = {
  shippingForm: {
    recipient_state: "Santa Ana",
    recipient_country: "Metapán",
    recipient_phone_code: "+503",
    recipient_phone: "+503",
    recolection_address: initialRecollectionOptions[0].value,
  } as ShippingForm,
  parcels: [],
};

const useStore = create<Store>()(
  persist(
  (set, _get) => ({
    ...initialState,
    actions: {
      addShippingForm: (shippingForm: ShippingForm) =>
        set(() => ({
          shippingForm,
        })),
      addParcelBulk: (parcels: Parcel[]) =>
        set(() => ({
          parcels,
        })),
      addParcel: (newParcel: Parcel) =>
        set((s) => ({
          parcels: s.parcels.concat({
            ...newParcel,
            id: crypto.randomUUID(),
          }),
        })),
      removeParcel: (id: string) =>
        set((s) => ({
          parcels: s.parcels.filter((parcel) => parcel.id !== id),
        })),
      updateParcel: (id: string, updatedParcel: Parcel) =>
        set((s) => ({
          parcels: s.parcels.map((parcel) =>
            parcel.id === id ? { ...parcel, ...updatedParcel } : parcel
          ),
        })),
    },
  }),
    {
      name: "shipping-form-store",
      partialize: ({ parcels }) => ({ parcels }),
    }
  )
);

export const useParcels = () => useStore((state) => state.parcels);
export const useStoreActions = () => useStore((state) => state.actions);
export const useShippingForm = () => useStore((state) => state.shippingForm);
