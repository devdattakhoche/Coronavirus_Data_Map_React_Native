import { Appbar, IconButton , Switch } from "react-native-paper";
import React, { Component } from "react";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {
  View,
  Text,
  Alert,
  StyleSheet,
  ActivityIndicator,
  RefreshControl
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Dark , Light} from "./MapStyles/Styles";
import axios from "axios";

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: null,
      refreshing: true,
      unique  : 0,
      isEnabled : true
    };
    this.fetchdata = this.fetchdata.bind(this);
    this.handleChange = this.handleChange.bind(this);
    
   
  }

  fetchdata = () => {
    let mydata = null;
     axios
      .get("https://corona.lmao.ninja/v2/countries")
      .then(response => {
        mydata = response.data;
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
      markers: markerarray,
      refreshing: false
    });
      })
      .catch(function(error) {
        Alert.alert("Error", error.message);
      });
    
  };
  handleChange = () =>{
    if(this.state.isEnabled){
      this.setState({
        isEnabled:false
      })
      
      
    }
    else{
      this.setState({
        isEnabled:true
      })
    }
  }
  
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
    

    // this.props.navigation.addListener('focus', () => {
    //   this.setState({
    //     unique: this.state.unique + 1
    //   })
    //   console.log(this.state.unique)
    // });
   
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
            <Icon name = "weather-sunny" color = "white" size = {20}/>
            <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={this.state.isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange= {this.handleChange}
        value={this.state.isEnabled}
      />
          </Appbar.Header>
        </View>
        <MapView
          
          style={styles.map}
          initialRegion={{
      latitude: 20.5937,
      longitude: 78.9629,
      latitudeDelta: 100,
      longitudeDelta: 100,
    }}
          customMapStyle={this.state.isEnabled ? Dark : Light}
          
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
                  <Text style={styles.text}>{' '+marker.Cases+' '}</Text>
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
    elevation: 20,
    shadowRadius: 15
  },
  text: {
    color: "#FFF",
    fontWeight: "bold",
    alignContent: "center",
    alignSelf: "center",
    justifyContent: "center",
    fontFamily:'Roboto'
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
});
