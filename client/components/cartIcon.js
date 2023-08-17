import {
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import { themeColors } from "../theme"
import { useNavigation } from "@react-navigation/native"
import { useSelector } from "react-redux"
import {
  getCartItems,
  getCartTotal
} from "../slice/cartSlice"

export default CartIcon = () => {
  const navigation = useNavigation()
  const cartItems = useSelector(getCartItems);
  const cartTotal = useSelector(getCartTotal);
  const cartLength = cartItems?.length;

  if (!cartLength) return;

  return (
    <View className="absolute bottom-5 w-full z-50">
      <TouchableOpacity
        style={{ backgroundColor: themeColors.bgColor(1) }}
        className="flex-row justify-between items-center mx-5 rounded-full p-4 py-3 shadow-lg"
        onPress={()=>navigation.navigate("Cart")}
      >
        <View
          className="p-2 px-4 rounded-full"
          style={{ backgroundColor: "rgba(255,255,255,0.3)" }}
        >
          <Text className="font-extrabold text-white text-lg">{cartLength}</Text>
        </View>
        <Text className="flex-1 text-center font-extrabold text-white text-lg">View Cart</Text>
        <Text className="font-extrabold text-white text-lg">${cartTotal}</Text>
      </TouchableOpacity>
    </View>
  )
}