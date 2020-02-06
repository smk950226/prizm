import React, { Component } from 'react';
import { Alert } from 'react-native';
import PropTypes from 'prop-types';
import HomeScreen from './presenter';

class Container extends Component{
    static propTypes = {
        isLoggedIn: PropTypes.bool.isRequired,
        profile: PropTypes.object,
        getProfile: PropTypes.func.isRequired,
        cancelCustomRequest: PropTypes.func.isRequired,
        sendVerificationEmail: PropTypes.func.isRequired
    }

    static contextTypes = {
        t: PropTypes.func
    }

    state = {
        showCancel: false,
        isCancel: false,
        isSendingEmail: false
    }

    _openCancel = () => {
        this.setState({
            showCancel: true
        })
    }

    _closeCancel = () => {
        this.setState({
            showCancel: false
        })
    }

    _cancel = async() => {
        const { cancelCustomRequest, profile, getProfile } = this.props;
        const { isCancel } = this.state;
        if(!isCancel){
            if(profile){
                if(profile.custom_request_status.status === 'close'){
                    this.setState({
                        isCancel: true
                    })
                    const result = await cancelCustomRequest(profile.custom_request_status.id)
                    if(result.status === 'ok'){
                        this.setState({
                            isCancel: false,
                            showCancel: false
                        })
                        await getProfile()
                    }
                    else if(result.error){
                        this.setState({
                            isCancel: false
                        })
                        Alert.alert(null, result.error)
                    }
                    else{
                        this.setState({
                            isCancel: false
                        })
                        Alert.alert(null, this.context.t("An error has occurred.."))
                    }
                }
            }
        }
    }

    _send = async() => {
        const { isSendingEmail } = this.state;
        const { sendVerificationEmail, isLoggedIn } = this.props;
        if(!isSendingEmail){
            if(isLoggedIn){
                this.setState({
                    isSendingEmail: true
                })
                const result = await sendVerificationEmail()
                if(result.status === 'ok'){
                    this.setState({
                        isSendingEmail: false
                    })
                    Alert.alert(null, this.context.t("A verification email has been sent. Please check your inbox."))
                }
                else if(result.error){
                    this.setState({
                        isSendingEmail: false
                    })
                    Alert.alert(null, result.error)
                }
                else{
                    this.setState({
                        isSendingEmail: false
                    })
                    Alert.alert(null, this.context.t("An error has occurred.."))
                }
            }
        }
    }

    render(){
        return(
            <HomeScreen 
                {...this.props} 
                {...this.state}
                openCancel={this._openCancel}
                closeCancel={this._closeCancel}
                cancel={this._cancel}
                send={this._send}
            />
        )
    }
}

export default Container; 