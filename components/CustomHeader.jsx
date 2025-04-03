import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";

export default function CustomHeader() {
  const navigation = useNavigation(); // Access drawer navigation

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => router.navigate('/')}>
      <Image source={require("../assets/images/react-logo.png")} style={styles.logo} />
      </TouchableOpacity>

      {/* Menu Button */}
      <TouchableOpacity onPress={() => router.navigate('/')}>
        <MaterialIcons name="menu" size={28} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#fff",
    elevation: 3, // Shadow for Android
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  logo: { width: 50, height: 50, resizeMode: "contain" },
});
