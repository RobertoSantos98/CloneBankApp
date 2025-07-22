import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Colors } from '../../Utils/Colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';

import LoadingScreen from '../../components/LoadingScreen'

export default function EnviarTransferencia() {
    const areaSegura = useSafeAreaInsets();

    const [ step, setStep ] = useState(5);

    const [emailCPF, setEmailCPF ] = useState('');
    const [ tipoContaPagador, setTipoContaPagador ] = useState('');
    const [ tipoContaRecebedor, settipoContaRecebedor ] = useState('');
    const [ valor, setValor ] = useState('');

    const Transferencia = {
        idPagador: "3fa85f64-5717-4562-b3",
        tipoContaPagador: tipoContaPagador,
        idRecebedor: "6655c-665x565-566-445656-sd",
        tipoContaRecebedor: tipoContaRecebedor,
        valor: 250.00
    }

    useEffect(() => {
        if(['Empresarial', 'Pessoal'].includes(tipoContaPagador)){
            setStep(prev => prev + 1);
            console.log(tipoContaPagador)
        }
    }, [tipoContaPagador]);

    



 return (
   <View style={styles.container} >
    {step ===1 && (
        <>
            <Text style={{marginHorizontal: '5%'}} >Insira o email ou CPF da conta para enviar: </Text>
            <TextInput style={styles.input}/>
            <TouchableOpacity style={[styles.btn, {bottom: areaSegura.bottom}]} onPress={() => setStep(2)}>
                <Text style={styles.textBtn}>Próximo</Text>
            </TouchableOpacity>
        </>
    )}

    {step ===2 && (
        <>
            <Text style={{marginHorizontal: '5%'}}>Escolha uma conta para Enviar</Text>
            <TouchableOpacity style={[styles.input, {justifyContent: 'center'}]} onPress={() => setTipoContaPagador('Pessoal')}>
                <Text style={{textAlign: 'center', fontSize: 16}}>Pessoal</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.input, {justifyContent: 'center'}]} onPress={() => setTipoContaPagador('Empresarial')}>
                <Text style={{textAlign: 'center', fontSize: 16}}>Empresarial</Text>
            </TouchableOpacity>
        </>
    )}
    
    {step ===3 && (
        <>
            <Text style={{marginHorizontal: '5%'}}>Quanto você quer enviar?</Text>
            <TextInput style={styles.input}/>
            <TouchableOpacity style={[styles.btn, {bottom: areaSegura.bottom}]} onPress={() => setStep(4)} >
                <Text style={styles.textBtn}>Confirmar Valor</Text>
            </TouchableOpacity>
        </>
    )}
    
    {step ===4 && (
        <>
        <View style={{marginTop: areaSegura.top, marginHorizontal: '5%', flex: 1}}>
            <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 8}}>Confirmar Transferência</Text>
                <View style={{marginBottom: 8}}>
                    <Text style={{fontSize: 18}}>Para: </Text>
                    <View style={styles.boxFinal}>
                        <Text style={{fontSize: 18}}>{Transferencia.idRecebedor}</Text>
                    </View>
                </View>
            
                <View style={{marginBottom: 8}}>
                    <Text style={{fontSize: 18}}>Vai sair de: </Text>
                    <View style={styles.boxFinal}>
                        <Text style={{fontSize: 18}}>{Transferencia.tipoContaPagador}</Text>
                    </View>
                </View>
            
                <View style={{marginBottom: 8}}>
                    <Text style={{fontSize: 18}}>Valor: </Text>
                    <View style={styles.boxFinal}>
                        <Text style={{fontSize: 18}}>{Transferencia.valor.toFixed(2)}</Text>
                    </View>
                </View>
            
        <TouchableOpacity style={[styles.btn, {bottom: areaSegura.bottom}]}>
            <Text style={styles.textBtn}>Confirmar Transferência</Text>
        </TouchableOpacity>
        </View>   


        </>
    )}

    {step === 5 && (
        <>
            <LoadingScreen message='Realizando Transferência...'/>
        </>
    )}

   </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.Cinza,
        justifyContent: 'center'
    },
    input:{
        backgroundColor: Colors.Branco,
        marginHorizontal: '5%',
        marginTop: 18,
        height: 50,
        borderRadius: 8, 
        elevation: 1,
        fontSize: 18
    },
    btn:{
        backgroundColor: Colors.Amarelo,
        paddingVertical: 14,
        marginHorizontal: '5%',
        borderRadius: 8,
        position: 'absolute',
        width: '90%'
    },
    textBtn:{
        textAlign: 'center', 
        fontFamily: 'Oswald_700Bold', 
        fontSize: 18
    },
    boxFinal:{
        backgroundColor: Colors.Branco,
        borderRadius: 8,
        padding: 12
    }
})