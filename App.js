import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import Map from './Components/MapView';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Provider as PaperProvider , DefaultTheme } from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: "#121212",
    accent: "#fff"
  }
};
const Tab = createMaterialBottomTabNavigator(  );

export default function App() {
  return (
    <PaperProvider>
 <View style = {{flex:1}}>
    
      
    
    
    <NavigationContainer >
      <Tab.Navigator initialRouteName = "Documentation"  >
      <Tab.Screen name="MapView" options = {{ 
        tabBarIcon:'book'
      }} component={Map}/>
      
        
       
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
