import { useNavigation, useRoute } from "@react-navigation/native";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity
} from "react-native";
import { useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Icon from "react-native-feather";
import { StatusBar } from "expo-status-bar";

// Database
import { getImageUrl } from "../sanity";

// Theme
import { themeColors } from "../theme";

// Components
import { DishRow } from "../components/dishRow";
import CartIcon from "../components/cartIcon";

// Redux
import { getRestaurant, setRestaurant } from "../slice/restaurantSlice";


export default function RestaurantScreen () {
  const navigation = useNavigation();
  const resturant = useSelector(getRestaurant);
  const dispatch = useDispatch();
  const { params: {
    id,
    name,
    image,
    stars,
    type,
    reviews,
    address,
    description,
    dishes,
    lng,
    lat
  } } = useRoute();

  useEffect(() => {
    if (resturant && resturant._id) {
      dispatch(setRestaurant({ ...resturant }))
    }
  }, [])

  return (
    <View>
      <CartIcon />
      <StatusBar style="light" />
      <ScrollView>
        <View className="relative">
          <Image
            className="w-full h-72"
            source={{ uri: getImageUrl(image) }}
          />
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="absolute top-14 left-4 bg-gray-50 p-2 rounded-full shadow"
          >
            <Icon.ArrowLeft
              strokeWidth={3}
              stroke={themeColors.bgColor(1)}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{ borderTopLeftRadius: 40, borderTopRightRadius: 40 }}
          className="bg-white -mt-12 pt-6"
        >
          <View className="px-5">
            <Text className="text-3xl font-bold">{name}</Text>
            <View className="flex-row space-x-2 my-1">
              <View className="flex-row items-center space-x-1">
                <Image source={require('../assets/images/fullStar.png')} className="h-4 w-4" />
                <Text className="text-xs">
                  <Text className="text-green-700">{stars}</Text>
                  <Text className="text-green-700">
                    ({reviews} review) . <Text className="font-semibold">{type?.type?.name}</Text>
                  </Text>
                </Text>
              </View>
              <View className="flex-row items-center space-x-1">
                <Icon.MapPin color="gray" width="15" height="15" />
                <Text className="text-gray-700 text-xs"> Nearby {address}</Text>
              </View>
            </View>
            <Text className="text-gray-500 mt-2">{description}</Text>
          </View>
        </View>

        {/* Menu */}
        <View className="pb-36 bg-white">
          <Text className="px-4 py-4 text-2xl font-bold">Menu</Text>

          {/* Dishes */}
          {
            dishes.map((dish) => <DishRow
              key={dish._id}
              id={dish._id}
              name={dish.name}
              description={dish.description}
              price={dish.price}
              image={dish.image}
            />)
          }
        </View>
      </ScrollView>
    </View>
  )
}