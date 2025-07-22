import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../Pages/Home';
import Login from '../Pages/Login';
import EnviarTransferencia from '../Pages/EnviarTransferencia';

export type RootStackParamList = {
    Home: undefined;
    EnviarTransferencia: undefined;
}

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function StackNavigator() {
 return (
   <Stack.Navigator initialRouteName='Home' screenOptions={{ headerShown: false}} >
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='EnviarTransferencia' component={EnviarTransferencia} />
   </ Stack.Navigator>
  );
}