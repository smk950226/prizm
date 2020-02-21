import React, { Component } from 'react';
import { Alert } from 'react-native';
import PropTypes from 'prop-types';
import ProfilePasswordScreen from './presenter';

class Container extends Component{
    static propTypes = {
        isLoggedIn: PropTypes.bool.isRequired,
        editPassword: PropTypes.func.isRequired,
        getProfile: PropTypes.func.isRequired,
    }

    static contextTypes = {
        t: PropTypes.func
    }

    constructor(props){
        super(props)
        this.state = {
            password: "",
            password2: "",
            currentPassword: "",
            passwordForm:false,
            password2Form:false,
            isSubmitting: false,
        }
    }

    componentDidMount = () => {
        if(!this.props.isLoggedIn){
            this.props.goHome()
        }
    }

    _handleCurrentPasswordChange = (currentPassword) => {
        this.setState({
            currentPassword
        })
    }

    _handlePasswordChange = (password) => {
        let reg = /^(?=.*?[A-Za-z])(?=.*?[0-9]).{2,}$/ ;
        if(reg.test(password)){
            if(password.length >= 8){
                if(this.state.password2){
                    if(this.state.password2 === password){
                        this.setState({
                            password,
                            passwordForm: true,
                            password2Form: true
                        });
                    }
                    else{
                        this.setState({
                            password,
                            passwordForm: true,
                            password2Form: false
                        });
                    }
                }
                else{
                    this.setState({
                        password,
                        passwordForm: true,
                        password2Form: false
                    });
                }
            }
            else{
                if(this.state.password2){
                    if(this.state.password2 === password){
                        this.setState({
                            password,
                            passwordForm: false,
                            password2Form: true
                        });
                    }
                    else{
                        this.setState({
                            password,
                            passwordForm: false,
                            password2Form: false
                        });
                    }
                }
                else{
                    this.setState({
                        password,
                        passwordForm: false,
                        password2Form: false
                    });
                }
            }
        }
        else{
            if(this.state.password2){
                if(this.state.password2 === password){
                    this.setState({
                        password,
                        passwordForm: false,
                        password2Form: true
                    });
                }
                else{
                    this.setState({
                        password,
                        passwordForm: false,
                        password2Form: false
                    });
                }
            }
            else{
                this.setState({
                    password,
                    passwordForm: false,
                    password2Form: false
                });
            }
        }
    }

    _handlePassword2Change = (password2) => {
        if(this.state.password){
            if(this.state.password === password2){
                this.setState({
                    password2,
                    password2Form: true
                });
            }
            else{
                this.setState({
                    password2,
                    password2Form: false
                });
            }
        }
        else{
            this.setState({
                password2,
                password2Form: false
            });
        }
    }

    _submit = async() => {
        const { isSubmitting, password, password2, currentPassword, passwordForm, password2Form } = this.state;
        const { editPassword, getProfile } = this.props;
        if(!isSubmitting){
            if(password && password2 && currentPassword){
                if(passwordForm){
                    if(password === password2){
                        if(password2Form){
                            this.setState({
                                isSubmitting: true
                            })
                            const result = await editPassword(currentPassword, password)
                            if(result.status === 'ok'){
                                await getProfile()
                                Alert.alert(null, 
                                    this.context.t("Your password has been changed successfully."),
                                    [
                                    {text: 'OK', onPress: () => {
                                        this.setState({
                                            isSubmitting: false,
                                            currentPassword: "",
                                            password: "",
                                            password2: "",
                                            passwordForm: false,
                                            password2Form: false
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
                        else{
                            Alert.alert(null, this.context.t("Invalid Password."))
                        }
                    }
                    else{
                        Alert.alert(null, this.context.t("Invalid Password."))
                    }
                }
                else{
                    Alert.alert(null, this.context.t("Your password should be at least 8 characters long and should include a mix of alphabets and numbers."))
                }
            }
            else{
                Alert.alert(null, this.context.t("Please fill in the information."))
            }
        }
    }

    render(){
        return(
            <ProfilePasswordScreen 
            {...this.props} 
            {...this.state} 
            submit={this._submit}
            handleCurrentPasswordChange={this._handleCurrentPasswordChange}
            handlePasswordChange={this._handlePasswordChange}
            handlePassword2Change={this._handlePassword2Change}
            />
        )
    }
}

export default Container;