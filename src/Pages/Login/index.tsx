import { 
  View, 
  StyleSheet, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ActivityIndicator, 
  Image, 
  KeyboardAvoidingView, 
  ScrollView, 
  Platform 
} from 'react-native';
import { Colors } from '../../Utils/Colors';
import { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/auth';

export default function Login() {
  const { login } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    setLoading(true);
    if (!email || !senha) {
      console.error('Email e senha são obrigatórios');
      setLoading(false);
      return;
    }
    try {
      const response = await login(email, senha);
      console.log('Login realizado com sucesso:', response);
    } catch (error: any) {
      console.error('Erro ao realizar login:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"} // iOS: padding | Android: height
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -60}
    >
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>

          {/* Logo */}
          <View style={{ alignItems: 'center', width: '100%', flex: 1, justifyContent: 'center', borderBottomEndRadius: 150, backgroundColor: Colors.Branco}}>
            <View>
              <Image source={require('../../Assets/image-1.png')} style={{ width: 250, height: 250 }} />
            </View>
          </View>

          {/* Formulário */}
          <View style={{ alignItems: 'center', width: '100%', flex: 4, paddingTop: 40}}>
            <Text style={{ color: Colors.Branco, fontSize: 28, marginVertical: 20, fontWeight: 'bold' }}>Faça o Login</Text>

            <TextInput 
              placeholder="Email" 
              style={styles.input} 
              value={email} 
              onChangeText={setEmail} 
            />

            <TextInput 
              placeholder="Senha" 
              style={styles.input} 
              secureTextEntry 
              value={senha} 
              onChangeText={setSenha} 
            />

            {loading ? (
              <ActivityIndicator color={Colors.Amarelo} size={36} />
            ) : (
              <TouchableOpacity style={styles.btnSubmitLogin} onPress={handleLogin}>
                <Text style={{ color: Colors.Branco, textAlign: 'center', fontSize: 18 }}>Entrar</Text>
              </TouchableOpacity>
            )}

            <Text style={{ color: Colors.Branco, marginTop: 20 }}>
              Novo por aqui?
              <TouchableOpacity>
                <Text style={{ fontWeight: 'bold', color: Colors.Amarelo }}> Crie uma conta grátis</Text>
              </TouchableOpacity>
            </Text>
          </View>
        </View>
      </ScrollView>
      <View style={{ backgroundColor: Colors.Branco, height: 400, position: 'absolute', bottom: -330, borderTopStartRadius: 130, borderTopEndRadius: 130, width: '110%', alignSelf: 'center' }} >
        <Text style={{ textAlign: 'center', fontSize: 22, fontWeight: 'bold', marginTop: 20, color:Colors.Cinza }}>CloneBank©</Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Azul,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    backgroundColor: Colors.Branco,
    width: '80%',
    height: 50,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  btnSubmitLogin: {
    backgroundColor: Colors.Verde,
    width: '80%',
    height: 50,
    justifyContent: 'center',
    borderRadius: 5,
  }
});
