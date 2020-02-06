import React, { Fragment } from 'react';
import { Image, Text, View, TouchableWithoutFeedback, Platform } from 'react-native';
import SignUpScreen from '../../screens/customer/SignUpScreen';
import SignUpClearScreen from '../../screens/customer/SignUpClearScreen';
import SignInScreen from '../../screens/customer/SignInScreen';
import DescriptionScreen from '../../screens/customer/DescriptionScreen';
import FindPasswordScreen from '../../screens/customer/FindPasswordScreen';
import styles from '../../styles';

const sharedRoutes = {
    SignUp: {
        screen: SignUpScreen
    },
    SignUpClear: {
        screen: SignUpClearScreen
    },
    SignIn: {
        screen: SignInScreen
    },
    Description: {
        screen: DescriptionScreen
    },
    FindPassword: {
        screen: FindPasswordScreen
    }
};

const sharedOptions = {
    defaultNavigationOptions: ({ screenProps, navigation }) => ({
        headerTitle: 'PRIZM',
        headerTitleStyle: {
            fontSize: 20,
            fontFamily: 'NanumSquareOTFEB00'
        },
        headerTitleAlign: 'center',
        headerRight: () => (
            <TouchableWithoutFeedback onPress={navigation.toggleDrawer}>
                <View style={[styles.mr20]}>
                    <Image source={require('../../assets/images/icon_menu.png')} style={[styles.icon25]} />
                </View>
            </TouchableWithoutFeedback>
        ),
        headerLeft: () => (
            <TouchableWithoutFeedback onPress={()=> navigation.goBack()}>
                <View style={[styles.ml20]}>
                    <Image source={require('../../assets/images/icon_left.png')} style={[styles.iconArrowVerticalSm]} />
                </View>
            </TouchableWithoutFeedback>
        )
    })
};

export { sharedOptions };

export default sharedRoutes;