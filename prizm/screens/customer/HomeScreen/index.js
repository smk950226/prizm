import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import styles from '../../../styles';

const HomeScreen = (props, context) => (
    <View style={[styles.container, styles.center]}>
        <Text style={[styles.font40, styles.mt50]}>{context.t("Home")}</Text>
    </View>
)

HomeScreen.contextTypes = {
    t: PropTypes.func
}

export default HomeScreen;