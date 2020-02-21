import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import ReservationListScreen from '../../screens/customer/ReservationListScreen';
import sharedRoutes, { sharedOptions } from './sharedRoutes';

const ReservationRoute = createStackNavigator(
    {
        ReservationList: {
            screen: ReservationListScreen
        },
        ...sharedRoutes
    },
    {
        ...sharedOptions
    }
);

const ReservationContainer = createAppContainer(ReservationRoute)

export default ReservationContainer;