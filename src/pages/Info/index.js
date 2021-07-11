import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import YoutubePlayer from "react-native-youtube-iframe";
import NumberFormat from "react-number-format";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

import api from "../../services/api";
import key from "../../../key";

import ImageDefault from "../../../assets/img.png";
import Footer from "../../components/Footer";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const Info = ({ route, navigation }) => {
  const [getInfo, setGetInfo] = useState({});
  const [getTrailer, setGetTrailer] = useState([]);
  const [urlTrailer, setURLTrailer] = useState("");
  const [minutes, setMinutes] = useState(0);
  const [dateNew, setDateNew] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const handleGetApi = async () => {
      await api
        .get(`/${route.params.media}/${route.params.id}${key}`)
        .then((responde) => {
          setGetInfo(responde.data);
        });
    };

    handleGetApi();
  }, []);

  useEffect(() => {
    const handleMinute = () => {
      if (!getInfo.runtime === false) {
        setMinutes(getInfo.runtime);
      } else {
        if (!getInfo.episode_run_time === false) {
          setMinutes(getInfo.episode_run_time[0]);
        }
      }
    };

    const handleDate = () => {
      if (getInfo.release_date) {
        const dateArray = getInfo.release_date.split("-");

        setDateNew(`${dateArray[2]}/${dateArray[1]}/${dateArray[0]}`);
      } else {
        if (getInfo.first_air_date) {
          const dateArray = getInfo.first_air_date.split("-");

          setDateNew(`${dateArray[2]}/${dateArray[1]}/${dateArray[0]}`);
        }
      }
    };

    const trailer = async () => {
      await api
        .get(`https://api.themoviedb.org/3/movie/${getInfo.id}/videos${key}`)
        .then((response) => {
          setGetTrailer(response.data.results);
        });
    };

    if (Object.keys(getInfo).length > 0) {
      handleMinute();
      handleDate();
      trailer();
    }
  }, [getInfo]);

  useEffect(() => {
    if (getTrailer.length) {
      setURLTrailer(getTrailer[0].key);
    }
  }, [getTrailer]);

  return (
    <View style={styles.container}>
      <MaterialIcons
        style={styles.arrow}
        name="arrow-back-ios"
        size={20}
        color="white"
        onPress={() => navigation.goBack()}
      />

      <ScrollView style={{ flex: 1 }}>
        <View>
          {getInfo.backdrop_path ? (
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/original${getInfo.backdrop_path}`,
              }}
              style={styles.imageBack}
            />
          ) : (
            <Image source={ImageDefault} style={styles.imageBack} />
          )}

          <View style={styles.moreInfo}>
            <Text style={styles.title}>
              {getInfo.title ? getInfo.title : getInfo.name}
            </Text>
          </View>

          <LinearGradient
            colors={["transparent", "#141414"]}
            style={styles.backgroundTransparent}
          />
        </View>

        <View style={styles.containerInfo}>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w300${getInfo.poster_path}`,
            }}
            style={styles.imagePoster}
          />

          <View style={styles.containerLogo}>
            {getInfo.networks &&
              getInfo.networks.map((stream) => (
                <Image
                  resizeMode={"center"}
                  key={stream.name}
                  source={{
                    uri: `https://image.tmdb.org/t/p/w200/${stream.logo_path}`,
                  }}
                  style={styles.logo}
                />
              ))}
          </View>

          <View style={styles.overview}>
            <Text style={styles.tagline}>{getInfo.tagline}</Text>
            <Text style={styles.synopsis}>Sinopse</Text>
            <Text>{getInfo.overview}</Text>
          </View>

          <View style={styles.containerDetails}>
            <View style={styles.details}>
              {dateNew !== "" && <Text>Estreia: {dateNew}</Text>}

              {getInfo.origin_country && (
                <Text>
                  {getInfo.origin_country.length > 1
                    ? "Paises de origem: "
                    : "País de origem: "}
                  {getInfo.origin_country.map((country) => country + " ")}
                </Text>
              )}

              {getInfo.production_countries && (
                <Text>
                  {getInfo.production_countries && "Filmagens: "}
                  {getInfo.production_countries.map(
                    (country) => country.iso_3166_1 + " "
                  )}
                </Text>
              )}

              {getInfo.budget > 0 && (
                <NumberFormat
                  value={getInfo.budget}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                  renderText={(value) => <Text>Orçamento: {value}</Text>}
                />
              )}

              {getInfo.revenue > 0 && (
                <NumberFormat
                  value={getInfo.revenue}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                  renderText={(value) => <Text>Arrecadação: {value}</Text>}
                />
              )}

              {getInfo.number_of_seasons &&
                (getInfo.number_of_seasons === 1 ? (
                  <Text>{getInfo.number_of_seasons} Temporada</Text>
                ) : (
                  <Text>{getInfo.number_of_seasons} Temporadas</Text>
                ))}

              {getInfo.number_of_episodes > 1 && (
                <Text>{getInfo.number_of_episodes} episódios</Text>
              )}

              <Text>Duração: {minutes} min</Text>
            </View>
            <View>
              {urlTrailer !== "" && (
                <TouchableOpacity onPress={() => setShowModal(true)}>
                  <Text style={styles.trailer}>Tailer</Text>
                </TouchableOpacity>
              )}

              {/* {getInfo.homepage &&

                            } */}
            </View>
          </View>
        </View>

        <Footer />
      </ScrollView>

      {showModal && (
        <View style={styles.modal}>
          <View style={{ marginTop: 60 }}>
            <YoutubePlayer height={300} videoId={urlTrailer} />
            <Ionicons
              onPress={() => setShowModal(false)}
              name="close-circle-outline"
              size={65}
              color="#ff4400"
              style={styles.closeButton}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default Info;

const styles = StyleSheet.create({
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
  container: {
    flex: 1,
    backgroundColor: "#141414",
  },
  moreInfo: {
    position: "relative",
    alignSelf: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    margin: 5,
  },
  imageBack: {
    alignSelf: "center",
    width: screenWidth,
    height: 450,
  },
  backgroundTransparent: {
    position: "absolute",
    width: screenWidth,
    height: 450,
  },
  containerInfo: {
    backgroundColor: "#fff",
    margin: 30,
    flex: 1,
    borderRadius: 8,
  },
  imagePoster: {
    width: 120,
    height: 180,
    alignSelf: "center",
    margin: 8,
  },
  containerLogo: {
    width: screenWidth,
    height: 18,
    alignSelf: "center",
    marginBottom: 20,
  },
  logo: {
    margin: 3,
    width: "50%",
    height: "100%",
    alignSelf: "center",
  },
  overview: {
    fontSize: 16,
    color: "#333",
    margin: 12,
    alignItems: "center",
    textAlign: "justify",
  },
  tagline: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#0c1a60",
    marginBottom: 10,
    textAlign: "center",
  },
  synopsis: {
    fontSize: 17,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginBottom: 8,
  },
  containerDetails: {
    margin: 20,
  },
  details: {
    flexDirection: "column",
    alignSelf: "flex-start",
    marginLeft: -5,
  },
  trailer: {
    margin: 15,
    alignSelf: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: 9,
    borderColor: "#ff4400",
    borderWidth: 3,
    borderRadius: 4,
    width: 100,
    height: 50,
    fontWeight: "bold",
    fontSize: 20,
  },
  modal: {
    position: "absolute",
    width: screenWidth,
    height: "100%",
    backgroundColor: "rgba(0,0,0,.8)",
    alignSelf: "center",
    justifyContent: "center",
    zIndex: 8,
  },
  closeButton: {
    alignSelf: "center",
  },
});
