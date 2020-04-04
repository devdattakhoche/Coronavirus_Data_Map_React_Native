
import {Title , Card , Paragraph , Appbar , IconButton} from 'react-native-paper';
import React, { Component } from 'react';
import { View, Text, Alert , StyleSheet, ActivityIndicator, RefreshControl, } from 'react-native';
import  MapView  ,{ Marker , Callout } from 'react-native-maps';
import { Dark } from './MapStyles/Styles';
import axios from 'axios';


const CustomCallout = ({marker}) => {
    return (
        <View style = {{backgroundColor:'white' , borderRadius:10}}>
            <Title style = {{minWidth:80}}>
                {marker.Country}
            </Title>
        </View>
    )
}




export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
        markers : null,
        refreshing: true
    };
    this.fetchdata = this.fetchdata.bind(this);
  }
  onRefresh() {
    //Clear old data of the list
    this.setState({ markers: [] });
    //Call the Service to get the latest data
    this.fetchdata();
  }
fetchdata = async () =>{
    let mydata = null;
const Data = await axios.get('https://corona.lmao.ninja/countries').then((response) => {
console.log(response)
mydata = response.data;

}).catch(function(error){
    Alert.alert('Error',error.message)
})
let markerarray = []
mydata.map(object => {
   let  markerobject = {
        latlng : {
            'latitude' : object.countryInfo.lat,
            'longitude' : object.countryInfo.long
        },
    Cases : object.cases,
        Country : object.country ,
        Deaths : object.deaths,
        Active : object.active,
        Cpermillion : object.casesPerOneMillion,
        Dpermillion : object.deathsPerOneMillion,
        Recovered : object.recovered,
        Today_Cases : object.todayCases,
        Today_Deaths : object.todayDeaths,
        Updated : object.updated,
        Critical : object.critical,
        Country_info : object.countryInfo    
    }
    markerarray.push(markerobject)
})
// console.log(markerarray)
this.setState({
    markers:markerarray,
    refreshing: false,
    

})
}


  render() {
    if(this.state.markers === null){
        this.fetchdata()
        console.log('went inside')
    }    
    if (this.state.refreshing) {
        console.log('hehehe')
        return (
          //loading view while data is loading
          <View style={{ flex: 1, justifyContent : 'center' }}>
            <ActivityIndicator size='large' color = 'black' />
          </View>
        );
      }
     
        
    return (
      <View style = {{flex:1}}  >
      <View>
       <Appbar.Header style={{ backgroundColor: "black" }}>
              <IconButton icon="battlenet" color = 'white' />
              <Appbar.Content
                style={{ alignItems: "center" }}
                title="COVID-19"
                subtitle="Click on the marker to View Details"
              />
              <IconButton icon="reload" color = 'white' onPress = {() => console.log('hi there')}/>
            </Appbar.Header>
            </View>
         <MapView
         cacheEnabled ={true}
         style = {styles.map}
         customMapStyle={Dark}
         loadingEnabled = {true}
             
    onPress={ (event) => console.log(event.nativeEvent.coordinate) }
    >
    {this.state.markers.map((marker) => {
        return (
          <Marker coordinate={marker.latlng} tracksViewChanges={false} onPress = {() =>this.props.navigation.navigate('CityView',marker)} key = {marker.Country} >
            <View style={styles.marker}>
           <Text style = {{fontSize:8 , alignSelf:'center'}} >
           {((marker.Country).length > 13) ? 
    (((marker.Country).substring(0,13-3)) + '...') : 
    marker.Country }
           </Text>
              <Text style={styles.text}>{marker.Cases}</Text>
            </View>
            
          </Marker>
        )
      })}
  </MapView>
  </View>
  
    
  
      
    );
  }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    marker: {
      backgroundColor: "red",
      padding: 5,
      borderRadius: 10,
      shadowOpacity:1,
      borderWidth:3,
      elevation:4,
    shadowRadius: 15,
    
    },
    text: {
      color: "#FFF",
      fontWeight: "bold",
      alignContent:'center',
      alignSelf:'center',
      justifyContent:'center',
      
    },
    map: {
        ...StyleSheet.absoluteFillObject,
      },
  });