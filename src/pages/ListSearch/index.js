import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import api from "../../services/api";
import key from "../../../key";

import ListOfProductions from "../../components/ListOfProductions";
import Footer from "../../components/Footer";

const ListSearch = ({ route, navigation }) => {
  const [searchList, setSearchList] = useState([]);
  const [genreList, setGenreList] = useState([]);
  const [newList, setNewList] = useState([]);

  const name = route.params.name;
  const genreName = route.params.genreName;
  const id = route.params.id;

  useEffect(() => {
    if (name) {
      const findout = async () => {
        await api.get(`/search/multi${key}&query=${name}`).then((response) => {
          setSearchList(response.data.results);
        });
      };

      findout();
    }
  }, [name]);

  useEffect(() => {
    if (genreName) {
      const findout = async () => {
        await api
          .get(`/discover/movie${key}&with_genres=${id}`)
          .then((response) => {
            setGenreList(response.data.results);
          });
      };

      findout();
    }
  }, [genreName]);

  useEffect(() => {
    const addMedia = () => {
      const newList =
        genreList &&
        genreList.map((list) => ({
          ...list,
          media_type: "movie",
        }));

      setNewList(newList);
    };

    addMedia();
  }, [genreList]);

  return (
    <View style={styles.container}>
      <MaterialIcons
        style={styles.arrow}
        name="arrow-back-ios"
        size={20}
        color="white"
        onPress={() => navigation.goBack()}
      />

      <ScrollView>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <View
            style={{
              width: 250,
              height: 100,
              justifyContent: "flex-end",
              alignSelf: "center",
            }}
          >
            <Text style={styles.title}>
              {name ? `Pesquisa por "${name}"` : `Filtro por "${genreName}"`}
            </Text>
          </View>

          {searchList && (
            <ListOfProductions listSlide={searchList} navigation={navigation} />
          )}

          {newList && (
            <ListOfProductions listSlide={newList} navigation={navigation} />
          )}

          <Footer />
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

export default ListSearch;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141414",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#999",
    alignSelf: "center",
    textAlign: "center",
    width: "80%",
  },
  arrow: {
    padding: 10,
    backgroundColor: "#ff8732",
    width: "15%",
    borderRadius: 30,
    position: "absolute",
    zIndex: 5,
    marginTop: 40,
    marginLeft: 10,
  },
});
