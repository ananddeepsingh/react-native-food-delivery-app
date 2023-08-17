import {
  Image,
  Text,
  View,
  TouchableWithoutFeedback,
} from "react-native"
import { themeColors } from "../theme";
import { useNavigation } from "@react-navigation/native";
import * as Icon from "react-native-feather";
import { getImageUrl } from "../sanity";

export default RestaurantCard = ({ item }) => {
  const {
    image,
    name,
    stars,
    reviews,
    address,
    type
  } = item;

  const navigation = useNavigation()

  return <TouchableWithoutFeedback
    onPress={() => navigation.navigate("Restaurant", { ...item })}
  >
    <View
      style={{
        shadowColor: themeColors.bgColor(0.7),
        shadowRadius: 7
      }}
      className="mr-6 mb-4 bg-white rounded-3xl shadow-lg">
      <Image
        className="h-36 w-64 rounded-t-3xl"
        source={{ uri: getImageUrl(image) }}
      />
      <View className="px-3 pb-4 space-y-2">
        <Text className="text-lg font-bold pt-2">{name}</Text>
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
    </View>
  </TouchableWithoutFeedback>
}