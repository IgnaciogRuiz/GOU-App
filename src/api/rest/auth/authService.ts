//servicio por cada controlador
//funcion para hacer una peticion

import { NativeViewGestureHandlerPayload } from "react-native-gesture-handler";
import { api } from "../axiosConection";
const device_name = "mobile_app";

export const loginService = async (dni, password) => {
    try {
        const response = await api.post("/auth/login", { dni, password, device_name });
        //console.log(response.data)
        return response.data;
    } catch (error) {
      console.log("Error en loginService:", error);
        const errorMessage = error.response?.data?.message ||
            error.response?.data?.errors?.password?.[0] ||
            "Error al hacer la peticion";
        throw errorMessage;
    }
};

export const logoutService = async (token: string | NativeViewGestureHandlerPayload) => {
    try {
        // Realiza la solicitud de logout con el token Bearer en los encabezados
        const response = await api.post("/auth/logout", {}, { headers: { Authorization: `Bearer ${token}` }, });

        return response.data;
    } catch (error) {
        const errorMessage = "Error al logout";
        throw error;
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