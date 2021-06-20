import React from 'react';
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'

import Home from '../../pages/Home';
import Search from '../../pages/Search'

const Tab = createBottomTabNavigator()

const BottomTabs = () => {
  return (
    <Tab.Navigator tabBarOptions={{
        style: {backgroundColor: '#ff8732'},
        activeTintColor: '#ff4400',
        inactiveTintColor: '#fff',
    }}>
        <Tab.Screen name='Home' component={Home} options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({color, size}) => <Ionicons name='home' color={color} size={size} />,
        }} />

        <Tab.Screen name='Search' component={Search} options={{
            tabBarLabel: 'Pesquisar',
            tabBarIcon: ({color, size}) => <Ionicons name='search' color={color} size={size} />,
        }} />

        <Tab.Screen name='Movie' component={Search} options={{
            tabBarLabel: 'Filmes',
            tabBarIcon: ({color, size}) => <MaterialIcons name='movie' color={color} size={size} />,
        }} />

        <Tab.Screen name='Tv' component={Search} options={{
            tabBarLabel: 'Séries',
            tabBarIcon: ({color, size}) => <Ionicons name='tv-outline' color={color} size={size} />,
        }} />
    </Tab.Navigator>
    )
}

export default BottomTabs;