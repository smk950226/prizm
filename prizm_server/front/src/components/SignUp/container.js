import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SignUp from './presenter';
import { COUNTRY_CODE } from '../../utils/country';

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
        getNotificationByToken: PropTypes.func.isRequired,
        getOrderListByToken: PropTypes.func.isRequired,
        goSignUpClear: PropTypes.func.isRequired,
        lang: PropTypes.string
    }

    static contextTypes = {
        t: PropTypes.func
    }

    constructor(props){
        super(props)
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            countryNumber: "",
            countryCode: "",
            mobile: "",
            password: "",
            password2: "",
            q: "",
            emailForm: false,
            passwordForm: false,
            password2Form: false,
            showCountryNumber: false,
            isSubmitting: false,
            goRequest: props.location.state ? props.location.state.goRequest ? props.location.state.goRequest : false : false,
            photographerId: props.location.state ? props.location.state.photographerId ? props.location.state.photographerId : null : null,
            countryList: [],
            fetchedProfile: false,
            fetchClear: false,
            findedCountry: {}
        }
    }

    componentDidMount = () => {
        window.scrollTo(0,0)
        if(this.props.isLoggedIn){
            this.props.goHome()
        }
        const { lang } = this.props;
        if(lang){
            let findedCountry = COUNTRY_CODE.find(country => country.value.toLocaleLowerCase() === lang)
            if(findedCountry){
                this.setState({
                    findedCountry
                })
            }
        }
    }

    static getDerivedStateFromProps(nextProps, prevState){
        const { fetchedProfile } = prevState;
        if(!fetchedProfile){
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

    componentDidUpdate = (prevProps, prevState) => {
        if(this.state.fetchedProfile && !this.state.fetchClear){
            this.setState({
                loading: false,
                fetchClear: true,
                isSubmitting: false
            })
            this.props.getSaveToken(this.state.token)
            if(this.state.goRequest){
                this.props.goDetail(this.state.photographerId)
            }
            else{
                this.props.goSignUpClear()
            }
        }
        if(prevProps.lang !== this.props.lang){
            const { lang } = this.props;
            if(lang){
                let findedCountry = COUNTRY_CODE.find(country => country.value.toLocaleLowerCase() === lang)
                if(findedCountry){
                    this.setState({
                        findedCountry
                    })
                }
            }
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
        else if(name === 'password'){
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

    _submit = async() => {
        const { isSubmitting, firstName, lastName, email, countryNumber, countryCode, mobile, password, password2, emailForm, passwordForm, password2Form } = this.state;
        const { checkDuplicate, signUp, getProfileByToken, getNotificationByToken, getOrderListByToken } = this.props;
        if(!isSubmitting){
            if(firstName && lastName && email && countryNumber && countryCode && mobile && password && password2){
                if(emailForm){
                    if(passwordForm){
                        if(password === password2){
                            if(password2Form){
                                this.setState({
                                    isSubmitting: true
                                })
                                const check = await checkDuplicate(email, mobile, countryNumber);
                                if(check.status === 'ok'){
                                    const result = await signUp(email, password, firstName, lastName, countryNumber, countryCode, mobile)
                                    if(result.token){
                                        await this.setState({
                                            token: result.token
                                        })
                                        await getProfileByToken(result.token)
                                        await getNotificationByToken(result.token)
                                        await getOrderListByToken(result.token)
                                    }
                                    else{
                                        this.setState({
                                            isSubmitting: false
                                        })
                                        alert(this.context.t("An error has occurred.."))
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
                    alert(this.context.t("Please enter a valid email address."))
                }
            }
            else{
                alert(this.context.t("Please fill in the information."))
            }
        }
    }

    _handleKeyPress = async(event) => {
        const { key } = event;
        if (key === "Enter") {
            event.preventDefault();
            this._submit()
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
            submit={this._submit}
            openShowCountryNumber={this._openShowCountryNumber}
            closeShowCountryNumber={this._closeShowCountryNumber}
            handleKeyPress={this._handleKeyPress}
            />
        )
    }
}

export default Container;