import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import Map from './Components/MapView';
import { BottomTabBar } from '@react-navigation/bottom-tabs'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Provider as PaperProvider, DefaultTheme, IconButton , Button} from 'react-native-paper';
import TableView from './Components/TableView';
import { Ionicons , Feather , AntDesign } from '@expo/vector-icons'
import CityView from './Components/CityView';


const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: "#121212",
    accent: "#fff"
  }
};
const Tab = createBottomTabNavigator();


export default function App() {
  return (
    <PaperProvider  theme = {DefaultTheme}>
 <View style = {{flex:1}}>
    
      
    
  
    <NavigationContainer >
    <Tab.Navigator initialRouteName = 'Map' tabBarOptions={{activeTintColor:'black',inactiveTintColor:'gray'}} tabBar={props => <BottomTabBar {...props} state={{...props.state, routes: props.state.routes.slice(0,3)}}></BottomTabBar>}> 
      <Tab.Screen name="Map" component={Map}   options={{
          tabBarLabel: 'Map View',
          tabBarIcon: ({ focused} ) => {
            if(focused) 
            {
              return <Feather name='map' size={20} color = '#4c8bf5' />
            }
            else{
              return <Feather name='map' size={20} color = 'gray' /> 
            }
          }
           
            
        
        }}
        ></Tab.Screen>
      <Tab.Screen name="Country View" component={TableView} options={{
         
         tabBarIcon: ({ focused} ) => {
            if(focused) 
            {
              return <Ionicons name='ios-list-box' size={20} color = '#4c8bf5'  />
            }
            else{
              return <Ionicons name='ios-list-box' size={20} color = 'gray'  /> 
            }
          }
           
         
        
        }} ></Tab.Screen>
        <Tab.Screen name="Home" component={Home} options={{
         
         tabBarIcon: ({ focused} ) => {
            if(focused) 
            {
              return <AntDesign name='Home' size={20} color = '#4c8bf5'  />
            }
            else{
              return <AntDesign name='Home' size={20} color = 'gray'  /> 
            }
          }
           
         
        
        }} ></Tab.Screen>
      <Tab.Screen name="CityView" component={CityView} tabBarVisible = {false} ></Tab.Screen>
    </Tab.Navigator>
    </NavigationContainer>
    
    </View>
  </PaperProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFCFF',
  }
});
