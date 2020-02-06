import React, { Component } from 'react';
import { Alert } from 'react-native';
import PropTypes from 'prop-types';
import SignUpScreen from './presenter';
import { COUNTRY_CODE } from '../../../utils/country';

class Container extends Component{
    static propTypes = {
        isLoggedIn: PropTypes.bool.isRequired,
        checkDuplicate: PropTypes.func.isRequired,
        signUp: PropTypes.func.isRequired,
        getProfileByToken: PropTypes.func.isRequired,
        getSaveToken: PropTypes.func.isRequired,
        getNotificationByToken: PropTypes.func.isRequired,
        getOrderListByToken: PropTypes.func.isRequired
    }

    static contextTypes = {
        t: PropTypes.func
    }

    constructor(props){
        super(props)
        const goRequest = props.navigation.getParam('goRequest', null)
        const photographerId = props.navigation.getParam('photographerId', null)
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
            goRequest: goRequest ? goRequest : false,
            photographerId: photographerId ? photographerId : null,
            countryList: [],
            fetchedProfile: false,
            fetchClear: false
        }
    }

    componentDidMount = () => {
        if(this.props.isLoggedIn){
            this.props.navigation.navigate('Home')
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
                this.props.navigation.navigate('PhotographerDetail', { photographerId: this.state.photographerId })
            }
            else{
                this.props.navigation.navigate('SignUpClear')
            }
        }
        if(prevProps !== this.props){
            const goRequest = this.props.navigation.getParam('goRequest', null)
            const photographerId = this.props.navigation.getParam('photographerId', null)
            this.setState({
                goRequest: goRequest ? goRequest : false,
                photographerId: photographerId ? photographerId : null
            })
        }
        if(!prevProps.isLoggedIn && this.props.isLoggedIn){
            this.props.navigation.navigate('Home')
        }
    }

    _handleFirstNameChange = (firstName) => {
        this.setState({
            firstName
        })
    }

    _handleLastNameChange = (lastName) => {
        this.setState({
            lastName
        })
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

    _handleMobileChange = (mobile) => {
        let numberReg = /^[0-9]*$/;
        if(numberReg.test(mobile)){
            this.setState({
                mobile: mobile.replace(/^0+/, '')
            })
        }
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

    _handleQChange = (q) => {
        this.setState({
            q
        });
        let countryList = [];
        COUNTRY_CODE.map(country => {
            if(country.label.toLowerCase().indexOf(q.toLowerCase()) > -1){
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

    _handleShowCuntryNumberChange = () => {
        this.setState({
            showCountryNumber: !this.state.showCountryNumber
        })
    }

    _openCountryNumberModal = () => {
        this.setState({
            showCountryNumber: true
        })
    }

    _closeCountryNumberModal = () => {
        this.setState({
            showCountryNumber: false
        })
    }

    _handleCountryNumberChange = (countryNumber, countryCode) => {
        this.setState({
            countryNumber,
            countryCode,
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
                                        Alert.alert(null, this.context.t("An error has occurred.."))
                                    }
                                }
                                else if(check.error){
                                    this.setState({
                                        isSubmitting: false
                                    })
                                    Alert.alert(null, this.context.t(check.error))
                                }
                                else{
                                    this.setState({
                                        isSubmitting: false
                                    })
                                    Alert.alert(null, this.context.t("An error has occurred.."))
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
                    Alert.alert(null, this.context.t("Please enter a valid email address."))
                }
            }
            else{
                Alert.alert(null, this.context.t("Please fill in the information."))
            }
        }
    }

    render(){
        return(
            <SignUpScreen 
            {...this.props} 
            {...this.state} 
            handleCountryNumberChange={this._handleCountryNumberChange}
            handleShowCuntryNumberChange={this._handleShowCuntryNumberChange}
            submit={this._submit}
            openCountryNumberModal={this._openCountryNumberModal}
            closeCountryNumberModal={this._closeCountryNumberModal}
            handleFirstNameChange={this._handleFirstNameChange}
            handleLastNameChange={this._handleLastNameChange}
            handleEmailChange={this._handleEmailChange}
            handleMobileChange={this._handleMobileChange}
            handlePasswordChange={this._handlePasswordChange}
            handlePassword2Change={this._handlePassword2Change}
            handleQChange={this._handleQChange}

            />
        )
    }
}

export default Container;