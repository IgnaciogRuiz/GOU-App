//servicio por cada controlador
//funcion para hacer una peticion


import { authApi } from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const login = async (dni, password) => {
    try {
        const response = await authApi.post("/login", { dni, password });
        return response.data; // Devolvemos los datos de la API
    } catch (error) {
        //console.error("Error de API:", error.response);  // Verifica el contenido de error.response
        const errorMessage = error.response?.data?.message ||
            error.response?.data?.errors?.password?.[0] ||
            "Error al hacer la peticion";
        throw errorMessage; // Lanzamos el mensaje para manejarlo más arriba
    }
};

export const logout = async () => {
    try {
        // Obtén el token de Bearer almacenado en AsyncStorage
        const token = await AsyncStorage.getItem("token");

        // Realiza la solicitud de logout con el token Bearer en los encabezados
        const response = await authApi.post("/logout", {}, { headers: { Authorization: `Bearer ${token}` }, });

        return response.data;
    } catch (error) {
        const errorMessage = "Error al logout";
        throw errorMessage;
    }
};