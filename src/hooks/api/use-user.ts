import { DetailUser, ListUsers } from "@/models/UserModel";
import axios from "axios";
import { useCallback, useState } from "react";

const apiUrl = import.meta.env.VITE_API_URL;

export const useUsers = () => {
  const [users, setUsers] = useState<ListUsers[]>([]);
  const [usersActive, setUsersActive] = useState<number>(0);
  const [usersInactive, setUsersInactive] = useState<number>(0);
  const [usersAdmin, setUsersAdmin] = useState<number>(0);
  const [detailUser, setDetailUser] = useState<DetailUser | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");

  const getAllUsers = useCallback(async (page = 1, limit = 10, search = "") => {
    try {
      const response = await axios.get(`${apiUrl}/api/users`, {
        withCredentials: true,
        params: {
          page,
          limit,
          search,
        },
      });

      if (response.status === 200) {
        setUsers(response.data.data);
        setCurrentPage(response.data.current_page);
        setTotalItems(response.data.total_items);
        setTotalPage(response.data.total_page);
        setUsersActive(response.data.users_active);
        setUsersInactive(response.data.users_inactive);
        setUsersAdmin(response.data.users_admin);

        return {
          total_pages: response.data.total_page,
          total_items: response.data.total_items,
        };
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }, []);

  const getDetailUser = useCallback(async (userId: string) => {
    try {
      const response = await axios.get(`${apiUrl}/api/user/detail/${userId}`, {
        withCredentials: true,
      });

      if (response.status === 200) {
        setDetailUser(response.data);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  }, []);

  return {
    users,
    totalItems,
    usersActive,
    usersInactive,
    usersAdmin,
    currentPage,
    totalPage,
    detailUser,
    getAllUsers,
    getDetailUser,
  };
};
