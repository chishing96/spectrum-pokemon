import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedin, setIsLoggedIn] = useState(false);
  const navigation = useNavigation();

  const handleLoginPress = () => {
    //validate user
    const mockUsername = "testuser";
    const mockPassword = "password";
    if (username === mockUsername && password === mockPassword) {
      //or if server response === 200.
      setIsLoggedIn(true);
      console.warn("Login success.");
      //use secured libraries to store tokens.
      //expo-secure-store, react-native-encrypted-storage, react-native-keychain, react-native-sensitive-info.
      navigation.navigate("Home");
    } else {
      // depending on the response e.g. 400, 401, 403.
      console.warn("Invalid username or password.");
    }
    //additionally, in real world applications, authentication will perform to the server and will wait for response.
  };

  return (
    <View style={styles.root}>
      <Text>Spectrum One - Pokedex Assignment for Kent Wan</Text>
      <Text>Credentials = testuser : password</Text>
      <CustomInput
        placeholder="Username"
        value={username}
        setValue={setUsername}
      />
      <CustomInput
        placeholder="Password"
        value={password}
        setValue={setPassword}
        secureTextEntry
      />
      <CustomButton text="Login" onPress={handleLoginPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 100,
  },
});

export default LoginScreen;
