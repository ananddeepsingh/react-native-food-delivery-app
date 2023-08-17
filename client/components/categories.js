import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image
} from "react-native";
import { useState, useEffect } from "react";
import { categories } from "../constants";
import { getCategories } from "../api";
import { getImageUrl } from "../sanity";

export default function Categories () {
  const [activeCategory, setActiveCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const categoriesData = categories;

  useEffect(() => {
    getCategories()
      .then((data) => setCategories(data))
  }, [])

  return <View className="mt-4">
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="overflow-visible"
      contentContainerStyle={{
        paddingHorizontal: 15
      }}
    >
      {
        categories.map(({ _id, image, name }, index) => {

          const isActive = _id === activeCategory;
          const btnClass = isActive ? ' bg-gray-600' : ' bg-gray-200';
          const textClass = isActive ? ' font-semibold text-gray-800' : ' text-gray-500';

          return <View key={index} className="flex justify-center items-center mr-6">
            <TouchableOpacity
              onPress={() => setActiveCategory(_id)}
              className={"p-1 rounded-full shadow"+ btnClass}>
              <Image
                className={"rounded-full"}
                style={{ height: 45, width: 45 }}
                source={{ uri: getImageUrl(image) }}
              />
            </TouchableOpacity>
            <Text className={"text-sm" + textClass} >{name}</Text>
          </View>
        })
      }
    </ScrollView>
  </View>
}