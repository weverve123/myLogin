import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import SignUp from './src/components/SignUp'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from './src/components/SignIn';
import Home from './src/components/Home';
import Todo from './src/components/Todo';
import ProfileDetails from './src/components/ProfileDetails';
import UplodeImage from './src/components/UplodeImage';
const Stack = createStackNavigator();
export default function App() {
  return (
     <NavigationContainer>
        <Stack.Navigator>
           <Stack.Screen name='SignUp' component={SignUp} options={{headerShown:false}}/>
           <Stack.Screen name='SignIn' component={SignIn} options={{headerShown:false}}/>
           <Stack.Screen name='Home' component={Home} options={{headerShown:false}}/>
           <Stack.Screen name='Todo'component={Todo} options={{headerShown:false}}/>
           <Stack.Screen name='ProfileDetails' component={ProfileDetails} options={{headerShown:false}}/>
           <Stack.Screen name='UplodeImage' component={UplodeImage} options={{headerShown:false}}/>
        </Stack.Navigator>
     </NavigationContainer>
  )
}
const styles = StyleSheet.create({
  main:{
    flex:1,
  }
   
});