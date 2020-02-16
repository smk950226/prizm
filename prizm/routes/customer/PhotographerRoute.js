import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import PhotographerListScreen from '../../screens/customer/PhotographerListScreen';
import PhotographerDetailScreen from '../../screens/customer/PhotographerDetailScreen';
import sharedRoutes, { sharedOptions } from './sharedRoutes';

const PhotographerRoute = createStackNavigator(
    {
        PhotographerList: {
            screen: PhotographerListScreen
        },
        PhotographerDetail: {
            screen: PhotographerDetailScreen
        },
        ...sharedRoutes
    },
    {
        ...sharedOptions
    }
);

const PhotographerContainer = createAppContainer(PhotographerRoute)

export default PhotographerContainer;