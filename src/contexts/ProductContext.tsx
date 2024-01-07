import { ReactNode, createContext } from "react";

export interface ProductContextDataProps {}

type AuthContextProviderProps = {
  children: ReactNode;
};

export const ProductContext = createContext<ProductContextDataProps>(
  {} as ProductContextDataProps
);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  return (
    <ProductContext.Provider value={{}}>{children}</ProductContext.Provider>
  );
}
