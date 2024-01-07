import { UserDTO } from "@dtos/UserDTO";
import { api } from "@services/api";
import {
  storageAuthTokenGet,
  storageAuthTokenRemove,
  storageAuthTokenSave,
} from "@storage/storageAuthToken";
import {
  storageUserGet,
  storageUserRemove,
  storageUserSave,
} from "@storage/storageUser";
import { ReactNode, createContext, useEffect, useState } from "react";

export interface AuthContextDataProps {
  SignIn: (props: SignInProps) => void;
  signOut: () => void;
  user: UserDTO;
  isLoadingUserStorageData: boolean;
}

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

type AuthContextProviderProps = {
  children: ReactNode;
};

type SignInProps = {
  email: string;
  password: string;
};

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO);
  const [token, setToken] = useState<string>();
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] =
    useState(true);

  const updateUser = (props: UserDTO) => {
    setUser(props);
    storageUserSave(props);
  };

  const getStoredUser = async () => {
    setIsLoadingUserStorageData(true);

    try {
      const user = await storageUserGet();
      const token = await storageAuthTokenGet();

      setUser(user);
      setToken(token);

      if (!token) {
        signOut();
      }

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } catch (error) {
    } finally {
      setIsLoadingUserStorageData(false);
    }
  };

  const SignIn = async (props: SignInProps) => {
    try {
      const response = await api.post("/sessions", props);

      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`;

      updateUser({
        avatar: response.data.user.avatar,
        email: response.data.user.email,
        name: response.data.user.name,
        id: response.data.user.id,
      });
      setToken(response.data.token);
      storageAuthTokenSave(response.data.token);
    } catch (error) {
      throw error;
    }
  };

  const signOut = async () => {
    try {
      setIsLoadingUserStorageData(true);
      setUser({} as UserDTO);
      setToken("");

      await storageUserRemove();
      await storageAuthTokenRemove();
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  };

  useEffect(() => {
    getStoredUser();
  }, []);

  useEffect(() => {
    const subscribe = api.registerInterceptTokenManager(signOut);

    return () => {
      subscribe();
    };
  }, [signOut]);

  return (
    <AuthContext.Provider
      value={{ SignIn, signOut, user, isLoadingUserStorageData }}
    >
      {children}
    </AuthContext.Provider>
  );
}
