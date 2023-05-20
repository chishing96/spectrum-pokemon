import "react-native-gesture-handler";
import { StyleSheet, SafeAreaView } from "react-native";
import Navigation from "./src/navigation/StackNavigator";

export default function App() {
  return (
    <SafeAreaView style={styles.root}>
      <Navigation />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#F9FBFC",
  },
});
