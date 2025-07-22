import { View, Animated, Easing } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useEffect, useRef } from 'react';

type propLoading = {
    size : number,
    color: string
}

export default function loadingLoop( props : propLoading ) {

    const spinValue = useRef(new Animated.Value(0)).current;


    const spin = spinValue.interpolate({
        inputRange: [0,1],
        outputRange: ['0deg', '360deg'],
    });

    useEffect(() => {
        Animated.loop(
            Animated.timing(spinValue, {
                toValue: 1,
                duration: 900,
                easing: Easing.linear,
                useNativeDriver: true
            })
        ).start();
    }, [spinValue])

 return (
   <View style={{alignItems: 'center'}}>
    <Animated.View style={{transform: [{ rotate: spin }]}} >
        <MaterialCommunityIcons name='loading' size={props.size} color={props.color} /> 
    </Animated.View>
   </View>
  );
}