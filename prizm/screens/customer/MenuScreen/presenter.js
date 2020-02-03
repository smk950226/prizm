import React, { Component, Fragment } from 'react';
import { View, Text, TouchableWithoutFeedback, ActivityIndicator, Image } from 'react-native';
import PropTypes from 'prop-types';
import styles from '../../../styles';

class MenuScreen extends Component{
    static propTypes = {
        profile: PropTypes.object,
    }

    _goNotice = () => {
        this.props.navigation.navigate('NoticeRoute')
    }

    _goHome = () => {
        this.props.navigation.navigate('HomeRoute')
    }

    _goCenter = () => {
        this.props.navigation.navigate('CenterRoute')
    }

    _goMyInfo = () => {
        this.props.navigation.navigate('MyInfoRoute')
    }

    _goPreference = () => {
        this.props.navigation.navigate('PreferenceRoute')
    }

    _goAttendance = () => {
        this.props.navigation.navigate('AttendanceRoute')
    }

    render(){
        const { profile, activeItemKey } = this.props;
        return(
            <View style={[styles.container, styles.bgBlack07, styles.widthFull, styles.heightFull]}>
                <Text>hjihi</Text>
            </View>
        )
    }
}

export default MenuScreen;