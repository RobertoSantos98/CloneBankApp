import { SERVER } from '../config';
import axios from "axios";
import { Transferencia } from '../types';

export default function realizarTransferencia(transferencia: Transferencia) {
    return axios.post(`${SERVER}/Transferencia`, transferencia);
}