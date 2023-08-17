import { Image, Text, TouchableOpacity, View } from "react-native"
import { themeColors } from "../theme"

import * as Icon from "react-native-feather";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  getCartItemsById,
  removeFromCart
} from "../slice/cartSlice";
import { getImageUrl } from "../sanity";

// export const DishRow = ({ item }) => {
export const DishRow = ({ name, description, id, price, image }) => {

  const dispatch = useDispatch();

  const totalItems = useSelector((state) => getCartItemsById(state, id))

  const handleIncrease = () => dispatch(addToCart({ id, name, price, image, description }));;
  const handleDecrease = () => {
    dispatch(removeFromCart({ id }))
  };

  return (
    <View
      className="flex-row item-center bg-white p-3 rounded-3xl shadow-2xl mb-3 mx-2"
      style={{
        shadowColor: themeColors.bgColor(0.7),
        shadowRadius: 7
      }}
    >
      <Image
        className="rounded-3xl" style={{ height: 100, width: 100 }}
        source={{ uri: getImageUrl(image) }}
      />
      {/* Dish Name */}
      <View className="flex flex-1 space-y-3">
        <View className="pl-3">
          <Text className="text-xl">{name}</Text>
          <Text className="text-gray-700">{description}</Text>
          <Text className="text-gray-700 text-sm ">{id}</Text>

        </View>

        {/* Dish Price */}
        <View className="flex-row justify-between pl-3 items-center">
          <Text className="text-gray-700 text-lg font-bold">${price} </Text>

          {/* Plus and Minus button to add order */}
          <View className="flex-row items-center">
            <TouchableOpacity
              disabled={!totalItems.length}
              onPress={handleDecrease}
              className="p-1 rounded-full"
              style={{
                backgroundColor: themeColors.bgColor(1),
              }}
            >
              <Icon.Minus strokeWidth={2} height={20} width={20} stroke={'white'} />
            </TouchableOpacity>
            <Text className="px-3">{totalItems?.length}</Text>
            <TouchableOpacity
              onPress={handleIncrease}
              className="p-1 rounded-full"
              style={{
                backgroundColor: themeColors.bgColor(1),
              }}
            >
              <Icon.Plus strokeWidth={2} height={20} width={20} stroke={'white'} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}