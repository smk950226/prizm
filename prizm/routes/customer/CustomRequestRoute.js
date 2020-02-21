import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from '../../screens/customer/HomeScreen';
import CustomRequestCreateScreen from '../../screens/customer/CustomRequestCreateScreen';
import CustomRequestListScreen from '../../screens/customer/CustomRequestListScreen';
import CustomRequestDetailScreen from '../../screens/customer/CustomRequestDetailScreen';
import sharedRoutes, { sharedOptions } from './sharedRoutes';

const CustomRequestRoute = createStackNavigator(
    {
        Home: {
            screen: HomeScreen
        },
        CustomRequestCreate: {
            screen: CustomRequestCreateScreen
        },
        CustomRequestList: {
            screen: CustomRequestListScreen
        },
        CustomRequestDetail: {
            screen: CustomRequestDetailScreen
        },
        ...sharedRoutes
    },
    {
        ...sharedOptions
    }
);

const CustomRequestContainer = createAppContainer(CustomRequestRoute)

export default CustomRequestContainer;