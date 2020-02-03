import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StatusBar, ActivityIndicator, Text, TouchableWithoutFeedback } from 'react-native';
import styles from '../../styles';
import CustomerContainer from '../../navigation/CustomerNavigation';
// import firebase from 'react-native-firebase';

class AppContainer extends Component {
    static propTypes = {
        isLoggedIn: PropTypes.bool.isRequired,
        logout: PropTypes.func.isRequired,
        initApp: PropTypes.func.isRequired,
        setPushToken: PropTypes.func.isRequired,
        appType: PropTypes.string,
        getAppType: PropTypes.func.isRequired
    };

    state = {
        loading: true,
        fetchedProfile: false,
        fetchClear: false,
        pushPermission: false
    }

    // _getToken = async() => {
    //     const { profile, setPushToken } = this.props;
    //     if(profile){
    //         fcmToken = await firebase.messaging().getToken();
    //         if(fcmToken) {
    //             if(profile.push_token !== fcmToken){
    //                 const result =  await setPushToken(fcmToken);
    //             }
    //         }
    //     }
    // };

    // _checkPermission = async () => {
    //     const enabled = await firebase.messaging().hasPermission();
    //     if (enabled) {
    //         this.setState({
    //             pushPermission: true
    //         })
    //         // this._getToken();
    //     } 
    //     else {
    //         this._requestPermission();
    //     }
    // };

    // _requestPermission = async () => {
    //     try {
    //         await firebase.messaging().requestPermission();
    //         this.setState({
    //             pushPermission: true
    //         })
    //         // this._getToken();
    //     } catch (error) {
    //     }
    // };

    componentDidMount = async() => {
        const { isLoggedIn, initApp } = this.props;
        // const channel = new firebase.notifications.Android.Channel('artuium', 'Artuium', firebase.notifications.Android.Importance.Max)
        // .setDescription("Artuium's Notification");
        // firebase.notifications().android.createChannel(channel);
        // this._checkPermission();
        // this._createNotificationListeners();

        if(isLoggedIn){
            await initApp()
        }
        else{
            this.setState({
                loading: false
            })
        }
    }

    // componentWillUnmount() {
    //     this._removeNotificationListeners();
    // }

    // _createNotificationListeners = async() => {
    //     this.onUnsubscribeNotificaitonListener = firebase
    //     .notifications()
    //     .onNotification(notification => {
    //         firebase.notifications().displayNotification(notification);
    //     });

    //     this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
    //         console.log('onNotificationOpened', notificationOpen);
    //     });
    
    //     const notificationOpen = await firebase.notifications().getInitialNotification();
    //     if (notificationOpen) {
    //         console.log('getInitialNotification', notificationOpen);
    //     }
    //   };
    
    // _removeNotificationListeners = () => {
    //     this.onUnsubscribeNotificaitonListener();
    //     this.notificationOpenedListener();
    // };

    static getDerivedStateFromProps(nextProps, prevState){
        const { fetchedProfile } = prevState;
        if((!fetchedProfile)){
            let update = {}
            if((nextProps.profile)){
                update.fetchedProfile = true
            }
            return update
        }
        else{
            return null
        }
    }

    componentDidUpdate = (prevProps, prevState) => {
        if(this.props.profile && this.state.fetchedProfile && !this.state.fetchClear){
            this.setState({
                loading: false,
                fetchClear: true
            })
            // if(this.state.pushPermission){
            //     this._getToken()
            // }
        }
    }

    render(){
        const { appType } = this.props;
        if(this.state.loading){
            return (
                <View style={[styles.container, styles.alignItemsCenter, styles.justifyContentCenter]}>
                    <ActivityIndicator size='small' color='#000000' />
                </View>
            )
        }
        else{
            if(appType === 'customer'){
                return(
                    <View style={styles.container}>
                        <StatusBar hidden={false} />
                        <CustomerContainer/>
                    </View>
                )
            }
            else if(appType === 'admin'){
                return(
                    <View style={styles.container}>
                    <StatusBar hidden={false} />
                        <View style={[styles.container, styles.center]}>
                            <TouchableWithoutFeedback onPress={() => this.props.getAppType(null)}>
                                <View>
                                    <Text style={[styles.font20, styles.fontBold]}>Admin</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                )
            } 
            else{
                return(
                    <View style={styles.container}>
                    <StatusBar hidden={false} />
                        <View style={[styles.container, styles.center]}>
                            <View style={[styles.widthFull, styles.row, styles.justifyContentAround]}>
                                <TouchableWithoutFeedback onPress={() => this.props.getAppType('customer')}>
                                    <View>
                                        <Text style={[styles.font20, styles.fontBold]}>Go Customer</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback onPress={() => this.props.getAppType('admin')}>
                                    <View>
                                        <Text style={[styles.font20, styles.fontBold]}>Go Admin</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        </View>
                    </View>
                )
            }            
        }

    }
};

export default AppContainer;