import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { apiUrl } from "@/lib/constants";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const router = useRouter();

  const updateUser = (user) => {
    setUser(user);
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch(`${apiUrl}/user`, {
          method: "GET",
          credentials: "include",
          headers: {
            "ngrok-skip-browser-warning": "any",
          },
        });

        const user = await response.json();

        setUser(user);
      } catch (error) {
        setUser(null);
      }
    };

    getUser();
  }, [router]);

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const context = useContext(UserContext);

  if (typeof context === "undefined") {
    throw new Error("useUser must be user in a UserProvider");
  }

  return context;
};
