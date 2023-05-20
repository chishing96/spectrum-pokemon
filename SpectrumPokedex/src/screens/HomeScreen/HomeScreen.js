import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  Image,
  Text,
  Button,
  ActivityIndicator,
  BackHandler,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    fetchPokemon();
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

  const fetchPokemon = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=20"
      );
      const data = response.data.results;
      setPokemonList((prevList) => [...prevList, ...data]);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching Pokemon list:", error);
      setLoading(false);
      // Handle the error, e.g., show an error message to the user
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    setOffset(0);
    setPokemonList([]);
    try {
      await fetchPokemon();
    } catch (error) {
      console.log("Error refreshing Pokemon list:", error);
      // Handle the error, show an error message, etc.
    } finally {
      setRefreshing(false);
    }
  };

  const handleLoadMore = async () => {
    if (isLoadingMore) {
      return; // Prevent multiple simultaneous requests
    }

    setIsLoadingMore(true);
    try {
      const newOffset = offset + 20;
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${newOffset}`
      );
      const data = response.data.results;
      setPokemonList((prevList) => [...prevList, ...data]);
      setOffset(newOffset);
    } catch (error) {
      console.log("Error loading more Pokemon:", error);
    }
    setIsLoadingMore(false);
  };

  const renderFooter = () => {
    if (!isLoadingMore) {
      return null;
    }

    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  };

  const handleItemPress = (url) => {
    navigation.navigate("PokemonDetails", { url });
  };

  const renderItem = ({ item, index }) => {
    const pokemonNumber = index + 1;
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => handleItemPress(item.url)}
      >
        <View style={styles.numberContainer}>
          <Text style={styles.numberText}>{pokemonNumber}</Text>
        </View>
        <Image
          source={{
            uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonNumber}.png`,
          }}
          style={styles.itemImage}
        />
        <Text style={styles.itemName}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.root}>
      <FlatList
        data={pokemonList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListFooterComponent={renderFooter}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      />
      <TouchableOpacity style={styles.loadMoreButton} onPress={handleLoadMore}>
        <Text style={styles.loadMoreButtonText}>Load More</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f5f5f5",
  },
  listContainer: {
    paddingBottom: 10,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  itemName: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  loadMoreButton: {
    backgroundColor: "#89CFF0",
    borderRadius: 8,
    padding: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  loadMoreButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default HomeScreen;
