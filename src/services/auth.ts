import axios, { type AxiosError } from "axios";
import type User from "@/types/User";

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

export const login = async (form: { email: string; password: string }) => {
  try {
    const res = await instance.post("/login", form);
    instance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${res.data.token}`;
    localStorage.setItem("token", res.data.token);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      handleError(error);
    } else {
      throw error;
    }
  }
};

export const register = async (form: {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}) => {
  try {
    const res = await instance.post(`/register`, {
      name: form.name,
      email: form.email,
      password: form.password,
      password_confirmation: form.password_confirmation,
    });
    if (res.status === 204) {
      return {
        success: true,
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

export const getAuth = async function () {
  try {
    const { data } = await instance.get<{ user: User }>("/auth/me");
    return data.user;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      handleError(error);
      return false;
    } else {
      throw error;
    }
  }
};

export const logout = async () => {
  try {
    const { status } = await instance.post(
      "/logout",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (status === 204) {
      return true;
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
