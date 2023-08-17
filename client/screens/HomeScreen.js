import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Icon from "react-native-feather";
import { useEffect, useState } from "react";

import { themeColors } from "../theme";

// components
import Categories from "../components/categories";
// import { featured } from "../constants";
import FeaturedRow from "../components/featuredRow";
import { getFeaturedRestaurants } from "../api";


export default function HomeScreen () {
  
  const [featuredRestaurants, setFeaturedRestaurants] = useState([]);

  useEffect(() => {
    getFeaturedRestaurants()
      .then((data) => setFeaturedRestaurants(data))
  }, [])

  return (
    <SafeAreaView className="bg-white">
      <StatusBar barStyle="dark-content" />
      <View className={`flex-row items-center space-x-2 px-4 pb-2 `}>
        <View className="flex-row flex-1 items-center p-3 rounded-full border border-gray-300">
          <Icon.Search height="25" width="25" stroke="black" />
          <TextInput placeholder="Restaurants" className="ml-2 flex-1" />
          <View className="flex-row items-center space-x-1 border-0 border-l-2 pl-2 border-l-gray-300">
            <Icon.MapPin height="20" width="20" stroke="grey" />
            <Text className="text-gray-600">New York, NYC</Text>
          </View>
        </View>
        <View style={{ backgroundColor: themeColors.bgColor(1) }} className="p-3 rounded-full">
          <Icon.Sliders height="20" width="20" strokeWidth="2.5" stroke="black" />
        </View>
      </View>

      {/* Main Wrapper */}
      <ScrollView
        showVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 20
        }}
      >
        {/* Categories */}
        <Categories />

        {/* Featured */}
        <View className="mt-5">
          {
            featuredRestaurants.map(({ name, restaurants, description }, index) => {
              return (
                <FeaturedRow
                  key={index}
                  title={name}
                  restaurants={restaurants}
                  description={description}
                />
              )
            })
          }
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  searchBar: {
    border: 1,
    borderColor: "red"
  }
})