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
        goStudioSetting: PropTypes.func.isRequired,
        photographer: PropTypes.object,
        profile: PropTypes.object,
        getSetPhotographer: PropTypes.func.isRequired
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
            mobile: "",
            password: "",
            password2: "",
            countryNumber: "",
            countryCode: "",
            instagram: "",
            q: "",
            emailForm: false,
            passwordForm: false,
            password2Form: false,
            isSubmitting: false,
            showCountryNumber: false,
            countryList: [],
            fetchedPhotographer: false,
            fetchedProfile: false,
            fetchClear: false,
        }
    }

    componentDidMount = () => {
        window.scrollTo(0,0)
        if(this.props.isLoggedIn){
            this.props.goReservation()
        }
    }

    static getDerivedStateFromProps(nextProps, prevState){
        const { fetchedProfile, fetchedPhotographer } = prevState;
        if((!fetchedProfile) || (!fetchedPhotographer)){
            let update = {}
            if(nextProps.profile){
                update.fetchedProfile = true
            }
            if(nextProps.photographer){
                update.fetchedPhotographer = true
            }

            return update
        }
        else{
            return null
        }
    }

    componentDidUpdate = async(prevProps, prevState) => {
        if(this.state.fetchedProfile && this.state.fetchedPhotographer && !this.state.fetchClear){
            this.setState({
                fetchClear: true,
                isSubmitting: false
            })
            await this.props.getSaveToken(this.state.token)
            this.props.goStudioSetting()
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

    _submit = async() => {
        const { isSubmitting, firstName, lastName, email, countryNumber, countryCode, mobile, password, password2, instagram, emailForm, passwordForm, password2Form } = this.state;
        const { checkDuplicate, signUpAdmin, getProfileByToken, getSetPhotographer, getPhotographerByToken } = this.props;
        if(!isSubmitting){
            if(firstName && lastName && email && countryNumber && countryCode && mobile && password && password2 && instagram){
                if(emailForm){
                    if(passwordForm){
                        if(password === password2){
                            if(password2Form){
                                this.setState({
                                    isSubmitting: true
                                })
                                const check = await checkDuplicate(email, mobile, countryNumber, instagram);
                                if(check.status === 'ok'){
                                    const replacedInstagram = instagram.replace('instagram.com/', '')
                                    const result = await signUpAdmin(email, password, firstName, lastName, countryNumber, countryCode, mobile, replacedInstagram, 'photographer')
                                    if(result.token){
                                        await this.setState({
                                            token: result.token
                                        })
                                        await getSetPhotographer(null)
                                        await getProfileByToken(result.token)
                                        await getPhotographerByToken(result.token)
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
            handleKeyPress={this._handleKeyPress}
            />
        )
    }
}

export default Container;