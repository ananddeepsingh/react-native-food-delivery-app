import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { themeColors } from "../theme";
import RestaurantCard from "./restaurantCard";

export default function FeaturedRow ({ title, restaurants, description }) {
  return (
    <View>
      <View className="flex-row justify-between items-center px-4">
        <View>
          <Text className="font-bold text-lg">{title}</Text>
          <Text className="text-gray-500 text-xs">{description}</Text>
        </View>
        <TouchableOpacity>
          <Text style={{ color: themeColors.text }} className="font-semibold">See All</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        showHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 15
        }}
        className="overflow-visible py-5"
      >
        {
          restaurants.map((restaurant, index) => {
            return <RestaurantCard
              key={index}
              item={restaurant}
            />
          })
        }
      </ScrollView>
    </View>
  )
}