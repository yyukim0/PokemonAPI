import React, { useState, useEffect } from 'react';
import { StyleSheet, Text} from 'react-native';
import { ActivityIndicator, Button, SafeAreaView, TextInput, View, Image } from 'react-native-web';

export default function App() {

  const [pesquisaUsuario, setPesquisaUsuario] = useState("");
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchPokemon = async () => {
    
    setLoading(true)
    setPokemon(null);
    try {
      const jsonPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${pesquisaUsuario.toLowerCase()}`);
      if (!jsonPokemon.ok) {alert('pokémon não encontrado LOL');}
      const pokemon = await jsonPokemon.json();
      setPokemon(pokemon);
    } 
    catch (e) {
      alert(e.message);
    } 
    finally { 
      setLoading(false);
    }
  }
 //não fazia ideia de como o loading era criado e dei uma olhada em como fazia o card para um pokémon
  return (
    <SafeAreaView style={styles.containerPrincipal}>
      <Text style={styles.titulo}>Busque um Pokémon</Text>
      <View style={styles.areaPesquisa}>
        <TextInput style={styles.inputPokemon} placeholder="digita um pokémon" value={pesquisaUsuario} onChangeText={setPesquisaUsuario}></TextInput>
        <Button title='buscar' onPress={fetchPokemon} color="#272e43" borderRadius="10"/>
      </View>
      {loading && <ActivityIndicator size="large" color="#272e43" />} 

      {pokemon && !loading && (
        <View style={styles.card}>
          <Image style={styles.imagem} source={{uri: pokemon.sprites.front_default}} />
          <Text style={styles.nome}>{pokemon.name.toUpperCase()}</Text>
          <Text>Peso: {pokemon.weight}kg</Text>
          <Text>Habilidade: {pokemon.abilities[0].ability.name}</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerPrincipal: {flex: 1, paddingTop: 24, backgroundColor: "#f5f4fc"},
  titulo: {fontSize: 35, fontWeight: "bold", textAlign: "center"},
  inputPokemon: {flex: 1, borderWidth: 1, borderColor: "gray", borderRadius: 8, padding: 10, backgroundColor: "white", marginTop: 30, marginLeft: 30, marginRight: 30},
  areaPesquisa: {flexDirection: "row", marginBottom: 30},
  card: {padding: 20, alignItems: "center", elevation: 5},
  imagem: {width: 150, height: 150},
  nome: {fontSize: 20, fontWeight: "bold"},
});