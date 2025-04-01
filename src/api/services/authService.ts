//servicio por cada controlador
//funcion para hacer una peticion


import { authApi } from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const loginService = async (dni, password) => {
    try {
        const response = await authApi.post("/login", { dni, password });
        console.log(response.data)
        return response.data; // Devolvemos los datos de la API
    } catch (error) {
        const errorMessage = error.response?.data?.message ||
            error.response?.data?.errors?.password?.[0] ||
            "Error al hacer la peticion";
        throw errorMessage; // Lanzamos el mensaje para manejarlo más arriba
    }
};

export const logoutService = async () => {
    try {
        // Obtén el token de Bearer almacenado en AsyncStorage
        const token = await AsyncStorage.getItem("userToken");
        console.log(token)
        // Realiza la solicitud de logout con el token Bearer en los encabezados
        const response = await authApi.post("/logout", {}, { headers: { Authorization: `Bearer ${token}` }, });

        return response.data;
    } catch (error) {
        const errorMessage = "Error al logout";
        throw errorMessage;
    }
};