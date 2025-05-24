import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/src/@types/product";

interface ProductStore {
  products: Product[];
  productsByCategory: Record<string, Product[]>;
  setProducts: (newProducts: Product[]) => void;
  appendProducts: (moreProducts: Product[]) => void;
  setCategoryProducts: (category: string, newProducts: Product[]) => void;
  appendCategoryProducts: (category: string, moreProducts: Product[]) => void;
  getCategoryProducts: (category: string) => Product[];
  clearCategoryProducts: (category: string) => void;
}

export const useProductStore = create<ProductStore>()(
  persist(
    (set, get) => ({
      products: [],
      productsByCategory: {},

      setProducts: (newProducts) => set({ products: newProducts }),

      appendProducts: (moreProducts) =>
        set((state) => ({
          products: [...state.products, ...moreProducts],
        })),

      setCategoryProducts: (category, newProducts) =>
        set((state) => ({
          productsByCategory: {
            ...state.productsByCategory,
            [category]: newProducts,
          },
        })),

      appendCategoryProducts: (category, moreProducts) =>
        set((state) => ({
          productsByCategory: {
            ...state.productsByCategory,
            [category]: [
              ...(state.productsByCategory[category] || []),
              ...moreProducts,
            ],
          },
        })),

      getCategoryProducts: (category) => {
        return get().productsByCategory[category] || [];
      },

      clearCategoryProducts: (category) =>
        set((state) => {
          const updated = { ...state.productsByCategory };
          delete updated[category];
          return { productsByCategory: updated };
        }),
    }),
    {
      name: "product-storage",
    }
  )
);
