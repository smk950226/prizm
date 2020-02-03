import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AdminProfilePassword from './presenter';

class Container extends Component{
    static propTypes = {
        isLoggedIn: PropTypes.bool.isRequired,
        goHome: PropTypes.func.isRequired,
        editPassword: PropTypes.func.isRequired,
        getProfile: PropTypes.func.isRequired,
        goProfile: PropTypes.func.isRequired
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
        const { isLoggedIn, profile, goHome } = this.props;
        if(!isLoggedIn){
            goHome()
        }
        else if(profile.user_type !== 'photographer'){
            goHome()
        }
    }

    _handleInputChange = (event) => {
        const { target : { value, name } } = event;
        if(name === 'password'){
            let reg = /^(?=.*?[A-Za-z])(?=.*?[0-9]).{2,}$/ ;
            if(reg.test(value)){
                if(value.length >= 8){
                    if(this.state.password2){
                        if(this.state.password2 === value){
                            this.setState({
                                [name]: value,
                                passwordForm: true,
                                password2Form: true
                            });
                        }
                        else{
                            this.setState({
                                [name]: value,
                                passwordForm: true,
                                password2Form: false
                            });
                        }
                    }
                    else{
                        this.setState({
                            [name]: value,
                            passwordForm: true,
                            password2Form: false
                        });
                    }
                }
                else{
                    if(this.state.password2){
                        if(this.state.password2 === value){
                            this.setState({
                                [name]: value,
                                passwordForm: false,
                                password2Form: true
                            });
                        }
                        else{
                            this.setState({
                                [name]: value,
                                passwordForm: false,
                                password2Form: false
                            });
                        }
                    }
                    else{
                        this.setState({
                            [name]: value,
                            passwordForm: false,
                            password2Form: false
                        });
                    }
                }
            }
            else{
                if(this.state.password2){
                    if(this.state.password2 === value){
                        this.setState({
                            [name]: value,
                            passwordForm: false,
                            password2Form: true
                        });
                    }
                    else{
                        this.setState({
                            [name]: value,
                            passwordForm: false,
                            password2Form: false
                        });
                    }
                }
                else{
                    this.setState({
                        [name]: value,
                        passwordForm: false,
                        password2Form: false
                    });
                }
            }
        }
        else if(name === 'password2'){
            if(this.state.password){
                if(this.state.password === value){
                    this.setState({
                        [name]: value,
                        password2Form: true
                    });
                }
                else{
                    this.setState({
                        [name]: value,
                        password2Form: false
                    });
                }
            }
            else{
                this.setState({
                    [name]: value,
                    password2Form: false
                });
            }
        }
        else{
            this.setState({
                [name]: value
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
                                this.setState({
                                    isSubmitting: false,
                                    currentPassword: "",
                                    password: "",
                                    password2: "",
                                    passwordForm: false,
                                    password2Form: false
                                })
                                alert(this.context.t("Your password has been changed successfully."))
                            }
                            else if(result.error){
                                this.setState({
                                    isSubmitting: false
                                })
                                alert(result.error)
                            }
                            else{
                                this.setState({
                                    isSubmitting: false
                                })
                                alert(this.context.t("An error has occurred.."))
                            }
                        }
                        else{
                            alert(this.context.t("Invalid Password."))
                        }
                    }
                    else{
                        alert(this.context.t("Invalid Password."))
                    }
                }
                else{
                    alert(this.context.t("Your password should be at least 8 characters long and should include a mix of alphabets and numbers."))
                }
            }
            else{
                alert(this.context.t("Please fill in the information."))
            }
        }
    }

    render(){
        return(
            <AdminProfilePassword 
            {...this.props} 
            {...this.state} 
            handleInputChange={this._handleInputChange}
            submit={this._submit}
            />
        )
    }
}

export default Container;