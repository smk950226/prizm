import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SignIn from './presenter';

class Container extends Component{
    static propTypes = {
        isLoggedIn: PropTypes.bool.isRequired,
        login: PropTypes.func.isRequired,
        getProfileByToken: PropTypes.func.isRequired,
        getSaveToken: PropTypes.func.isRequired,
        goHome: PropTypes.func.isRequired,
        goSignUp: PropTypes.func.isRequired
    }

    static contextTypes = {
        t: PropTypes.func
    }

    state = {
        email: "",
        password: "",
        emailForm: false,
        savePassword: true,
        isSubmitting: false
    }

    componentDidMount = () => {
        if(this.props.isLoggedIn){
            this.props.goHome()
        }
    }

    _handleInputChange = (event) => {
        const { target : { value, name } } = event;
        if(name === 'email'){
            let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ;
            if(reg.test(value) === true){
                this.setState({
                    [name]: value,
                    emailForm: true
                })
            }
            else{
                this.setState({
                    [name]: value,
                    emailForm: false
                })
            }
        }
        else{
            this.setState({
                [name]: value
            });
        }
    }

    _submit = async() => {
        const { isSubmitting, email,  password, emailForm } = this.state;
        const { login, getProfileByToken, getSaveToken, goHome } = this.props;
        if(!isSubmitting){
            if(email && password){
                if(emailForm){
                    this.setState({
                        isSubmitting: true
                    })
                    const result = await login(email, password)
                    if(result.token){
                        await getProfileByToken(result.token)
                        this.setState({
                            isSubmitting: false
                        })
                        getSaveToken(result.token)
                        goHome()
                    }
                    else{
                        this.setState({
                            isSubmitting: false
                        })
                        alert(this.context.t("이메일과 비밀번호를 확인해주세요."))
                    }
                }
                else{
                    alert(this.context.t("올바른 이메일을 입력해주세요."))
                }
            }
            else{
                alert(this.context.t("정보를 입력해주세요."))
            }
        }
    }

    _handleSavePasswordChange = () => {
        this.setState({
            savePassword: !this.state.savePassword
        })
    }

    render(){
        return(
            <SignIn 
            {...this.props} 
            {...this.state} 
            handleInputChange={this._handleInputChange}
            submit={this._submit}
            handleSavePasswordChange={this._handleSavePasswordChange}
            />
        )
    }
}

export default Container;