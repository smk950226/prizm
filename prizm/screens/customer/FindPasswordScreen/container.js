import React, { Component } from 'react';
import { Alert } from 'react-native';
import PropTypes from 'prop-types';
import FindPasswordScreen from './presenter';

class Container extends Component{
    static propTypes = {
        isLoggedIn: PropTypes.bool.isRequired,
        findPassword: PropTypes.func.isRequired,
        profile: PropTypes.object
    }

    static contextTypes = {
        t: PropTypes.func
    }

    constructor(props){
        super(props)
        this.state = {
            email: "",
            emailForm: false,
            isSubmitting: false,
            finded: "",
        }
    }

    componentDidMount = () => {
        if(this.props.isLoggedIn){
            this.props.navigation.navigate('Home')
        }
    }

    _handleEmailChange = (email) => {
        let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ;
        if(reg.test(email)){
            this.setState({
                email,
                emailForm: true
            })
        }
        else{
            this.setState({
                email,
                emailForm: false
            })
        }
    }

    _submit = async() => {
        const { email, emailForm } = this.state;
        if(email){
            if(emailForm){
                this.setState({
                    isSubmitting: true
                })
                const { findPassword } = this.props;
                const check = await findPassword(email);
                if(check.email){
                    this.setState({
                        finded: check.email,
                        isSubmitting: false
                    })
                }
                else if(check.error){
                    this.setState({
                        finded: "",
                        isSubmitting: false
                    })
                    Alert.alert(null, check.error)
                }
                else{
                    this.setState({
                        finded: "",
                        isSubmitting: false
                    })
                    Alert.alert(null, "An error has occurred..")
                }
            }
            else{
                Alert.alert(null, '올바른 형식을 입력해주세요.')
            }
        }
        else{
            Alert.alert(null, '회원 정보를 입력해주세요.')
        }
    }

    render(){
        return(
            <FindPasswordScreen
            {...this.props} 
            {...this.state} 
            submit={this._submit}
            handleEmailChange={this._handleEmailChange}
            />
        )
    }
}

export default Container;