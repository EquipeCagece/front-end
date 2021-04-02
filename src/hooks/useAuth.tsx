import {
  createContext,
  useCallback,
  useState,
  useContext,
  ReactNode,
} from 'react';
import Cookies from 'js-cookie';

import api from '../services/api';

interface User {
  id: string;
  avatar_url: string;
  name: string;
  email: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextData {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  updateUser(user: User): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps): JSX.Element {
  const [data, setData] = useState<AuthState>(() => {
    const token = Cookies.get('@PokeTeam:token');
    const user = Cookies.get('@PokeTeam:user');

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      return {
        token,
        user: JSON.parse(user),
      };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }: SignInCredentials) => {
    const response = await api.post('/sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    Cookies.set('@PokeTeam:token', token);
    Cookies.set('@PokeTeam:user', user);

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    Cookies.remove('@PokeTeam:token');
    Cookies.remove('@PokeTeam:user');

    setData({} as AuthState);
  }, []);

  const updateUser = useCallback(
    async (user: User) => {
      Cookies.set('@PokeTeam:user', user);

      setData({
        token: data.token,
        user,
      });
    },
    [data.token, setData]
  );

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        signIn,
        signOut,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}
