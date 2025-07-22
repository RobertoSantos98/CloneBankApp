import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { Colors } from '../Utils/Colors';

type Props = {
    message: string
}

export default function LoadingScreen( props: Props) {
 return (
   <View style={styles.constainer}>
        <ActivityIndicator size={120} color={Colors.Amarelo}/>
        <Text style={styles.txt}>{props.message}</Text>
   </View>
  );
}

const styles = StyleSheet.create({
    constainer: {
        flex: 1,
        backgroundColor: Colors.Azul,
        justifyContent: 'center',
        alignItems: 'center',
        gap: '10%'
    },
    txt: {
        color: Colors.Branco,
        fontSize: 24,
        fontWeight: 'bold'
    }
})