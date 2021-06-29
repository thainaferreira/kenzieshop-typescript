import { ReactNode } from "react";
import { AuthProvider } from "./Auth";
import { CartProvider } from "./Cart";

interface Props {
  children: ReactNode;
}
const Providers: React.FC<Props> = ({ children }) => {
  return (
    <AuthProvider>
      <CartProvider>{children}</CartProvider>
    </AuthProvider>
  );
};

export default Providers;
