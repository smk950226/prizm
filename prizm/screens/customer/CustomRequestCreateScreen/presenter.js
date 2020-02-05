import React, { Component, Fragment } from 'react';
import { View, Text, Dimensions, TouchableWithoutFeedback, Image, ScrollView, TextInput, Alert, SafeAreaView, TouchableHighlightBase } from 'react-native';
import PropTypes from 'prop-types';
import styles from '../../../styles';
import MapView, { Marker } from 'react-native-maps';
import * as Progress from 'react-native-progress';
import Swiper from '../../../components/Swiper';
import CalendarPicker from 'react-native-calendar-picker';
import Modal from 'react-native-modal';
import DatePicker from 'react-native-datepicker';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_API_KEY_GEO_CODING } from '../../../config/secrets';
import uuidv4 from 'uuid/v4';
import Flag from 'react-native-flags';
import { COUNTRY_CODE } from '../../../utils/country';
const { width, height } = Dimensions.get('window');

const statusBarHeight = getStatusBarHeight()

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

class CustomRequestCreateScreen extends Component{
    static propTypes = {
        isLoggedIn: PropTypes.bool.isRequired,
        profile: PropTypes.object,
        login: PropTypes.func.isRequired,
        getProfileByToken: PropTypes.func.isRequired,
        getSaveToken: PropTypes.func.isRequired,
        checkDuplicate: PropTypes.func.isRequired,
        signUp: PropTypes.func.isRequired,
        getNotificationByToken: PropTypes.func.isRequired,
        getOrderListByToken: PropTypes.func.isRequired,
        checkMessageByToken: PropTypes.func.isRequired,
        createCustomRequest: PropTypes.func.isRequired,
        createCustomRequestByToken: PropTypes.func.isRequired,
        getProfile: PropTypes.func.isRequired,
        getOrderDetail: PropTypes.func.isRequired,
        sendVerificationEmail: PropTypes.func.isRequired,
        cancelCustomRequest: PropTypes.func.isRequired
    }

    static contextTypes = {
        t: PropTypes.func
    }

    constructor(props){
        super(props);
        const { isLoggedIn } = props;
        this.state = {
            isLoggedIn: isLoggedIn,
            totalStep: isLoggedIn ? 3 : 4,
            step: 1,
            option: [],
            extraOption: '',
            people: 0,
            extraPeople: '',
            dateOption: 0,
            showCalendar1: false,
            showCalendar2: false,
            selectedDate: "",
            selectedStartDate: "",
            selectedEndDate: "",
            dateConfirm: false,
            selectDateStep: 1,
            selectedHour: "14",
            selectedMin: "00",
            dateRange: [],
            hour: 0,
            extraHour: '',
            locationOption: 1,
            locations: [],
            showMap: false,
            locationSearched: false,
            searchedLocations: [],
            selectedLocation: {},
            auth: 'signup',
            loginEmail: '',
            loginPassword: '',
            loginEmailForm: false,
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
            countryList: [],
            confirmed: false,
            fetchedProfile: false,
            fetchClear: this.props.isLoggedIn ? true : false,
            isSendingEmail: false,
            isLoading: false,
            showCancel: false,
            isCancel: false,
            showCreate: false,
            showLanding: true,
            showPlaceList: false
        }
    }

    _next = async() => {
        const { step, isLoggedIn, option, extraOption, people, extraPeople, dateOption, dateConfirm, selectedDate, selectedHour, selectedMin, selectedStartDate, selectedEndDate, hour, extraHour, locationOption, locations, isSubmitting } = this.state;
        const { createCustomRequest, profile, sendVerificationEmail } = this.props;
        if(step === 1){
            if((((option.length > 0) && ((option.indexOf('extra') < 0))) || (extraOption !== '')) && (((people !==0) && (people !==-1)) || (extraPeople !== ''))){
                this.setState({
                    step: 2
                })
                this.swiper.scrollBy(1, true)
            }
        }
        else if(step === 2){
            if(dateConfirm){
                if(dateOption === 1){
                    if(selectedDate && selectedHour && selectedMin){
                        if(((hour !== 0) && (hour !== -1)) || (extraHour !== '')){
                            this.setState({
                                step: 3
                            })
                            this.swiper.scrollBy(1, true)
                        }
                    }
                }
                else if(dateOption === 2){
                    if(selectedStartDate && selectedEndDate){
                        if(((hour !== 0) && (hour !== -1)) || (extraHour !== '')){
                            this.setState({
                                step: 3
                            })
                            this.swiper.scrollBy(1, true)
                        }
                    }
                }
            }
        }
        else if(step === 3){
            if(isLoggedIn){
                if(locationOption === 1){
                    if(locations && locations.length > 0){
                        if(!isSubmitting){
                            this.setState({
                                isSubmitting: true
                            })
                            let photograpyTypeTemp = []
                            option.map(op => {
                                if(op === 'extra'){
                                    photograpyTypeTemp.push(extraOption)
                                    return null
                                }
                                else{
                                    photograpyTypeTemp.push(op)
                                    return null
                                }
                            })
                            let photograpyType = ""
                            photograpyTypeTemp.map((pho, index) => {
                                if(index === 0){
                                    photograpyType += pho
                                }
                                else{
                                    photograpyType += `,${pho}`
                                }
                            })
                            let person = people
                            if(people === -1){
                                person = Number(extraPeople)
                            }
                            let time = hour
                            if(hour === -1){
                                time = Number(extraHour)
                            }
                            let date = ''
                            if(dateOption === 1){
                                date = selectedDate ? String(selectedDate.getFullYear()).concat('-', String(selectedDate.getMonth() + 1), '-', String(selectedDate.getDate())) : ""
                            }
                            let startDate = ''
                            let endDate = ''
                            if(dateOption === 2){
                                startDate = selectedStartDate ? String(selectedStartDate.getFullYear()).concat('-', String(selectedStartDate.getMonth() + 1), '-', String(selectedStartDate.getDate())) : ""
                                endDate = selectedEndDate ? String(selectedEndDate.getFullYear()).concat('-', String(selectedEndDate.getMonth() + 1), '-', String(selectedEndDate.getDate())) : ""
                            }
                            let submitHour = selectedHour
        
                            const submit = await createCustomRequest(photograpyType, person, time, dateOption, date, submitHour, selectedMin, startDate, endDate, locationOption, locations)
                            if(submit.status === 'ok'){
                                if(!profile.is_verified){
                                    const result = await sendVerificationEmail()
                                }
                                this.setState({
                                    isSubmitting: false,
                                    confirmed: true
                                })
                            }
                            else if(submit.error){
                                this.setState({
                                    isSubmitting: false,
                                    confirmed: false
                                })
                                Alert.alert(null, submit.error)
                            }
                            else{
                                this.setState({
                                    isSubmitting: false,
                                    confirmed: false
                                })
                                Alert.alert(null, this.context.t("An error has occurred.."))
                            }
                        }
                    }
                }
                else if(locationOption === 2){
                    if(!isSubmitting){
                        this.setState({
                            isSubmitting: true
                        })
                        let photograpyTypeTemp = []
                        option.map(op => {
                            if(op === 'extra'){
                                photograpyTypeTemp.push(extraOption)
                                return null
                            }
                            else{
                                photograpyTypeTemp.push(op)
                                return null
                            }
                        })
                        let photograpyType = ""
                        photograpyTypeTemp.map((pho, index) => {
                            if(index === 0){
                                photograpyType += pho
                            }
                            else{
                                photograpyType += `,${pho}`
                            }
                        })
                        let person = people
                        if(people === -1){
                            person = Number(extraPeople)
                        }
                        let time = hour
                        if(hour === -1){
                            time = Number(extraHour)
                        }
                        let date = ''
                        if(dateOption === 1){
                            date = selectedDate ? String(selectedDate.getFullYear()).concat('-', String(selectedDate.getMonth() + 1), '-', String(selectedDate.getDate())) : ""
                        }
                        let startDate = ''
                        let endDate = ''
                        if(dateOption === 2){
                            startDate = selectedStartDate ? String(selectedStartDate.getFullYear()).concat('-', String(selectedStartDate.getMonth() + 1), '-', String(selectedStartDate.getDate())) : ""
                            endDate = selectedEndDate ? String(selectedEndDate.getFullYear()).concat('-', String(selectedEndDate.getMonth() + 1), '-', String(selectedEndDate.getDate())) : ""
                        }
                        let submitHour = selectedHour
    
                        const submit = await createCustomRequest(photograpyType, person, time, dateOption, date, submitHour, selectedMin, startDate, endDate, locationOption, locations)
                        if(submit.status === 'ok'){
                            if(!profile.is_verified){
                                const result = await sendVerificationEmail()
                            }
                            this.setState({
                                isSubmitting: false,
                                confirmed: true
                            })
                        }
                        else if(submit.error){
                            this.setState({
                                isSubmitting: false,
                                confirmed: false
                            })
                            Alert.alert(null, submit.error)
                        }
                        else{
                            this.setState({
                                isSubmitting: false,
                                confirmed: false
                            })
                            Alert.alert(null, this.context.t("An error has occurred.."))
                        }
                    }
                }
            }
            else{
                if(locationOption === 1){
                    if(locations && locations.length > 0){
                        this.setState({
                            step: 4
                        })
                        this.swiper.scrollBy(1, true)
                    }
                }
                else if(locationOption === 2){
                    this.setState({
                        step: 4
                    })
                    this.swiper.scrollBy(1, true)
                }
            }
            
        }
    }

    _previous = async() => {
        const { step, totalStep } = this.state;
        if(step > 1){
            await this.setState({
                step: step - 1
            })
            this.swiper.scrollBy(-1, true)
        }
    }

    _handleExtraOptionChange = (extraOption) => {
        this.setState({
            extraOption
        })
    }

    _handleChangeOption = (selectedOption) => {
        const { option } = this.state;
        if(option.length > 0){
            const find = option.indexOf(selectedOption)
            if(find > -1){
                let newOption = [];
                option.map(op => {
                    if(op === selectedOption){
                        return null
                    }
                    else{
                        newOption.push(op)
                        return null
                    }
                })
                this.setState({
                    option: newOption
                })
            }
            else{
                let newOption = option;
                newOption.push(selectedOption)
                this.setState({
                    option: newOption
                })
            }
        }
        else{
            let newOption = option;
            newOption.push(selectedOption)
            this.setState({
                option: newOption
            })
        }
    }

    _handleChangePeople = (people) => {
        if(this.state.people === people){
            this.setState({
                people: 0,
                extraPeople: ''
            })
        }
        else{
            this.setState({
                people,
                extraPeople: ''
            })
        }
    }

    _handleExtraPeopleChange = (extraPeople) => {
        let numberReg = /^[0-9]*$/;
        if(numberReg.test(extraPeople)){
            this.setState({
                extraPeople
            })
        }
    }

    _handleChangeDateOption = (dateOption) => {
        if(dateOption === 1){
            this.setState({
                dateOption,
                showCalendar1: true,
                showCalendar2: false,
                selectedDate: "",
                dateConfirm: false,
                selectedHour: "14",
                selectedMin: "00",
                selectDateStep: 1,
                selectedStartDate: "",
                selectedEndDate: ""
            })
        }
        else{
            this.setState({
                dateOption,
                showCalendar1: false,
                showCalendar2: true,
                selectedDate: "",
                dateConfirm: false,
                selectedHour: "",
                selectedMin: "",
                selectDateStep: 1,
                selectedStartDate: "",
                selectedEndDate: ""
            })
        }
    }

    _confirmDate = () => {
        const { dateOption, selectedDate, selectedHour, selectedMin, selectedStartDate, selectedEndDate } = this.state;
        if(dateOption === 1){
            if(selectedDate && selectedHour && selectedMin){
                this.setState({
                    dateConfirm: true,
                    showCalendar1: false
                })
            }
            else{
                this.setState({
                    dateConfirm: false
                })
                Alert.alert(null, this.context.t("Please select time."))
            }
        }
        else{
            if(selectedStartDate && selectedEndDate){
                this.setState({
                    dateConfirm: true,
                    showCalendar2: false
                })
            }
            else{
                this.setState({
                    dateConfirm: false
                })
                Alert.alert(null, this.context.t("Please select your date range."))
            }
        }
    }

    _openCalendar1 = (selectDateStep) => {
        if(selectDateStep === 1){
            this.setState({
                showCalendar1: true,
                selectDateStep: 1
            })
        }
        else{
            this.setState({
                showCalendar1: true,
                selectDateStep: 2
            })
        }
    }

    _closeCalendar1 = () => {
        this.setState({
            showCalendar1: false
        })
    }

    _openCalendar2 = () => {
        this.setState({
            showCalendar2: true
        })
    }

    _closeCalendar2 = () => {
        this.setState({
            showCalendar2: false
        })
    }

    _selectDate = (selectedDate) => {
        this.setState({
            selectedDate: new Date(selectedDate)
        })
    }

    _selectDateRange = (date, type) => {
        if(type === 'END_DATE') {
            this.setState({
                selectedEndDate: new Date(date),
                dateRange: [this.state.selectedStartDate, new Date(date)]
            });
        } 
        else{
            this.setState({
                selectedStartDate: new Date(date),
                selectedEndDate: null,
                dateRange: []
            });
        }
    }

    _handleChangeTimes = (date) => {
        const dateList = date.split(':')
        this.setState({
            selectedHour: dateList[0],
            selectedMin: dateList[1]
        })
    };

    _changeDateStep = (selectDateStep) => {
        if(selectDateStep === 2){
            if(this.state.selectedDate){
                this.setState({
                    selectDateStep
                })
            }
            else{
                Alert.alert(null, this.context.t("Please select date."))
            }
        }
        else{
            this.setState({
                selectDateStep
            })
        }
    }

    _handleChangeHour = (hour) => {
        if(this.state.hour === hour){
            this.setState({
                hour: 0,
                extraHour: ''
            })
        }
        else{
            this.setState({
                hour,
                extraHour: ''
            })
        }
    }

    _handleExtraHourChange = (extraHour) => {
        let numberReg = /^[0-9]*$/;
        if(numberReg.test(extraHour)){
            this.setState({
                extraHour
            })
        }
    }

    _handleChangeLocationOption = (locationOption) => {
        if(this.state.locationOption === locationOption){
            this.setState({
                locationOption: 0,
                locations: [],
                showMap: false
            })
        }
        else{
            this.setState({
                locationOption,
                locations: [],
                showMap: false
            })
        }
    }

    _openMap = () => {
        this.setState({
            showMap: true
        })
    }

    _closeMap = () => {
        this.setState({
            showMap: false
        })
    }

    _handleShowPlaceListChange = (showPlaceList) => {
        this.setState({
            showPlaceList
        })
    }

    _removeLocation = (locationId) => {
        let newLocations = []
        this.state.locations.map(location => {
            if(location.id === locationId){
                return null
            }
            else{
                newLocations.push(location)
                return null
            }
        })
        this.setState({
            locations: newLocations
        })
    }

    _selectLocation = (selectedLocation) => {
        const { locations } = this.state;
        const find = locations.find(lo => (lo.lat === selectedLocation.geometry.latitude) && lo.lng === selectedLocation.geometry.longitude)
        if(find){
            let newLocation = []
            locations.map(location => {
                if((location.lat === selectedLocation.geometry.latitude) && (location.lng === selectedLocation.geometry.longitude)){
                    return null
                }
                else{
                    newLocation.push(location)
                    return null
                }
            })
            this.setState({
                locations: newLocation
            })
        }
        else{
            this.setState({
                locations: [...this.state.locations, {
                    id: uuidv4(),
                    name: selectedLocation.name,
                    lat: selectedLocation.geometry.latitude,
                    lng: selectedLocation.geometry.longitude
                }]
            })
        }
    }

    _handleChangeAuth = (auth) => {
        this.setState({
            auth
        })
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

    _openCuntryNumberModal = () => {
        this.setState({
            showCountryNumber: true
        })
    }

    _closeCuntryNumberModal = () => {
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

    _handleLoginEmailChange = (loginEmail) => {
        let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ;
        if(reg.test(loginEmail)){
            this.setState({
                loginEmail,
                loginEmailForm: true
            })
        }
        else{
            this.setState({
                loginEmail,
                loginEmailForm: false
            })
        }
    }

    _handleLoginPasswordChange = (loginPassword) => {
        this.setState({
            loginPassword
        })
    }

    _login = async() => {
        const { isSubmitting, loginEmail,  loginPassword, loginEmailForm, option, extraOption, people, extraPeople, hour, extraHour, dateOption, selectedDate, selectedHour, selectedMin, selectedStartDate, selectedEndDate, locationOption, locations } = this.state;
        const { login, getProfileByToken, getSaveToken, getNotificationByToken, getOrderListByToken, checkMessageByToken, createCustomRequestByToken } = this.props;
        if(!isSubmitting){
            if(loginEmail && loginPassword){
                if(loginEmailForm){
                    this.setState({
                        isSubmitting: true
                    })
                    const result = await login(loginEmail, loginPassword)
                    if(result.token){
                        await getProfileByToken(result.token)
                        await getNotificationByToken(result.token)
                        await getOrderListByToken(result.token)
                        await checkMessageByToken(result.token)
                        
                        let photograpyTypeTemp = []
                        option.map(op => {
                            if(op === 'extra'){
                                photograpyTypeTemp.push(extraOption)
                                return null
                            }
                            else{
                                photograpyTypeTemp.push(op)
                                return null
                            }
                        })
                        let photograpyType = ""
                        photograpyTypeTemp.map((pho, index) => {
                            if(index === 0){
                                photograpyType += pho
                            }
                            else{
                                photograpyType += `,${pho}`
                            }
                        })
                        let person = people
                        if(people === -1){
                            person = Number(extraPeople)
                        }
                        let time = hour
                        if(hour === -1){
                            time = Number(extraHour)
                        }
                        let date = ''
                        if(dateOption === 1){
                            date = selectedDate ? String(selectedDate.getFullYear()).concat('-', String(selectedDate.getMonth() + 1), '-', String(selectedDate.getDate())) : ""
                        }
                        let startDate = ''
                        let endDate = ''
                        if(dateOption === 2){
                            startDate = selectedStartDate ? String(selectedStartDate.getFullYear()).concat('-', String(selectedStartDate.getMonth() + 1), '-', String(selectedStartDate.getDate())) : ""
                            endDate = selectedEndDate ? String(selectedEndDate.getFullYear()).concat('-', String(selectedEndDate.getMonth() + 1), '-', String(selectedEndDate.getDate())) : ""
                        }
                        let submitHour = selectedHour
                        const submit = await createCustomRequestByToken(result.token, photograpyType, person, time, dateOption, date, submitHour, selectedMin, startDate, endDate, locationOption, locations)
                        if(submit.status === 'ok'){
                            getSaveToken(result.token)
                            this.setState({
                                isSubmitting: false,
                                confirmed: true
                            })
                        }
                        else if(submit.error){
                            getSaveToken(result.token)
                            this.setState({
                                isSubmitting: false,
                                confirmed: false
                            })
                            Alert.alert(null, submit.error)
                        }
                        else{
                            getSaveToken(result.token)
                            this.setState({
                                isSubmitting: false,
                                confirmed: false
                            })
                            Alert.alert(null, this.context.t("An error has occurred.."))
                        }
                    }
                    else{
                        this.setState({
                            isSubmitting: false
                        })
                        Alert.alert(null, this.context.t("Please check your email and password again."))
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

    _signup = async() => {
        const { isSubmitting, firstName, lastName, email, countryNumber, countryCode, mobile, password, password2, emailForm, passwordForm, password2Form, option, extraOption, people, extraPeople, hour, extraHour, dateOption, selectedDate, selectedHour, selectedMin, selectedStartDate, selectedEndDate, locationOption, locations } = this.state;
        const { checkDuplicate, signUp, getProfileByToken, getSaveToken, getNotificationByToken, getOrderListByToken, createCustomRequestByToken } = this.props;
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
                                        await getProfileByToken(result.token)
                                        await getNotificationByToken(result.token)
                                        await getOrderListByToken(result.token)

                                        let photograpyTypeTemp = []
                                        option.map(op => {
                                            if(op === 'extra'){
                                                photograpyTypeTemp.push(extraOption)
                                                return null
                                            }
                                            else{
                                                photograpyTypeTemp.push(op)
                                                return null
                                            }
                                        })
                                        let photograpyType = ""
                                        photograpyTypeTemp.map((pho, index) => {
                                            if(index === 0){
                                                photograpyType += pho
                                            }
                                            else{
                                                photograpyType += `,${pho}`
                                            }
                                        })
                                        let person = people
                                        if(people === -1){
                                            person = Number(extraPeople)
                                        }
                                        let time = hour
                                        if(hour === -1){
                                            time = Number(extraHour)
                                        }
                                        let date = ''
                                        if(dateOption === 1){
                                            date = selectedDate ? String(selectedDate.getFullYear()).concat('-', String(selectedDate.getMonth() + 1), '-', String(selectedDate.getDate())) : ""
                                        }
                                        let startDate = ''
                                        let endDate = ''
                                        if(dateOption === 2){
                                            startDate = selectedStartDate ? String(selectedStartDate.getFullYear()).concat('-', String(selectedStartDate.getMonth() + 1), '-', String(selectedStartDate.getDate())) : ""
                                            endDate = selectedEndDate ? String(selectedEndDate.getFullYear()).concat('-', String(selectedEndDate.getMonth() + 1), '-', String(selectedEndDate.getDate())) : ""
                                        }
                                        let submitHour = selectedHour
                                        const submit = await createCustomRequestByToken(result.token, photograpyType, person, time, dateOption, date, submitHour, selectedMin, startDate, endDate, locationOption, locations)
                                        if(submit.status === 'ok'){
                                            getSaveToken(result.token)
                                            this.setState({
                                                isSubmitting: false,
                                                confirmed: true
                                            })
                                        }
                                        else if(submit.error){
                                            getSaveToken(result.token)
                                            this.setState({
                                                isSubmitting: false,
                                                confirmed: false
                                            })
                                            Alert.alert(null, submit.error)
                                        }
                                        else{
                                            getSaveToken(result.token)
                                            this.setState({
                                                isSubmitting: false,
                                                confirmed: false
                                            })
                                            Alert.alert(null, this.context.t("An error has occurred.."))
                                        }
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

    _send = async() => {
        const { isSendingEmail } = this.state;
        const { sendVerificationEmail, isLoggedIn } = this.props;
        if(!isSendingEmail){
            if(isLoggedIn){
                const result = await sendVerificationEmail()
                if(result.status === 'ok'){
                    this.setState({
                        isSendingEmail: false
                    })
                    Alert.alert(null, this.context.t("A verification email has been sent. Please check your inbox."))
                }
                else if(result.error){
                    this.setState({
                        isSendingEmail: false
                    })
                    Alert.alert(null, result.error)
                }
                else{
                    this.setState({
                        isSendingEmail: false
                    })
                    Alert.alert(null, this.context.t("An error has occurred.."))
                }
            }
        }
    }

    render(){
        const { 
            isLoggedIn,
            totalStep, 
            step, 
            option,
            extraOption,
            people,
            extraPeople,
            showCalendar1, 
            showCalendar2, 
            dateOption, 
            selectDateStep, 
            selectedDate, 
            selectedHour, 
            selectedMin, 
            selectedStartDate, 
            selectedEndDate, 
            dateConfirm,
            hour,
            extraHour,
            locationOption,
            locations,
            showMap,
            selectedLocation,
            showPlaceList,
            auth,
            loginEmail,
            loginPassword,
            firstName,
            lastName,
            email,
            countryNumber,
            mobile,
            password,
            password2,
            q,
            showCountryNumber,
            isSubmitting,
            countryList,
            confirmed,
            fetchClear,
            profile,
            isSendingEmail
        } = this.state;
        return(
            (confirmed && fetchClear && profile) ? (
                profile.is_verified ? (
                    <View style={[styles.container, styles.bgWhite, styles.center, styles.px15]}>
                        <Fragment>
                            <Image source={require('../../../assets/images/request_complete.png')} style={[{width: 2338*0.1, height: 1668*0.1}, styles.alignSelfCenter]} />
                            <Text style={[styles.font14, styles.mt20, styles.textCenter]}>
                                {this.context.t("Your request has been succesfully submitted and sent to PRIZM photographers.")}
                            </Text>
                            <Text style={[styles.font14, styles.mt5, styles.textCenter]}>
                                {this.context.t("We will reach you via email and SMS soon. Thank you!")}
                            </Text>
                            <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Home')}>
                                <View style={[styles.bgGray33, styles.widthFull, styles.center, styles.maxWidth360, styles.py15, styles.alignSelfCenter, styles.mt20]}>
                                    <Text style={[styles.font16, styles.fontBold, styles.white]}>
                                        {this.context.t("HOME")}
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </Fragment>
                    </View>
                ) : (
                    <View style={[styles.container, styles.bgWhite, styles.center, styles.px15]}>
                        <Fragment>
                            <Text style={[styles.font14, styles.textCenter]}>
                                {this.context.t("Your Custom Request has been submitted!")}
                            </Text>
                            <Image source={require('../../../assets/images/email_verifing.png')} style={[{width: 2338*0.1, height: 1668*0.1}, styles.alignSelfCenter]} />
                            <Text style={[styles.font14, styles.mt20, styles.textCenter]}>
                                {this.context.t("We sent a ")}<Text style={[styles.pink]}>{this.context.t("verification email ")}</Text>{this.context.t("to the following address :")}
                            </Text>
                            <Text style={[styles.font14, styles.mt10, styles.textCenter]}>
                                {profile.email}
                            </Text>
                            <Text style={[styles.font14, styles.mt10, styles.textCenter, styles.pink]}>
                                {this.context.t("Please verify yourself by clicking the link attached in the email.")}
                            </Text>
                            <Text style={[styles.font14, styles.mt5, styles.textCenter]}>
                                {this.context.t("When you complete the email verification, your request details will be sent to photographers and you will soon receive various proposals.")}
                            </Text>
                            <View style={[styles.row, styles.alignItemsCenter, styles.justifyContentBetween, styles.mt20]}>
                                <View style={[styles.flex1, styles.pr5]}>
                                    <TouchableWithoutFeedback onPress={this._send}>
                                        <View style={[styles.bgGray33, styles.widthFull, styles.center, styles.maxWidth360, styles.py15, styles.alignSelfCenter, styles.mt20, isSendingEmail ? { opacity: 0.7 } : null]}>
                                            <Text style={[styles.font16, styles.fontBold, styles.white]}>
                                                {this.context.t("RESEND")}
                                            </Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                                <View style={[styles.flex1, styles.pl5]}>
                                    <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Home')}>
                                        <View style={[styles.bgGray33, styles.widthFull, styles.center, styles.maxWidth360, styles.py15, styles.alignSelfCenter, styles.mt20]}>
                                            <Text style={[styles.font16, styles.fontBold, styles.white]}>
                                                {this.context.t("HOME")}
                                            </Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                            </View>
                        </Fragment>
                    </View>
                )
            ) : (
                <View style={[styles.container, styles.bgWhite]}>
                    <Progress.Bar 
                    progress={step/totalStep} 
                    width={width} 
                    color={'rgb(112,112,112)'}
                    height={5}
                    borderRadius={0}
                    borderWidth={0}
                    unfilledColor={'rgb(243,243,243)'}
                    />
                    <View style={[styles.row, styles.alignItemsCenter, styles.justifyContentBetween, styles.mt10, styles.px15]}>
                        <TouchableWithoutFeedback onPress={step === 1 ? null : this._previous}>
                            <View style={[step === 1 ? styles.hidden : null]}>
                                <Image source={require('../../../assets/images/icon_left.png')} style={[styles.iconArrowVerticalSm]} />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <Swiper 
                    ref={(el) => this.swiper = el}
                    showsButtons={false}
                    showsPagination={false}
                    styles={[styles.flex1]}
                    scrollEnabled={false}
                    index={0}
                    loop={false}
                    >
                        <View style={[styles.pt10, styles.px15, styles.flex1]}>
                            <ScrollView
                            showsVerticalScrollIndicator={false}
                            alwaysBounceVertical={false}
                            contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between', flexDirection: 'column' }}
                            >
                                <View>
                                    <Text style={[styles.font16, styles.fontBold]}>
                                        {this.context.t("1. Please select your desired photography type(s)")}
                                    </Text>
                                    <View style={[styles.row, styles.mt10]}>
                                        <TouchableWithoutFeedback onPress={() => this._handleChangeOption('alone')}>
                                            <View style={[styles.flex1, styles.row]}>
                                                <View style={[styles.icon15, option.indexOf('alone') > -1 ? styles.checkboxChecked : styles.checkbox, styles.center]}>
                                                    {option.indexOf('alone') > -1 && (
                                                        <Image source={require('../../../assets/images/icon_check.png')} style={[styles.icon10]} />
                                                    )}
                                                </View>
                                                <Text style={[styles.font14, styles.fontRegular, styles.ml10]}>
                                                    {this.context.t("Individual Photo")}
                                                </Text>
                                            </View>
                                        </TouchableWithoutFeedback>
                                        <TouchableWithoutFeedback onPress={() => this._handleChangeOption('street')}>
                                            <View style={[styles.flex1, styles.row]}>
                                                <View style={[styles.icon15, option.indexOf('street') > -1 ? styles.checkboxChecked : styles.checkbox, styles.center]}>
                                                    {option.indexOf('street') > -1 && (
                                                        <Image source={require('../../../assets/images/icon_check.png')} style={[styles.icon10]} />
                                                    )}
                                                </View>
                                                <Text style={[styles.font14, styles.fontRegular, styles.ml10]}>
                                                    {this.context.t("Street")}
                                                </Text>
                                            </View>
                                        </TouchableWithoutFeedback>
                                    </View>
                                    <View style={[styles.row, styles.mt10]}>
                                        <TouchableWithoutFeedback onPress={() => this._handleChangeOption('couple')}>
                                            <View style={[styles.flex1, styles.row]}>
                                                <View style={[styles.icon15, option.indexOf('couple') > -1 ? styles.checkboxChecked : styles.checkbox, styles.center]}>
                                                    {option.indexOf('couple') > -1 && (
                                                        <Image source={require('../../../assets/images/icon_check.png')} style={[styles.icon10]} />
                                                    )}
                                                </View>
                                                <Text style={[styles.font14, styles.fontRegular, styles.ml10]}>
                                                    {this.context.t("Couple")}
                                                </Text>
                                            </View>
                                        </TouchableWithoutFeedback>
                                        <TouchableWithoutFeedback onPress={() => this._handleChangeOption('indoor')}>
                                            <View style={[styles.flex1, styles.row]}>
                                                <View style={[styles.icon15, option.indexOf('indoor') > -1 ? styles.checkboxChecked : styles.checkbox, styles.center]}>
                                                    {option.indexOf('indoor') > -1 && (
                                                        <Image source={require('../../../assets/images/icon_check.png')} style={[styles.icon10]} />
                                                    )}
                                                </View>
                                                <Text style={[styles.font14, styles.fontRegular, styles.ml10]}>
                                                    {this.context.t("Indoor")}
                                                </Text>
                                            </View>
                                        </TouchableWithoutFeedback>
                                    </View>
                                    <View style={[styles.row, styles.mt10]}>
                                        <TouchableWithoutFeedback onPress={() => this._handleChangeOption('wedding')}>
                                            <View style={[styles.flex1, styles.row]}>
                                                <View style={[styles.icon15, option.indexOf('wedding') > -1 ? styles.checkboxChecked : styles.checkbox, styles.center]}>
                                                    {option.indexOf('wedding') > -1 && (
                                                        <Image source={require('../../../assets/images/icon_check.png')} style={[styles.icon10]} />
                                                    )}
                                                </View>
                                                <Text style={[styles.font14, styles.fontRegular, styles.ml10]}>
                                                    {this.context.t("Wedding")}
                                                </Text>
                                            </View>
                                        </TouchableWithoutFeedback>
                                        <TouchableWithoutFeedback onPress={() => this._handleChangeOption('propose')}>
                                            <View style={[styles.flex1, styles.row]}>
                                                <View style={[styles.icon15, option.indexOf('propose') > -1 ? styles.checkboxChecked : styles.checkbox, styles.center]}>
                                                    {option.indexOf('propose') > -1 && (
                                                        <Image source={require('../../../assets/images/icon_check.png')} style={[styles.icon10]} />
                                                    )}
                                                </View>
                                                <Text style={[styles.font14, styles.fontRegular, styles.ml10]}>
                                                    {this.context.t("Romantic Proposal")}
                                                </Text>
                                            </View>
                                        </TouchableWithoutFeedback>
                                    </View>
                                    <View style={[styles.row, styles.mt10]}>
                                        <TouchableWithoutFeedback onPress={() => this._handleChangeOption('friend')}>
                                            <View style={[styles.flex1, styles.row]}>
                                                <View style={[styles.icon15, option.indexOf('friend') > -1 ? styles.checkboxChecked : styles.checkbox, styles.center]}>
                                                    {option.indexOf('friend') > -1 && (
                                                        <Image source={require('../../../assets/images/icon_check.png')} style={[styles.icon10]} />
                                                    )}
                                                </View>
                                                <Text style={[styles.font14, styles.fontRegular, styles.ml10]}>
                                                    {this.context.t("Friends")}
                                                </Text>
                                            </View>
                                        </TouchableWithoutFeedback>
                                        <TouchableWithoutFeedback onPress={() => this._handleChangeOption('daily')}>
                                            <View style={[styles.flex1, styles.row]}>
                                                <View style={[styles.icon15, option.indexOf('daily') > -1 ? styles.checkboxChecked : styles.checkbox, styles.center]}>
                                                    {option.indexOf('daily') > -1 && (
                                                        <Image source={require('../../../assets/images/icon_check.png')} style={[styles.icon10]} />
                                                    )}
                                                </View>
                                                <Text style={[styles.font14, styles.fontRegular, styles.ml10]}>
                                                    {this.context.t("Everyday Life")}
                                                </Text>
                                            </View>
                                        </TouchableWithoutFeedback>
                                    </View>
                                    <View style={[styles.row, styles.mt10]}>
                                        <TouchableWithoutFeedback onPress={() => this._handleChangeOption('family')}>
                                            <View style={[styles.flex1, styles.row]}>
                                                <View style={[styles.icon15, option.indexOf('family') > -1 ? styles.checkboxChecked : styles.checkbox, styles.center]}>
                                                    {option.indexOf('family') > -1 && (
                                                        <Image source={require('../../../assets/images/icon_check.png')} style={[styles.icon10]} />
                                                    )}
                                                </View>
                                                <Text style={[styles.font14, styles.fontRegular, styles.ml10]}>
                                                    {this.context.t("Family")}
                                                </Text>
                                            </View>
                                        </TouchableWithoutFeedback>
                                        <TouchableWithoutFeedback onPress={() => this._handleChangeOption('travel')}>
                                            <View style={[styles.flex1, styles.row]}>
                                                <View style={[styles.icon15, option.indexOf('travel') > -1 ? styles.checkboxChecked : styles.checkbox, styles.center]}>
                                                    {option.indexOf('travel') > -1 && (
                                                        <Image source={require('../../../assets/images/icon_check.png')} style={[styles.icon10]} />
                                                    )}
                                                </View>
                                                <Text style={[styles.font14, styles.fontRegular, styles.ml10]}>
                                                    {this.context.t("Travel Moment")}
                                                </Text>
                                            </View>
                                        </TouchableWithoutFeedback>
                                    </View>
                                    <View style={[styles.row, styles.mt10]}>
                                        <TouchableWithoutFeedback onPress={() => this._handleChangeOption('extra')}>
                                            <View style={[styles.row]}>
                                                <View style={[styles.icon15, option.indexOf('extra') > -1 ? styles.checkboxChecked : styles.checkbox, styles.center]}>
                                                    {option.indexOf('extra') > -1 && (
                                                        <Image source={require('../../../assets/images/icon_check.png')} style={[styles.icon10]} />
                                                    )}
                                                </View>
                                                <Text style={[styles.font14, styles.fontRegular, styles.ml10]}>
                                                    {this.context.t("Others : ")}
                                                </Text>
                                            </View>
                                        </TouchableWithoutFeedback>
                                        <TextInput
                                            style={[styles.font14, styles.black, styles.flex1, styles.textinputUnderline, styles.fontRegular, styles.ml10, { height: 20}]}
                                            autoCapitalize={'none'} 
                                            autoCorrect={false} 
                                            value={extraOption} 
                                            onChangeText={option.indexOf('extra') > -1 ? this._handleExtraOptionChange : null} 
                                            returnKeyType={'done'} 
                                            placeholderTextColor={'#000000'}
                                            underlineColorAndroid={'transparent'}
                                            editable={option.indexOf('extra') > -1 ? true : false}
                                        />
                                    </View>
                                    <Text style={[styles.font16, styles.fontBold, styles.mt50]}>
                                        {this.context.t("2. How many people are joining the photo shoot?")}
                                    </Text>
                                    <View style={[styles.row, styles.mt10]}>
                                        <TouchableWithoutFeedback onPress={() => this._handleChangePeople(1)}>
                                            <View style={[styles.flex1, styles.row]}>
                                                <View style={[styles.icon15, people === 1 ? styles.checkboxChecked : styles.checkbox, styles.center]}>
                                                    {people === 1 && (
                                                        <Image source={require('../../../assets/images/icon_check.png')} style={[styles.icon10]} />
                                                    )}
                                                </View>
                                                <Text style={[styles.font14, styles.fontRegular, styles.ml10]}>
                                                    {this.context.t("1 person (solo)")}
                                                </Text>
                                            </View>
                                        </TouchableWithoutFeedback>
                                        <TouchableWithoutFeedback onPress={() => this._handleChangePeople(2)}>
                                            <View style={[styles.flex1, styles.row]}>
                                                <View style={[styles.icon15, people === 2 ? styles.checkboxChecked : styles.checkbox, styles.center]}>
                                                    {people === 2 && (
                                                        <Image source={require('../../../assets/images/icon_check.png')} style={[styles.icon10]} />
                                                    )}
                                                </View>
                                                <Text style={[styles.font14, styles.fontRegular, styles.ml10]}>
                                                    {this.context.t("2 people")}
                                                </Text>
                                            </View>
                                        </TouchableWithoutFeedback>
                                    </View>
                                    <View style={[styles.row, styles.mt10]}>
                                        <TouchableWithoutFeedback onPress={() => this._handleChangePeople(3)}>
                                            <View style={[styles.flex1, styles.row]}>
                                                <View style={[styles.icon15, people === 3 ? styles.checkboxChecked : styles.checkbox, styles.center]}>
                                                    {people === 3 && (
                                                        <Image source={require('../../../assets/images/icon_check.png')} style={[styles.icon10]} />
                                                    )}
                                                </View>
                                                <Text style={[styles.font14, styles.fontRegular, styles.ml10]}>
                                                    {this.context.t("3 people")}
                                                </Text>
                                            </View>
                                        </TouchableWithoutFeedback>
                                        <TouchableWithoutFeedback onPress={() => this._handleChangePeople(4)}>
                                            <View style={[styles.flex1, styles.row]}>
                                                <View style={[styles.icon15, people === 4 ? styles.checkboxChecked : styles.checkbox, styles.center]}>
                                                    {people === 4 && (
                                                        <Image source={require('../../../assets/images/icon_check.png')} style={[styles.icon10]} />
                                                    )}
                                                </View>
                                                <Text style={[styles.font14, styles.fontRegular, styles.ml10]}>
                                                    {this.context.t("4 people")}
                                                </Text>
                                            </View>
                                        </TouchableWithoutFeedback>
                                    </View>
                                    <View style={[styles.row, styles.mt10]}>
                                        <TouchableWithoutFeedback onPress={() => this._handleChangePeople(-1)}>
                                            <View style={[styles.row]}>
                                                <View style={[styles.icon15, people === -1 ? styles.checkboxChecked : styles.checkbox, styles.center]}>
                                                    {people === -1 && (
                                                        <Image source={require('../../../assets/images/icon_check.png')} style={[styles.icon10]} />
                                                    )}
                                                </View>
                                                <Text style={[styles.font14, styles.fontRegular, styles.ml10]}>
                                                    {this.context.t("Others : ")}
                                                </Text>
                                            </View>
                                        </TouchableWithoutFeedback>
                                        <TextInput
                                            style={[styles.font14, styles.black, styles.textinputUnderline, styles.fontRegular, styles.ml10, { width: 50, height: 20 }]}
                                            autoCapitalize={'none'} 
                                            autoCorrect={false} 
                                            value={extraPeople} 
                                            onChangeText={people === -1 ? this._handleExtraPeopleChange : null} 
                                            returnKeyType={'done'} 
                                            placeholderTextColor={'#000000'}
                                            underlineColorAndroid={'transparent'}
                                            editable={people === -1 ? true : false}
                                            maxLength={3}
                                        />
                                        <Text style={[styles.font14, styles.fontRegular, styles.ml10]}>
                                            {this.context.t("people")}
                                        </Text>
                                    </View>
                                </View>
                                <TouchableWithoutFeedback onPress={this._next}>
                                    <View style={[styles.bgGray33, styles.widthFull, styles.center, styles.maxWidth360, styles.py15, styles.alignSelfCenter]}>
                                        <Text style={[styles.font16, styles.fontBold, styles.white]}>
                                            {this.context.t("NEXT")}
                                        </Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </ScrollView>
                        </View>
                        <View style={[styles.pt10, styles.px15, styles.flex1]}>
                            <ScrollView
                            showsVerticalScrollIndicator={false}
                            alwaysBounceVertical={false}
                            contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between', flexDirection: 'column' }}
                            >
                                <View>
                                    <Text style={[styles.font16, styles.fontBold]}>
                                        {this.context.t("3. When would you like to meet your photographer?")}
                                    </Text>
                                    <View style={[styles.row, styles.mt10]}>
                                        <TouchableWithoutFeedback onPress={() => this._handleChangeDateOption(1)}>
                                            <View style={[styles.flex1, styles.row]}>
                                                <View style={[styles.icon15, dateOption === 1 ? styles.checkboxChecked : styles.checkbox, styles.center]}>
                                                    {dateOption === 1 && (
                                                        <Image source={require('../../../assets/images/icon_check.png')} style={[styles.icon10]} />
                                                    )}
                                                </View>
                                                <Text style={[styles.font14, styles.fontRegular, styles.ml10]}>
                                                    {this.context.t("I have a specific date and time in mind.")}
                                                </Text>
                                            </View>
                                        </TouchableWithoutFeedback>
                                    </View>
                                    {dateConfirm && (dateOption === 1) && (
                                        <View style={[styles.row, styles.alignSelfCenter, styles.justifyContentBetween, styles.mt10]}>
                                            <View style={[styles.flex1, styles.pr5]}>
                                                <TouchableWithoutFeedback onPress={() => this._openCalendar1(1)}>
                                                    <View style={[styles.flex1, styles.bgPink, styles.center, styles.py15]}>
                                                        <Text style={[styles.fontBold, styles.font14, styles.white]}>
                                                        {`${selectedDate.getFullYear()}/${String(selectedDate.getMonth() + 1).length === 2 ? (selectedDate.getMonth() + 1) : '0'.concat(String(selectedDate.getMonth() + 1))}/${selectedDate.getDate()}`}
                                                        </Text>
                                                    </View>
                                                </TouchableWithoutFeedback>
                                            </View>
                                            <View style={[styles.flex1, styles.pl5]}>
                                                <TouchableWithoutFeedback onPress={() => this._openCalendar1(2)}>
                                                    <View style={[styles.flex1, styles.bgPink, styles.center, styles.py15]}>
                                                        <Text style={[styles.fontBold, styles.font14, styles.white]}>
                                                        {`${selectedHour}:${selectedMin}`}
                                                        </Text>
                                                    </View>
                                                </TouchableWithoutFeedback>
                                            </View>
                                        </View>
                                    )}
                                    <View style={[styles.row, styles.mt10]}>
                                        <TouchableWithoutFeedback onPress={() => this._handleChangeDateOption(2)}>
                                            <View style={[styles.flex1, styles.row]}>
                                                <View style={[styles.icon15, dateOption === 2 ? styles.checkboxChecked : styles.checkbox, styles.center]}>
                                                    {dateOption === 2 && (
                                                        <Image source={require('../../../assets/images/icon_check.png')} style={[styles.icon10]} />
                                                    )}
                                                </View>
                                                <Text style={[styles.font14, styles.fontRegular, styles.ml10]}>
                                                    {this.context.t("I don’t have a specific date yet, but I’m staying in New York City during : ")}
                                                </Text>
                                            </View>
                                        </TouchableWithoutFeedback>
                                    </View>
                                    {dateConfirm && (dateOption === 2) && (
                                        <View style={[styles.row, styles.alignSelfCenter, styles.justifyContentBetween, styles.mt10]}>
                                            <View style={[styles.flex1, styles.pr5]}>
                                                <TouchableWithoutFeedback onPress={this._openCalendar2}>
                                                    <View style={[styles.flex1, styles.bgPink, styles.center, styles.py15]}>
                                                        <Text style={[styles.fontBold, styles.font14, styles.white]}>
                                                        {selectedStartDate && `${selectedStartDate.getFullYear()}/${String(selectedStartDate.getMonth() + 1).length === 2 ? (selectedStartDate.getMonth() + 1) : '0'.concat(String(selectedStartDate.getMonth() + 1))}/${selectedStartDate.getDate()}`}
                                                        </Text>
                                                    </View>
                                                </TouchableWithoutFeedback>
                                            </View>
                                            <View style={[styles.flex1, styles.pl5]}>
                                                <TouchableWithoutFeedback onPress={this._openCalendar2}>
                                                    <View style={[styles.flex1, styles.bgPink, styles.center, styles.py15]}>
                                                        <Text style={[styles.fontBold, styles.font14, styles.white]}>
                                                        {selectedEndDate && `${selectedEndDate.getFullYear()}/${String(selectedEndDate.getMonth() + 1).length === 2 ? (selectedEndDate.getMonth() + 1) : '0'.concat(String(selectedEndDate.getMonth() + 1))}/${selectedEndDate.getDate()}`}
                                                        </Text>
                                                    </View>
                                                </TouchableWithoutFeedback>
                                            </View>
                                        </View>
                                    )}
                                    <Text style={[styles.font16, styles.fontBold, styles.mt50]}>
                                        {this.context.t("4. How long do you want to spend your time with the photographer?")}
                                    </Text>
                                    <View style={[styles.row, styles.mt10]}>
                                        <TouchableWithoutFeedback onPress={() => this._handleChangeHour(1)}>
                                            <View style={[styles.flex1, styles.row]}>
                                                <View style={[styles.icon15, hour === 1 ? styles.checkboxChecked : styles.checkbox, styles.center]}>
                                                    {hour === 1 && (
                                                        <Image source={require('../../../assets/images/icon_check.png')} style={[styles.icon10]} />
                                                    )}
                                                </View>
                                                <Text style={[styles.font14, styles.fontRegular, styles.ml10]}>
                                                    {this.context.t("1 hour")}
                                                </Text>
                                            </View>
                                        </TouchableWithoutFeedback>
                                        <TouchableWithoutFeedback onPress={() => this._handleChangeHour(2)}>
                                            <View style={[styles.flex1, styles.row]}>
                                                <View style={[styles.icon15, hour === 2 ? styles.checkboxChecked : styles.checkbox, styles.center]}>
                                                    {hour === 2 && (
                                                        <Image source={require('../../../assets/images/icon_check.png')} style={[styles.icon10]} />
                                                    )}
                                                </View>
                                                <Text style={[styles.font14, styles.fontRegular, styles.ml10]}>
                                                    {this.context.t("2 hours")}
                                                </Text>
                                            </View>
                                        </TouchableWithoutFeedback>
                                    </View>
                                    <View style={[styles.row, styles.mt10]}>
                                        <TouchableWithoutFeedback onPress={() => this._handleChangeHour(-1)}>
                                            <View style={[styles.row]}>
                                                <View style={[styles.icon15, hour === -1 ? styles.checkboxChecked : styles.checkbox, styles.center]}>
                                                    {hour === -1 && (
                                                        <Image source={require('../../../assets/images/icon_check.png')} style={[styles.icon10]} />
                                                    )}
                                                </View>
                                                <Text style={[styles.font14, styles.fontRegular, styles.ml10]}>
                                                    {this.context.t("Others : ")}
                                                </Text>
                                            </View>
                                        </TouchableWithoutFeedback>
                                        <TextInput
                                            style={[styles.font14, styles.black, styles.textinputUnderline, styles.fontRegular, styles.ml10, { width: 50, height: 20 }]}
                                            autoCapitalize={'none'} 
                                            autoCorrect={false} 
                                            value={extraHour} 
                                            onChangeText={hour === -1 ? this._handleExtraHourChange : null} 
                                            returnKeyType={'done'} 
                                            placeholderTextColor={'#000000'}
                                            underlineColorAndroid={'transparent'}
                                            editable={hour === -1 ? true : false}
                                            maxLength={3}
                                        />
                                        <Text style={[styles.font14, styles.fontRegular, styles.ml10]}>
                                            {this.context.t("hours")}
                                        </Text>
                                    </View>
                                </View>
                                <TouchableWithoutFeedback onPress={this._next}>
                                    <View style={[styles.bgGray33, styles.widthFull, styles.center, styles.maxWidth360, styles.py15, styles.alignSelfCenter]}>
                                        <Text style={[styles.font16, styles.fontBold, styles.white]}>
                                            {this.context.t("NEXT")}
                                        </Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </ScrollView>
                        </View>
                        <View style={[styles.pt10, styles.px15, styles.flex1]}>
                            <ScrollView
                            showsVerticalScrollIndicator={false}
                            alwaysBounceVertical={false}
                            contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between', flexDirection: 'column' }}
                            >
                                <View>
                                    <Text style={[styles.font16, styles.fontBold]}>
                                        {this.context.t("5. Where would you like to take the travel photography?")}
                                    </Text>
                                    <View style={[styles.row, styles.mt10]}>
                                        <TouchableWithoutFeedback onPress={() => this._handleChangeLocationOption(1)}>
                                            <View style={[styles.flex1, styles.row]}>
                                                <View style={[styles.icon15, locationOption === 1 ? styles.checkboxChecked : styles.checkbox, styles.center]}>
                                                    {locationOption === 1 && (
                                                        <Image source={require('../../../assets/images/icon_check.png')} style={[styles.icon10]} />
                                                    )}
                                                </View>
                                                <Text style={[styles.font14, styles.fontRegular, styles.ml10]}>
                                                    {this.context.t("I have a specific date and time in mind.")}
                                                </Text>
                                            </View>
                                        </TouchableWithoutFeedback>
                                    </View>
                                    {locationOption === 1 && (
                                        <Fragment>
                                            {locations && (locations.length > 0) && (
                                                <View style={[styles.row, styles.flexWrap, styles.widthFull]}>
                                                    {locations.map((location) => (
                                                        <TouchableWithoutFeedback key={location.id} onPress={() => this._removeLocation(location)}>
                                                            <View style={[styles.row, styles.mt10, styles.alignItemsCenter, styles.py10, styles.px10, styles.mx10, styles.bgPink]}>
                                                                <Text style={[styles.font14, styles.fontBold, styles.white, styles.mr20]}>
                                                                    {location.name}
                                                                </Text>
                                                                <Image source={require('../../../assets/images/icon_close_white.png')} style={[styles.icon15]} />
                                                            </View>
                                                        </TouchableWithoutFeedback>
                                                    ))}
                                                </View>
                                            )}
                                            <TouchableWithoutFeedback onPress={locationOption === 1 ? showMap ? this._closeMap : this._openMap : null}>
                                                <View style={[styles.row, styles.px20, styles.bgGray33, styles.widthFull, styles.alignItemsCenter, styles.justifyContentBetween, styles.maxWidth360, styles.py15, styles.alignSelfCenter, styles.mt10]}>
                                                    <Text style={[styles.font16, styles.fontBold, styles.white]}>
                                                        +
                                                    </Text>
                                                    <Text style={[styles.font16, styles.fontBold, styles.white]}>
                                                        {this.context.t("Add a location")}
                                                    </Text>
                                                    <Text style={[styles.font16, styles.fontBold, styles.white, styles.hidden]}>
                                                        +
                                                    </Text>
                                                </View>
                                            </TouchableWithoutFeedback>
                                        </Fragment>
                                    )}
                                    <View style={[styles.row, styles.mt10]}>
                                        <TouchableWithoutFeedback onPress={() => this._handleChangeLocationOption(2)}>
                                            <View style={[styles.flex1, styles.row]}>
                                                <View style={[styles.icon15, locationOption === 2 ? styles.checkboxChecked : styles.checkbox, styles.center]}>
                                                    {locationOption === 2 && (
                                                        <Image source={require('../../../assets/images/icon_check.png')} style={[styles.icon10]} />
                                                    )}
                                                </View>
                                                <Text style={[styles.font14, styles.fontRegular, styles.ml10]}>
                                                    {this.context.t("I’d rather follow my photographer’s recommendation.")}
                                                </Text>
                                            </View>
                                        </TouchableWithoutFeedback>
                                    </View>
                                </View>
                                <TouchableWithoutFeedback onPress={this._next}>
                                    <View style={[styles.bgGray33, styles.widthFull, styles.center, styles.maxWidth360, styles.py15, styles.alignSelfCenter, isSubmitting ? { opacity: 0.7 } : null]}>
                                        <Text style={[styles.font16, styles.fontBold, styles.white]}>
                                            {isLoggedIn ? this.context.t("DONE") : this.context.t("NEXT")}
                                        </Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </ScrollView>
                        </View>
                        {!isLoggedIn && (
                            auth === 'signup' ? (
                                <View style={[styles.pt10, styles.px15, styles.flex1]}>
                                    <ScrollView
                                    showsVerticalScrollIndicator={false}
                                    alwaysBounceVertical={false}
                                    contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between', flexDirection: 'column' }}
                                    >
                                        <View>
                                            <Text style={[styles.font16, styles.fontBold]}>
                                                {this.context.t("6. Sign-up and submit your request")}
                                            </Text>
                                            <Text style={[styles.fontBold, styles.font12, styles.mt10]}>
                                                {this.context.t("First name")}
                                            </Text>
                                            <TextInput
                                                style={[styles.font14, styles.black, styles.textinputUnderline, styles.fontRegular, styles.widthFull, { height: 30 }]}
                                                autoCapitalize={'none'} 
                                                autoCorrect={false} 
                                                value={firstName} 
                                                onChangeText={this._handleFirstNameChange} 
                                                returnKeyType={'next'} 
                                                placeholderTextColor={'#000000'}
                                                underlineColorAndroid={'transparent'}
                                            />
                                            <Text style={[styles.fontBold, styles.font12, styles.mt10]}>
                                                {this.context.t("Last name")}
                                            </Text>
                                            <TextInput
                                                style={[styles.font14, styles.black, styles.textinputUnderline, styles.fontRegular, styles.widthFull, { height: 30 }]}
                                                autoCapitalize={'none'} 
                                                autoCorrect={false} 
                                                value={lastName} 
                                                onChangeText={this._handleLastNameChange} 
                                                returnKeyType={'next'} 
                                                placeholderTextColor={'#000000'}
                                                underlineColorAndroid={'transparent'}
                                            />
                                            <Text style={[styles.fontBold, styles.font12, styles.mt10]}>
                                                {this.context.t("Email")}
                                            </Text>
                                            <TextInput
                                                style={[styles.font14, styles.black, styles.textinputUnderline, styles.fontRegular, styles.widthFull, { height: 30 }]}
                                                autoCapitalize={'none'} 
                                                autoCorrect={false} 
                                                value={email} 
                                                onChangeText={this._handleEmailChange} 
                                                returnKeyType={'next'} 
                                                placeholderTextColor={'#000000'}
                                                underlineColorAndroid={'transparent'}
                                            />
                                            <Text style={[styles.fontBold, styles.font12, styles.mt10]}>
                                                {this.context.t("Mobile")}
                                            </Text>
                                            <View style={[styles.row, styles.alignSelfCenter]}>
                                                <View style={[styles.flex2, styles.pr5]}>
                                                    <TouchableWithoutFeedback onPress={this._handleShowCuntryNumberChange}>
                                                        <View style={[styles.font14, styles.black, styles.textinputUnderline, styles.justifyContentCenter, styles.fontRegular, styles.widthFull, { height: 30 }]}>
                                                            <Text style={[styles.font14, styles.black, styles.fontRegular]}>
                                                                {`+${countryNumber}`} 
                                                            </Text>
                                                        </View>
                                                    </TouchableWithoutFeedback>
                                                </View>
                                                <View style={[styles.flex8]}>
                                                    <TextInput
                                                        style={[styles.font14, styles.black, styles.textinputUnderline, styles.fontRegular, styles.widthFull, { height: 30 }]}
                                                        autoCapitalize={'none'} 
                                                        autoCorrect={false} 
                                                        value={mobile} 
                                                        onChangeText={this._handleMobileChange} 
                                                        returnKeyType={'next'} 
                                                        placeholderTextColor={'#000000'}
                                                        underlineColorAndroid={'transparent'}
                                                    />
                                                </View>
                                            </View>
                                            <Text style={[styles.mt5, styles.font10]}>
                                                {this.context.t("Your reservation details and confirmation message from photographers will be sent to your email and mobile number.")}
                                            </Text>
                                            <Text style={[styles.fontBold, styles.font12, styles.mt10]}>
                                                {this.context.t("Password")}
                                            </Text>
                                            <TextInput
                                                style={[styles.font14, styles.black, styles.textinputUnderline, styles.fontRegular, styles.widthFull, { height: 30 }]}
                                                autoCapitalize={'none'} 
                                                autoCorrect={false} 
                                                secureTextEntry={true}
                                                value={password} 
                                                onChangeText={this._handlePasswordChange} 
                                                returnKeyType={'next'} 
                                                placeholderTextColor={'#000000'}
                                                underlineColorAndroid={'transparent'}
                                            />
                                            <Text style={[styles.fontBold, styles.font12, styles.mt10]}>
                                                {this.context.t("Confirm your password")}
                                            </Text>
                                            <TextInput
                                                style={[styles.font14, styles.black, styles.textinputUnderline, styles.fontRegular, styles.widthFull, { height: 30 }]}
                                                autoCapitalize={'none'} 
                                                autoCorrect={false} 
                                                secureTextEntry={true}
                                                value={password2} 
                                                onChangeText={this._handlePassword2Change} 
                                                returnKeyType={'next'} 
                                                placeholderTextColor={'#000000'}
                                                underlineColorAndroid={'transparent'}
                                            />
                                            <TouchableWithoutFeedback onPress={() => this._handleChangeAuth('login')}>
                                                <View style={[styles.mt10]}>
                                                    <Text style={[styles.pink, styles.font12, styles.textCenter]}>
                                                        {this.context.t("Already have PRIZM account?")}
                                                    </Text>
                                                </View>
                                            </TouchableWithoutFeedback>
                                        </View>
                                        <TouchableWithoutFeedback onPress={this._signup}>
                                            <View style={[styles.bgGray33, styles.widthFull, styles.center, styles.maxWidth360, styles.py15, styles.alignSelfCenter, isSubmitting ? { opacity: 0.7 } : null]}>
                                                <Text style={[styles.font16, styles.fontBold, styles.white]}>
                                                    {this.context.t("Click here to submit your request")}
                                                </Text>
                                            </View>
                                        </TouchableWithoutFeedback>
                                    </ScrollView>
                                </View>
                            ) : (
                                <View style={[styles.pt10, styles.px15, styles.flex1]}>
                                    <ScrollView
                                    showsVerticalScrollIndicator={false}
                                    alwaysBounceVertical={false}
                                    contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between', flexDirection: 'column' }}
                                    >
                                        <View>
                                            <Text style={[styles.font16, styles.fontBold]}>
                                                {this.context.t("6. Sign-in and submit your request")}
                                            </Text>
                                            <Text style={[styles.fontBold, styles.font12, styles.mt10]}>
                                                {this.context.t("Email")}
                                            </Text>
                                            <TextInput
                                                style={[styles.font14, styles.black, styles.textinputUnderline, styles.fontRegular, styles.widthFull, { height: 30 }]}
                                                autoCapitalize={'none'} 
                                                autoCorrect={false} 
                                                value={loginEmail} 
                                                onChangeText={this._handleLoginEmailChange} 
                                                returnKeyType={'next'} 
                                                placeholderTextColor={'#000000'}
                                                underlineColorAndroid={'transparent'}
                                            />
                                            <Text style={[styles.fontBold, styles.font12, styles.mt10]}>
                                                {this.context.t("Password")}
                                            </Text>
                                            <TextInput
                                                style={[styles.font14, styles.black, styles.textinputUnderline, styles.fontRegular, styles.widthFull, { height: 30 }]}
                                                autoCapitalize={'none'} 
                                                autoCorrect={false} 
                                                secureTextEntry={true}
                                                value={loginPassword} 
                                                onChangeText={this._handleLoginPasswordChange} 
                                                returnKeyType={'next'} 
                                                placeholderTextColor={'#000000'}
                                                underlineColorAndroid={'transparent'}
                                            />
                                            <TouchableWithoutFeedback onPress={() => this._handleChangeAuth('signup')}>
                                                <View style={[styles.mt10]}>
                                                    <Text style={[styles.pink, styles.font12, styles.textCenter]}>
                                                        {this.context.t("First time to PRIZM?")}
                                                    </Text>
                                                </View>
                                            </TouchableWithoutFeedback>
                                        </View>
                                        <TouchableWithoutFeedback onPress={this._login}>
                                            <View style={[styles.bgGray33, styles.widthFull, styles.center, styles.maxWidth360, styles.py15, styles.alignSelfCenter, isSubmitting ? { opacity: 0.7 } : null]}>
                                                <Text style={[styles.font16, styles.fontBold, styles.white]}>
                                                    {this.context.t("Click here to submit your request")}
                                                </Text>
                                            </View>
                                        </TouchableWithoutFeedback>
                                    </ScrollView>
                                </View>
                            )
                        )}
                        <View>
                            <TouchableWithoutFeedback onPress={this._next}>
                                <View>
                                    <Text>
                                        4
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                        <View>
                            <TouchableWithoutFeedback onPress={this._next}>
                                <View>
                                    <Text>
                                        5
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </Swiper>
                    <Modal
                    isVisible={showCalendar1}
                    onBackButtonPress={this._closeCalendar1}
                    onBackdropPress={this._closeCalendar1}
                    >
                        <View style={[styles.bgWhite, styles.pt20, styles.center]}>
                            {selectDateStep === 1 && (
                                <Fragment>
                                    <CalendarPicker
                                    onDateChange={this._selectDate}
                                    selectedStartDate={selectedDate ? selectedDate : null}
                                    selectedEndDate={selectedDate ? selectedDate : null}
                                    selectedDayColor={'#d66c8b'}
                                    selectedDayTextColor={'#ffffff'}
                                    dayShape={'square'}
                                    disabledDates={(date) => {
                                        if(date < new Date()){
                                            return true
                                        }
                                        else{
                                            return false
                                        }
                                    }}
                                    previousTitle={'<'}
                                    nextTitle={'>'}
                                    previousTitleStyle={{
                                        fontFamily: 'NanumSquareOTFB00',
                                        fontSize: 18
                                    }}
                                    nextTitleStyle={{
                                        fontFamily: 'NanumSquareOTFB00',
                                        fontSize: 18
                                    }}
                                    textStyle={{
                                        fontFamily: 'NanumSquareOTFB00'
                                    }}
                                    width={width - 60}
                                    />
                                    <TouchableWithoutFeedback onPress={() => this._changeDateStep(2)}>
                                        <View style={[styles.bgGray33, styles.widthFull, styles.center, styles.py15, styles.alignSelfCenter]}>
                                            <Text style={[styles.font16, styles.fontBold, styles.white]}>
                                                {this.context.t("NEXT")}
                                            </Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </Fragment>
                            )}
                            {selectDateStep === 2 && (
                                <Fragment>
                                    <View style={[styles.row, styles.alignItemsCenter, styles.justifyContentBetween, styles.widthFull, styles.px15]}>
                                        <TouchableWithoutFeedback onPress={() => this._changeDateStep(1)}>
                                            <View>
                                                <Image source={require('../../../assets/images/icon_arrow_left.png')} style={[styles.iconArrow]} />
                                            </View>
                                        </TouchableWithoutFeedback>
                                        <Text style={[styles.font16, styles.fontBold]}>
                                            {selectedDate !== "" && `${selectedDate.getFullYear()}.${selectedDate.getMonth() + 1}.${selectedDate.getDate()}`}
                                        </Text>
                                        <View style={[styles.hidden]}>
                                            <Image source={require('../../../assets/images/icon_arrow_left.png')} style={[styles.iconArrow]} />
                                        </View>
                                    </View>
                                    <DatePicker
                                        style={[{width: width - 60, borderWidth: 0}, styles.my30]}
                                        date={`${selectedHour}:${selectedMin}`}
                                        mode="time"
                                        confirmBtnText="Confirm"
                                        cancelBtnText="Cancel"
                                        showIcon={false}
                                        hideText={false}
                                        textColor={'#000'}
                                        customStyles={{
                                            dateInput: {
                                                borderWidth: 0,
                                                color: '#000',
                                                backgroundColor: '#cecece'
                                            },
                                            placeholderText: {
                                                color: '#000'
                                            },
                                            dateText: {
                                                fontSize: 20,
                                                fontFamily: 'NanumSquareOTFB00',
                                                color: '#000'
                                            },
                                            confirmBtnText: {
                                                color: '#000'
                                            },
                                            textStyle: {
                                                color: '#000'
                                            }
                                        }}
                                        onDateChange={(date) => this._handleChangeTimes(date)}
                                    />
                                    <TouchableWithoutFeedback onPress={this._confirmDate}>
                                        <View style={[styles.bgGray33, styles.widthFull, styles.center, styles.py15, styles.alignSelfCenter]}>
                                            <Text style={[styles.font16, styles.fontBold, styles.white]}>
                                                {this.context.t("DONE")}
                                            </Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </Fragment>
                            )}
                        </View>
                    </Modal>
                    <Modal
                    isVisible={showCalendar2}
                    onBackButtonPress={this._closeCalendar2}
                    onBackdropPress={this._closeCalendar2}
                    >
                        <View style={[styles.bgWhite, styles.pt20, styles.center]}>
                            <CalendarPicker
                            allowRangeSelection={true}
                            onDateChange={this._selectDateRange}
                            selectedDayColor={'#d66c8b'}
                            selectedDayTextColor={'#ffffff'}
                            dayShape={'square'}
                            disabledDates={(date) => {
                                if(date < new Date()){
                                    return true
                                }
                                else{
                                    return false
                                }
                            }}
                            previousTitle={'<'}
                            nextTitle={'>'}
                            selectedStartDate={selectedStartDate ? selectedStartDate : null}
                            selectedEndDate={selectedEndDate ? selectedEndDate : null}
                            previousTitleStyle={{
                                fontFamily: 'NanumSquareOTFB00',
                                fontSize: 18
                            }}
                            nextTitleStyle={{
                                fontFamily: 'NanumSquareOTFB00',
                                fontSize: 18
                            }}
                            textStyle={{
                                fontFamily: 'NanumSquareOTFB00'
                            }}
                            width={width - 60}
                            />
                            <TouchableWithoutFeedback onPress={this._confirmDate}>
                                <View style={[styles.bgGray33, styles.widthFull, styles.center, styles.py15, styles.alignSelfCenter]}>
                                    <Text style={[styles.font16, styles.fontBold, styles.white]}>
                                        {this.context.t("DONE")}
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </Modal>
                    <Modal
                    isVisible={showMap}
                    onBackButtonPress={this._closeMap}
                    onBackdropPress={this._closeMap}
                    style={[styles.widthFull, styles.heightFull, { margin: 0, padding: 0 }]}
                    >
                        <View style={[styles.widthFull, styles.heightFull]}>
                            <MapView 
                            style={[styles.widthFull, styles.heightFull]}
                            initialRegion={{
                                latitude: 37.5796212,
                                longitude: 126.9748523,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}
                            region={selectedLocation.geometry ? selectedLocation.geometry : null}
                            >
                                {selectedLocation.geometry ? (
                                    <Marker
                                    coordinate={selectedLocation.geometry}
                                    />
                                ) : null}
                            </MapView>
                            <TouchableWithoutFeedback onPress={() => this._handleShowPlaceListChange(true)}>
                                <View style={[styles.bgWhite, styles.row, styles.px10, styles.alignSelfCenter, { position: 'absolute', width: width - 30, top: statusBarHeight + 20}]}>
                                    <GooglePlacesAutocomplete
                                    placeholder={this.context.t("Search Places")}
                                    minLength={1}
                                    autoFocus={false}
                                    returnKeyType={'search'}
                                    listViewDisplayed={showPlaceList}
                                    renderDescription={row => row.structured_formatting.main_text}
                                    fetchDetails={true}
                                    onPress={(data, details = null) => {
                                        this.setState({
                                            selectedLocation: {
                                                name: data.structured_formatting.main_text,
                                                geometry: {
                                                    latitude: details.geometry.location.lat,
                                                    longitude: details.geometry.location.lng,
                                                    latitudeDelta: 0.0922,
                                                    longitudeDelta: 0.0421,
                                                }
                                            },
                                            showPlaceList: false
                                        })
                                    }}
                                
                                    getDefaultValue={() => ''}
                                
                                    query={{
                                        key: GOOGLE_API_KEY_GEO_CODING,
                                        language: 'ko'
                                    }}
                                
                                    styles={{
                                        container: {
                                            width: width - 90,
                                            padding: 0
                                        },
                                        textInput: {
                                            color: '#000'
                                        },
                                        textInputContainer: {
                                            width: width - 90,
                                            backgroundColor: 'transparent',
                                            borderTopWidth: 0,
                                            borderBottomWidth: 0,
                                            height: 40,
                                            alignItemsCenter: 'center'
                                        },
                                        description: {
                                            fontWeight: 'bold'
                                        },
                                        predefinedPlacesDescription: {
                                            color: '#1faadb'
                                        },
                                        listView: {
                                            width: width - 90
                                        }
                                    }}
                                    nearbyPlacesAPI='GooglePlacesSearch'
                                    GooglePlacesSearchQuery={{
                                        rankby: 'distance',
                                        type: 'cafe'
                                    }}
                                    
                                    GooglePlacesDetailsQuery={{
                                        fields: 'geometry',
                                    }}
                                    debounce={200}
                                    />
                                    <TouchableWithoutFeedback onPress={this._closeMap}>
                                        <View style={[{width: 60, height: 40}, styles.center]}>
                                            <Text>
                                                {this.context.t("Done")}
                                            </Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                            </TouchableWithoutFeedback>
                            {selectedLocation.geometry ? (
                                <TouchableWithoutFeedback onPress={() => this._selectLocation(selectedLocation)}>
                                    <View style={[{ position: 'absolute', bottom: 0, width }, styles.py15, styles.row, styles.px15, styles.justifyContentBetween, styles.bgWhite]}>
                                        <View style={[styles.circle20, styles.hidden]}>

                                        </View>
                                        <Text style={[styles.font14, styles.fontBold]}>
                                            {selectedLocation.name}
                                        </Text>
                                        <View style={[styles.circle20, locations.find(lo => (lo.lat === selectedLocation.geometry.latitude) && (lo.lng === selectedLocation.geometry.longitude)) ? styles.bgPink: styles.bgGray33, styles.center]}>
                                        {locations.find(lo => (lo.lat === selectedLocation.geometry.latitude) && (lo.lng === selectedLocation.geometry.longitude)) ? (
                                            <Image source={require('../../../assets/images/icon_close_white.png')} style={[styles.icon10]} />
                                        ) : (
                                            <Image source={require('../../../assets/images/icon_plus_white.png')} style={[styles.icon10]} />
                                        )}
                                        </View>
                                    </View>
                                </TouchableWithoutFeedback>
                            ) : null}
                        </View>
                    </Modal>
                    <Modal
                    isVisible={showCountryNumber}
                    onBackButtonPress={this._closeCuntryNumberModal}
                    onBackdropPress={this._closeCuntryNumberModal}
                    >
                        <View style={[styles.bgWhite, styles.pt20, styles.center, styles.px30]}>
                            <TextInput
                                style={[styles.font14, styles.black, styles.textinputUnderline, styles.fontRegular, styles.widthFull, { height: 30 }]}
                                autoCapitalize={'none'} 
                                autoCorrect={false} 
                                value={q} 
                                onChangeText={this._handleQChange} 
                                returnKeyType={'next'} 
                                placeholderTextColor={'#000000'}
                                underlineColorAndroid={'transparent'}
                            />
                            <ScrollView 
                            style={[styles.mt10, { height: 500 }]}
                            alwaysBounceVertical={false}
                            alwaysBounceHorizontal={false}
                            >
                                {q !== "" && countryList.map((country, index) => (
                                    <TouchableWithoutFeedback key={index} onPress={() => this._handleCountryNumberChange(country.number, country.value)}>
                                        <View style={[styles.row, styles.alignItemsCenter, styles.py5]}>
                                            <Flag 
                                            code={country.value}
                                            type={'flat'}
                                            size={16}
                                            />
                                            <Text style={[styles.font14, styles.mx10]}>
                                                {country.label}
                                            </Text>
                                            <Text style={[styles.font14]}>
                                                {`+${country.number}`}
                                            </Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                ))}
                            </ScrollView>
                        </View>
                    </Modal>
                </View>
            )
        )
    }
}

export default CustomRequestCreateScreen;