import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, BackHandler } from "react-native";

const HomeScreen = () => {
  useEffect(() => {
    const backAction = () => {
      // Prevent going back to the login screen
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <View style={styles.root}>
      <Text>Home</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 100,
  },
});

export default HomeScreen;
