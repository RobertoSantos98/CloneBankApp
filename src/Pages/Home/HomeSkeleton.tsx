import { View, StyleSheet, Text, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { Colors } from '../../Utils/Colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';


import Skeleton from '../../components/Skeleton';

export default function HomeSkeleton( ) {
    const areaSegura = useSafeAreaInsets();

 return(
   <View style={styles.container}>
        <View style={styles.headerTitle}>
            <View style={{marginTop: areaSegura.top, flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10}}>
                <Text style={{ fontFamily: 'Oswald_700Bold' , fontWeight: 'bold', color: Colors.Azul, fontSize: 20}}>Bem-Vindo, </Text>
                <Skeleton width={200} height={20} />
            </View>
            <TouchableOpacity style={{marginTop: areaSegura.top, paddingVertical: 10}}>
                <MaterialCommunityIcons name='bell-outline' size={28} color={Colors.Azul} />
            </TouchableOpacity>

        </View>

        <View style={styles.headerBox}>
            <View style={{marginTop: 10}}>
                <View>
                    <Skeleton width={200} height={16} />
                    <Skeleton width={200} height={16} />
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                    <Text style={{color: Colors.Branco, fontWeight: 'bold'}}>R$: </Text>
                    <Skeleton width={100} height={28} />
                </View>
            </View>
        </View>

        <View style={{marginTop: '20%', marginHorizontal: '5%'}}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} >

                        <TouchableOpacity style={styles.optionsMenu} >
                            <MaterialCommunityIcons name="cash-refund" size={42} color={Colors.Verde} />
                            <Text style={{textAlign: 'center', padding: 5}}>Enviar Transferência</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.optionsMenu}>
                            <MaterialCommunityIcons name="history" size={42} color={Colors.Verde} />
                            <Text style={{textAlign: 'center', padding: 5}}>Histórico de Transações</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.optionsMenu}>
                            <MaterialCommunityIcons name="pillar" size={42} color={Colors.Verde} />
                            <Text style={{textAlign: 'center', padding: 5}}>Gerenciar Contas</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity style={styles.optionsMenu}>
                            <MaterialCommunityIcons name="account-question" size={42} color={Colors.Verde} />
                            <Text style={{textAlign: 'center', padding: 5}}>Precisa de Ajuda?</Text>
                        </TouchableOpacity>

                    </ScrollView>

        </View>

        <View style={{marginTop: '10%', marginHorizontal: '5%', gap: 8}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <Text>Transferências Recebidas no último mês</Text>
                <TouchableOpacity>
                    <Text style={{color: Colors.Azul}}>Ver Todas</Text>
                </TouchableOpacity>
            </View>

            <Skeleton width={'100%'} height={70} />
            <Skeleton width={'100%'} height={70} />
            <Skeleton width={'100%'} height={70} />

        </View>

        <View style={{marginHorizontal: '5%', marginTop: 20, justifyContent: 'center'}}>
            <Skeleton width={'100%'} height={150} />

        </View>


        {/* <View style={{marginHorizontal: '5%', backgroundColor: Colors.Branco, paddingVertical: 10, borderRadius: 8}}>
            <Text style={{marginHorizontal: '5%'}}>Limite de Crédito Especial:</Text>
                <View style={{marginVertical: 30, alignItems: 'center', flexDirection: 'row', justifyContent: 'center'}}>
                    <Text style={{fontSize: 14, color: '#b5b5b5b5', textAlign: 'center'}}>R$ </Text>
                    <Text style={{textAlign: 'center', fontSize: 32, fontWeight: 'bold'}}>27.000</Text>
                </View>
        </View> */}



    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.Cinza
    },
    headerBox:{
        backgroundColor: Colors.Azul,
        width: '90%',
        height: 150,
        marginHorizontal: '5%',
        padding: 20,
        borderRadius: 8,
        position: 'absolute',
        top: '10%',
    },
    headerTitle:{
        backgroundColor: Colors.Amarelo,
        height: '20%',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: '5%',
    },
    optionsMenu:{
        backgroundColor: Colors.Branco,
        borderRadius: 8,
        width: 110,
        height: 110,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

const renderItem = (item: any) => {
    return (
        <TouchableOpacity style={{ padding: 12, backgroundColor: Colors.Branco, borderRadius: 8, marginBottom: 10, elevation: 0.5 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ flex: 1 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.FirstName}</Text>
                    <Text style={{fontSize: 18 }}>R$: {item.valor.toFixed(2)}</Text>
                    <Text style={{ color: '#b5b5b5b5'}} >{item.contaDestino}</Text>
                </View>
                <View>
                    <MaterialCommunityIcons name='arrow-right-thin-circle-outline' size={36} color={Colors.Verde} />
                </View>
            </View>
        </TouchableOpacity>
    );
}