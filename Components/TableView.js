import * as React from 'react';
import { View , ActivityIndicator} from "react-native";
import { DataTable , Appbar, IconButton } from 'react-native-paper';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';

export default class TableView extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            unique: 0,
            Objects : null,
            refreshing: true
        }
    }
    fetchData = async () =>{
        let mydata = null;
const Data = await axios.get('https://corona.lmao.ninja/countries').then((response) => {
console.log(response)
mydata = response.data;

}).catch(function(error){
    Alert.alert('Error',error.message)
})
Objectarray = []
mydata.map(object => {
    let  Complete_Object = {
        
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
    Objectarray.push(Complete_Object)
    
})
this.setState({
    Objects : Objectarray,
    refreshing:false
})

    }
    componentDidMount(){
        this.setState({
            refreshing:true
        })
        this.fetchData()
    }
    handlePress =  (Object) => {
            this.props.navigation.navigate('CityView',Object)
    }
  render() {
      if(this.state.refreshing === true){
          this.fetchData()
          return(
              <View style = {{flex : 1 }}>
               <Appbar.Header style={{ backgroundColor: "black" }}>
              <IconButton icon="battlenet" color = 'white' />
              
              <Appbar.Content
                style={{ alignItems: "center" }}
                title="COVID-19"
                subtitle="World Map View"
              />
               <IconButton icon="reload" color = 'white' />
              </Appbar.Header>

                <ActivityIndicator color = 'black' size = 'large' style = {{marginTop:100}} />
              </View>
          )
      }
      var datatable = this.state.Objects.map(Object => {
          return(
            <DataTable.Row key = {Object.Country}>
            <DataTable.Cell onPress = {() => this.handlePress(Object)}>{Object.Country}</DataTable.Cell>
            <DataTable.Cell numeric>{Object.Cases}</DataTable.Cell>
            <DataTable.Cell numeric>{Object.Active}</DataTable.Cell>
            <DataTable.Cell numeric>{Object.Deaths}</DataTable.Cell>
            <DataTable.Cell numeric>{Object.Critical}</DataTable.Cell>
  
          </DataTable.Row>
          )
      })
    return (
        <View>
            <Appbar.Header style={{ backgroundColor: "black" }}>
              <IconButton icon="battlenet" color = 'white' />
              
              <Appbar.Content
                style={{ alignItems: "center" }}
                title="COVID-19"
                subtitle="World Map View"
              />
               <IconButton icon="reload" color = 'white' onPress = {() => this.componentDidMount()}/>
             
            </Appbar.Header>
        
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Country</DataTable.Title>
          <DataTable.Title numeric>Cases</DataTable.Title>
          <DataTable.Title numeric>Active</DataTable.Title>
          <DataTable.Title numeric>Deaths</DataTable.Title>
          <DataTable.Title numeric>Critical</DataTable.Title>
          
        </DataTable.Header>
<ScrollView>
        
        
        {datatable}
        </ScrollView>
        
      </DataTable>
      </View>
    );
  }
}