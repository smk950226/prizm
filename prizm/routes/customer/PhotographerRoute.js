import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import PhotographerListScreen from '../../screens/customer/PhotographerListScreen';
import sharedRoutes, { sharedOptions } from './sharedRoutes';

const PhotographerRoute = createStackNavigator(
    {
        PhotographerList: {
            screen: PhotographerListScreen
        },
        ...sharedRoutes
    },
    {
        ...sharedOptions
    }
);

const PhotographerContainer = createAppContainer(PhotographerRoute)

export default PhotographerContainer;