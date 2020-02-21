import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import ReservationListScreen from '../../screens/customer/ReservationListScreen';
import ReservationDetailScreen from '../../screens/customer/ReservationDetailScreen';
import sharedRoutes, { sharedOptions } from './sharedRoutes';

const ReservationRoute = createStackNavigator(
    {
        ReservationList: {
            screen: ReservationListScreen
        },
        ReservationDetail: {
            screen: ReservationDetailScreen
        },
        ...sharedRoutes
    },
    {
        ...sharedOptions
    }
);

const ReservationContainer = createAppContainer(ReservationRoute)

export default ReservationContainer;