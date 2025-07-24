import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import StackNavigator from './src/navigation/StackNavigator';
import Login from './src/Pages/Login';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts as useOswald, Oswald_400Regular, Oswald_700Bold } from '@expo-google-fonts/oswald';

import { Text, View } from 'react-native';

export default function App() {

  const [ loading, setLoading ] = useState(true);
  const [ logado, setLogado ] = useState(false);
  const [oswaldLoaded] = useOswald({ Oswald_400Regular, Oswald_700Bold});
 
    if(!oswaldLoaded){
      return (
        <View>
          <Text>Carregando...</Text> 
        </View>
      )
    } 

    

  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <StatusBar style="auto" />
        {logado ? <StackNavigator /> : <Login setLogado={setLogado} />}
      </SafeAreaProvider>
    </NavigationContainer>
  );
}

