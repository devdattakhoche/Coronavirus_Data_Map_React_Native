import * as React from "react";
import { View, ActivityIndicator ,Alert} from "react-native";
import { DataTable, Appbar, IconButton, Title, TextInput } from "react-native-paper";
import axios from "axios";
import { ScrollView } from "react-native-gesture-handler";
 

export default class TableView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Objects: null,
      refreshing: true
    };
  }
  fetchData =  () => {
    let mydata = null;
     axios
      .get("https://corona.lmao.ninja/v2/countries")
      .then(response => {
        mydata = response.data;
        let Objectarray = [];
    let Countryarray = []
    mydata.map(object => {
      let Complete_Object = {
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
      Objectarray.push(Complete_Object);
    });
    console.log(Countryarray)
    this.setState({
      Objects: Objectarray,
      Fixed : Objectarray,
      refreshing: false,
    });
      })
      .catch(function(error) {
        Alert.alert("Error", error.message);
      });
    
  };
  // componentDidMount() {
  //   this.setState({
  //     refreshing: true
  //   });
  //   this.fetchData();
  // }
  handlePress = Object => {
    this.props.navigation.navigate("CityView", Object);
  };
  handlechange = (text) =>{
   if(text.length === 0){
     this.setState({
       Objects:this.state.Fixed
     })
     return
   }
   else{
   
    text =  text.trim()


   text =text.toLowerCase()
  
   let New_Objects = this.state.Fixed.filter(iterator => {
     let country = iterator.Country
    country = country.toLowerCase()
    const regex = new RegExp(text, 'gi')
      return(
        country.match(regex) 
        
      )
    })
this.setState({
  Objects:New_Objects
})
  }
}
  render() {
    
    if (this.state.refreshing === true) {
      this.fetchData();
      return (
        <View style={{ flex: 1 }}>
          <Appbar.Header style={{ backgroundColor: "black" }}>
            <IconButton icon="battlenet" color="white" />

            <Appbar.Content
              style={{ alignItems: "center" }}
              title="COVID-19"
              subtitle="Click on the row to View Details"
            />
            <IconButton icon="table" color="white" />
          </Appbar.Header>

          <ActivityIndicator
            color="black"
            size="large"
            style={{ marginTop: 100 }}
          />
          <Title style={{ alignSelf: "center" }}>Fetching Data...</Title>
        </View>
      );
    }
    var datatable = this.state.Objects.map(Object => {
      return (
        <DataTable.Row key={Object.Country}  onPress={() => this.handlePress(Object)}>
          <DataTable.Cell>
            {Object.Country}
          </DataTable.Cell>
          <DataTable.Cell numeric>{Object.Cases}</DataTable.Cell>
          <DataTable.Cell numeric>{Object.Active}</DataTable.Cell>
          <DataTable.Cell numeric>{Object.Deaths}</DataTable.Cell>
          <DataTable.Cell numeric>{Object.Critical}</DataTable.Cell>
        </DataTable.Row>
      );
    });
    // console.log('heheyhey')
    return (
      <View>
        <Appbar.Header style={{ backgroundColor: "black" }}>
          <IconButton icon="battlenet" color="white" />

          <Appbar.Content
            style={{ alignItems: "center" }}
            title="COVID-19"
            subtitle="Click on the row to View Details"
          />
          <IconButton
            icon="table"
            color="white"
            
          />
        </Appbar.Header>
        <TextInput
        style = {{margin:20 }}
        
        mode = "outlined"
        label='Search Country'
        
        onChangeText={text => this.handlechange(text)}
      />
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Country</DataTable.Title>
            <DataTable.Title numeric>Cases</DataTable.Title>
            <DataTable.Title numeric>Active</DataTable.Title>
            <DataTable.Title numeric>Deaths</DataTable.Title>
            <DataTable.Title numeric>Critical</DataTable.Title>
          </DataTable.Header>
          <ScrollView>{datatable}</ScrollView>
        </DataTable>
      </View>
    );
  }
}
