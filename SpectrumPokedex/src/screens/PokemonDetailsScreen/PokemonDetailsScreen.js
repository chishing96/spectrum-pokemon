import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import axios from "axios";

const PokemonDetailsScreen = ({ route }) => {
  const { url } = route.params;
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPokemonDetails();
  }, []);

  const fetchPokemonDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(url);
      const data = response.data;
      setPokemonDetails(data);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching Pokemon details:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  if (!pokemonDetails) {
    return (
      <View style={styles.container}>
        <Text>Error retrieving Pokemon details.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{pokemonDetails.name.toUpperCase()}</Text>
      <Text style={styles.label}>Abilities:</Text>
      {pokemonDetails.abilities.map((ability) => (
        <Text key={ability.ability.name} style={styles.ability}>
          {ability.ability.name}
        </Text>
      ))}
      <Text style={styles.label}>
        Base Experience: {pokemonDetails.base_experience}
      </Text>
      <Text style={styles.label}>Height: {pokemonDetails.height}</Text>
      <Text style={styles.label}>Weight: {pokemonDetails.weight}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f5f5f5",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  ability: {
    fontSize: 16,
    marginLeft: 10,
  },
});

export default PokemonDetailsScreen;
