import { useEffect, useRef } from 'react';
import { View, Animated, Dimensions  } from 'react-native';
import { Colors } from '../Utils/Colors';

type Props = {
    width: any,
    height: any
}

const { width } = Dimensions.get('window');

export default function Skeleton(props : Props) {

    const x = useRef(new Animated.Value(0)).current

    useEffect(() => {
        Animated.loop(Animated.timing(x, {
            toValue: 1,
            useNativeDriver: true,
            duration: 1500
        })).start();
    }, [])

 return (
   <View>
        <View style={{width: props.width, height: props.height, backgroundColor: Colors.Branco, borderRadius: 8, marginBottom: 10, overflow: 'hidden'}}>
            <Animated.View style={{height: '100%', width: 60, backgroundColor: Colors.Cinza, 
                transform: [
                    {
                        translateX: x.interpolate({
                            inputRange: [0, 1],
                            outputRange: [-width, width]
                        })
                    }
                ]}} />
        </View>
   </View>
  );
}