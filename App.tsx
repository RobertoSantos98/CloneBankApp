import React, { useContext, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import StackNavigator from './src/navigation/StackNavigator';
import Login from './src/Pages/Login';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts as useOswald, Oswald_400Regular, Oswald_700Bold } from '@expo-google-fonts/oswald';

import { Text, View } from 'react-native';
import AuthProvider from './src/contexts/auth';
import { AuthContext } from './src/contexts/auth';

function Routes(){
  const { user } = useContext(AuthContext);
  return user ? <StackNavigator /> : <Login />;
}

export default function App() {

  const [loading, setLoading] = useState(true);
  const [oswaldLoaded] = useOswald({ Oswald_400Regular, Oswald_700Bold });

  if (!oswaldLoaded) {
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
        <AuthProvider>
          <Routes/>
        </AuthProvider>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}

