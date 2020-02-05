import React from 'react';
import { Image, TouchableWithoutFeedback, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from '../../screens/customer/HomeScreen';
import CustomRequestCreateScreen from '../../screens/customer/CustomRequestCreateScreen';
import sharedRoutes, { sharedOptions } from './sharedRoutes';
import styles from '../../styles';

const CustomRequestRoute = createStackNavigator(
    {
        Home: {
            screen: HomeScreen
        },
        CustomRequestCreate: {
            screen: CustomRequestCreateScreen
        }
    },
    {
        ...sharedOptions
    }
);

const CustomRequestContainer = createAppContainer(CustomRequestRoute)

export default CustomRequestContainer;