import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SignUp from './presenter';

class Container extends Component{
    static propTypes = {
        isLoggedIn: PropTypes.bool.isRequired,
        checkDuplicate: PropTypes.func.isRequired,
        signUp: PropTypes.func.isRequired,
        getProfileByToken: PropTypes.func.isRequired,
        getSaveToken: PropTypes.func.isRequired,
        goHome: PropTypes.func.isRequired,
        goSignIn: PropTypes.func.isRequired,
        goDetail: PropTypes.func.isRequired,
        getNotificationByToken: PropTypes.func.isRequired
    }

    static contextTypes = {
        t: PropTypes.func
    }

    constructor(props){
        super(props)
        this.state = {
            name: "",
            email: "",
            countryNumber: "",
            mobile: "",
            password: "",
            birth: "",
            countryCode: {},
            emailForm: false,
            passwordForm: false,
            birthForm: false,
            showCountryNumber: false,
            showCountryCode: false,
            isSubmitting: false,
            goRequest: props.location.state ? props.location.state.goRequest ? props.location.state.goRequest : false : false,
            photographerId: props.location.state ? props.location.state.photographerId ? props.location.state.photographerId : null : null
        }
    }

    componentDidMount = () => {
        window.scrollTo(0,0)
        if(this.props.isLoggedIn){
            this.props.goHome()
        }
    }

    _handleInputChange = (event) => {
        const { target : { value, name } } = event;
        if(name === 'mobile'){
            let numberReg = /^[0-9]*$/;
            if(numberReg.test(value)){
                this.setState({
                    [name]: value.replace(/^0+/, '')
                });
            }
        }
        else if(name === 'email'){
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
        else if(name === 'birth'){
            let numberReg = /^[0-9]*$/;
            if(numberReg.test(value)){
                let reg = /^(?:[0-9]{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[1,2][0-9]|3[0,1]))$/;
                if(reg.test(value)){
                    this.setState({
                        [name]: value,
                        birthForm: true
                    });
                }
                else{
                    this.setState({
                        [name]: value,
                        birthForm: false
                    });
                }
            }
        }
        else if(name === 'password'){
            let reg = /^(?=.*?[A-Za-z])(?=.*?[0-9]).{2,}$/ ;
            if(reg.test(value)){
                if(value.length >= 8){
                    this.setState({
                        [name]: value,
                        passwordForm: true
                    });
                }
                else{
                    this.setState({
                        [name]: value,
                        passwordForm: false
                    });
                }
            }
            else{
                this.setState({
                    [name]: value,
                    passwordForm: false
                });
            }
        }
        else{
            this.setState({
                [name]: value
            });
        }
    }

    _handleCountryNumberChange = (countryNumber) => {
        this.setState({
            countryNumber,
            showCountryNumber: false
        })
    }

    _handleCountryCodeChange = (countryCode) => {
        this.setState({
            countryCode,
            showCountryCode: false
        })
    }

    _handleShowCountryNumber = () => {
        this.setState({
            showCountryNumber: !this.state.showCountryNumber
        })
    }

    _handleShowCountryCode = () => {
        this.setState({
            showCountryCode: !this.state.showCountryCode
        })
    }

    _submit = async() => {
        const { isSubmitting, name, email, countryNumber, mobile, password, birth, countryCode, emailForm, passwordForm, birthForm, goRequest, photographerId } = this.state;
        const { checkDuplicate, signUp, getProfileByToken, getSaveToken, goHome, goDetail, getNotificationByToken } = this.props;
        if(!isSubmitting){
            if(name && email && countryNumber && mobile && password && birth && countryCode){
                if(emailForm){
                    if(birthForm){
                        if(passwordForm){
                            this.setState({
                                isSubmitting: true
                            })
                            const check = await checkDuplicate(email, mobile, countryNumber);
                            if(check.status === 'ok'){
                                const result = await signUp(email, password, name, birth, countryNumber, countryCode.value, mobile)
                                if(result.token){
                                    await getProfileByToken(result.token)
                                    await getNotificationByToken(result.token)
                                    this.setState({
                                        isSubmitting: false
                                    })
                                    getSaveToken(result.token)
                                    if(goRequest){
                                        goDetail(photographerId)
                                    }
                                    else{
                                        goHome()
                                    }
                                }
                                else{
                                    this.setState({
                                        isSubmitting: false
                                    })
                                    alert(this.context.t("오류가 발생하였습니다."))
                                }
                            }
                            else if(check.error){
                                this.setState({
                                    isSubmitting: false
                                })
                                alert(this.context.t(check.error))
                            }
                            else{
                                this.setState({
                                    isSubmitting: false
                                })
                                alert(this.context.t("오류가 발생하였습니다."))
                            }
                        }
                        else{
                            alert(this.context.t("비밀번호는 최소 8자, 영문자와 숫자를 각 1개 이상 포함해야 합니다."))
                        }
                    }
                    else{
                        alert(this.context.t("올바른 생년월일을 입력해주세요."))
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
            <SignUp 
            {...this.props} 
            {...this.state} 
            handleInputChange={this._handleInputChange}
            handleCountryNumberChange={this._handleCountryNumberChange}
            handleShowCountryNumber={this._handleShowCountryNumber}
            handleShowCountryCode={this._handleShowCountryCode}
            handleCountryCodeChange={this._handleCountryCodeChange}
            submit={this._submit}
            />
        )
    }
}

export default Container;