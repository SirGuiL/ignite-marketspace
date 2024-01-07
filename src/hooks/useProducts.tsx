import { ProductContext } from "@contexts/ProductContext";
import { useContext } from "react";

export const useProducts = () => {
  const context = useContext(ProductContext);

  return context;
};
