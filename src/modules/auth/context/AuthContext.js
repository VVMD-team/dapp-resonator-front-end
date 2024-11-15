import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";

import { checkAuth } from "@/modules/auth/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuth, setIsAuth] = useState(null);
  const { isConnected } = useAccount();

  const router = useRouter();

  useEffect(() => {
    const checkIsAuth = async () => {
      const authenticated = await checkAuth();

      if (
        (!authenticated || !isConnected) &&
        window.location.pathname !== "/login"
      ) {
        router.replace("/login");
        return;
      }

      setIsAuth(authenticated);
    };

    checkIsAuth();
  }, [router, isConnected]);

  return (
    <AuthContext.Provider value={{ isAuth }}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (typeof context === "undefined") {
    throw new Error("useAuth must be user in a AuthProvider");
  }

  return context;
};
