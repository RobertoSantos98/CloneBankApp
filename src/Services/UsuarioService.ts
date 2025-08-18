import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SERVER } from "../config";

export const BuscarUsuario = async () => {
    try {

        const buscarUsuario = await AsyncStorage.getItem('USER');
        if (!buscarUsuario) {
            console.log("Usuário não encontrado no AsyncStorage");
            throw new Error("Usuário não encontrado");
        }
        const usuario = JSON.parse(buscarUsuario);
        console.log("Usuário encontrado:", usuario);

        const response = await axios.get(`${SERVER}/Usuario/id/${usuario.id}`, {
            // headers: {
            //     // Authorization: `Bearer ${usuario.token}`,
            // }
        });

        return response.data.data;

    }catch(error){
        console.error("Erro ao buscar usuário:", error);
        throw error;
    }
}