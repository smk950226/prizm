import React, { Fragment } from 'react';
import { Image, Text, View, TouchableWithoutFeedback, Platform } from 'react-native';
import styles from '../../styles';

const sharedRoutes = {
    
};

const sharedOptions = {
    defaultNavigationOptions: ({ screenProps, navigation }) => ({
        headerTitle: 'PRIZM',
        headerTitleStyle: {
            fontSize: 20,
            fontFamily: 'NanumSquareOTFEB00'
        },
        headerLeft: () => (
            <TouchableWithoutFeedback onPress={navigation.toggleDrawer}>
                <View style={[styles.ml20]}>
                    <Image source={require('../../assets/images/icon_menu.png')} style={[styles.icon25]} />
                </View>
            </TouchableWithoutFeedback>
        )
    })
};

export { sharedOptions };

export default sharedRoutes;