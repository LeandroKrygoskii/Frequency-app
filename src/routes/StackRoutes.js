import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../pages/Home';
import Play from '../pages/Play';

export default function StackRoutes(){

    const { Navigator, Screen} = createNativeStackNavigator();
   
    return(

       <NavigationContainer>
           <Navigator initialRouteName='Home'>
               <Screen 
                 name="Home"
                 component={Home}
                 options={{headerShown: false}}
               />

                <Screen 
                 name="Play"
                 component={Play}
                 options={{headerShown: false}}
               />
           </Navigator>
       </NavigationContainer>
    )

}