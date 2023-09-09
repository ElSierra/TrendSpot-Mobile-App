import { View, Text } from "react-native";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import { NavigationProp, useNavigation } from "@react-navigation/native";

export default function ServerError({ refetch }: { refetch: () => void }) {
  const navigation = useNavigation<NavigationProp<any>>();
  return (
    <View
      className="bg-shadowWhite dark:bg-darkNeutral"
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="font-bold text-xl text-darkNeutral dark:text-lightText">
        Something Went Wrong ☹️
      </Text>

      <Text className="font-semibold py-2 text-base text-center w-[90%] text-darkNeutral dark:text-lightText">
        Either this resource no longer exists or your session has expired. Try
        to sign out and sign in again, your session may have expired.
      </Text>

      <TouchableOpacity onPress={refetch}>
        <Text className="text-primaryColor dark:text-primaryColorTheme text-xl">
          Retry
        </Text>
      </TouchableOpacity>
    </View>
  );
}
