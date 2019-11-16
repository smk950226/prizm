import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AdminSignIn from './presenter';

class Container extends Component{
    static propTypes = {
        isLoggedIn: PropTypes.bool.isRequired,
        login: PropTypes.func.isRequired,
        getProfileByToken: PropTypes.func.isRequired,
        getSaveToken: PropTypes.func.isRequired,
        goHome: PropTypes.func.isRequired,
        goReservation: PropTypes.func.isRequired,
        goSignUp: PropTypes.func.isRequired,
        checkPhotographer: PropTypes.func.isRequired
    }

    static contextTypes = {
        t: PropTypes.func
    }

    constructor(props){
        super(props)
        this.state = {
            email: "",
            password: "",
            emailForm: false,
            isSubmitting: false
        }
    }

    componentDidMount = () => {
        window.scrollTo(0,0)
        if(this.props.isLoggedIn){
            this.props.goReservation()
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
        const { login, getProfileByToken, getSaveToken, goReservation, checkPhotographer } = this.props;
        if(!isSubmitting){
            if(email && password){
                if(emailForm){
                    this.setState({
                        isSubmitting: true
                    })
                    const result = await login(email, password)
                    if(result.token){
                        const check = await checkPhotographer(result.token)
                        if(check.status === 'ok'){
                            await getProfileByToken(result.token)
                            this.setState({
                                isSubmitting: false
                            })
                            getSaveToken(result.token)
                            goReservation()
                        }
                        else if(check.error){
                            this.setState({
                                isSubmitting: false
                            })
                            alert(this.context.t("사진 작가 계정이 아닙니다."))
                        }
                        else{
                            this.setState({
                                isSubmitting: false
                            })
                            alert(this.context.t("이메일과 비밀번호를 확인해주세요."))
                        }
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

    render(){
        return(
            <AdminSignIn 
            {...this.props} 
            {...this.state} 
            handleInputChange={this._handleInputChange}
            submit={this._submit}
            />
        )
    }
}

export default Container;