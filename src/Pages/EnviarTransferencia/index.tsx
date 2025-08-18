import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../../Utils/Colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/auth';

import LoadingScreen from '../../components/LoadingScreen';
import { buscarUsuarioPorCpfOuEmail } from '../../Services/AuthService';
import realizarTransferencia from '../../Services/TransferenciaService';
import { Transferencia } from '../../types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/StackNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'EnviarTransferencia'>;

export default function EnviarTransferencia({navigation}: Props) {
  const { user } = useContext(AuthContext);
  const areaSegura = useSafeAreaInsets();

  const [step, setStep] = useState(1);

  const [emailCPF, setEmailCPF] = useState('');
  const [tipoContaPagador, setTipoContaPagador] = useState<'Pessoal' | 'Empresarial' | ''>('');
  const [tipoContaRecebedor, setTipoContaRecebedor] = useState<'Pessoal' | 'Empresarial' | ''>('');
  const [valor, setValor] = useState('');

  const [usuarioParaEnvio, setUsuarioParaEnvio] = useState<any>();

  const [transferencia, setTransferencia] = useState<Transferencia>({
    idPagador: user?.id || '',
    idRecebedor: '',
    tipoContaPagador: '',
    tipoContaRecebedor: '',
    valor: 0
  });

  // Step 1: Buscar usuário
  const buscarCpfOuEmail = async () => {
    if (!emailCPF) {
      alert('Insira um CPF ou email válido.');
      return;
    }
    try {
      const usuarioEncontrado = await buscarUsuarioPorCpfOuEmail(emailCPF);
      if (!usuarioEncontrado) {
        alert('Usuário não encontrado.');
        return;
      }
      setUsuarioParaEnvio(usuarioEncontrado);

      // Atualiza ID do recebedor na transferência
      setTransferencia(prev => ({
        ...prev,
        idRecebedor: usuarioEncontrado.id
      }));

      setStep(2);
    } catch (err) {
      console.log(err);
    }
  };

  // Step 2: Escolher tipo de conta do recebedor
  const escolherTipoContaRecebedor = (tipo: 'Pessoal' | 'Empresarial') => {
    setTipoContaRecebedor(tipo);
    setTransferencia(prev => ({
      ...prev,
      tipoContaRecebedor: tipo
    }));
    setStep(3);
  };

  // Step 3: Definir valor e tipo de conta do pagador
  const handleValor = () => {
    if (!valor || isNaN(Number(valor)) || Number(valor) <= 0) {
      alert('Valor inválido.');
      return;
    }
    if (!tipoContaPagador) {
      alert('Escolha uma conta do pagador.');
      return;
    }
    setTransferencia(prev => ({
      ...prev,
      valor,
      tipoContaPagador
    }));
    setStep(4);
  };

  // Step 4: Confirmar transferência
  const handleTransferencia = async () => {
    setStep(5); // Mostra loading
    try {
      await realizarTransferencia(transferencia);
      alert('Transferência realizada com sucesso!');
      
      // Aqui reseta estados e volta para home
      setEmailCPF('');
      setTipoContaPagador('');
      setTipoContaRecebedor('');
      setValor('');
      setUsuarioParaEnvio(undefined);
      setTransferencia({
        idPagador: user?.id || '',
        idRecebedor: '',
        tipoContaPagador: '',
        tipoContaRecebedor: '',
        valor: 0
      });
      navigation.navigate("Home");

    } catch (err) {
      console.log(err);
      alert('Erro ao realizar transferência.');
      setStep(4); // Volta para confirmação
    }
  };

  return (
    <View style={styles.container}>
      {/* Step 1: Inserir CPF/Email */}
      {step === 1 && (
        <>
          <Text style={{ marginHorizontal: '5%' }}>
            Insira o email ou CPF da conta para enviar:
          </Text>
          <TextInput
            style={styles.input}
            value={emailCPF}
            onChangeText={setEmailCPF}
            placeholder="Email ou CPF"
          />
          <TouchableOpacity
            style={[styles.btn, { bottom: areaSegura.bottom }]}
            onPress={buscarCpfOuEmail}
          >
            <Text style={styles.textBtn}>Próximo</Text>
          </TouchableOpacity>
        </>
      )}

      {/* Step 2: Escolher tipo de conta do recebedor */}
      {step === 2 && (
        <>
          <Text style={{ marginHorizontal: '5%' }}>Escolha uma conta para enviar:</Text>

          <TouchableOpacity
            style={[styles.input, { justifyContent: 'center' }]}
            onPress={() => escolherTipoContaRecebedor('Pessoal')}
          >
            <Text style={{ textAlign: 'center', fontSize: 16 }}>Pessoal</Text>
          </TouchableOpacity>

          {usuarioParaEnvio?.contas?.length > 0 && (
            <TouchableOpacity
              style={[styles.input, { justifyContent: 'center' }]}
              onPress={() => escolherTipoContaRecebedor('Empresarial')}
            >
              <Text style={{ textAlign: 'center', fontSize: 16 }}>Empresarial</Text>
            </TouchableOpacity>
          )}
        </>
      )}

      {/* Step 3: Definir valor e tipo de conta do pagador */}
      {step === 3 && (
        <>
          <Text style={{ marginHorizontal: '5%' }}>Quanto você quer enviar?</Text>
          <TextInput
            style={styles.input}
            value={valor}
            onChangeText={setValor}
            keyboardType="numeric"
            placeholder="Valor"
          />

          <Text style={{ marginHorizontal: '5%', marginTop: 8 }}>Escolha uma conta do pagador:</Text>

          <TouchableOpacity
            style={[styles.input, { justifyContent: 'center' }]}
            onPress={() => setTipoContaPagador('Pessoal')}
          >
            <Text style={{ textAlign: 'center', fontSize: 16 }}>Pessoal</Text>
          </TouchableOpacity>

          {usuarioParaEnvio?.contas?.length > 0 && (
            <TouchableOpacity
              style={[styles.input, { justifyContent: 'center' }]}
              onPress={() => setTipoContaPagador('Empresarial')}
            >
              <Text style={{ textAlign: 'center', fontSize: 16 }}>Empresarial</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={[styles.btn, { bottom: areaSegura.bottom }]}
            onPress={handleValor}
          >
            <Text style={styles.textBtn}>Confirmar Valor</Text>
          </TouchableOpacity>
        </>
      )}

      {/* Step 4: Confirmar transferência */}
      {step === 4 && (
        <View style={{ marginTop: areaSegura.top, marginHorizontal: '5%', flex: 1 }}>
          <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 8 }}>Confirmar Transferência</Text>

          <View style={{ marginBottom: 8 }}>
            <Text style={{ fontSize: 18 }}>Para:</Text>
            <View style={styles.boxFinal}>
              <Text style={{ fontSize: 18 }}>{transferencia.idRecebedor}</Text>
            </View>
          </View>

          <View style={{ marginBottom: 8 }}>
            <Text style={{ fontSize: 18 }}>Vai sair de:</Text>
            <View style={styles.boxFinal}>
              <Text style={{ fontSize: 18 }}>{transferencia.tipoContaPagador}</Text>
            </View>
          </View>

          <View style={{ marginBottom: 8 }}>
            <Text style={{ fontSize: 18 }}>Valor:</Text>
            <View style={styles.boxFinal}>
              <Text style={{ fontSize: 18 }}>{transferencia.valor}</Text>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.btn, { bottom: areaSegura.bottom }]}
            onPress={handleTransferencia}
          >
            <Text style={styles.textBtn}>Confirmar Transferência</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Step 5: Loading */}
      {step === 5 && <LoadingScreen message="Realizando Transferência..." />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Cinza,
    justifyContent: 'center'
  },
  input: {
    backgroundColor: Colors.Branco,
    marginHorizontal: '5%',
    marginTop: 18,
    height: 50,
    borderRadius: 8,
    elevation: 1,
    fontSize: 18
  },
  btn: {
    backgroundColor: Colors.Amarelo,
    paddingVertical: 14,
    marginHorizontal: '5%',
    borderRadius: 8,
    position: 'absolute',
    width: '90%'
  },
  textBtn: {
    textAlign: 'center',
    fontFamily: 'Oswald_700Bold',
    fontSize: 18
  },
  boxFinal: {
    backgroundColor: Colors.Branco,
    borderRadius: 8,
    padding: 12
  }
});
