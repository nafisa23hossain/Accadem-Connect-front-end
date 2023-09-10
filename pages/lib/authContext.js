import { createContext, useContext, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (email, cookie) => {
    setUser({ email, cookie });
  };

  const checkUser = () => {
    console.log("user:  " + user.email);
    console.log("user:  " + user.cookie);
    if (user.email != null && user.cookie != null) {
      return true;
    } else {
      return false;
    }
  };
  const router = useRouter();
  const logout = () => {
    doSignOut();
  };
  async function doSignOut() {
    try {
      const response = await axios.get("http://localhost:3000/Hr/logout", {
        // headers: { "Content-Type": "application/x-www-form-urlencoded" },
        withCredentials: true,
      });
      console.log(response);
      setUser(null);
      document.cookie = null;

      //router.push("../Hr/login");
    } catch (error) {
      console.error("error failed: ", error);
    }
  }
  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, checkUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
