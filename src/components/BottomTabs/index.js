import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'

import Home from '../../pages/Home';
import Search from '../../pages/Search'
import Movie from '../../pages/Movie';
import Tv from '../../pages/Tv';

const Tab = createBottomTabNavigator()

const BottomTabs = () => {
    return (
        <Tab.Navigator tabBarOptions={{
            style: {
                borderTopColor: 'transparent',
                backgroundColor: '#ff8732',
                height: 55,
            },
            activeTintColor: '#fff',
            inactiveTintColor: '#333',
            labelStyle: {
                fontSize: 13,
                marginBottom: 4,
            },
        }}>
            <Tab.Screen name='Home' component={Home} options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({ color }) => <Ionicons name='home' color={color} size={28} />,
            }} />

            <Tab.Screen name='Search' component={Search} options={{
                tabBarLabel: 'Pesquisar',
                tabBarIcon: ({ color }) => <Ionicons name='search' color={color} size={28} />,
            }} />

            <Tab.Screen name='Movie' component={Movie} options={{
                tabBarLabel: 'Filmes',
                tabBarIcon: ({ color }) => <MaterialIcons name='movie' color={color} size={28} />,
            }} />

            <Tab.Screen name='Tv' component={Tv} options={{
                tabBarLabel: 'Séries',
                tabBarIcon: ({ color }) => <Ionicons name='tv-outline' color={color} size={28} />,
            }} />
        </Tab.Navigator>
    )
}

export default BottomTabs;