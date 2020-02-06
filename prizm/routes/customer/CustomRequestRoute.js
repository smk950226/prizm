import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from '../../screens/customer/HomeScreen';
import CustomRequestCreateScreen from '../../screens/customer/CustomRequestCreateScreen';
import sharedRoutes, { sharedOptions } from './sharedRoutes';

const CustomRequestRoute = createStackNavigator(
    {
        Home: {
            screen: HomeScreen
        },
        CustomRequestCreate: {
            screen: CustomRequestCreateScreen
        },
        ...sharedRoutes
    },
    {
        ...sharedOptions
    }
);

const CustomRequestContainer = createAppContainer(CustomRequestRoute)

export default CustomRequestContainer;