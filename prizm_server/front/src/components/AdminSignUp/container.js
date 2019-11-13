import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AdminSignUp from './presenter';

class Container extends Component{
    static propTypes = {
        isLoggedIn: PropTypes.bool.isRequired,
        checkDuplicate: PropTypes.func.isRequired,
        signUpAdmin: PropTypes.func.isRequired,
        getProfileByToken: PropTypes.func.isRequired,
        getSaveToken: PropTypes.func.isRequired,
        goHome: PropTypes.func.isRequired,
        goSignIn: PropTypes.func.isRequired,
    }

    static contextTypes = {
        t: PropTypes.func
    }

    constructor(props){
        super(props)
        this.state = {
            name: "",
            email: "",
            mobile: "",
            password: "",
            countryNumber: "",
            birth: "",
            instagram: "",
            emailForm: false,
            passwordForm: false,
            birthForm: false,
            isSubmitting: false,
            showCountryNumber: false
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
        else if(name === 'instagram'){
            this.setState({
                [name]: value.replace(/^@+/, '')
            });
        }
        else{
            this.setState({
                [name]: value
            });
        }
    }

    _submit = async() => {
        const { isSubmitting, name, email, countryNumber, mobile, password, birth, instagram, emailForm, passwordForm, birthForm } = this.state;
        const { checkDuplicate, signUpAdmin, getProfileByToken, getSaveToken, goHome } = this.props;
        if(!isSubmitting){
            if(name && email && countryNumber && mobile && password && birth && instagram){
                if(emailForm){
                    if(birthForm){
                        if(passwordForm){
                            this.setState({
                                isSubmitting: true
                            })
                            const check = await checkDuplicate(email, mobile, countryNumber);
                            if(check.status === 'ok'){
                                const result = await signUpAdmin(email, password, name, birth, countryNumber, mobile, instagram, 'photographer')
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

    _handleCountryNumberChange = (countryNumber) => {
        this.setState({
            countryNumber,
            showCountryNumber: false
        })
    }

    _handleShowCountryNumber = () => {
        this.setState({
            showCountryNumber: !this.state.showCountryNumber
        })
    }

    render(){
        return(
            <AdminSignUp 
            {...this.props} 
            {...this.state} 
            handleInputChange={this._handleInputChange}
            submit={this._submit}
            handleCountryNumberChange={this._handleCountryNumberChange}
            handleShowCountryNumber={this._handleShowCountryNumber}

            />
        )
    }
}

export default Container;