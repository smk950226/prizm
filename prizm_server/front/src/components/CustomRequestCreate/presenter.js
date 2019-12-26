import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styles from '../../style/styles.module.scss';
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";
import Slider from "react-slick";
import Calendar from 'react-calendar';
import Modal from 'react-responsive-modal';
import uuidv4 from 'uuid/v4';
import MdAdd from 'react-ionicons/lib/MdAdd';
import MdClose from 'react-ionicons/lib/MdClose';
import MdArrowDropdown from 'react-ionicons/lib/MdArrowDropdown';
import ReactCountryFlag from "react-country-flag";

import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import { GOOGLE_API_KEY } from '../../config/secrets';
import { MarkerWithLabel } from "react-google-maps/lib/components/addons/MarkerWithLabel";

import _ from "lodash";
import { compose, withProps, lifecycle } from "recompose";
import { StandaloneSearchBox } from "react-google-maps/lib/components/places/StandaloneSearchBox";
import { COUNTRY_CODE } from '../../utils/country';

const PlacesWithStandaloneSearchBox = compose(
    withProps({
        googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&v=3.exp&libraries=geometry,drawing,places`,
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div className={`${styles.widthFull} ${styles.heightFullPercent}`} />,
    }),
    lifecycle({
        componentWillMount() {
        const refs = {}

        this.setState({
            places: [],
            onSearchBoxMounted: ref => {
            refs.searchBox = ref;
            },
            onPlacesChanged: () => {
            const places = refs.searchBox.getPlaces();
            this.props.searchLocation(places)
            this.setState({
                places,
            });
            },
        })
        },
    }),
    withScriptjs  
)(props =>
    <div data-standalone-searchbox="" className={`${styles.widthFull}`}>
        <StandaloneSearchBox
        ref={props.onSearchBoxMounted}
        bounds={props.bounds}
        onPlacesChanged={props.onPlacesChanged}
        >
        <input
            type="text"
            placeholder="Search location"
            style={{
            boxSizing: `border-box`,
            border: `none`,
            width: `100%`,
            height: `40px`,
            padding: `0 12px`,
            fontSize: `13px`,
            outline: `none`,
            textOverflow: `ellipses`,
            color: '#333333'
            }}
        />
        </StandaloneSearchBox>
    </div>
);

const Map = withScriptjs(withGoogleMap((props) => (
    <GoogleMap
    defaultZoom={16}
    center={props.selectedLocation.geometry ? { lat: props.selectedLocation.geometry.location.lat(), lng: props.selectedLocation.geometry.location.lng() } : props.searchedLocations.length > 0 ? { lat: props.searchedLocations[0].geometry.location.lat(), lng: props.searchedLocations[0].geometry.location.lng()} : { lat: props.lat, lng: props.lng }}
  >
    {props.isMarkerShown && props.searchedLocations.length > 0 && (
        props.searchedLocations.map((location, index) => {
            const find = props.locations.find(lo => (lo.lat === location.geometry.location.lat()) && (lo.lng === location.geometry.location.lng()))
            return(
                <MarkerWithLabel 
                key={index}
                icon={find ? require('../../assets/images/icon_marker_selected.png') : require('../../assets/images/icon_marker_not.png')} 
                position={location.geometry.location} 
                onClick={() => props.selectLocation(location)}
                labelAnchor={index > 8 ? {x: 6, y: 20} : {x: 3.5, y: 20}}
                >
                    <p className={`${styles.fontBold} ${styles.font11} ${styles.white}`}>{index + 1}</p>
                </MarkerWithLabel>
            )
        })
    )}
  </GoogleMap>
)))

const Map2 = withScriptjs(withGoogleMap((props) => (
    <GoogleMap
    defaultZoom={16}
    defaultCenter={{ lat: props.lat, lng: props.lng }}
    center={{ lat: props.lat, lng: props.lng }}
  >
    {props.isMarkerShown && <Marker icon={require('../../assets/images/icon_marker.png')} position={{ lat: props.lat, lng: props.lng }} />}
  </GoogleMap>
)))

const sliderSettings = {
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: false,
    accessibility: false,
    draggable: false,
    infinite: false,
    touchMove: false,
    pauseOnHover: false,
    swipe: false,
    adaptiveHeight: true
};

const hourList = [
    '00',
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23'
]

const minList = [
    '00',
    '30'
]

class CustomRequestCreate extends Component{
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
        goHome: PropTypes.func.isRequired,
        getProfile: PropTypes.func.isRequired
    }

    static contextTypes = {
        t: PropTypes.func
    }

    state = {
        isLoggedIn: this.props.isLoggedIn,
        totalStep: this.props.isLoggedIn ? 3 : 4,
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
        selectedHour: "",
        selectedMin: "",
        showHourList: false,
        showMinList: false,
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
        name: "",
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
        confirmed: false
    }

    componentDidUpdate = (prevProps, prevState) => {
        if(!prevState.confirmed && this.state.confirmed){
            this.props.getProfile()
        }
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

    _handleInputChange = (event) => {
        const { target : { value, name } } = event;
        if(name === 'extraPeople'){
            let numberReg = /^[0-9]*$/;
            if(numberReg.test(value)){
                this.setState({
                    [name]: value
                });
            }
        }
        else if(name === 'extraHour'){
            let numberReg = /^[0-9]*$/;
            if(numberReg.test(value)){
                this.setState({
                    [name]: value
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
        else if(name === 'loginEmail'){
            let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ;
            if(reg.test(value) === true){
                this.setState({
                    [name]: value,
                    loginEmailForm: true
                })
            }
            else{
                this.setState({
                    [name]: value,
                    loginEmailForm: false
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

    _handleChangeDateOption = (dateOption) => {
        if(dateOption === 1){
            this.setState({
                dateOption,
                showCalendar1: true,
                showCalendar2: false,
                selectedDate: "",
                dateConfirm: false,
                selectedHour: "",
                selectedMin: "",
                selectDateStep: 1,
                selectedStartDate: "",
                selectedEndDate: "",
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
                selectedEndDate: "",
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

    _blankDateOption = () => {
        this.setState({
            dateOption: 0,
            selectedDate: "",
            dateConfirm: false,
            selectedHour: "",
            selectedMin: "",
            selectDateStep: 1,
            selectedStartDate: "",
            selectedEndDate: "",
        })
    }

    _confirmDate = () => {
        const { selectedMin, selectedHour, dateOption, selectedStartDate, selectedEndDate } = this.state;
        if(dateOption === 1){
            if(selectedMin && selectedHour){
                this.setState({
                    dateConfirm: true,
                    showCalendar1: false
                })
            }
            else{
                this.setState({
                    dateConfirm: false
                })
                alert(this.context.t("Please select time."))
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
                alert(this.context.t("Please select your date range."))
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
            selectedDate
        })
    }

    _selectDateRange = (range) => {
        this.setState({
            selectedStartDate: range[0],
            selectedEndDate: range[1],
            dateRange: range
        })
    }

    _handleShowHourList = () => {
        this.setState({
            showHourList: !this.state.showHourList
        })
    }

    _handleShowMinList = () => {
        this.setState({
            showMinList: !this.state.showMinList
        })
    }

    _selectHour = (selectedHour) => {
        this.setState({
            selectedHour
        })
    }

    _selectMin = (selectedMin) => {
        this.setState({
            selectedMin
        })
    }

    _changeDateStep = (selectDateStep) => {
        if(selectDateStep === 2){
            if(this.state.selectedDate){
                this.setState({
                    selectDateStep
                })
            }
            else{
                alert(this.context.t("Please select date."))
            }
        }
        else{
            this.setState({
                selectDateStep
            })
        }
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
        const find = locations.find(lo => (lo.lat === selectedLocation.geometry.location.lat()) && lo.lng === selectedLocation.geometry.location.lng())
        if(find){
            let newLocation = []
            locations.map(location => {
                if((location.lat === selectedLocation.geometry.location.lat()) && (location.lng === selectedLocation.geometry.location.lng())){
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
                    lat: selectedLocation.geometry.location.lat(),
                    lng: selectedLocation.geometry.location.lng()
                }],
                selectedLocation
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

    _searchLocation = async(searchedLocations) => {
        this.setState({
            searchedLocations,
            locationSearched: true,
            selectedLocation: {}
        })
    }

    _handleChangeAuth = (auth) => {
        this.setState({
            auth
        })
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
                        
                        let photograpyTypeTemp = option;
                        const find = option.indexOf('extra');
                        if(find > -1){
                            photograpyTypeTemp.push(extraOption)
                        }
                        let photograpyType = []
                        photograpyTypeTemp.map((pho) => {
                            if(pho === 'extra'){
                                photograpyType.push(extraOption)
                                return null;
                            }
                            else if(pho === extraOption){
                                return null;
                            }
                            else{
                                photograpyType.push(pho)
                                return null
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

                        const submit = await createCustomRequestByToken(result.token, photograpyType, person, time, dateOption, date, selectedHour, selectedMin, startDate, endDate, locationOption, locations)
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
                            alert(submit.error)
                        }
                        else{
                            getSaveToken(result.token)
                            this.setState({
                                isSubmitting: false,
                                confirmed: false
                            })
                            alert(this.context.t("An error has occurred.."))
                        }
                    }
                    else{
                        this.setState({
                            isSubmitting: false
                        })
                        alert(this.context.t("Please check your email and password again."))
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

    _signup = async() => {
        const { isSubmitting, name, email, countryNumber, countryCode, mobile, password, password2, emailForm, passwordForm, password2Form, option, extraOption, people, extraPeople, hour, extraHour, dateOption, selectedDate, selectedHour, selectedMin, selectedStartDate, selectedEndDate, locationOption, locations } = this.state;
        const { checkDuplicate, signUp, getProfileByToken, getSaveToken, getNotificationByToken, getOrderListByToken, createCustomRequestByToken } = this.props;
        if(!isSubmitting){
            if(name && email && countryNumber && countryCode && mobile && password && password2){
                if(emailForm){
                    if(passwordForm){
                        if(password === password2){
                            if(password2Form){
                                this.setState({
                                    isSubmitting: true
                                })
                                const check = await checkDuplicate(email, mobile, countryNumber);
                                if(check.status === 'ok'){
                                    const result = await signUp(email, password, name, countryNumber, countryCode, mobile)
                                    if(result.token){
                                        await getProfileByToken(result.token)
                                        await getNotificationByToken(result.token)
                                        await getOrderListByToken(result.token)

                                        let photograpyTypeTemp = option;
                                        const find = option.indexOf('extra');
                                        if(find > -1){
                                            photograpyTypeTemp.push(extraOption)
                                        }
                                        let photograpyType = []
                                        photograpyTypeTemp.map((pho) => {
                                            if(pho === 'extra'){
                                                photograpyType.push(extraOption)
                                                return null;
                                            }
                                            else if(pho === extraOption){
                                                return null;
                                            }
                                            else{
                                                photograpyType.push(pho)
                                                return null
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

                                        const submit = await createCustomRequestByToken(result.token, photograpyType, person, time, dateOption, date, selectedHour, selectedMin, startDate, endDate, locationOption, locations)
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
                                            alert(submit.error)
                                        }
                                        else{
                                            getSaveToken(result.token)
                                            this.setState({
                                                isSubmitting: false,
                                                confirmed: false
                                            })
                                            alert(this.context.t("An error has occurred.."))
                                        }
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

    _nextSlide = async() => {
        const { step, isLoggedIn, option, extraOption, people, extraPeople, dateOption, dateConfirm, selectedDate, selectedHour, selectedMin, selectedStartDate, selectedEndDate, hour, extraHour, locationOption, locations, isSubmitting } = this.state;
        const { createCustomRequest } = this.props;
        if(step === 1){
            if((((option.length > 0) && ((option.indexOf('extra') < 0))) || (extraOption !== '')) && (((people !==0) && (people !==-1)) || (extraPeople !== ''))){
                this.setState({
                    step: 2
                })
                this.slider.slickNext()
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
                            this.slider.slickNext()
                        }
                    }
                }
                else if(dateOption === 2){
                    if(selectedStartDate && selectedEndDate){
                        if(((hour !== 0) && (hour !== -1)) || (extraHour !== '')){
                            this.setState({
                                step: 3
                            })
                            this.slider.slickNext()
                        }
                    }
                }
            }
        }
        else if(step === 3){
            if(isLoggedIn){
                if(!isSubmitting){
                    this.setState({
                        isSubmitting: true
                    })
                    let photograpyTypeTemp = option;
                    const find = option.indexOf('extra');
                    if(find > -1){
                        photograpyTypeTemp.push(extraOption)
                    }
                    let photograpyType = []
                    photograpyTypeTemp.map((pho) => {
                        if(pho === 'extra'){
                            photograpyType.push(extraOption)
                            return null;
                        }
                        else if(pho === extraOption){
                            return null;
                        }
                        else{
                            photograpyType.push(pho)
                            return null
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

                    const submit = await createCustomRequest(photograpyType, person, time, dateOption, date, selectedHour, selectedMin, startDate, endDate, locationOption, locations)
                    if(submit.status === 'ok'){
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
                        alert(submit.error)
                    }
                    else{
                        this.setState({
                            isSubmitting: false,
                            confirmed: false
                        })
                        alert(this.context.t("An error has occurred.."))
                    }
                }
            }
            else{
                if(locationOption === 1){
                    if(locations && locations.length > 0){
                        this.setState({
                            step: 4
                        })
                        this.slider.slickNext()
                    }
                }
                else if(locationOption === 2){
                    this.setState({
                        step: 4
                    })
                    this.slider.slickNext()
                }
            }
            
        }
    }

    _previousSlide = () => {
        const { step } = this.state;
        if(step > 1){
            this.setState({
                step: this.state.step - 1
            })
        }
        this.slider.slickPrev()
    }

    render(){
        const { 
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
            showHourList, 
            showMinList, 
            dateRange, 
            dateConfirm, 
            hour, 
            extraHour, 
            locationOption, 
            locations, 
            showMap, 
            locationSearched, 
            searchedLocations, 
            selectedLocation,
            auth,
            loginEmail,
            loginPassword,
            name,
            email,
            countryNumber,
            countryCode,
            mobile,
            password,
            password2,
            q,
            showCountryNumber,
            isSubmitting,
            countryList,
            isLoggedIn,
            confirmed
        } = this.state;
        return(
            <div className={`${styles.containerCustomer} ${styles.safearea} ${styles.minHeightFull}`}>
                {confirmed ? (
                    <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.heightFullSafeareaLg} ${styles.px3}`} style={{position: 'relative'}}>
                        <div className={`${styles.textCenter}`}>
                            <img src={require('../../assets/images/request_complete.png')} alt={this.context.t("Submitted")} className={`${styles.mb4}`} style={{width: '100%', maxWidth: 400}} />
                            <p className={`${styles.fontBold} ${styles.font14} ${styles.mt5}`}>
                                {this.context.t("맞춤예약 신청이 완료되었습니다!")}<br/>
                                {this.context.t("추후 SMS와 이메일로 안내해드리겠습니다.")}
                            </p>

                            <p className={`${styles.font12} ${styles.mt5} ${styles.textCenter}`} style={{lineHeight: 1.25}}>
                                {this.context.t(`회원님의 예약 내역이 사진작가들에게 전달되었으며,`)}<br/>
                                {this.context.t(`곧 다양한 작가들의 촬영 견적을 받아보실 수 있습니다.`)}<br/>
                            </p>
                            <div className={`${styles.widthFull} ${styles.bgGray33} ${styles.row} ${styles.mx0} ${styles.mt5} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn}`} style={{height: 48}} onClick={this.props.goHome}>
                                <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{this.context.t("메인화면으로 이동하기")}</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <Fragment>
                        <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween}`}>
                            <div className={`${styles.col1} ${styles.px0} ${styles.pl3}`}>
                                <img src={require('../../assets/images/icon_left.png')} className={`${step == 1 ? styles.hidden : null}`} style={{width: 21*0.6, height: 33*0.6, marginTop:1}} onClick={this._previousSlide} />
                            </div>
                            <div className={`${styles.col10} ${styles.px1}`}>
                            <Progress 
                            percent={(step/totalStep)*100} 
                            status="normal"
                            theme={
                                {
                                    normal: {
                                    symbol: 'null',
                                    trailColor: 'rgb(243,243,243)',
                                    color: 'rgb(112,112,112)'
                                }
                                }
                            }
                            symbolClassName={styles.none}
                            />
                            </div>
                            <div className={`${styles.col1} ${styles.px0} ${styles.pr3}`}>
                                <img src={require('../../assets/images/icon_left.png')} className={`${styles.hidden}`} style={{width: 21*0.6, height: 33*0.6, marginTop:1}} />
                            </div>
                        </div>
                        <Slider ref={c => (this.slider = c)} 
                        {...sliderSettings}
                        initialSlide={step-1}
                        >
                            <div className={`${styles.py3} ${styles.px3}`}>
                                <p className={`${styles.fontBold} ${styles.font1416}`}>{this.context.t("1. 희망하는 사진 촬영 유형을 선택해주세요. ")}<span className={`${styles.fontNormal} ${styles.font12} ${styles.mobile380None}`}>{this.context.t(" (중복 선택 가능)")}</span></p>
                                <p className={`${styles.fontNormal} ${styles.font12} ${styles.textRight} ${styles.mobile380Only}`}>{this.context.t(" (중복 선택 가능)")}</p>
                                <div className={`${styles.row} ${styles.mx0} ${styles.mt3}`}>
                                    <div className={`${styles.col6} ${styles.px0} ${styles.mb3}`}>
                                        <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                                            <div className={`${styles.checkBox} ${option.indexOf('alone') > -1 ? null : styles.unchecked} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter}`} onClick={() => this._handleChangeOption('alone')}>
                                                {option.indexOf('alone') > -1 && (
                                                    <img src={require('../../assets/images/icon_check.png')} alt={this.context.t("Alone")} style={{width: 10, height: 10}} />
                                                )}
                                            </div>
                                            <p className={`${styles.font1214} ${styles.ml2}`} onClick={() => this._handleChangeOption('alone')}>{this.context.t("단독 사진")}</p>
                                        </div>
                                    </div>
                                    <div className={`${styles.col6} ${styles.px0} ${styles.mb3}`}>
                                        <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                                            <div className={`${styles.checkBox} ${option.indexOf('street') > -1 ? null : styles.unchecked} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter}`} onClick={() => this._handleChangeOption('street')}>
                                                {option.indexOf('street') > -1 && (
                                                    <img src={require('../../assets/images/icon_check.png')} alt={this.context.t("Street")} style={{width: 10, height: 10}} />
                                                )}
                                            </div>
                                            <p className={`${styles.font1214} ${styles.ml2}`} onClick={() => this._handleChangeOption('street')}>{this.context.t("거리에서")}</p>
                                        </div>
                                    </div>
                                    <div className={`${styles.col6} ${styles.px0} ${styles.mb3}`}>
                                        <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                                            <div className={`${styles.checkBox} ${option.indexOf('couple') > -1 ? null : styles.unchecked} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter}`} onClick={() => this._handleChangeOption('couple')}>
                                                {option.indexOf('couple') > -1 && (
                                                    <img src={require('../../assets/images/icon_check.png')} alt={this.context.t("Couple")} style={{width: 10, height: 10}} />
                                                )}
                                            </div>
                                            <p className={`${styles.font1214} ${styles.ml2}`} onClick={() => this._handleChangeOption('couple')}>{this.context.t("연인과 함께")}</p>
                                        </div>
                                    </div>
                                    <div className={`${styles.col6} ${styles.px0} ${styles.mb3}`}>
                                        <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                                            <div className={`${styles.checkBox} ${option.indexOf('indoor') > -1 ? null : styles.unchecked} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter}`} onClick={() => this._handleChangeOption('indoor')}>
                                                {option.indexOf('indoor') > -1 && (
                                                    <img src={require('../../assets/images/icon_check.png')} alt={this.context.t("Indoor")} style={{width: 10, height: 10}} />
                                                )}
                                            </div>
                                            <p className={`${styles.font1214} ${styles.ml2}`} onClick={() => this._handleChangeOption('indoor')}>{this.context.t("실내에서")}</p>
                                        </div>
                                    </div>
                                    <div className={`${styles.col6} ${styles.px0} ${styles.mb3}`}>
                                        <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                                            <div className={`${styles.checkBox} ${option.indexOf('wedding') > -1 ? null : styles.unchecked} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter}`} onClick={() => this._handleChangeOption('wedding')}>
                                                {option.indexOf('wedding') > -1 && (
                                                    <img src={require('../../assets/images/icon_check.png')} alt={this.context.t("Wedding")} style={{width: 10, height: 10}} />
                                                )}
                                            </div>
                                            <p className={`${styles.font1214} ${styles.ml2}`} onClick={() => this._handleChangeOption('wedding')}>{this.context.t("웨딩 사진")}</p>
                                        </div>
                                    </div>
                                    <div className={`${styles.col6} ${styles.px0} ${styles.mb3}`}>
                                        <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                                            <div className={`${styles.checkBox} ${option.indexOf('propose') > -1 ? null : styles.unchecked} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter}`} onClick={() => this._handleChangeOption('propose')}>
                                                {option.indexOf('propose') > -1 && (
                                                    <img src={require('../../assets/images/icon_check.png')} alt={this.context.t("Propose")} style={{width: 10, height: 10}} />
                                                )}
                                            </div>
                                            <p className={`${styles.font1214} ${styles.ml2}`} onClick={() => this._handleChangeOption('propose')}>{this.context.t("프로포즈")}</p>
                                        </div>
                                    </div>
                                    <div className={`${styles.col6} ${styles.px0} ${styles.mb3}`}>
                                        <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                                            <div className={`${styles.checkBox} ${option.indexOf('friend') > -1 ? null : styles.unchecked} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter}`} onClick={() => this._handleChangeOption('friend')}>
                                                {option.indexOf('friend') > -1 && (
                                                    <img src={require('../../assets/images/icon_check.png')} alt={this.context.t("Friend")} style={{width: 10, height: 10}} />
                                                )}
                                            </div>
                                            <p className={`${styles.font1214} ${styles.ml2}`} onClick={() => this._handleChangeOption('friend')}>{this.context.t("친구들과 함께")}</p>
                                        </div>
                                    </div>
                                    <div className={`${styles.col6} ${styles.px0} ${styles.mb3}`}>
                                        <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                                            <div className={`${styles.checkBox} ${option.indexOf('daily') > -1 ? null : styles.unchecked} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter}`} onClick={() => this._handleChangeOption('daily')}>
                                                {option.indexOf('daily') > -1 && (
                                                    <img src={require('../../assets/images/icon_check.png')} alt={this.context.t("Daily")} style={{width: 10, height: 10}} />
                                                )}
                                            </div>
                                            <p className={`${styles.font1214} ${styles.ml2}`} onClick={() => this._handleChangeOption('daily')}>{this.context.t("일상의 기록")}</p>
                                        </div>
                                    </div>
                                    <div className={`${styles.col6} ${styles.px0} ${styles.mb3}`}>
                                        <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                                            <div className={`${styles.checkBox} ${option.indexOf('family') > -1 ? null : styles.unchecked} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter}`} onClick={() => this._handleChangeOption('family')}>
                                                {option.indexOf('family') > -1 && (
                                                    <img src={require('../../assets/images/icon_check.png')} alt={this.context.t("Family")} style={{width: 10, height: 10}} />
                                                )}
                                            </div>
                                            <p className={`${styles.font1214} ${styles.ml2}`} onClick={() => this._handleChangeOption('family')}>{this.context.t("가족과 함께")}</p>
                                        </div>
                                    </div>
                                    <div className={`${styles.col6} ${styles.px0} ${styles.mb3}`}>
                                        <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                                            <div className={`${styles.checkBox} ${option.indexOf('travel') > -1 ? null : styles.unchecked} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter}`} onClick={() => this._handleChangeOption('travel')}>
                                                {option.indexOf('travel') > -1 && (
                                                    <img src={require('../../assets/images/icon_check.png')} alt={this.context.t("Travel")} style={{width: 10, height: 10}} />
                                                )}
                                            </div>
                                            <p className={`${styles.font1214} ${styles.ml2}`} onClick={() => this._handleChangeOption('travel')}>{this.context.t("여행의 순간")}</p>
                                        </div>
                                    </div>
                                    <div className={`${styles.col12} ${styles.px0} ${styles.mb3}`}>
                                        <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                                            <div className={`${styles.checkBox} ${option.indexOf('extra') > -1 ? null : styles.unchecked} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter}`} onClick={() => this._handleChangeOption('extra')}>
                                                {option.indexOf('extra') > -1 && (
                                                    <img src={require('../../assets/images/icon_check.png')} alt={this.context.t("Extra")} style={{width: 10, height: 10}} />
                                                )}
                                            </div>
                                            <p className={`${styles.font1214} ${styles.ml2}`} onClick={() => this._handleChangeOption('extra')}>{this.context.t("기타 : ")}</p>
                                            <input className={`${styles.textInput11} ${styles.ml2}`} readOnly={option.indexOf('extra') > -1 ? false : true} type={"text"} value={extraOption} name={'extraOption'} onChange={this._handleInputChange} />
                                        </div>
                                    </div>
                                </div>
                                <p className={`${styles.fontBold} ${styles.font1416} ${styles.mt5}`}>{this.context.t("2. 몇 명이 사진촬영을 진행할 예정인가요?")}</p>
                                <div className={`${styles.row} ${styles.mx0} ${styles.mt3} ${styles.justifyContentBetween}`}>
                                    <div className={`${styles.px0} ${styles.mb3}`}>
                                        <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                                            <div className={`${styles.checkBox} ${people === 1 ? null : styles.unchecked} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter}`} onClick={() => this._handleChangePeople(1)}>
                                                {people === 1 && (
                                                    <img src={require('../../assets/images/icon_check.png')} alt={this.context.t("Alone")} style={{width: 10, height: 10}} />
                                                )}
                                            </div>
                                            <p className={`${styles.font1214} ${styles.ml2}`} onClick={() => this._handleChangePeople(1)}>{this.context.t("1명")}</p>
                                        </div>
                                    </div>
                                    <div className={`${styles.px0} ${styles.mb3}`}>
                                        <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                                            <div className={`${styles.checkBox} ${people === 2 ? null : styles.unchecked} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter}`} onClick={() => this._handleChangePeople(2)}>
                                                {people === 2 && (
                                                    <img src={require('../../assets/images/icon_check.png')} alt={this.context.t("Alone")} style={{width: 10, height: 10}} />
                                                )}
                                            </div>
                                            <p className={`${styles.font1214} ${styles.ml2}`} onClick={() => this._handleChangePeople(2)}>{this.context.t("2명")}</p>
                                        </div>
                                    </div>
                                    <div className={`${styles.px0} ${styles.mb3}`}>
                                        <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                                            <div className={`${styles.checkBox} ${people === 3 ? null : styles.unchecked} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter}`} onClick={() => this._handleChangePeople(3)}>
                                                {people === 3 && (
                                                    <img src={require('../../assets/images/icon_check.png')} alt={this.context.t("Alone")} style={{width: 10, height: 10}} />
                                                )}
                                            </div>
                                            <p className={`${styles.font1214} ${styles.ml2}`} onClick={() => this._handleChangePeople(3)}>{this.context.t("3명")}</p>
                                        </div>
                                    </div>
                                    <div className={`${styles.px0} ${styles.mb3}`}>
                                        <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                                            <div className={`${styles.checkBox} ${people === 4 ? null : styles.unchecked} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter}`} onClick={() => this._handleChangePeople(4)}>
                                                {people === 4 && (
                                                    <img src={require('../../assets/images/icon_check.png')} alt={this.context.t("Alone")} style={{width: 10, height: 10}} />
                                                )}
                                            </div>
                                            <p className={`${styles.font1214} ${styles.ml2}`} onClick={() => this._handleChangePeople(4)}>{this.context.t("4명")}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className={`${styles.widthFull} ${styles.mb3}`}>
                                    <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                                        <div className={`${styles.checkBox} ${people === -1 ? null : styles.unchecked} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter}`} onClick={() => this._handleChangePeople(-1)}>
                                            {people === -1 && (
                                                <img src={require('../../assets/images/icon_check.png')} alt={this.context.t("Alone")} style={{width: 10, height: 10}} />
                                            )}
                                        </div>
                                        <p className={`${styles.font1214} ${styles.ml2}`} onClick={() => this._handleChangePeople(-1)}>{this.context.t("기타 : ")}</p>
                                        <input className={`${styles.textInput11} ${styles.ml2}`} style={{width: 50}} type={"text"} readOnly={people === -1 ? false : true} value={extraPeople} name={'extraPeople'} onChange={this._handleInputChange} />
                                        <p className={`${styles.font1214} ${styles.ml1}`} onClick={() => this._handleChangePeople(-1)}>{this.context.t("명")}</p>
                                    </div>
                                </div>
                                <div className={`${styles.widthFull} ${styles.bgGray33} ${styles.row} ${styles.mx0} ${styles.mt5} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn}`} style={{height: 48}} onClick={this._nextSlide}>
                                    <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{this.context.t("NEXT")}</p>
                                </div>
                            </div>
                            <div className={`${styles.py3} ${styles.px3}`}>
                                <p className={`${styles.fontBold} ${styles.font1416}`}>{this.context.t("3. 사진 촬영은 언제 진행하고 싶으신가요? ")}</p>
                                <div className={`${styles.row} ${styles.mx0} ${styles.mt3}`}>
                                    <div className={`${styles.col12} ${styles.px0}`}>
                                        <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                                            <div className={`${styles.checkBox} ${dateOption === 1 ? null : styles.unchecked} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter}`} onClick={() => this._handleChangeDateOption(1)}>
                                                {dateOption === 1 && (
                                                    <img src={require('../../assets/images/icon_check.png')} alt={this.context.t("Specific")} style={{width: 10, height: 10}} />
                                                )}
                                            </div>
                                            <div className={`${styles.checkBoxText}`}>
                                                <p className={`${styles.font1214} ${styles.ml2}`} onClick={() => this._handleChangeDateOption(1)}>{this.context.t("정해둔 날짜와 시간이 있습니다.")}</p>
                                            </div>
                                        </div>
                                    </div>
                                    {dateConfirm && (dateOption === 1) && (
                                        <div className={`${styles.col12} ${styles.px0} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween} ${styles.mt3}`}>
                                            <div className={`${styles.bgPink} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.py3} ${styles.cursorPointer}`} style={{width: 'calc(50% - 8px)'}} onClick={() => this._openCalendar1(1)}>
                                                <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{`${selectedDate.getFullYear()}/${String(selectedDate.getMonth() + 1).length === 2 ? (selectedDate.getMonth() + 1) : '0'.concat(String(selectedDate.getMonth() + 1))}/${selectedDate.getDate()}`}</p>
                                            </div>
                                            <div className={`${styles.bgPink} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.py3} ${styles.cursorPointer}`} style={{width: 'calc(50% - 8px)'}} onClick={() => this._openCalendar1()}>
                                                <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{`${selectedHour}:${selectedMin}`}</p>
                                            </div>
                                        </div>
                                    )}
                                    <div className={`${styles.col12} ${styles.px0} ${styles.mt3}`}>
                                        <div className={`${styles.row} ${styles.mx0}`}>
                                            <div className={`${styles.checkBox} ${dateOption === 2 ? null : styles.unchecked} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter}`} onClick={() => this._handleChangeDateOption(2)}>
                                                {dateOption === 2 && (
                                                    <img src={require('../../assets/images/icon_check.png')} alt={this.context.t("Range")} style={{width: 10, height: 10}} />
                                                )}
                                            </div>
                                            <div className={`${styles.checkBoxText}`}>
                                                <p className={`${styles.font1214} ${styles.ml2}`} onClick={() => this._handleChangeDateOption(2)}>{this.context.t("아직 정확한 날짜와 시간은 정하지 않았지만, 다음의 기간에 뉴욕에 머무를 계획입니다 : ")}</p>
                                            </div>
                                        </div>
                                    </div>
                                    {dateConfirm && (dateOption === 2) && (
                                        <div className={`${styles.col12} ${styles.px0} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween} ${styles.mt3}`}>
                                            <div className={`${styles.bgPink} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.py3} ${styles.cursorPointer}`} style={{width: 'calc(50% - 8px)'}} onClick={this._openCalendar2}>
                                                <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{`${selectedStartDate.getFullYear()}/${String(selectedStartDate.getMonth() + 1).length === 2 ? (selectedStartDate.getMonth() + 1) : '0'.concat(String(selectedStartDate.getMonth() + 1))}/${selectedStartDate.getDate()}`}</p>
                                            </div>
                                            <div className={`${styles.bgPink} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.py3} ${styles.cursorPointer}`} style={{width: 'calc(50% - 8px)'}} onClick={this._openCalendar2}>
                                                <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{`${selectedEndDate.getFullYear()}/${String(selectedEndDate.getMonth() + 1).length === 2 ? (selectedEndDate.getMonth() + 1) : '0'.concat(String(selectedEndDate.getMonth() + 1))}/${selectedEndDate.getDate()}`}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <p className={`${styles.fontBold} ${styles.font1416} ${styles.mt5}`}>{this.context.t("4. 몇 시간 동안 촬영을 진행하고 싶으신가요?")}</p>
                                <div className={`${styles.row} ${styles.mx0} ${styles.mt3} ${styles.justifyContentBetween}`}>
                                    <div className={`${styles.px0} ${styles.mb3}`}>
                                        <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                                            <div className={`${styles.checkBox} ${hour === 1 ? null : styles.unchecked} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter}`} onClick={() => this._handleChangeHour(1)}>
                                                {hour === 1 && (
                                                    <img src={require('../../assets/images/icon_check.png')} alt={this.context.t("1 Hour")} style={{width: 10, height: 10}} />
                                                )}
                                            </div>
                                            <p className={`${styles.font1214} ${styles.ml2}`} onClick={() => this._handleChangeHour(1)}>{this.context.t("1시간")}</p>
                                        </div>
                                    </div>
                                    <div className={`${styles.px0} ${styles.mb3}`}>
                                        <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                                            <div className={`${styles.checkBox} ${hour === 2 ? null : styles.unchecked} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter}`} onClick={() => this._handleChangeHour(2)}>
                                                {hour === 2 && (
                                                    <img src={require('../../assets/images/icon_check.png')} alt={this.context.t("2 Hour")} style={{width: 10, height: 10}} />
                                                )}
                                            </div>
                                            <p className={`${styles.font1214} ${styles.ml2}`} onClick={() => this._handleChangeHour(2)}>{this.context.t("2시간")}</p>
                                        </div>
                                    </div>
                                    <div className={`${styles.px0} ${styles.mb3}`}>
                                        <div className={`${styles.row} ${styles.mx0}`}>
                                            <div className={`${styles.checkBox} ${hour === -1 ? null : styles.unchecked} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter}`} onClick={() => this._handleChangeHour(-1)}>
                                                {hour === -1 && (
                                                    <img src={require('../../assets/images/icon_check.png')} alt={this.context.t("Extra Hour")} style={{width: 10, height: 10}} />
                                                )}
                                            </div>
                                            <p className={`${styles.font1214} ${styles.ml2}`} onClick={() => this._handleChangeHour(-1)}>{this.context.t("기타 : ")}</p>
                                            <input className={`${styles.textInput11} ${styles.ml2}`} readOnly={hour === -1 ? false : true} style={{width: 50}} type={"text"} value={extraHour} name={'extraHour'} maxLength={3} onChange={this._handleInputChange} />
                                            <p className={`${styles.font1214} ${styles.ml1}`} onClick={() => this._handleChangeHour(-1)}>{this.context.t("시간")}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className={`${styles.widthFull} ${styles.bgGray33} ${styles.row} ${styles.mx0} ${styles.mt5} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn}`} style={{height: 48}} onClick={this._nextSlide}>
                                    <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{this.context.t("NEXT")}</p>
                                </div>
                            </div>
                            <div className={`${styles.py3} ${styles.px3}`}>
                                <p className={`${styles.fontBold} ${styles.font1416}`}>{this.context.t("5. 사진 촬영 장소를 선택해주세요. ")}</p>
                                <div className={`${styles.row} ${styles.mx0} ${styles.mt3}`}>
                                    <div className={`${styles.col12} ${styles.px0}`}>
                                        <div className={`${styles.row} ${styles.mx0}`}>
                                            <div className={`${styles.checkBox} ${locationOption === 1 ? null : styles.unchecked} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter}`} onClick={() => this._handleChangeLocationOption(1)}>
                                                {locationOption === 1 && (
                                                    <img src={require('../../assets/images/icon_check.png')} alt={this.context.t("Specific")} style={{width: 10, height: 10}} />
                                                )}
                                            </div>
                                            <div className={`${styles.checkBoxText}`}>
                                                <p className={`${styles.font1214} ${styles.ml2}`} onClick={() => this._handleChangeLocationOption(1)}>{this.context.t("장소를 직접 선택하겠습니다.")}</p>
                                                <p className={`${styles.font1012} ${styles.gray2f} ${styles.ml2}`} onClick={() => this._handleChangeLocationOption(1)}>{this.context.t("하나 이상의 옵션을 선택하는 것도 가능합니다.")}</p>
                                            </div>
                                        </div>
                                    </div>
                                    {locationOption === 1 && (
                                        <Fragment>
                                            {locations && (locations.length > 0) && (
                                                <div className={`${styles.mt3} ${styles.widthFull} ${styles.row} ${styles.mx0}`}>
                                                {locations.map((location, index) => (
                                                    <div key={index} className={`${styles.col12} ${styles.colMd4} ${styles.mb2}`}>
                                                        <div className={`${styles.bgPink} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.py3} ${styles.px3} ${styles.cursorPointer}`} onClick={() => this._removeLocation(location.id)}>
                                                            <div className={`${styles.col1} ${styles.px0} ${styles.hidden}`}>
                                                                <MdClose fontSize="16px" color="#ffffff" />
                                                            </div>
                                                            <div className={`${styles.col10} ${styles.px0}`}>
                                                                <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{`${location.name}`}</p>
                                                            </div>
                                                            <div className={`${styles.col1} ${styles.px0}`}>
                                                                <MdClose fontSize="16px" color="#ffffff" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                                </div>
                                            )}
                                            <div className={`${styles.widthFull} ${styles.bgGray33} ${styles.row} ${styles.mx0} ${styles.mt3} ${styles.alignItemsCenter} ${styles.justifyContentBetween} ${styles.btn} ${styles.px3}`} style={{height: 48}} onClick={locationOption === 1 ? showMap ? this._closeMap : this._openMap : null}>
                                                <div>
                                                    <MdAdd fontSize="16px" color="#ffffff" />
                                                </div>
                                                <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{this.context.t("장소 추가하기")}</p>
                                                <div className={`${styles.hidden}`}>
                                                    <MdAdd fontSize="16px" color="#ffffff" />
                                                </div>
                                            </div>
                                        </Fragment>
                                    )}
                                    {locationOption === 1 && showMap && (
                                        <Fragment>
                                            <div className={`${styles.borderDropdown} ${styles.widthFull}`}>
                                                <PlacesWithStandaloneSearchBox searchLocation={this._searchLocation} />
                                            </div>
                                            <div className={`${styles.containerGooglemapRequest}`}>
                                                <Map
                                                isMarkerShown={locationSearched}
                                                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
                                                loadingElement={<div style={{ height: `100%` }} />}
                                                containerElement={<div className={`${styles.widthFull} ${styles.heightFullPercent}`} />}
                                                mapElement={<div style={{ height: `100%` }} />}
                                                searchedLocations={searchedLocations}
                                                locations={locations}
                                                lng={locationSearched ? 126.9748523 : 126.9748523}
                                                lat={locationSearched ? 37.5796212 : 37.5796212}
                                                selectedLocation={selectedLocation}
                                                selectLocation={this._selectLocation}
                                                />
                                            </div>
                                            {searchedLocations.length > 0 ? (
                                                <div className={`${styles.bgWhite} ${styles.widthFull} ${styles.containerSearchedLocationPc}`}>
                                                    {searchedLocations.map((location, index) => {
                                                        const find = locations.find(lo => (lo.lat === location.geometry.location.lat()) && (lo.lng === location.geometry.location.lng()))
                                                        return(
                                                            <div key={index} className={`${index === searchedLocations.length - 1 ? null : styles.borderBtmGrayDc} ${styles.px3} ${styles.py3} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween}`} onClick={() => this._selectLocation(location)}>
                                                                <div className={`${styles.col10} ${styles.px0} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                                                                    <div className={`${styles.col1} ${styles.px0}`}>
                                                                        <p className={`${styles.fontBold} ${styles.font12} ${find ? styles.pink : null}`}>{index + 1}</p>
                                                                    </div>
                                                                    <div className={`${styles.col11} ${styles.px0}`}>
                                                                        <p className={`${styles.fontBold} ${styles.font14} ${styles.ml2} ${find ? styles.pink : null}`}>{location.name}</p>
                                                                    </div>
                                                                </div>
                                                                <div className={`${styles.col2} ${styles.px0} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentEnd}`}>
                                                                    <div className={`${styles.circle24} ${find ? styles.bgPink : styles.bgGray5c} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter}`}>
                                                                        {find ? (
                                                                            <MdClose fontSize="15px" color="#ffffff" />
                                                                        ) : (
                                                                            <MdAdd fontSize="15px" color="#ffffff" />
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            ) : (
                                                null
                                            )}
                                        </Fragment>
                                    )}
                                    <div className={`${styles.col12} ${styles.px0} ${styles.mt3}`}>
                                        <div className={`${styles.row} ${styles.mx0}`}>
                                            <div className={`${styles.checkBox} ${locationOption === 2 ? null : styles.unchecked} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter}`} onClick={() => this._handleChangeLocationOption(2)}>
                                                {locationOption === 2 && (
                                                    <img src={require('../../assets/images/icon_check.png')} alt={this.context.t("Range")} style={{width: 10, height: 10}} />
                                                )}
                                            </div>
                                            <div className={`${styles.checkBoxText}`}>
                                                <p className={`${styles.font1214} ${styles.ml2}`} onClick={() => this._handleChangeLocationOption(2)}>{this.context.t("직접 선택하는 대신, 사진작가의 추천을 받겠습니다.")}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={`${styles.widthFull} ${styles.bgGray33} ${styles.row} ${styles.mx0} ${styles.mt5} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn}`} style={{height: 48}} onClick={this._nextSlide}>
                                    <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{this.context.t("NEXT")}</p>
                                </div>
                            </div>
                            {!isLoggedIn && auth === 'signup' ? (
                                <div className={`${styles.py3} ${styles.px3}`}>
                                    <p className={`${styles.fontBold} ${styles.font1416}`}>{this.context.t("6. 회원가입 후 예약 완료하기 ")}</p>
                                    <p className={`${styles.fontBold} ${styles.font12} ${styles.pt45}`}>{this.context.t("Full name")}</p>
                                    <div className={`${styles.widthFull}`}>
                                        <input className={`${styles.textInput2}`} type={"text"} name={"name"} value={name} onChange={this._handleInputChange} />
                                    </div>
                                    <p className={`${styles.fontBold} ${styles.font12} ${styles.mt4}`}>{this.context.t("Email")}</p>
                                    <div className={`${styles.widthFull}`}>
                                        <input className={`${styles.textInput2}`} type={"text"} name={"email"} value={email} onChange={this._handleInputChange} />
                                    </div>
                                    <p className={`${styles.fontBold} ${styles.font12} ${styles.mt4}`}>{this.context.t("Mobile")}</p>
                                    <div className={`${styles.positionRelative}`}>
                                        <div className={`${styles.widthFull} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween}`}>
                                            <div className={`${styles.countryNumberInput} ${styles.cursorPointer}`} onClick={this._handleShowCountryNumber}>
                                                <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween}`} style={{height: 16}}>
                                                    <p className={`${styles.font13}`}>{countryNumber ? `+${countryNumber}` : `${countryNumber}`}</p>
                                                    <MdArrowDropdown fontSize="16px" color="#000000" />
                                                </div>
                                            </div>
                                            <div className={`${styles.textInput3} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween}`}>
                                                <div className={`${styles.col10} ${styles.px0}`}>
                                                    <input className={`${styles.textInput4}`} type={"text"} name={"mobile"} value={mobile} onChange={this._handleInputChange} />
                                                </div>
                                                <p className={`${styles.font11} ${styles.fontBold} ${styles.pink} ${styles.cursorPointer}`}>{this.context.t("Verify")}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <p className={`${styles.my3} ${styles.font10}`}>
                                        {this.context.t("Your reservation details and confirmation message from photographers will be sent to your email and mobile number.")}
                                    </p>
                                    <p className={`${styles.fontBold} ${styles.font12} ${styles.mt4}`}>{this.context.t("Password")}</p>
                                    <div className={`${styles.widthFull}`}>
                                        <input className={`${styles.textInput2}`} type={"password"} name={"password"} value={password} onChange={this._handleInputChange} />
                                    </div>
                                    <p className={`${styles.fontBold} ${styles.font12} ${styles.mt4}`}>{this.context.t("Password confirm")}</p>
                                    <div className={`${styles.widthFull}`}>
                                        <input className={`${styles.textInput2}`} type={"password"} name={"password2"} value={password2} onChange={this._handleInputChange} />
                                    </div>
                                    <p className={`${styles.font1214} ${styles.pink} ${styles.textCenter} ${styles.mt3} ${styles.cursorPointer}`} onClick={() => this._handleChangeAuth('login')}>{this.context.t("이미 PRIZM 회원이신가요?")}</p>
                                    <div className={`${styles.widthFull} ${styles.bgGray33} ${styles.row} ${styles.mx0} ${styles.mt3} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn} ${isSubmitting ? styles.opacity7 : null}`} style={{height: 48}} onClick={this._signup}>
                                        <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{this.context.t("맞춤예약 신청 완료!")}</p>
                                    </div>
                                    <Modal
                                    open={showCountryNumber} 
                                    onClose={this._closeShowCountryNumber} 
                                    center
                                    styles={{ overlay: { background: "rgba(0,0,0,0.2)", padding: 0 }, modal: { padding: 0 }}}
                                    >
                                        <div className={`${styles.containerModal}`}>
                                            <p className={`${styles.textCenter} ${styles.my3} ${styles.fontBold} ${styles.font1214}`}>{this.context.t("Nationality")}</p>
                                            <div className={`${styles.px5}`}>
                                                <div className={`${styles.widthFull}`}>
                                                    <input className={`${styles.textInput2}`} type={"text"} name={"q"} value={q} onChange={this._handleInputChange} />
                                                </div>
                                            </div>
                                            <div className={`${styles.overflowYScroll} ${styles.px3} ${styles.pt2}`} style={{maxHeight: 300}}>
                                                {q !== "" && countryList.map((country, index) => (
                                                    <div key={index} className={`${styles.row} ${styles.mx0} ${styles.mb2}`} onClick={() => this._handleCountryNumberChange(country.number, country.value)}>
                                                        <ReactCountryFlag 
                                                            styleProps={{
                                                                width: '15px',
                                                                height: '15px'
                                                            }}
                                                            code={country.value}
                                                            svg
                                                        />
                                                        <p className={`${styles.font1214} ${styles.ml2}`}>{country.label}</p>
                                                        <p className={`${styles.font1214} ${styles.ml2}`}>{`+${country.number}`}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </Modal>
                                </div>
                            ) : (
                                <div className={`${styles.py3} ${styles.px3}`}>
                                    <p className={`${styles.fontBold} ${styles.font1416}`}>{this.context.t("6. 로그인 후 예약 완료하기 ")}</p>
                                    <p className={`${styles.fontBold} ${styles.font12} ${styles.pt45}`}>{this.context.t("Email")}</p>
                                    <div className={`${styles.widthFull}`}>
                                        <input className={`${styles.textInput2}`} type={"text"} name={"loginEmail"} value={loginEmail} onChange={this._handleInputChange} />
                                    </div>
                                    <p className={`${styles.fontBold} ${styles.font12} ${styles.mt4}`}>{this.context.t("Password")}</p>
                                    <div className={`${styles.widthFull}`}>
                                        <input className={`${styles.textInput2}`} type={"password"} name={"loginPassword"} value={loginPassword} onChange={this._handleInputChange} />
                                    </div>
                                    <p className={`${styles.font1214} ${styles.pink} ${styles.textCenter} ${styles.mt3} ${styles.cursorPointer}`} onClick={() => this._handleChangeAuth('signup')}>{this.context.t("PRIZM이 처음이신가요?")}</p>
                                    <div className={`${styles.widthFull} ${styles.bgGray33} ${styles.row} ${styles.mx0} ${styles.mt3} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn} ${isSubmitting ? styles.opacity7 : null}`} style={{height: 48}} onClick={this._login}>
                                        <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{this.context.t("맞춤예약 신청 완료!")}</p>
                                    </div>
                                </div>
                            )}
                        </Slider>
                        <Modal
                        open={showCalendar1} 
                        onClose={this._closeCalendar1} 
                        center
                        styles={{ overlay: { background: "rgba(0,0,0,0.2)", padding: 0 }, modal: { padding: 0 }}}
                        >
                            <div className={`${styles.containerModal}`}>
                                {selectDateStep === 1 && (
                                    <Fragment>
                                        <Calendar
                                        locale={'en'}
                                        calendarType={'US'}
                                        className={`${styles.p3} ${styles.containerModal}`}
                                        nextLabel={<span><img src={require('../../assets/images/icon_right.png')} alt={this.context.t("Next Month")} className={`${styles.iconArrowRight}`} /></span>}
                                        next2Label={<span><img src={require('../../assets/images/icon_right.png')} alt={this.context.t("Next Year")} className={`${styles.iconArrowRight}`} /><img src={require('../../assets/images/icon_right.png')} alt={this.context.t("Next Year")} className={`${styles.iconArrowRight}`} /></span>}
                                        prevLabel={<span><img src={require('../../assets/images/icon_left.png')} alt={this.context.t("Prev Month")} className={`${styles.iconArrowRight}`} /></span>}
                                        prev2Label={<span><img src={require('../../assets/images/icon_left.png')} alt={this.context.t("Prev Year")} className={`${styles.iconArrowRight}`} /><img src={require('../../assets/images/icon_left.png')} alt={this.context.t("Prev Year")} className={`${styles.iconArrowRight}`} /></span>}
                                        navigationLabel={({ date, view, label }) => <p className={`${styles.fontBold} ${styles.font14}`}>{label}</p>}
                                        tileClassName={`${styles.font12}`}
                                        value={selectedDate}
                                        onChange={this._selectDate}
                                        />
                                        <div className={`${styles.widthFull} ${styles.bgGray33} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn}`} style={{height: 48}} onClick={() => this._changeDateStep(2)}>
                                            <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{this.context.t("Next")}</p>
                                        </div>
                                    </Fragment>
                                )}
                                {selectDateStep === 2 && (
                                    <Fragment>
                                        <div className={`${styles.p3}`}>
                                            <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                                                <div className={`${styles.col1} ${styles.px0}`}>
                                                    <img src={require('../../assets/images/icon_arrow_left.png')} alt={this.context.t("Before")} className={`${styles.cursorPointer}`} style={{width: 15, height: 12}} onClick={() => this._changeDateStep(1)} />
                                                </div>
                                                <div className={`${styles.col10} ${styles.px0}`}>
                                                    <p className={`${styles.fontBold} ${styles.font13} ${styles.textCenter}`}>{`${selectedDate.getFullYear()}.${selectedDate.getMonth() + 1}.${selectedDate.getDate()}`}</p>
                                                </div>
                                            </div>
                                            <div className={`${styles.py5}`}>
                                                <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter}`}>
                                                    <div className={`${styles.textInput5} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.cursorPointer}`} type={"text"} name={"time"} onClick={this._handleShowHourList} style={{position: 'relative'}}>
                                                        <p className={`${styles.font13} ${styles.mx2} ${styles.textCenter}`}>{selectedHour}</p>
                                                        {showHourList && (
                                                            <div style={{position: 'absolute', top: 25, width: 50, maxHeight: 150}} className={`${styles.bgWhite} ${styles.borderDropdown} ${styles.overflowYScroll}`}>
                                                                {hourList.map((hour,index) => (
                                                                    <p key={index} className={`${styles.font13} ${styles.py2} ${styles.cursorPointer} ${styles.textCenter}`} onClick={() => this._selectHour(hour)}>{hour}</p>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <p className={`${styles.font13} ${styles.mx2}`}>:</p>
                                                    <div className={`${styles.textInput5} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.cursorPointer}`} type={"text"} name={"time"} onClick={this._handleShowMinList} style={{position: 'relative'}}>
                                                        <p className={`${styles.font13} ${styles.mx2} ${styles.textCenter}`}>{selectedMin}</p>
                                                        {showMinList && (
                                                            <div style={{position: 'absolute', top: 25, width: 50, maxHeight: 150}} className={`${styles.bgWhite} ${styles.borderDropdown} ${styles.overflowYScroll}`}>
                                                                {minList.map((min,index) => (
                                                                    <p key={index} className={`${styles.font13} ${styles.py2} ${styles.cursorPointer} ${styles.textCenter}`} onClick={() => this._selectMin(min)}>{min}</p>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={`${styles.widthFull} ${styles.bgGray33} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn}`} style={{height: 48}} onClick={this._confirmDate}>
                                            <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{this.context.t("Done")}</p>
                                        </div>
                                    </Fragment>
                                )}
                            </div>
                        </Modal>
                        <Modal
                        open={showCalendar2} 
                        onClose={this._closeCalendar2} 
                        center
                        styles={{ overlay: { background: "rgba(0,0,0,0.2)", padding: 0 }, modal: { padding: 0 }}}
                        >
                            <div className={`${styles.containerModal}`}>
                                <Fragment>
                                    <Calendar
                                    locale={'en'}
                                    calendarType={'US'}
                                    selectRange={true}
                                    value={dateRange.length > 0 ? dateRange : null}
                                    className={`${styles.p3} ${styles.containerModal}`}
                                    nextLabel={<span><img src={require('../../assets/images/icon_right.png')} alt={this.context.t("Next Month")} className={`${styles.iconArrowRight}`} /></span>}
                                    next2Label={<span><img src={require('../../assets/images/icon_right.png')} alt={this.context.t("Next Year")} className={`${styles.iconArrowRight}`} /><img src={require('../../assets/images/icon_right.png')} alt={this.context.t("Next Year")} className={`${styles.iconArrowRight}`} /></span>}
                                    prevLabel={<span><img src={require('../../assets/images/icon_left.png')} alt={this.context.t("Prev Month")} className={`${styles.iconArrowRight}`} /></span>}
                                    prev2Label={<span><img src={require('../../assets/images/icon_left.png')} alt={this.context.t("Prev Year")} className={`${styles.iconArrowRight}`} /><img src={require('../../assets/images/icon_left.png')} alt={this.context.t("Prev Year")} className={`${styles.iconArrowRight}`} /></span>}
                                    navigationLabel={({ date, view, label }) => <p className={`${styles.fontBold} ${styles.font14}`}>{label}</p>}
                                    tileClassName={`${styles.font12}`}
                                    onChange={this._selectDateRange}
                                    />
                                    <div className={`${styles.widthFull} ${styles.bgGray33} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn}`} style={{height: 48}} onClick={this._confirmDate}>
                                        <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{this.context.t("Done")}</p>
                                    </div>
                                </Fragment>
                            </div>
                        </Modal>
                    </Fragment>
                )}
            </div>
        )
    }
}
export default CustomRequestCreate; 