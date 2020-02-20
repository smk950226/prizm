import React, { Component } from 'react';
import { View, Image, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import styles from '../../styles';
import { Flow } from 'react-native-animated-spinkit';

const { width, height } = Dimensions.get('window');

const Loader = (props, context) => (
    <View style={[{width, height, backgroundColor: 'rgba(255,255,255,0.7)', zIndex: 999, flex: 1}, styles.center]}>
        <View>
            <Image source={require('../../assets/images/favicon.png')} style={[{width: 80, height: 87}, styles.alignSelfCenter, styles.mb15]} resizeMode={'contain'} />
            <Flow size={80} color={'#333333'} />
        </View>
    </View>
)

Loader.propTypes = {

}

Loader.contextTypes = {
    t: PropTypes.func
}

export default Loader