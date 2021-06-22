import React from 'react'
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import BottomTabs from './components/BottomTabs';
import ListSearch from './pages/ListSearch';

const AppStack = createStackNavigator()

const Routes = () => {
    return (
        <NavigationContainer>
            <AppStack.Navigator headerMode='none'>
                <AppStack.Screen name='Main' component={BottomTabs} />
                <AppStack.Screen name='ListSearch' component={ListSearch} />
            </AppStack.Navigator>
        </NavigationContainer>
    )
}

export default Routes;
