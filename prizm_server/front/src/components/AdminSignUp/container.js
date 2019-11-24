import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AdminSignUp from './presenter';
import { COUNTRY_CODE } from '../../utils/country';

class Container extends Component{
    static propTypes = {
        isLoggedIn: PropTypes.bool.isRequired,
        checkDuplicate: PropTypes.func.isRequired,
        signUpAdmin: PropTypes.func.isRequired,
        getProfileByToken: PropTypes.func.isRequired,
        getSaveToken: PropTypes.func.isRequired,
        goHome: PropTypes.func.isRequired,
        goReservation: PropTypes.func.isRequired,
        goSignIn: PropTypes.func.isRequired,
        getPhotographerByToken: PropTypes.func.isRequired,
        goStudioSetting: PropTypes.func.isRequired
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
            countryCode: "",
            birth: "",
            instagram: "",
            q: "",
            emailForm: false,
            passwordForm: false,
            birthForm: false,
            isSubmitting: false,
            showCountryNumber: false,
            fetchedToken: false,
            fetchedProfile: false,
            fetchClear: false,
            countryList: []
        }
    }

    componentDidMount = () => {
        window.scrollTo(0,0)
        if(this.props.isLoggedIn){
            this.props.goReservation()
        }
    }

    componentDidUpdate = (prevProps, prevState) => {
        if(!prevProps.isLoggedIn && this.props.isLoggedIn){
            this.setState({
                fetchedToken: true
            })
        }
        if(this.state.fetchedProfile && this.state.fetchedToken && !this.state.fetchClear){
            this.setState({
                fetchClear: true,
            })
            this.props.goStudioSetting()
        }
    }

    static getDerivedStateFromProps(nextProps, prevState){
        const { fetchedProfile } = prevState;
        if((!fetchedProfile)){
            let update = {}
            if(nextProps.profile){
                update.fetchedProfile = true
            }

            return update
        }
        else{
            return null
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
        else if(name === 'q'){
            this.setState({
                [name]: value
            });
            let countryList = [];
            COUNTRY_CODE.map(country => {
                if(country.label.toLowerCase().indexOf(value.toLowerCase()) > -1){
                    countryList.push(country)
                    return null;
                }
                else{
                    return null
                }
            })
            this.setState({
                countryList
            })
        }
        else{
            this.setState({
                [name]: value
            });
        }
    }

    _submit = async() => {
        const { isSubmitting, name, email, countryNumber, countryCode, mobile, password, birth, instagram, emailForm, passwordForm, birthForm } = this.state;
        const { checkDuplicate, signUpAdmin, getProfileByToken, getSaveToken, getPhotographerByToken } = this.props;
        if(!isSubmitting){
            if(name && email && countryNumber && countryCode && mobile && password && birth && instagram){
                if(emailForm){
                    if(birthForm){
                        if(passwordForm){
                            this.setState({
                                isSubmitting: true
                            })
                            const check = await checkDuplicate(email, mobile, countryNumber, instagram);
                            if(check.status === 'ok'){
                                const result = await signUpAdmin(email, password, name, birth, countryNumber, countryCode, mobile, instagram, 'photographer')
                                if(result.token){
                                    await getProfileByToken(result.token)
                                    await getPhotographerByToken(result.token)
                                    this.setState({
                                        isSubmitting: false
                                    })
                                    await getSaveToken(result.token)
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

    _handleCountryNumberChange = (countryNumber, countryCode) => {
        this.setState({
            countryNumber,
            countryCode,
            showCountryNumber: false
        })
    }

    _handleShowCountryNumber = () => {
        this.setState({
            showCountryNumber: !this.state.showCountryNumber
        })
    }

    _openShowCountryNumber = () => {
        this.setState({
            showCountryNumber: true
        })
    }

    _closeShowCountryNumber = () => {
        this.setState({
            showCountryNumber: false
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
            openShowCountryNumber={this._openShowCountryNumber}
            closeShowCountryNumber={this._closeShowCountryNumber}
            />
        )
    }
}

export default Container;