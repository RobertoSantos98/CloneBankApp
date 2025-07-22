import axios from "axios";

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
    return response.data.data;
    
  } catch (error: any) {
    throw new Error(error?.response?.data?.ErrorMessage || 'Não foi possível');
  }
};
