import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";

import api from "../../services/api";
import key from "../../../key";
import Footer from "../../components/Footer";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const Background = ({ children }) => {
  return (
    <LinearGradient
      colors={["#ff4400", "#141414"]}
      style={styles.backgroundTransparent}
    >
      {children}
    </LinearGradient>
  );
};

const Search = ({ navigation }) => {
  const [genreList, setGenreList] = useState([]);
  const [valueInput, setValueInput] = useState("");

  useEffect(() => {
    async function listGender() {
      await api.get(`/genre/movie/list${key}`).then((response) => {
        setGenreList(response.data.genres);
      });
    }
    listGender();
  }, []);

  const handleSearch = ({ name, id, genreName }) => {
    navigation.navigate("ListSearch", {
      name: name,
      id: id,
      genreName: genreName,
    });

    setValueInput("");
  };

  return (
    <Background>
      <ScrollView>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <>
              <View style={StyleSheet.containerSearch}>
                <View style={styles.containerInput}>
                  <TextInput
                    style={styles.inputSearch}
                    placeholder={"Digite o nome do filme ou série"}
                    multiline={true}
                    autoCorrect={false}
                    value={valueInput}
                    onChangeText={(text) => setValueInput(text)}
                  />
                  <TouchableOpacity>
                    <Ionicons
                      name="search"
                      size={20}
                      style={styles.iconSearch}
                      onPress={() => {
                        if (!valueInput) {
                          alert("Por favor digite um nome");
                        } else {
                          handleSearch({ name: valueInput });
                        }
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.containerGenre}>
                {genreList[0] ? (
                  genreList.map((genre) => {
                    return (
                      <TouchableOpacity
                        key={genre.id}
                        style={styles.listGenre}
                        onPress={() =>
                          handleSearch({ id: genre.id, genreName: genre.name })
                        }
                      >
                        <Text style={styles.textGenre}>{genre.name}</Text>
                      </TouchableOpacity>
                    );
                  })
                ) : (
                  <View style={{ flexDirection: "row" }}>
                    <ShimmerPlaceHolder
                      visible={false}
                      style={styles.listGenreSkeleton}
                    />

                    <ShimmerPlaceHolder
                      visible={false}
                      style={styles.listGenreSkeleton}
                    />
                  </View>
                )}
              </View>

              <Footer />
            </>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </ScrollView>
    </Background>
  );
};

export default Search;

const styles = StyleSheet.create({
  containerSearch: {
    flex: 1,
  },
  backgroundTransparent: {
    flex: 1,
    width: screenWidth,
    height: screenHeight,
  },
  containerInput: {
    marginTop: 50,
    backgroundColor: "#fff",
    flexDirection: "row",
    padding: 5,
    margin: 15,
    alignItems: "center",
    borderRadius: 10,
    elevation: 3,
    zIndex: 3,
  },
  inputSearch: {
    padding: 10,
    fontSize: 17,
    width: "90%",
  },
  iconSearch: {
    color: "#ff8732",
    fontSize: 30,
  },
  containerGenre: {
    flex: 1,
    margin: 10,
    marginTop: 100,
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 50,
    height: screenHeight,
  },
  listGenre: {
    backgroundColor: "#DEDEDE",
    padding: 25,
    borderRadius: 8,
    width: "47%",
    margin: 5,
    alignItems: "center",
  },
  textGenre: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#222",
    textAlign: "center",
  },
  listGenreSkeleton: {
    width: "47%",
    height: 80,
    margin: 5,
    marginBottom: screenHeight - 200,
    borderRadius: 8,
  },
});
