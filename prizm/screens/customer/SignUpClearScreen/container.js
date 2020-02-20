import React, { Component } from 'react';
import { Alert } from 'react-native';
import PropTypes from 'prop-types';
import SignUpClearScreen from './presenter';

class Container extends Component{
    static propTypes = {
        profile: PropTypes.object.isRequired,
        sendVerificationEmail: PropTypes.func.isRequired,
        isLoggedIn: PropTypes.bool.isRequired
    }

    static contextTypes = {
        t: PropTypes.func
    }

    state = {
        isSubmitting: false
    }

    componentDidMount = () => {
        if(!this.props.profile){
            this.props.navigation.navigate('Home')
        }
    }

    _send = async() => {
        const { isSubmitting } = this.state;
        const { sendVerificationEmail, isLoggedIn } = this.props;
        if(!isSubmitting){
            if(isLoggedIn){
                const result = await sendVerificationEmail()
                if(result.status === 'ok'){
                    Alert.alert(null, 
                        this.context.t("A verification email has been sent. Please check your inbox."),
                        [
                          {text: 'OK', onPress: () => {
                            this.setState({
                                isSubmitting: false
                            })
                          }},
                        ],
                        {cancelable: false}
                    )
                }
                else if(result.error){
                    Alert.alert(null, 
                        result.error,
                        [
                          {text: 'OK', onPress: () => {
                            this.setState({
                                isSubmitting: false
                            })
                          }},
                        ],
                        {cancelable: false}
                    )
                }
                else{
                    Alert.alert(null, 
                        this.context.t("An error has occurred.."),
                        [
                          {text: 'OK', onPress: () => {
                            this.setState({
                                isSubmitting: false
                            })
                          }},
                        ],
                        {cancelable: false}
                    )
                }
            }
        }
    }

    render(){
        return(
            <SignUpClearScreen 
            {...this.props}
            {...this.state}
            send={this._send}
            />
        )
    }
}

export default Container;