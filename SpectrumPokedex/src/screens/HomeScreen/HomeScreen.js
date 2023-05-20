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
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);

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
        `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=10`
      );
      const data = response.data.results;
      setPokemonList((prevList) => [...prevList, ...data]);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching Pokemon list:", error);
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    setOffset((prevOffset) => prevOffset + 10);
  };

  const renderFooter = () => {
    if (!loading) return null;
    return <ActivityIndicator size="large" color="blue" />;
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
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
      />
      <Button title="Load More" onPress={handleLoadMore} disabled={loading} />
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
});

export default HomeScreen;
