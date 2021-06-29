import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface Product {
  id?: number;
  name: string;
  title: string;
  description: string;
  price: number;
  image: string;
  priceFormatted?: number;
}

interface CartProviderData {
  cart: Product[];
  setCart: Dispatch<SetStateAction<Product[]>>;
}

interface Props {
  children: ReactNode;
}

const CartContext = createContext<CartProviderData>({} as CartProviderData);

export const CartProvider: React.FC<Props> = ({ children }) => {
  const [cart, setCart] = useState<Product[]>([] as Product[]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
