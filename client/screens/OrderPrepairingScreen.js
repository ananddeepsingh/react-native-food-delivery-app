import {
  Image,
  View
} from "react-native";
import { useEffect } from 'react';
import { useNavigation } from "@react-navigation/native";

export default OrderPrepairing = () => {
  const navigate = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigate.navigate('Delivery')
    }, 3000)
  }, [])

  return (
    <View className="flex-1 bg-white justify-center items-center">
      <Image
        source={require('../assets/images/delivery.gif')}
        className="h-80 w-80"
      />
    </View>
  )
}
