import { User } from "@/models/UserModel";
import axios from "axios";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface AuthContextProps {
  isAuthenticated: boolean;
  user: User | null;
  profilePicture: string;
  logoHospital: string;
  setUser?: React.Dispatch<React.SetStateAction<User | null>>;
  login: (user: User) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [profilePicture, setProfilePicture] = useState("");
  const [logoHospital, setLogoHospital] = useState("");

  const clearAllLocalStorage = () => {
    localStorage.clear();
  };

  const login = (user: User) => {
    console.log(user);
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
    window.location.reload;
    setIsAuthenticated(true);
  };

  const logout = () => {
    clearAllLocalStorage();
    setUser(null);
    setIsAuthenticated(false);
    window.location.href = "/login";
  };

  // Fetch profile picture
  //   useEffect(() => {
  //     if (user?.profile_picture) {
  //       const path = user?.profile_picture.path;
  //       const imageUrl = `http://localhost:3000/uploads/profile-pictures/${path}`;
  //       setProfilePicture(imageUrl);
  //     }
  //     if (user?.hospital?.logo_path) {
  //       const path = user?.hospital.logo_path;
  //       const imageUrl = `http://localhost:3000/uploads/profile-pictures/${path}`;
  //       setLogoHospital(imageUrl);
  //     }
  //   }, [user]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser.data);
        setIsAuthenticated(true);

        axios
          .get("http://localhost:3000/api/user-current", {
            withCredentials: true,
          })
          .then((response) => {
            if (response.status !== 200) {
              throw new Error("Auth validation error");
            }
            const updatedUser = response.data;
            setUser(updatedUser);
            localStorage.setItem("user", JSON.stringify(updatedUser));
          })
          .catch((error) => {
            console.error("Auth validation error:", error);
            setIsAuthenticated(false);
            setUser(null);
            clearAllLocalStorage();
            window.location.href = "/login";
          })
          .finally(() => {
            setIsLoading(false);
          });
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        clearAllLocalStorage();
        setIsAuthenticated(false);
        setUser(null);
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        profilePicture,
        logoHospital,
        setUser,
        login,
        logout,
        isLoading,
      }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
