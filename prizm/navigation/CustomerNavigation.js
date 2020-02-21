import React from 'react';
import { Image } from 'react-native';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import CustomRequestContainer from '../routes/customer/CustomRequestRoute';
import PhotographerContainer from '../routes/customer/PhotographerRoute';
import ReservationContainer from '../routes/customer/ReservationRoute';
import MenuScreen from '../screens/customer/MenuScreen';
import styles from '../styles';

const TabNavigation = createBottomTabNavigator({
    Custom: {
        screen: CustomRequestContainer,
        navigationOptions: {
            tabBarIcon: ({focused}) => (
                <Image source={focused ? require('../assets/images/icon_request_active.png') : require('../assets/images/icon_request.png')} style={styles.icon25} />
            )
        }
    },
    Photographers: {
        screen: PhotographerContainer,
        navigationOptions: {
            tabBarIcon: ({focused}) => (
                <Image source={focused ? require('../assets/images/icon_artist_active.png') : require('../assets/images/icon_artist.png')} style={styles.icon25} />
            )
        }
    },
    Reservations: {
        screen: ReservationContainer,
        navigationOptions: {
            tabBarIcon: ({focused}) => (
                <Image source={focused ? require('../assets/images/icon_reservation_active.png') : require('../assets/images/icon_reservation.png')} style={styles.icon25} />
            )
        }
    },
    Messages: {
        screen: CustomRequestContainer,
        navigationOptions: {
            tabBarIcon: ({focused}) => (
                <Image source={focused ? require('../assets/images/icon_message_active.png') : require('../assets/images/icon_message.png')} style={styles.icon25} />
            )
        }
    }
},
{
    tabBarPosition: 'bottom',
    tabBarOptions: {
        showLabel: true,
        style: {
            backgroundColor: 'white',
            height: 50,
            borderTopColor: "transparent"
        },
        activeTintColor: '#d66c8b',
        inactiveTintColor: "#000000"
    }
});

const TabContainer = createAppContainer(TabNavigation);

const DrawerNavigation = createDrawerNavigator({
    Tab: {
        screen: TabContainer,
        navigationOptions: {
            headerShown: false
        }
    },
    Profile: {
        screen: CustomRequestContainer,
        navigationOptions: {
            drawerLabel: "Profile"
        }
    },
    MySchedule: {
        screen: CustomRequestContainer,
        navigationOptions: {
            drawerLabel: "My Schedule"
        }
    },
    MyPhotos: {
        screen: CustomRequestContainer,
        navigationOptions: {
            drawerLabel: "My Photos"
        }
    },
    Description: {
        screen: CustomRequestContainer,
        navigationOptions: {
            drawerLabel: "Description"
        }
    }
},
{
    drawerBackgroundColor: 'white',
    unmountInactiveRoutes: true,
    contentComponent: MenuScreen,
    drawerType: 'front'
})

const CustomerContainer = createAppContainer(DrawerNavigation);

export default CustomerContainer;