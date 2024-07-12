import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

interface SellerState {
  sellerMode: boolean
  setSellerMode: (value: boolean) => void
}

export const useSellerMode = create<SellerState>()(
  devtools(
    persist(
      (set) => ({
        sellerMode: false,
        setSellerMode: (value: boolean) => set({ sellerMode: value }),
      }),
      {
        name: "sellerMode",
        storage: createJSONStorage(() => sessionStorage),
      }
    ),
  )
);