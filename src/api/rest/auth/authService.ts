//servicio por cada controlador
//funcion para hacer una peticion

import { api } from "../axiosConection";
import AsyncStorage from "@react-native-async-storage/async-storage";
const device_name = "mobile_app";

export const loginService = async (dni, password) => {
    try {
        const response = await api.post("/auth/login", { dni, password, device_name });
        //console.log(response.data)
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message ||
            error.response?.data?.errors?.password?.[0] ||
            "Error al hacer la peticion";
        throw errorMessage;
    }
};

export const logoutService = async () => {
    try {
        // Obtén el token de Bearer almacenado en AsyncStorage
        const token = await AsyncStorage.getItem("token");
        // Realiza la solicitud de logout con el token Bearer en los encabezados
        const response = await api.post("/auth/logout", {}, { headers: { Authorization: `Bearer ${token}` }, });

        return response.data;
    } catch (error) {
        const errorMessage = "Error al logout";
        throw errorMessage;
    }
};

export const authService = async (token) => {
  try {
    const response = await api.get("/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    const status = error.response?.status;
    const message =
      error.response?.data?.message ||
      error.response?.data?.errors?.password?.[0] ||
      "Error al hacer la petición";

    if (status === 401) {
      throw new Error("UNAUTHORIZED"); // Lanzás un error que podés capturar más fácilmente
    }

    throw new Error(message);
  }
};