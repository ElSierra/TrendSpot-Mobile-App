import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { useQuery } from "@tanstack/react-query";
import Loader from "../loader";
import { ExternalNewsI } from "../../types/news";
import { formatTimeAgo } from "../../helpers";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import ServerError from "../custom_news/server_error";
import { httpRequest } from "../../services";

export default function ExternalNews() {
  const navigation = useNavigation<NavigationProp<any>>();

  const queryFn = async function () {
    return httpRequest.get("/news/external-news").then((response) => {
      return response.data.news;
    });
  };

  const { data, isLoading, error, refetch } = useQuery<ExternalNewsI[]>(
    [`externalNews`],
    queryFn,
    {
      staleTime: 60000,
      refetchOnWindowFocus: false,
    }
  );

  if (isLoading) return <Loader />;
  if (error) return <ServerError refetch={refetch} />;

  const news = data?.filter(
    (currNews) => currNews.content !== null && currNews.description !== null
  );

  return (
    <View className="pt-8 mx-3">
      <View className="flex-row justify-between items-center mb-3">
        <Text
          style={{ fontFamily: "rubikSB" }}
          className="text-darkNeutral dark:text-lightText font-bold text-center text-[19px]"
        >
          External News
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("ExploreExternalNews")}
        ></TouchableOpacity>
      </View>
      <FlatList
        keyExtractor={(news) => news.title + Math.random()}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={news?.slice(0, 4)}
        renderItem={({ item: news }) => (
          <TouchableOpacity
            className="mr-1 bg-white dark:bg-darkCard border border-gray-200 dark:border-lightBorder shadow-sm overflow-hidden rounded-lg mt-3"
            onPress={() => navigation.navigate("ExternalNewsDetails", { news })}
          >
            <View>
              <Image
                source={{ uri: news.urlToImage }}
                className="h-60 w-full relative bg-primaryColorDisabled object-cover"
              />
              <View
                className="absolute top-3 left-2 rounded-lg"
                style={{ backgroundColor: "rgba(0,0,0,.7)" }}
              >
                <Text
                  style={{ fontFamily: "rubikSB" }}
                  className="text-white p-2 font-semibold text-sm"
                >
                  {news.source.name}
                </Text>
              </View>
              <View
                className="absolute bottom-[70px] right-2 rounded-lg"
                style={{ backgroundColor: "rgba(0,0,0,.7)" }}
              >
                <Text
                  style={{ fontFamily: "rubikSB" }}
                  className="text-white p-2 font-semibold text-sm"
                >
                  {formatTimeAgo(news.publishedAt)}
                </Text>
              </View>
              <Text
                style={{ fontFamily: "rubikMD" }}
                className="w-80 font-semibold text-base mt-2 p-2 leading-5 text-darkNeutral dark:text-lightText"
              >
                {news.title.length > 50
                  ? `${news.title.slice(0, 50)}...`
                  : news.title}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
