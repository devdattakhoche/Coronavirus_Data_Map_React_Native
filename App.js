import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import Map from './Components/MapView';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Provider as PaperProvider, DefaultTheme, IconButton } from 'react-native-paper';
import TableView from './Components/TableView';
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
const Tab = createBottomTabNavigator(  );

export default function App() {
  return (
    <PaperProvider>
 <View style = {{flex:1}}>
    
      
    
    
    <NavigationContainer >
    <Tab.Navigator initialRouteName = 'Map' tabBarOptions ={{showLabel:false,showIcon : false}}>
      <Tab.Screen name="Map" component={Map}  activeTintColor = 'black' options={{
          tabBarLabel: 'Map View',
          tabBarIcon: () => (
            <IconButton name="book" size = {20}  />
          ),
        }} />
      <Tab.Screen name="Settings" component={TableView} />
      <Tab.Screen name="CityView" component={CityView}  />
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
