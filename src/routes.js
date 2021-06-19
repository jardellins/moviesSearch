import React from 'react'
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs'

import Home from './pages/Home'

const AppStack = createStackNavigator()
const Tab = createBottomTabNavigator()

const BottomTabs = () => {
    return (
        <Tab.Navigator tabBarOptions={{
            style: {backgroundColor: '#ff8732'}
        }}>
            <Tab.Screen name='Home' component={Home} />
        </Tab.Navigator>
    )
}

const Routes = () => {
    return (
        <NavigationContainer>
            <AppStack.Navigator headerMode='none'>
                <AppStack.Screen name='Home' component={BottomTabs} />
            </AppStack.Navigator>
        </NavigationContainer>
    )
}

export default Routes;
