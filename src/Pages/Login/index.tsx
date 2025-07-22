import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { Colors } from '../../Utils/Colors';
import { useState } from 'react';
import { login } from '../../Services/AuthService';

export default function Login() {

  const [ loading, setLoading ] = useState(false);
  const [ email, setEmail ] = useState('');
  const [ senha, setSenha ] = useState('');

  const handleLogin = async () => {

    try {
      setLoading(true);
      const response = await login(email, senha);
      console.log('Login realizado com sucesso:', response);
    } catch (error: any) {
      console.error('Erro ao realizar login:', error.message);
      
    }finally{
      setLoading(false);
    }
  }
  
 return (
   <View style={styles.container}>
    <Text style={{ color: Colors.Branco, fontSize: 28, marginBottom: 20, fontWeight: 'bold' }}>Faça o Login</Text>
     <TextInput placeholder="Email" style={styles.input} value={email} onChangeText={setEmail} />
     <TextInput placeholder="Senha" style={styles.input} secureTextEntry value={senha} onChangeText={setSenha} />
     <TouchableOpacity style={styles.btnSubmitLogin} onPress={handleLogin}>
       <Text style={{ color: Colors.Branco, textAlign: 'center', fontSize: 18 }}>{loading? 'Carregando...' : 'Entrar'}</Text>
     </TouchableOpacity>
     <Text style={{ color: Colors.Branco, marginTop: 20 }}>Novo por aqui? 
        <TouchableOpacity>
            <Text style={{ fontWeight: 'bold', color: Colors.Amarelo }}> Crie uma conta grátis</Text>
        </TouchableOpacity>
     </Text>
   </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.Azul
    },
    input: {
        backgroundColor: Colors.Branco,
        width: '80%',
        height: 50,
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    btnSubmitLogin:{
        backgroundColor: Colors.Verde,
        width: '80%',
        height: 50,
        justifyContent: 'center',
        borderRadius: 5,
    }
})