import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import FindPasswordResult from './presenter';
import styles from '../../style/styles.module.scss';

class Container extends Component{
    static proptTypes = {
        isLoggedIn: PropTypes.bool.isRequired,
        findPasswordUrl: PropTypes.func.isRequired,
        goHome: PropTypes.func.isRequired,
        findPasswordResult: PropTypes.func.isRequired,
        goSignin: PropTypes.func.isRequired
    }

    static contextTypes = {
        t: PropTypes.func
    }

    state = {
        email: "",
        emailForm: false,
        isSubmitting: false,
        finded: false,
        loading: true,
        user: "",
        password1: "",
        password2: "",
        passwordForm: false
    }

    componentDidMount = async() => {
        const { match : { params : { uuid } }, findPasswordUrl, goHome } = this.props;
        const result = await findPasswordUrl(uuid);
        if(result.user){
            this.setState({
                user: result.user,
                loading: false,
                uuid
            })
        }
        else if(result.error){
            this.setState({
                loading: false
            })
            alert(result.error)
            goHome()
        }
        else{
            this.setState({
                loading: false
            })
            alert(this.context.t("An error has occurred.."))
            goHome()
        }
    }

    _handleInputChange = async(event) => {
        const { target : { value, name } } = event;
        this.setState({
            [name]: value
        });
        if(name === 'email'){
            let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ;
            if(reg.test(value) === true){
                await this.setState({
                    emailForm: true
                })
            }
            else{
                await this.setState({
                    emailForm: false
                })
            }
        }
        else if(name === 'password2'){
            if(value !== ""){
                if(this.state.password1 === value){
                    await this.setState({
                        passwordForm: true
                    })
                }
                else{
                    await this.setState({
                        passwordForm: false
                    })
                }
            }
            else{
                await this.setState({
                    passwordForm: false
                })
            }
        }
    };

    _handleKeyPress = async(event) => {
        const { key } = event;
        const { email, emailForm, user } = this.state;
        if(email){
            if (key === "Enter") {
                event.preventDefault();
                if(emailForm){
                    this.setState({
                        isSubmitting: true
                    })
                    if(user === email){
                        this.setState({
                            finded: true,
                            isSubmitting: false
                        })
                    }
                    else{
                        this.setState({
                            finded: false,
                            isSubmitting: false
                        })
                        alert(this.context.t("Invalid Email."))
                    }
                }
                else{
                    alert(this.context.t("Please enter a valid email address."))
                }
            }
        }
    }

    _handleFindPassword = async(event) => {
        event.preventDefault();
        const { email, emailForm, user } = this.state;
        if(email){
            if(emailForm){
                this.setState({
                    isSubmitting: true
                })
                if(user === email){
                    this.setState({
                        finded: true,
                        isSubmitting: false
                    })
                }
                else{
                    this.setState({
                        finded: false,
                        isSubmitting: false
                    })
                    alert(this.context.t("Invalid Email."))
                }
            }
            else{
                alert(this.context.t("Please enter a valid email address."))
            }
        }
        else{
            alert(this.context.t("Please fill in the information."))
        }
    }

    _handleFindPasswordResult = async() => {
        const { uuid, email, password1, password2, passwordForm, isSubmitting } = this.state;
        const { findPasswordResult, goSignin } = this.props;
        let passwordReg = /^(?=.*?[A-Za-z])(?=.*?[0-9]).{8,}$/;
        if(!isSubmitting){
            if(password1 && password2){
                if(passwordForm){
                    if(passwordReg.test(password2)){
                        this.setState({
                            isSubmitting: true
                        })
                        const result = await findPasswordResult(uuid, email, password1, password2);
                        if(result.status === 'ok'){
                            this.setState({
                                isSubmitting: false
                            })
                            alert(this.context.t("Your password has been successfully changed."))
                            goSignin()
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
                        alert(this.context.t("Your password should be at least 8 characters long and should include a mix of alphabets and numbers."))
                    }
                }
                else{
                    alert(this.context.t("Invalid Password."))
                }
            }
            else{
                alert(this.context.t("Please enter a password."))
            }
        }
    }

    _handleKeyPressResult = async(event) => {
        const { key } = event;
        const { uuid, email, password1, password2, passwordForm, isSubmitting } = this.state;
        const { findPasswordResult, goSignin } = this.props;
        let passwordReg = /^(?=.*?[A-Za-z])(?=.*?[0-9]).{8,}$/;
        if(!isSubmitting){
            if(password1 && password2){
                if(key === "Enter") {
                    event.preventDefault();
                    if(passwordForm){
                        if(passwordReg.test(password2)){
                            this.setState({
                                isSubmitting: true
                            })
                            const result = await findPasswordResult(uuid, email, password1, password2);
                            if(result.status === 'ok'){
                                this.setState({
                                    isSubmitting: false
                                })
                                alert(this.context.t("Your password has been successfully changed."))
                                goSignin()
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
                            alert(this.context.t("Your password should be at least 8 characters long and should include a mix of alphabets and numbers."))
                        }
                    }
                    else{
                        alert(this.context.t("Invalid Password."))
                    }
                }
            }
        }
    }

    render(){
        const { isLoggedIn } = this.props;
        const { loading } = this.state;
        if(isLoggedIn){
            return(
                <Redirect to='/' />
            )
        }
        else{
            if(loading){
                return(
                    <div className={`${styles.widthFull} ${styles.heightFull}`}>

                    </div>
                )
            }
            else{
                return(
                    <FindPasswordResult 
                    {...this.props} 
                    {...this.state} 
                    handleInputChange={this._handleInputChange} 
                    handleKeyPress={this._handleKeyPress} 
                    handleFindPassword={this._handleFindPassword} 
                    handleKeyPressResult={this._handleKeyPressResult}
                    handleFindPasswordResult={this._handleFindPasswordResult}
                    />
                )
            }
        }
    }
}

export default Container;