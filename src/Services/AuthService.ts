import axios from "axios";
import { SERVER }  from '../config'

export const buscarUsuarioPorCpfOuEmail = async (email: string) => {
    try{
        const response = await axios.get(`${SERVER}/Usuario/${email}`,{
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response.data.data;
    }catch(err){
      console.log(err)
    }
}
