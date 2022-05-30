import axios, { type AxiosError } from "axios";

interface User {
  name: string;
  email: string;
  password: string;
}
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Accept: "application/json",
    "content-type": "application/json",
  },
});

instance.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
  "token"
)}`;

export const fetchAll = async () => {
  try {
    const res = await instance.get("/admin/users");
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      handleError(error);
    } else {
      throw error;
    }
  }
};

export const fetchOne = async (id: string) => {
  try {
    const res = await instance.get(`/admin/users/${id}`);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      handleError(error);
    } else {
      throw error;
    }
  }
};

export const create = async (user: User) => {
  try {
    const res = await instance.post("/admin/users", user);
    if (res.status === 204) {
      return {
        status: "success",
        message: "User created successfully",
      };
    }
    return false;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      handleError(error);
    } else {
      throw error;
    }
  }
};

export const update = async (userId,user: User) => {
  try {
    const res = await instance.put(`/admin/users/${userId}`, user);
    if (res.status === 204) {
      return {
        status: "success",
        message: "User updated successfully",
      };
    }
    return false;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      handleError(error);
    } else {
      throw error;
    }
  }
};

export const remove = async (id) => {
  try {
    const res = await instance.delete(`/admin/users/${id}`);
    if (res.status === 204) {
      return {
        status: "success",
        message: "User deleted successfully",
      };
    }
    return false;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      handleError(error);
    } else {
      throw error;
    }
  }
};

function handleError(err: AxiosError) {
  console.log(err.response?.data);
  console.log(err.response?.status);
}
