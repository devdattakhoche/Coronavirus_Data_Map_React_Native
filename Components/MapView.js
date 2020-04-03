
import {Title , Card , Paragraph ,} from 'react-native-paper';
import React, { Component } from 'react';
import { View, Text, Alert , StyleSheet } from 'react-native';
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
        markers : []
    };
    this.fetchdata = this.fetchdata.bind(this);
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
        cases : object.cases,
        Country : object.country 
    }
    markerarray.push(markerobject)
})
// console.log(markerarray)
this.setState({
    markers:markerarray
})
}

componentDidMount(){
    this.fetchdata()
}
  render() {
    //   console.log(this.state.markers)
        if(this.state.markers === null){
            this.fetchdata()
            console.log('went inside')
        }    
    return (
      
         <MapView
         style = {{flex:1}}
         customMapStyle={Dark}
         loadingEnabled = {true}
    
    
    onPress={ (event) => console.log(event.nativeEvent.coordinate) }
    >
    {this.state.markers.map((marker) => {
        return (
          <Marker coordinate={marker.latlng} >
            <View style={styles.marker}>
           <Text style = {{fontSize:5 , alignSelf:'center'}} >
           {((marker.Country).length > 13) ? 
    (((marker.Country).substring(0,13-3)) + '...') : 
    marker.Country }
           </Text>
              <Text style={styles.text}>{marker.cases}</Text>
            </View>
            
          </Marker>
        )
      })}
  </MapView>
    
  
      
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
      borderColor:'black',
      borderWidth:3
    },
    text: {
      color: "#FFF",
      fontWeight: "bold",
      alignContent:'center',
      alignSelf:'center',
      justifyContent:'center',
      
    }
  });