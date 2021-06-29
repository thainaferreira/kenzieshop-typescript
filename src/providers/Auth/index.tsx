import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { History } from "history";
import api from "../../services/api";

interface FormValues {
  username: string;
  password: string;
}

interface AuthProviderData {
  token: string;
  setAuth: Dispatch<SetStateAction<string>>;
  signIn: (
    userData: FormValues,
    setError: Dispatch<SetStateAction<boolean>>,
    history: History
  ) => void;
  logout: () => void;
}

interface Props {
  children: ReactNode;
}

const AuthContext = createContext<AuthProviderData>({} as AuthProviderData);

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const token = localStorage.getItem("token") || "";

  const [auth, setAuth] = useState<string>(token);

  const signIn = (
    userData: FormValues,
    setError: Dispatch<SetStateAction<boolean>>,
    history: History
  ) => {
    api
      .post("/sessions/", userData)
      .then((response) => {
        localStorage.setItem("token", response.data.access);
        setAuth(response.data.access);
        history.push("/dashboard");
      })
      .catch((err) => setError(true));
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuth("");
  };

  return (
    <AuthContext.Provider value={{ token: auth, setAuth, signIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
