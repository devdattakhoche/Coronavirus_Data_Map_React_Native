import React from 'react'
import { View  , Alert , StyleSheet , ActivityIndicator} from 'react-native'

import {
   
   
   Title,
   
   Appbar,
   Avatar,
   
   IconButton,
   Subheading,
   Card,
   Button
 } from "react-native-paper";
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';

class  Home extends React.Component  {
    
    fetchData = async () =>{
        let mydata = null;
const Data = await axios.get('https://corona.lmao.ninja/countries/World').then((response) => {
// console.log(response)
mydata = response.data;
this.setState({
    Objects : mydata,
    refreshing:false
})
console.log(this.state.Objects,'asasas')

}).catch(function(error){
    Alert.alert('Error',error.message)
})
// console.log(mydata)
// let Objectarray = []
// mydata.map(object => {
//     let  Complete_Object = {
        
//         Cases : object.cases,
//         Country : object.country ,
//         Deaths : object.deaths,
//         Active : object.active,
//         Cpermillion : object.casesPerOneMillion,
//         Dpermillion : object.deathsPerOneMillion,
//         Recovered : object.recovered,
//         Today_Cases : object.todayCases,
//         Today_Deaths : object.todayDeaths,
//         Updated : object.updated,
//         Critical : object.critical,
//         Country_info : object.countryInfo
       
        
//     }
//     Objectarray.push(Complete_Object)
//     return
// })
// console.log(Objectarray)
this.setState({
    Objects : mydata,
    refreshing:false
})

    }
    constructor(props){
        super(props);
        this.state = {
            Objects : null,
            refreshing : true
        };
        this.fetchdata = this.fetchData.bind(this);
    }
   
    render(){

        if(this.state.refreshing === true){
            this.fetchData()
            return(
                <View style = {{flex : 1 }}>
                 <Appbar.Header style={{ backgroundColor: "black" }}>
                <IconButton icon="battlenet" color = 'white' />
                
                <Appbar.Content
                  style={{ alignItems: "center" }}
                  title="COVID-19"
                  subtitle="Click on the Country to View Details"
                />
                 <IconButton icon="reload" color = 'white' />
                </Appbar.Header>
  
                  <ActivityIndicator color = 'black' size = 'large' style = {{marginTop:100}} />
                  <Title style={{alignSelf:'center'}}>
                      Fetching Data...
                  </Title>
                </View>
            )
        }
        var Updated =  new Date(this.state.Objects.updated).toLocaleString();
     var subtitle = 'Updated : '+ Updated
        console.log(this.state)
    return (
    
          
         
      
     
         
      <View style ={{flex : 1}}>
      <View>
       <Appbar.Header style={{ backgroundColor: "black" }}>
              <IconButton icon="battlenet" color = 'white' />
              <Appbar.Content
                style={{ alignItems: "center" }}
                title="COVID-19"
                subtitle="World Details"
              />
              <IconButton icon="home" color = 'white' />
            </Appbar.Header>
            </View>
      <ScrollView >  
        
        <Card  style={{
                   // borderColor: "black",
                   borderRadius: 10,
                   borderLeftColor:'red',
                   borderLeftWidth:2,
                   borderRightColor:'red',
                   borderRightWidth:2,
                   margin: 30
                 }}>
   <Card.Title  title={this.state.Objects.country} subtitle={subtitle} left={(props) => <Avatar.Icon style ={{elevation:20,color:'black',backgroundColor:'black'}}  size={50} icon="earth" />} />
   <Card.Content>
  
   <Title style = {styles.Title} >Total Cases : {this.state.Objects.cases}</Title>
      <Title style = {styles.Title} >Active Cases : {this.state.Objects.active}</Title>
      <Title style = {styles.Title} >Total Deaths : {this.state.Objects.deaths}</Title>
      <Title style = {styles.Title} >Crtical : {this.state.Objects.critical}</Title>
      <Title style = {styles.Title} >Deaths per Million : {this.state.Objects.deathsPerOneMillion}</Title>
      <Title style = {styles.Title} >Cases per Million : {this.state.Objects.casesPerOneMillion}</Title>
      <Title style = {styles.Title} >Total Recovered : {this.state.Objects.recovered}</Title>
      <Title style = {styles.Title} >Today's Cases : {this.state.Objects.todayCases === undefined ? 'Yet to be Updated' : this.state.Objects.todayCases}</Title>
      <Title style = {styles.Title} >Today's Deaths : {this.state.Objects.todayDeaths  === undefined ? 'Yet to be Updated' : this.state.Objects.todayDeaths}</Title>
   </Card.Content>
 </Card>
 </ScrollView>
</View>
    )
}
}


export default Home;
const styles = StyleSheet.create({
    Title: {
        marginBottom:10,borderBottomColor:'black',borderBottomWidth:2,borderRadius:10
    },
    Content : {
        marginLeft:20,marginRight:20,borderBottomColor:'black',borderBottomWidth:2,borderRadius:10
    }
  });