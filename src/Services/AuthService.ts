import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SERVER: string = 'http://192.168.1.112:5211/api';

export const login = async (email: string, senha: string): Promise<any> => {

    const usuario = {
      email: email,
      password: senha
    }

  try {
    const response = await axios.post(`${SERVER}/Auth`, usuario, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    await AsyncStorage.setItem('USER', JSON.stringify(response.data.data));

    return response.data.data;
    
  } catch (error: any) {
    throw new Error(error?.response?.data?.errorMessage || 'Não foi possível');
  }
};

export const buscarUsuarioPorCpfOuEmail = async (email: string) => {
    try{
        const response = await axios.get(`${SERVER}/Usuario/${email}`);
        return response.data.data;
    }catch(err){
      console.log(err)
    }
}
