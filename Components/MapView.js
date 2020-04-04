import { Appbar, IconButton } from "react-native-paper";
import React, { Component } from "react";
import {
  View,
  Text,
  Alert,
  StyleSheet,
  ActivityIndicator,
  RefreshControl
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Dark } from "./MapStyles/Styles";
import axios from "axios";

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: null,
      refreshing: true
    };
    this.fetchdata = this.fetchdata.bind(this);
  }

  fetchdata = async () => {
    let mydata = null;
    await axios
      .get("https://corona.lmao.ninja/countries")
      .then(response => {
        mydata = response.data;
      })
      .catch(function(error) {
        Alert.alert("Error", error.message);
      });
    let markerarray = [];
    mydata.map(object => {
      let markerobject = {
        latlng: {
          latitude: object.countryInfo.lat,
          longitude: object.countryInfo.long
        },
        Cases: object.cases,
        Country: object.country,
        Deaths: object.deaths,
        Active: object.active,
        Cpermillion: object.casesPerOneMillion,
        Dpermillion: object.deathsPerOneMillion,
        Recovered: object.recovered,
        Today_Cases: object.todayCases,
        Today_Deaths: object.todayDeaths,
        Updated: object.updated,
        Critical: object.critical,
        Country_info: object.countryInfo
      };
      markerarray.push(markerobject);
    });

    this.setState({
      markers: markerarray.slice(1),
      refreshing: false
    });
  };

  render() {
    if (this.state.markers === null) {
      this.fetchdata();
    }
    if (this.state.refreshing) {
      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator size="large" color="black" />
        </View>
      );
    }

    return (
      <View style={{ flex: 1 }}>
        <View>
          <Appbar.Header style={{ backgroundColor: "black" }}>
            <IconButton icon="battlenet" color="white" />
            <Appbar.Content
              style={{ alignItems: "center" }}
              title="COVID-19"
              subtitle="Click on the marker to View Details"
            />
            <IconButton icon="map" color="white" />
          </Appbar.Header>
        </View>
        <MapView
          cacheEnabled={true}
          style={styles.map}
          customMapStyle={Dark}
          loadingEnabled={true}
        >
          {this.state.markers.map(marker => {
            return (
              <Marker
                coordinate={marker.latlng}
                tracksViewChanges={false}
                onPress={() =>
                  this.props.navigation.navigate("CityView", marker)
                }
                key={marker.Country}
              >
                <View style={styles.marker}>
                  <Text style={{ fontSize: 8, alignSelf: "center" }}>
                    {marker.Country.length > 13
                      ? marker.Country.substring(0, 13 - 3) + "..."
                      : marker.Country}
                  </Text>
                  <Text style={styles.text}>{marker.Cases}</Text>
                </View>
              </Marker>
            );
          })}
        </MapView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  marker: {
    backgroundColor: "red",
    padding: 5,
    borderRadius: 10,
    shadowOpacity: 1,
    borderWidth: 3,
    elevation: 4,
    shadowRadius: 15
  },
  text: {
    color: "#FFF",
    fontWeight: "bold",
    alignContent: "center",
    alignSelf: "center",
    justifyContent: "center"
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
});
