import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native"
import { useDispatch, useSelector } from "react-redux";
import * as Icon from "react-native-feather";
import { useNavigation } from "@react-navigation/native";
import { themeColors } from "../theme";

// Slices = data from state
import { getRestaurant } from "../slice/restaurantSlice";
import {
  getCartItems,
  getCartTotal,
  removeFromCart
} from "../slice/cartSlice";
import { useEffect, useMemo, useState } from "react";
import { getImageUrl } from "../sanity";



export default CartScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [groupedItems, setGroupedItems] = useState({})
  const restaurant = useSelector(getRestaurant);
  const cartItems = useSelector(getCartItems);
  const cartTotal = useSelector(getCartTotal);
  const deliveryFee = 2;

  useMemo(() => {
    const gItems = cartItems.reduce((group, item) => {
      if (group[item._id]) {
        group[item._id].push(item);
      } else {
        group[item._id] = [item];
      }
      return group;
    }, {})
    setGroupedItems(gItems);
  }, [cartItems])

  return (
    <View className="bg-white flex-1">
      {/* back button */}
      <View className="relative py-4 shadow-sm">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ backgroundColor: themeColors.bgColor(1) }}
          className="absolute z-10 top-5 left-2 p-1 rounded-full shadow"
        >
          <Icon.ArrowLeft
            strokeWidth={3}
            stroke={"white"}
          />
        </TouchableOpacity>
        <View>
          <Text className="text-center font-bold tex-xl">Your Cart</Text>
          <Text className="text-center text-gray-500">{restaurant.name}</Text>
        </View>
      </View>

      {/* delivery time */}
      <View
        style={{ backgroundColor: themeColors.bgColor(0.2) }}
        className="flex-row px-4 items-center">

        <Image
          source={require('../assets/images/bikeGuy.png')}
          className="h-20 w-20 rounded-full"
        />
        <Text className="flex-1 pl-4">Delivery in 20-30 mintues </Text>
        <TouchableOpacity>
          <Text className="font-bold" style={{ color: themeColors.text }}>Change</Text>
        </TouchableOpacity>
      </View>

      {/* dishes */}
      <ScrollView
        showVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 50
        }}
        className="bg-white pt-5"
      >
        {
          Object.entries(groupedItems).map(([key, items]) => {
            return <View
              key={key}
              className="flex-row items-center space-x-3 py-2 px-4 bg-white rounded-3xl mx-2 mb-3 shadow-md"
            >
              <Text className="font-bold" style={{ color: themeColors.text }}> {items.length} x</Text>
              <Image className="h-14 w-14 rounded-full" source={{ uri: getImageUrl(items[0].image) }} />
              <Text className="font-bold flex-1 text-gray-700">{items[0].name}</Text>
              <Text className="font-semibold text-base">${items[0].price}</Text>
              <TouchableOpacity
                onPress={() => dispatch(removeFromCart({ id: items[0]._id }))}
                className="p-1 rounded-full"
                style={{ backgroundColor: themeColors.bgColor(1) }}
              >
                <Icon.Minus stroke="white" strokeWidth={2} width={20} height={20} />
              </TouchableOpacity>
            </View>
          })
        }
      </ScrollView>

      {/* total */}
      <View
        className="p-6 px-8 rounded-t-3xl space-y-4"
        style={{ backgroundColor: themeColors.bgColor(0.2) }}
      >
        <View className="flex-row justify-between">
          <Text className="text-gray-700">Subtotal</Text>
          <Text className="text-gray-700">${cartTotal}</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-gray-700">Delivery Fee</Text>
          <Text className="text-gray-700">${deliveryFee}</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-gray-700 font-extrabold">Order Total</Text>
          <Text className="text-gray-700 font-extrabold">${cartTotal + deliveryFee}</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('OrderPrepairing')}
          style={{ backgroundColor: themeColors.bgColor(1) }}
          className="p-3 rounded-full"
        >
          <Text className="text-white text-center font-bold text-lg">Place Order</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}