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
import Picker from 'react-mobile-picker-scroll';

import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import { GOOGLE_API_KEY } from '../../config/secrets';
import { MarkerWithLabel } from "react-google-maps/lib/components/addons/MarkerWithLabel";

import _ from "lodash";
import { compose, withProps, lifecycle } from "recompose";
import { StandaloneSearchBox } from "react-google-maps/lib/components/places/StandaloneSearchBox";
import { COUNTRY_CODE } from '../../utils/country';
import { Element, scroller } from 'react-scroll';

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

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

const sliderSettings2 = {
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 6000,
    accessibility: false,
    draggable: false,
    infinite: true,
    touchMove: false,
    pauseOnHover: false,
    swipe: false,
    adaptiveHeight: true
};

const ampm = [
    'AM',
    'PM'
]

const hourList = [
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
    '12'
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
        getProfile: PropTypes.func.isRequired,
        sendVerificationEmail: PropTypes.func.isRequired,
        getOrderDetail: PropTypes.func.isRequired,
        goPayment: PropTypes.func.isRequired,
        sendVerificationEmail: PropTypes.func.isRequired,
        cancelCustomRequest: PropTypes.func.isRequired,
        goRequestOrderList: PropTypes.func.isRequired,
        goSignin: PropTypes.func.isRequired,
        doHideBtmNav: PropTypes.func.isRequired,
        undoHideBtmNav: PropTypes.func.isRequired
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
        selectedHour: "02",
        selectedMin: "00",
        selectedAmPm: "PM",
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
        valueGroups: {
            ampm: 'PM',
            hour: '02',
            min: '00'
        }, 
        optionGroups: {
            ampm: ampm,
            hour: hourList,
            min: minList
        },
        isLoading: false,
        showCancel: false,
        isCancel: false,
        showCreate: false,
        showLanding: true
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

    componentDidMount = () => {
        this.props.doHideBtmNav()
        window.scrollTo(0,0)
    }

    componentDidUpdate = async(prevProps, prevState) => {
        if(!prevState.confirmed && this.state.confirmed){
            this.props.getProfile()
        }
        if(this.state.fetchedProfile && !this.state.fetchClear){
            if(this.props.profile){
                if(!this.props.profile.is_verified){
                    const result =  await this.props.sendVerificationEmail()
                }
                this.setState({
                    fetchClear: true
                })
            }
        }
        if(prevState.step !== this.state.step){
            window.scrollTo(0,0)
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

    handleChange = (name, value) => {
        this.setState(({valueGroups}) => ({
          valueGroups: {
            ...valueGroups,
            [name]: value
          }
        }));
    };

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
        else if(name === 'mobile'){
            let numberReg = /^[0-9]*$/;
            if(numberReg.test(value)){
                this.setState({
                    [name]: value.replace(/^0+/, '')
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
                selectedHour: "02",
                selectedMin: "00",
                selectedAmPm: 'PM',
                selectDateStep: 1,
                selectedStartDate: "",
                selectedEndDate: "",
                valueGroups: {
                    ampm: 'PM',
                    hour: '02',
                    min: '00'
                }, 
                optionGroups: {
                    ampm: ampm,
                    hour: hourList,
                    min: minList
                }
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
                selectedAmPm: "",
                selectDateStep: 1,
                selectedStartDate: "",
                selectedEndDate: "",
                valueGroups: {
                    ampm: 'PM',
                    hour: '02',
                    min: '00'
                }, 
                optionGroups: {
                    ampm: ampm,
                    hour: hourList,
                    min: minList
                }
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
            selectedAmPm: "",
            selectDateStep: 1,
            selectedStartDate: "",
            selectedEndDate: "",
            valueGroups: {
                ampm: 'PM',
                hour: '02',
                min: '00'
            }, 
            optionGroups: {
                ampm: ampm,
                hour: hourList,
                min: minList
            }
        })
    }

    _confirmDate = () => {
        const { valueGroups : { ampm, hour, min }, dateOption, selectedStartDate, selectedEndDate } = this.state;
        if(dateOption === 1){
            if(ampm && hour && min){
                this.setState({
                    dateConfirm: true,
                    showCalendar1: false,
                    selectedHour: hour,
                    selectedMin: min,
                    selectedAmPm: ampm
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

    _handleChangeTimes = (name, value) => {
        this.setState(({valueGroups}) => ({
            valueGroups: {
              ...valueGroups,
              [name]: value,
            }
        }));
    };

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
        const { isSubmitting, loginEmail,  loginPassword, loginEmailForm, option, extraOption, people, extraPeople, hour, extraHour, dateOption, selectedDate, selectedHour, selectedMin, selectedAmPm, selectedStartDate, selectedEndDate, locationOption, locations } = this.state;
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
                        let submitHour = selectedHour
                        if(selectedAmPm === 'PM'){
                            if(selectedHour !== '12'){
                                submitHour = String(Number(selectedHour) + 12)
                            }
                            else{
                                submitHour = '12'
                            }
                        }
                        else{
                            if(selectedHour === '12'){
                                submitHour = '00'
                            }
                        }
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
        const { isSubmitting, firstName, lastName, email, countryNumber, countryCode, mobile, password, password2, emailForm, passwordForm, password2Form, option, extraOption, people, extraPeople, hour, extraHour, dateOption, selectedDate, selectedHour, selectedMin, selectedAmPm, selectedStartDate, selectedEndDate, locationOption, locations } = this.state;
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
                                        let submitHour = selectedHour
                                        if(selectedAmPm === 'PM'){
                                            if(selectedHour !== '12'){
                                                submitHour = String(Number(selectedHour) + 12)
                                            }
                                            else{
                                                submitHour = '12'
                                            }
                                        }
                                        else{
                                            if(selectedHour === '12'){
                                                submitHour = '00'
                                            }
                                        }
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
        const { step, isLoggedIn, option, extraOption, people, extraPeople, dateOption, dateConfirm, selectedDate, selectedHour, selectedMin, selectedAmPm, selectedStartDate, selectedEndDate, hour, extraHour, locationOption, locations, isSubmitting } = this.state;
        const { createCustomRequest, profile, sendVerificationEmail } = this.props;
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
                    if(selectedDate && selectedHour && selectedMin && selectedAmPm){
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
                if(locationOption === 1){
                    if(locations && locations.length > 0){
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
                            let submitHour = selectedHour
                            if(selectedAmPm === 'PM'){
                                if(selectedHour !== '12'){
                                    submitHour = String(Number(selectedHour) + 12)
                                }
                                else{
                                    submitHour = '12'
                                }
                            }
                            else{
                                if(selectedHour === '12'){
                                    submitHour = '00'
                                }
                            }
        
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
                }
                else if(locationOption === 2){
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
                        let submitHour = selectedHour
                        if(selectedAmPm === 'PM'){
                            if(selectedHour !== '12'){
                                submitHour = String(Number(selectedHour) + 12)
                            }
                            else{
                                submitHour = '12'
                            }
                        }
                        else{
                            if(selectedHour === '12'){
                                submitHour = '00'
                            }
                        }
    
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
                }
                else{
                    alert(this.context.t("An error has occurred.."))
                    this.setState({
                        isSendingEmail: false
                    })
                }
            }
        }
    }

    _goPayment = async(orderId) => {
        const { getOrderDetail, goPayment } = this.props;
        const { isLoading } = this.state;
        if(!isLoading){
            const order = await getOrderDetail(orderId)
            goPayment(order)
        }
    }

    _openCancel = () => {
        this.setState({
            showCancel: true
        })
    }

    _closeCancel = () => {
        this.setState({
            showCancel: false
        })
    }

    _cancel = async() => {
        const { cancelCustomRequest, profile, getProfile } = this.props;
        const { isCancel } = this.state;
        if(!isCancel){
            if(profile){
                if(profile.custom_request_status.status === 'close'){
                    this.setState({
                        isCancel: true
                    })
                    const result = await cancelCustomRequest(profile.custom_request_status.id)
                    if(result.status === 'ok'){
                        this.setState({
                            isCancel: false,
                            showCancel: false
                        })
                        await getProfile()
                    }
                    else if(result.error){
                        this.setState({
                            isCancel: false
                        })
                        alert(result.error)
                    }
                    else{
                        this.setState({
                            isCancel: false
                        })
                        alert(this.context.t("An error has occurred.."))
                    }
                }
            }
        }
    }

    _goCreate = async() => {
        this.setState({
            showCreate: true
        })
        await sleep(200)
        scroller.scrollTo('2', {
            duration: 500,
            delay: 100,
            smooth: true
        })
        this.props.undoHideBtmNav()
        await sleep(700)
        this.setState({
            showLanding: false
        })
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
            selectedAmPm,
            selectedStartDate, 
            selectedEndDate, 
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
            firstName,
            lastName,
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
            confirmed,
            fetchClear,
            isSendingEmail,
            optionGroups,
            valueGroups,
            isLoading,
            showCancel,
            isCancel,
            showCreate,
            showLanding
        } = this.state;
        const { profile } = this.props;
        return(
            <Fragment>
                {showLanding && (
                    <Element name="1">
                    <Slider ref={c => (this.slider2 = c)}
                    {...sliderSettings2}
                    initialSlide={step-1}>
                        <div>
                            <div className={`${styles.widthFull} ${styles.minHeightFull} ${styles.row} ${styles.mx0}`}>
                                <div className={`${styles.containerCustomRequestMsg} ${styles.px3} ${styles.bgLanding1} ${styles.order2} ${styles.orderMd1} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter}`}>
                                    {profile ? (
                                        <Fragment>
                                            {profile.custom_request_status.status === 'none' && (
                                                <div className={``}>
                                                    <p className={`${styles.font1416} ${styles.textCenter}`}>
                                                        {this.context.t("Enrich your New York City trip experience")}<br/>
                                                        {this.context.t("with the best photographers in New York.")}
                                                    </p>
                                                    <div className={`${styles.widthFull} ${styles.bgGray33} ${styles.row} ${styles.mx0} ${styles.mt4} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn}`} style={{height: 48}} onClick={this._goCreate}>
                                                        <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{this.context.t("Go Custom Request")}</p>
                                                    </div>
                                                </div>
                                            )}
                                            {profile.custom_request_status.status === 'close' && (
                                                <div className={``}>
                                                    <p className={`${styles.font1416} ${styles.textCenter}`}>
                                                        {this.context.t("Enrich your New York City trip experience")}<br/>
                                                        {this.context.t("with the best photographers in New York.")}
                                                    </p>
                                                    <div className={`${styles.widthFull} ${profile.is_verified ? styles.bgGray33 : styles.bgGray93} ${styles.row} ${styles.mx0} ${styles.mt4} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn}`} style={{height: 48, maxWidth: 360}}>
                                                        <p className={`${styles.fontBold} ${styles.font14} ${styles.white} ${styles.textCenter}`}>
                                                            {profile.is_verified ? (
                                                                this.context.t("Your custom request has been submitted.")
                                                            ) : (
                                                                <Fragment>
                                                                    {this.context.t("Your custom request has been submitted.")}<br/>
                                                                    {this.context.t("Please complete the email verification")}
                                                                </Fragment>
                                                            )}
                                                        </p>
                                                    </div>
                                                    {!profile.is_verified  && (
                                                        <div className={`${styles.widthFull} ${styles.bgGray33} ${styles.row} ${styles.mx0} ${styles.mt3} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn} ${isSendingEmail ? styles.opacity07 : null}`} style={{height: 48, maxWidth: 360}} onClick={this._send}>
                                                            <p className={`${styles.fontBold} ${styles.font14} ${styles.white} ${styles.textCenter}`}>
                                                                {this.context.t("Resend Verification Email")}
                                                            </p>
                                                        </div>
                                                    )}
                                                    <p className={`${styles.font1416} ${styles.textCenter} ${styles.mt3} ${styles.pink} ${styles.cursorPointer}`} style={{maxWidth: 360}}>
                                                        {profile.is_verified ? (
                                                            <Fragment>
                                                                {this.context.t("We are waiting for photographers to submit their proposals.")}<br/>
                                                                {this.context.t("We will notify you through text message and email when we have received proposals from photographers")}
                                                            </Fragment>
                                                        ) : (
                                                            this.context.t("When you complete the email verification, your request details will be sent to photographers and you will soon receive various proposals.")
                                                        )}
                                                    </p>
                                                    <p className={`${styles.font1416} ${styles.textCenter} ${styles.mt5} ${styles.gray93} ${styles.cursorPointer}`} onClick={this._openCancel}>
                                                        {this.context.t("Make a New Request")}<br/>
                                                    </p>
                                                </div>
                                            )}
                                            {profile.custom_request_status.status === 'open' && (
                                                <div className={``}>
                                                    <p className={`${styles.font1416} ${styles.textCenter}`}>
                                                        {this.context.t("Enrich your New York City trip experience")}<br/>
                                                        {this.context.t("with the best photographers in New York.")}
                                                    </p>
                                                    <div className={`${styles.widthFull} ${styles.bgGray33} ${styles.row} ${styles.mx0} ${styles.mt4} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn}`} style={{height: 48}} onClick={() => this.props.goRequestOrderList(profile.custom_request_status.id)}>
                                                        <div style={{position: 'relative'}}>
                                                        <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{this.context.t("Proposals for ")}{profile.first_name} {profile.last_name}</p>
                                                        <div style={{position: 'absolute', top: -20, right: -5}}>
                                                            <div style={{position: 'relative'}}>
                                                                <img src={require('../../assets/images/icon_count.png')} style={{width: 20}} />
                                                                <p className={`${styles.fontExtraBold} ${styles.font8} ${styles.absoluteCenter} ${styles.pb1}`}>{profile.custom_request_status.count}</p>
                                                            </div>
                                                        </div>
                                                        </div>
                                                    </div>
                                                    <p className={`${styles.font1416} ${styles.textCenter} ${styles.mt3} ${styles.pink} ${styles.cursorPointer}`}>
                                                        {this.context.t("PRIZM photographers' proposals have arrived.")}<br/>
                                                        {this.context.t("Please click the button above to see them in detail")}
                                                    </p>
                                                </div>
                                            )}
                                            {profile.custom_request_status.status === 'confirmed' && (
                                                <div className={``}>
                                                    <p className={`${styles.font1416} ${styles.textCenter}`}>
                                                        {this.context.t("Enrich your New York City trip experience")}<br/>
                                                        {this.context.t("with the best photographers in New York.")}
                                                    </p>
                                                    <div className={`${styles.widthFull} ${styles.bgGray33} ${styles.row} ${styles.mx0} ${styles.mt4} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn}`} style={{height: 48, maxWidth: 360}}>
                                                        <p className={`${styles.fontBold} ${styles.font14} ${styles.white} ${styles.textCenter}`}>
                                                            {this.context.t("Your custom request has been confirmed.")}
                                                        </p>
                                                    </div>
                                                    <div className={`${styles.widthFull} ${styles.bgConfirmed} ${styles.row} ${styles.mx0} ${styles.mt3} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn} ${isLoading ? styles.opacity07 : null}`} style={{height: 48, maxWidth: 360}} onClick={() => this._goPayment(profile.custom_request_status.orderId)}>
                                                        <p className={`${styles.fontBold} ${styles.font14} ${styles.white} ${styles.textCenter}`}>
                                                            {profile.custom_request_status.payment === 'confirmed' && (
                                                                this.context.t("Add Payment Details")
                                                            )}
                                                            {profile.custom_request_status.payment === 'waiting_payment' && (
                                                                this.context.t("Waiting for Payment")
                                                            )}
                                                            {profile.custom_request_status.payment === 'paid' && (
                                                                this.context.t("Payment Successful!")
                                                            )}
                                                        </p>
                                                    </div>
                                                    {profile.custom_request_status.payment !== 'paid' && (
                                                        <p className={`${styles.font10} ${styles.textCenter} ${styles.mt2} ${styles.pink}`}>{this.context.t(`Please add payment details by : ${new Date(new Date(profile.custom_request_status.confirmed_at).getTime() + 1000*60*60*24*3)}`)}</p>
                                                    )}
                                                </div>
                                            )}
                                        </Fragment>
                                        
                                    ) : (
                                        <div className={``}>
                                            <p className={`${styles.font1416} ${styles.textCenter}`}>
                                                {this.context.t("Enrich your New York City trip experience")}<br/>
                                                {this.context.t("with the best photographers in New York.")}
                                            </p>
                                            <div className={`${styles.widthFull} ${styles.bgGray33} ${styles.row} ${styles.mx0} ${styles.mt6} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn}`} style={{height: 48}} onClick={this._goCreate}>
                                                <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{this.context.t("Go Custom Request")}</p>
                                            </div>
                                            <p className={`${styles.font1416} ${styles.textCenter} ${styles.mt3} ${styles.pink} ${styles.cursorPointer}`} onClick={this.props.goSignin}>
                                                {this.context.t("Already requested?")}
                                            </p>
                                        </div>
                                    )}
                                </div>
                                <div className={`${styles.bgLandingImg1} ${styles.order1} ${styles.orderMd2}`}>
    
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className={`${styles.widthFull} ${styles.minHeightFull} ${styles.row} ${styles.mx0}`}>
                                <div className={`${styles.bgLandingImg2} ${styles.order1} ${styles.orderMd1}`}>
    
                                </div>
                                <div className={`${styles.containerCustomRequestMsg} ${styles.px3} ${styles.bgLanding2} ${styles.order2} ${styles.orderMd2} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter}`}>
                                    {profile ? (
                                        <Fragment>
                                            {profile.custom_request_status.status === 'none' && (
                                                <div className={``}>
                                                    <p className={`${styles.font1416} ${styles.textCenter}`}>
                                                        {this.context.t("Enrich your New York City trip experience")}<br/>
                                                        {this.context.t("with the best photographers in New York.")}
                                                    </p>
                                                    <div className={`${styles.widthFull} ${styles.bgGray33} ${styles.row} ${styles.mx0} ${styles.mt4} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn}`} style={{height: 48}} onClick={this._goCreate}>
                                                        <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{this.context.t("Go Custom Request")}</p>
                                                    </div>
                                                </div>
                                            )}
                                            {profile.custom_request_status.status === 'close' && (
                                                <div className={``}>
                                                    <p className={`${styles.font1416} ${styles.textCenter}`}>
                                                        {this.context.t("Enrich your New York City trip experience")}<br/>
                                                        {this.context.t("with the best photographers in New York.")}
                                                    </p>
                                                    <div className={`${styles.widthFull} ${profile.is_verified ? styles.bgGray33 : styles.bgGray93} ${styles.row} ${styles.mx0} ${styles.mt4} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn}`} style={{height: 48, maxWidth: 360}}>
                                                        <p className={`${styles.fontBold} ${styles.font14} ${styles.white} ${styles.textCenter}`}>
                                                            {profile.is_verified ? (
                                                                this.context.t("Your custom request has been submitted.")
                                                            ) : (
                                                                <Fragment>
                                                                    {this.context.t("Your custom request has been submitted.")}<br/>
                                                                    {this.context.t("Please complete the email verification")}
                                                                </Fragment>
                                                            )}
                                                        </p>
                                                    </div>
                                                    {!profile.is_verified  && (
                                                        <div className={`${styles.widthFull} ${styles.bgGray33} ${styles.row} ${styles.mx0} ${styles.mt3} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn} ${isSendingEmail ? styles.opacity07 : null}`} style={{height: 48, maxWidth: 360}} onClick={this._send}>
                                                            <p className={`${styles.fontBold} ${styles.font14} ${styles.white} ${styles.textCenter}`}>
                                                                {this.context.t("Resend Verification Email")}
                                                            </p>
                                                        </div>
                                                    )}
                                                    <p className={`${styles.font1416} ${styles.textCenter} ${styles.mt3} ${styles.pink} ${styles.cursorPointer}`} style={{maxWidth: 360}}>
                                                        {profile.is_verified ? (
                                                            <Fragment>
                                                                {this.context.t("We are waiting for photographers to submit their proposals.")}<br/>
                                                                {this.context.t("We will notify you through text message and email when we have received proposals from photographers")}
                                                            </Fragment>
                                                        ) : (
                                                            this.context.t("When you complete the email verification, your request details will be sent to photographers and you will soon receive various proposals.")
                                                        )}
                                                    </p>
                                                    <p className={`${styles.font1416} ${styles.textCenter} ${styles.mt5} ${styles.gray93} ${styles.cursorPointer}`} onClick={this._openCancel}>
                                                        {this.context.t("Make a New Request")}<br/>
                                                    </p>
                                                </div>
                                            )}
                                            {profile.custom_request_status.status === 'open' && (
                                                <div className={``}>
                                                    <p className={`${styles.font1416} ${styles.textCenter}`}>
                                                        {this.context.t("Enrich your New York City trip experience")}<br/>
                                                        {this.context.t("with the best photographers in New York.")}
                                                    </p>
                                                    <div className={`${styles.widthFull} ${styles.bgGray33} ${styles.row} ${styles.mx0} ${styles.mt4} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn}`} style={{height: 48}} onClick={() => this.props.goRequestOrderList(profile.custom_request_status.id)}>
                                                        <div style={{position: 'relative'}}>
                                                        <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{this.context.t("Proposals for ")}{profile.first_name} {profile.last_name}</p>
                                                        <div style={{position: 'absolute', top: -20, right: -5}}>
                                                            <div style={{position: 'relative'}}>
                                                                <img src={require('../../assets/images/icon_count.png')} style={{width: 20}} />
                                                                <p className={`${styles.fontExtraBold} ${styles.font8} ${styles.absoluteCenter} ${styles.pb1}`}>{profile.custom_request_status.count}</p>
                                                            </div>
                                                        </div>
                                                        </div>
                                                    </div>
                                                    <p className={`${styles.font1416} ${styles.textCenter} ${styles.mt3} ${styles.pink} ${styles.cursorPointer}`}>
                                                        {this.context.t("PRIZM photographers' proposals have arrived.")}<br/>
                                                        {this.context.t("Please click the button above to see them in detail")}
                                                    </p>
                                                </div>
                                            )}
                                            {profile.custom_request_status.status === 'confirmed' && (
                                                <div className={``}>
                                                    <p className={`${styles.font1416} ${styles.textCenter}`}>
                                                        {this.context.t("Enrich your New York City trip experience")}<br/>
                                                        {this.context.t("with the best photographers in New York.")}
                                                    </p>
                                                    <div className={`${styles.widthFull} ${styles.bgGray33} ${styles.row} ${styles.mx0} ${styles.mt4} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn}`} style={{height: 48, maxWidth: 360}}>
                                                        <p className={`${styles.fontBold} ${styles.font14} ${styles.white} ${styles.textCenter}`}>
                                                            {this.context.t("Your custom request has been confirmed.")}
                                                        </p>
                                                    </div>
                                                    <div className={`${styles.widthFull} ${styles.bgConfirmed} ${styles.row} ${styles.mx0} ${styles.mt3} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn} ${isLoading ? styles.opacity07 : null}`} style={{height: 48, maxWidth: 360}} onClick={() => this._goPayment(profile.custom_request_status.orderId)}>
                                                        <p className={`${styles.fontBold} ${styles.font14} ${styles.white} ${styles.textCenter}`}>
                                                            {profile.custom_request_status.payment === 'confirmed' && (
                                                                this.context.t("Add Payment Details")
                                                            )}
                                                            {profile.custom_request_status.payment === 'waiting_payment' && (
                                                                this.context.t("Waiting for Payment")
                                                            )}
                                                            {profile.custom_request_status.payment === 'paid' && (
                                                                this.context.t("Payment Successful!")
                                                            )}
                                                        </p>
                                                    </div>
                                                    {profile.custom_request_status.payment !== 'paid' && (
                                                        <p className={`${styles.font10} ${styles.textCenter} ${styles.mt2} ${styles.pink}`}>{this.context.t(`Please add payment details by : ${new Date(new Date(profile.custom_request_status.confirmed_at).getTime() + 1000*60*60*24*3)}`)}</p>
                                                    )}
                                                </div>
                                            )}
                                        </Fragment>
                                        
                                    ) : (
                                        <div className={``}>
                                            <p className={`${styles.font1416} ${styles.textCenter}`}>
                                                {this.context.t("Enrich your New York City trip experience")}<br/>
                                                {this.context.t("with the best photographers in New York.")}
                                            </p>
                                            <div className={`${styles.widthFull} ${styles.bgGray33} ${styles.row} ${styles.mx0} ${styles.mt6} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn}`} style={{height: 48}} onClick={this._goCreate}>
                                                <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{this.context.t("Go Custom Request")}</p>
                                            </div>
                                            <p className={`${styles.font1416} ${styles.textCenter} ${styles.mt3} ${styles.pink} ${styles.cursorPointer}`} onClick={this.props.goSignin}>
                                                {this.context.t("Already requested?")}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className={`${styles.widthFull} ${styles.minHeightFull} ${styles.row} ${styles.mx0}`}>
                                <div className={`${styles.containerCustomRequestMsg} ${styles.px3} ${styles.bgLanding3} ${styles.order2} ${styles.orderMd1} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter}`}>
                                    {profile ? (
                                        <Fragment>
                                            {profile.custom_request_status.status === 'none' && (
                                                <div className={``}>
                                                    <p className={`${styles.font1416} ${styles.textCenter}`}>
                                                        {this.context.t("Enrich your New York City trip experience")}<br/>
                                                        {this.context.t("with the best photographers in New York.")}
                                                    </p>
                                                    <div className={`${styles.widthFull} ${styles.bgGray33} ${styles.row} ${styles.mx0} ${styles.mt4} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn}`} style={{height: 48}} onClick={this._goCreate}>
                                                        <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{this.context.t("Go Custom Request")}</p>
                                                    </div>
                                                </div>
                                            )}
                                            {profile.custom_request_status.status === 'close' && (
                                                <div className={``}>
                                                    <p className={`${styles.font1416} ${styles.textCenter}`}>
                                                        {this.context.t("Enrich your New York City trip experience")}<br/>
                                                        {this.context.t("with the best photographers in New York.")}
                                                    </p>
                                                    <div className={`${styles.widthFull} ${profile.is_verified ? styles.bgGray33 : styles.bgGray93} ${styles.row} ${styles.mx0} ${styles.mt4} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn}`} style={{height: 48, maxWidth: 360}}>
                                                        <p className={`${styles.fontBold} ${styles.font14} ${styles.white} ${styles.textCenter}`}>
                                                            {profile.is_verified ? (
                                                                this.context.t("Your custom request has been submitted.")
                                                            ) : (
                                                                <Fragment>
                                                                    {this.context.t("Your custom request has been submitted.")}<br/>
                                                                    {this.context.t("Please complete the email verification")}
                                                                </Fragment>
                                                            )}
                                                        </p>
                                                    </div>
                                                    {!profile.is_verified  && (
                                                        <div className={`${styles.widthFull} ${styles.bgGray33} ${styles.row} ${styles.mx0} ${styles.mt3} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn} ${isSendingEmail ? styles.opacity07 : null}`} style={{height: 48, maxWidth: 360}} onClick={this._send}>
                                                            <p className={`${styles.fontBold} ${styles.font14} ${styles.white} ${styles.textCenter}`}>
                                                                {this.context.t("Resend Verification Email")}
                                                            </p>
                                                        </div>
                                                    )}
                                                    <p className={`${styles.font1416} ${styles.textCenter} ${styles.mt3} ${styles.pink} ${styles.cursorPointer}`} style={{maxWidth: 360}}>
                                                        {profile.is_verified ? (
                                                            <Fragment>
                                                                {this.context.t("We are waiting for photographers to submit their proposals.")}<br/>
                                                                {this.context.t("We will notify you through text message and email when we have received proposals from photographers")}
                                                            </Fragment>
                                                        ) : (
                                                            this.context.t("When you complete the email verification, your request details will be sent to photographers and you will soon receive various proposals.")
                                                        )}
                                                    </p>
                                                    <p className={`${styles.font1416} ${styles.textCenter} ${styles.mt5} ${styles.gray93} ${styles.cursorPointer}`} onClick={this._openCancel}>
                                                        {this.context.t("Make a New Request")}<br/>
                                                    </p>
                                                </div>
                                            )}
                                            {profile.custom_request_status.status === 'open' && (
                                                <div className={``}>
                                                    <p className={`${styles.font1416} ${styles.textCenter}`}>
                                                        {this.context.t("Enrich your New York City trip experience")}<br/>
                                                        {this.context.t("with the best photographers in New York.")}
                                                    </p>
                                                    <div className={`${styles.widthFull} ${styles.bgGray33} ${styles.row} ${styles.mx0} ${styles.mt4} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn}`} style={{height: 48}} onClick={() => this.props.goRequestOrderList(profile.custom_request_status.id)}>
                                                        <div style={{position: 'relative'}}>
                                                        <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{this.context.t("Proposals for ")}{profile.first_name} {profile.last_name}</p>
                                                        <div style={{position: 'absolute', top: -20, right: -5}}>
                                                            <div style={{position: 'relative'}}>
                                                                <img src={require('../../assets/images/icon_count.png')} style={{width: 20}} />
                                                                <p className={`${styles.fontExtraBold} ${styles.font8} ${styles.absoluteCenter} ${styles.pb1}`}>{profile.custom_request_status.count}</p>
                                                            </div>
                                                        </div>
                                                        </div>
                                                    </div>
                                                    <p className={`${styles.font1416} ${styles.textCenter} ${styles.mt3} ${styles.pink} ${styles.cursorPointer}`}>
                                                        {this.context.t("PRIZM photographers' proposals have arrived.")}<br/>
                                                        {this.context.t("Please click the button above to see them in detail")}
                                                    </p>
                                                </div>
                                            )}
                                            {profile.custom_request_status.status === 'confirmed' && (
                                                <div className={``}>
                                                    <p className={`${styles.font1416} ${styles.textCenter}`}>
                                                        {this.context.t("Enrich your New York City trip experience")}<br/>
                                                        {this.context.t("with the best photographers in New York.")}
                                                    </p>
                                                    <div className={`${styles.widthFull} ${styles.bgGray33} ${styles.row} ${styles.mx0} ${styles.mt4} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn}`} style={{height: 48, maxWidth: 360}}>
                                                        <p className={`${styles.fontBold} ${styles.font14} ${styles.white} ${styles.textCenter}`}>
                                                            {this.context.t("Your custom request has been confirmed.")}
                                                        </p>
                                                    </div>
                                                    <div className={`${styles.widthFull} ${styles.bgConfirmed} ${styles.row} ${styles.mx0} ${styles.mt3} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn} ${isLoading ? styles.opacity07 : null}`} style={{height: 48, maxWidth: 360}} onClick={() => this._goPayment(profile.custom_request_status.orderId)}>
                                                        <p className={`${styles.fontBold} ${styles.font14} ${styles.white} ${styles.textCenter}`}>
                                                            {profile.custom_request_status.payment === 'confirmed' && (
                                                                this.context.t("Add Payment Details")
                                                            )}
                                                            {profile.custom_request_status.payment === 'waiting_payment' && (
                                                                this.context.t("Waiting for Payment")
                                                            )}
                                                            {profile.custom_request_status.payment === 'paid' && (
                                                                this.context.t("Payment Successful!")
                                                            )}
                                                        </p>
                                                    </div>
                                                    {profile.custom_request_status.payment !== 'paid' && (
                                                        <p className={`${styles.font10} ${styles.textCenter} ${styles.mt2} ${styles.pink}`}>{this.context.t(`Please add payment details by : ${new Date(new Date(profile.custom_request_status.confirmed_at).getTime() + 1000*60*60*24*3)}`)}</p>
                                                    )}
                                                </div>
                                            )}
                                        </Fragment>
                                        
                                    ) : (
                                        <div className={``}>
                                            <p className={`${styles.font1416} ${styles.textCenter}`}>
                                                {this.context.t("Enrich your New York City trip experience")}<br/>
                                                {this.context.t("with the best photographers in New York.")}
                                            </p>
                                            <div className={`${styles.widthFull} ${styles.bgGray33} ${styles.row} ${styles.mx0} ${styles.mt6} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn}`} style={{height: 48}} onClick={this._goCreate}>
                                                <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{this.context.t("Go Custom Request")}</p>
                                            </div>
                                            <p className={`${styles.font1416} ${styles.textCenter} ${styles.mt3} ${styles.pink} ${styles.cursorPointer}`} onClick={this.props.goSignin}>
                                                {this.context.t("Already requested?")}
                                            </p>
                                        </div>
                                    )}
                                </div>
                                <div className={`${styles.bgLandingImg3} ${styles.order1} ${styles.orderMd2}`}>
    
                                </div>
                            </div>
                        </div>
                    </Slider>
                    </Element>
                )}
                {showCreate && (
                    <Element name="2">
                    <div className={`${styles.containerCustomer} ${styles.safearea} ${styles.minHeightFull}`}>
                        {(confirmed && fetchClear && profile) ? (
                            profile.is_verified ? (
                                <div className={`${styles.mt3} ${styles.mtMd5} ${styles.px3}`} style={{position: 'relative'}}>
                                    <div className={`${styles.textCenter}`}>
                                        <img src={require('../../assets/images/request_complete.png')} alt={this.context.t("Submitted")} className={`${styles.mb4}`} style={{width: '100%', maxWidth: 400}} />
                                        <p className={`${styles.fontBold} ${styles.font14} ${styles.mt3}`}>
                                            {this.context.t("맞춤예약 신청이 완료되었습니다!")}<br/>
                                            {this.context.t("추후 SMS와 이메일로 안내해드리겠습니다.")}
                                        </p>
    
                                        <p className={`${styles.font12} ${styles.mt3} ${styles.textCenter}`} style={{lineHeight: 1.25}}>
                                            {this.context.t(`회원님의 예약 내역이 사진작가들에게 전달되었으며,`)}<br/>
                                            {this.context.t(`곧 다양한 작가들의 촬영 견적을 받아보실 수 있습니다.`)}<br/>
                                        </p>
                                        <div className={`${styles.widthFull} ${styles.bgGray33} ${styles.row} ${styles.mx0} ${styles.mt3} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn}`} style={{height: 48}} onClick={this.props.goHome}>
                                            <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{this.context.t("메인화면으로 이동하기")}</p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className={`${styles.mt3} ${styles.mtMd5} ${styles.px3}`}>
                                    <p className={`${styles.fontExtraBold} ${styles.font1416} ${styles.textCenter}`}>{this.context.t("Your Custom Request has been submitted!")}</p>
                                    <div className={`${styles.mt2} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter}`}>
                                        <img src={require('../../assets/images/email_verifing.png')} width={'60%'} className={`${styles.imgVerifing}`} />
                                    </div>
                                    <p className={`${styles.font1416} ${styles.mt3} ${styles.textCenter}`}>
                                        {this.context.t("We sent a ")}
                                        <span className={`${styles.pink}`}>{this.context.t("verification email ")}</span>
                                        {this.context.t("to the following address :")}
                                    </p>
                                    <p className={`${styles.font1416} ${styles.mt3} ${styles.textCenter}`}>
                                        {profile.email}
                                    </p>
                                    <p className={`${styles.font1416} ${styles.mt3} ${styles.textCenter}`}>
                                        <span className={`${styles.pink}`}>{this.context.t("Please verify yourself by clicking the link attached in the email.")}</span>
                                        {this.context.t("When you complete the email verification, your request details will be sent to photographers and you will soon receive various proposals.")}
                                    </p>
                                    <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween} ${styles.justifyContentMdCenter} ${styles.mt5}`}>
                                        <div className={`${styles.widthHalfBtn} ${styles.bgGray33} ${styles.row} ${styles.mx0} ${styles.mxMd3} ${styles.mt4} ${styles.mb3} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn} ${isSendingEmail ? styles.opacity07 : null}`} style={{height: 48}} onClick={this._send}>
                                            <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{this.context.t("Resend")}</p>
                                        </div>
                                        <div className={`${styles.widthHalfBtn} ${styles.bgGray33} ${styles.row} ${styles.mx0} ${styles.mxMd3} ${styles.mt4} ${styles.mb3} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn}`} style={{height: 48}} onClick={this.props.goHome}>
                                            <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{this.context.t("Main")}</p>
                                        </div>
                                    </div>
                                </div>
                            )
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
                                        <p className={`${styles.fontBold} ${styles.font1416}`}>{this.context.t("1. Please select your desired photography type(s) ")}</p>
                                        <div className={`${styles.row} ${styles.mx0} ${styles.mt3}`}>
                                            <div className={`${styles.col6} ${styles.px0} ${styles.mb3}`}>
                                                <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                                                    <div className={`${styles.checkBox} ${option.indexOf('alone') > -1 ? null : styles.unchecked} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter}`} onClick={() => this._handleChangeOption('alone')}>
                                                        {option.indexOf('alone') > -1 && (
                                                            <img src={require('../../assets/images/icon_check.png')} alt={this.context.t("Alone")} style={{width: 10, height: 10}} />
                                                        )}
                                                    </div>
                                                    <p className={`${styles.font1214} ${styles.ml2}`} onClick={() => this._handleChangeOption('alone')}>{this.context.t("Individual Photo")}</p>
                                                </div>
                                            </div>
                                            <div className={`${styles.col6} ${styles.px0} ${styles.mb3}`}>
                                                <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                                                    <div className={`${styles.checkBox} ${option.indexOf('street') > -1 ? null : styles.unchecked} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter}`} onClick={() => this._handleChangeOption('street')}>
                                                        {option.indexOf('street') > -1 && (
                                                            <img src={require('../../assets/images/icon_check.png')} alt={this.context.t("Street")} style={{width: 10, height: 10}} />
                                                        )}
                                                    </div>
                                                    <p className={`${styles.font1214} ${styles.ml2}`} onClick={() => this._handleChangeOption('street')}>{this.context.t("Street")}</p>
                                                </div>
                                            </div>
                                            <div className={`${styles.col6} ${styles.px0} ${styles.mb3}`}>
                                                <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                                                    <div className={`${styles.checkBox} ${option.indexOf('couple') > -1 ? null : styles.unchecked} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter}`} onClick={() => this._handleChangeOption('couple')}>
                                                        {option.indexOf('couple') > -1 && (
                                                            <img src={require('../../assets/images/icon_check.png')} alt={this.context.t("Couple")} style={{width: 10, height: 10}} />
                                                        )}
                                                    </div>
                                                    <p className={`${styles.font1214} ${styles.ml2}`} onClick={() => this._handleChangeOption('couple')}>{this.context.t("Couple")}</p>
                                                </div>
                                            </div>
                                            <div className={`${styles.col6} ${styles.px0} ${styles.mb3}`}>
                                                <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                                                    <div className={`${styles.checkBox} ${option.indexOf('indoor') > -1 ? null : styles.unchecked} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter}`} onClick={() => this._handleChangeOption('indoor')}>
                                                        {option.indexOf('indoor') > -1 && (
                                                            <img src={require('../../assets/images/icon_check.png')} alt={this.context.t("Indoor")} style={{width: 10, height: 10}} />
                                                        )}
                                                    </div>
                                                    <p className={`${styles.font1214} ${styles.ml2}`} onClick={() => this._handleChangeOption('indoor')}>{this.context.t("Indoor")}</p>
                                                </div>
                                            </div>
                                            <div className={`${styles.col6} ${styles.px0} ${styles.mb3}`}>
                                                <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                                                    <div className={`${styles.checkBox} ${option.indexOf('wedding') > -1 ? null : styles.unchecked} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter}`} onClick={() => this._handleChangeOption('wedding')}>
                                                        {option.indexOf('wedding') > -1 && (
                                                            <img src={require('../../assets/images/icon_check.png')} alt={this.context.t("Wedding")} style={{width: 10, height: 10}} />
                                                        )}
                                                    </div>
                                                    <p className={`${styles.font1214} ${styles.ml2}`} onClick={() => this._handleChangeOption('wedding')}>{this.context.t("Wedding")}</p>
                                                </div>
                                            </div>
                                            <div className={`${styles.col6} ${styles.px0} ${styles.mb3}`}>
                                                <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                                                    <div className={`${styles.checkBox} ${option.indexOf('propose') > -1 ? null : styles.unchecked} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter}`} onClick={() => this._handleChangeOption('propose')}>
                                                        {option.indexOf('propose') > -1 && (
                                                            <img src={require('../../assets/images/icon_check.png')} alt={this.context.t("Propose")} style={{width: 10, height: 10}} />
                                                        )}
                                                    </div>
                                                    <p className={`${styles.font1214} ${styles.ml2}`} onClick={() => this._handleChangeOption('propose')}>{this.context.t("Romantic Proposal")}</p>
                                                </div>
                                            </div>
                                            <div className={`${styles.col6} ${styles.px0} ${styles.mb3}`}>
                                                <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                                                    <div className={`${styles.checkBox} ${option.indexOf('friend') > -1 ? null : styles.unchecked} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter}`} onClick={() => this._handleChangeOption('friend')}>
                                                        {option.indexOf('friend') > -1 && (
                                                            <img src={require('../../assets/images/icon_check.png')} alt={this.context.t("Friend")} style={{width: 10, height: 10}} />
                                                        )}
                                                    </div>
                                                    <p className={`${styles.font1214} ${styles.ml2}`} onClick={() => this._handleChangeOption('friend')}>{this.context.t("Friends")}</p>
                                                </div>
                                            </div>
                                            <div className={`${styles.col6} ${styles.px0} ${styles.mb3}`}>
                                                <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                                                    <div className={`${styles.checkBox} ${option.indexOf('daily') > -1 ? null : styles.unchecked} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter}`} onClick={() => this._handleChangeOption('daily')}>
                                                        {option.indexOf('daily') > -1 && (
                                                            <img src={require('../../assets/images/icon_check.png')} alt={this.context.t("Daily")} style={{width: 10, height: 10}} />
                                                        )}
                                                    </div>
                                                    <p className={`${styles.font1214} ${styles.ml2}`} onClick={() => this._handleChangeOption('daily')}>{this.context.t("Everyday Life")}</p>
                                                </div>
                                            </div>
                                            <div className={`${styles.col6} ${styles.px0} ${styles.mb3}`}>
                                                <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                                                    <div className={`${styles.checkBox} ${option.indexOf('family') > -1 ? null : styles.unchecked} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter}`} onClick={() => this._handleChangeOption('family')}>
                                                        {option.indexOf('family') > -1 && (
                                                            <img src={require('../../assets/images/icon_check.png')} alt={this.context.t("Family")} style={{width: 10, height: 10}} />
                                                        )}
                                                    </div>
                                                    <p className={`${styles.font1214} ${styles.ml2}`} onClick={() => this._handleChangeOption('family')}>{this.context.t("Family")}</p>
                                                </div>
                                            </div>
                                            <div className={`${styles.col6} ${styles.px0} ${styles.mb3}`}>
                                                <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                                                    <div className={`${styles.checkBox} ${option.indexOf('travel') > -1 ? null : styles.unchecked} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter}`} onClick={() => this._handleChangeOption('travel')}>
                                                        {option.indexOf('travel') > -1 && (
                                                            <img src={require('../../assets/images/icon_check.png')} alt={this.context.t("Travel")} style={{width: 10, height: 10}} />
                                                        )}
                                                    </div>
                                                    <p className={`${styles.font1214} ${styles.ml2}`} onClick={() => this._handleChangeOption('travel')}>{this.context.t("Travel Moment")}</p>
                                                </div>
                                            </div>
                                            <div className={`${styles.col12} ${styles.px0} ${styles.mb3}`}>
                                                <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                                                    <div className={`${styles.checkBox} ${option.indexOf('extra') > -1 ? null : styles.unchecked} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter}`} onClick={() => this._handleChangeOption('extra')}>
                                                        {option.indexOf('extra') > -1 && (
                                                            <img src={require('../../assets/images/icon_check.png')} alt={this.context.t("Extra")} style={{width: 10, height: 10}} />
                                                        )}
                                                    </div>
                                                    <p className={`${styles.font1214} ${styles.ml2}`} onClick={() => this._handleChangeOption('extra')}>{this.context.t("Others : ")}</p>
                                                    <input className={`${styles.textInput11} ${styles.ml2}`} readOnly={option.indexOf('extra') > -1 ? false : true} type={"text"} value={extraOption} name={'extraOption'} onChange={this._handleInputChange} />
                                                </div>
                                            </div>
                                        </div>
                                        <p className={`${styles.fontBold} ${styles.font1416} ${styles.mt5}`}>{this.context.t("2. How many people are joining the photo shoot?")}</p>
                                        <div className={`${styles.row} ${styles.mx0} ${styles.mt3} ${styles.justifyContentBetween}`}>
                                            <div className={`${styles.px0} ${styles.mb3}`}>
                                                <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                                                    <div className={`${styles.checkBox} ${people === 1 ? null : styles.unchecked} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter}`} onClick={() => this._handleChangePeople(1)}>
                                                        {people === 1 && (
                                                            <img src={require('../../assets/images/icon_check.png')} alt={this.context.t("Alone")} style={{width: 10, height: 10}} />
                                                        )}
                                                    </div>
                                                    <p className={`${styles.font1214} ${styles.ml2}`} onClick={() => this._handleChangePeople(1)}>{this.context.t("1 person (solo)")}</p>
                                                </div>
                                            </div>
                                            <div className={`${styles.px0} ${styles.mb3}`}>
                                                <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                                                    <div className={`${styles.checkBox} ${people === 2 ? null : styles.unchecked} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter}`} onClick={() => this._handleChangePeople(2)}>
                                                        {people === 2 && (
                                                            <img src={require('../../assets/images/icon_check.png')} alt={this.context.t("Alone")} style={{width: 10, height: 10}} />
                                                        )}
                                                    </div>
                                                    <p className={`${styles.font1214} ${styles.ml2}`} onClick={() => this._handleChangePeople(2)}>{this.context.t("2 people")}</p>
                                                </div>
                                            </div>
                                            <div className={`${styles.px0} ${styles.mb3}`}>
                                                <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                                                    <div className={`${styles.checkBox} ${people === 3 ? null : styles.unchecked} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter}`} onClick={() => this._handleChangePeople(3)}>
                                                        {people === 3 && (
                                                            <img src={require('../../assets/images/icon_check.png')} alt={this.context.t("Alone")} style={{width: 10, height: 10}} />
                                                        )}
                                                    </div>
                                                    <p className={`${styles.font1214} ${styles.ml2}`} onClick={() => this._handleChangePeople(3)}>{this.context.t("3 people")}</p>
                                                </div>
                                            </div>
                                            <div className={`${styles.px0} ${styles.mb3}`}>
                                                <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                                                    <div className={`${styles.checkBox} ${people === 4 ? null : styles.unchecked} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter}`} onClick={() => this._handleChangePeople(4)}>
                                                        {people === 4 && (
                                                            <img src={require('../../assets/images/icon_check.png')} alt={this.context.t("Alone")} style={{width: 10, height: 10}} />
                                                        )}
                                                    </div>
                                                    <p className={`${styles.font1214} ${styles.ml2}`} onClick={() => this._handleChangePeople(4)}>{this.context.t("4 people")}</p>
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
                                                <p className={`${styles.font1214} ${styles.ml2}`} onClick={() => this._handleChangePeople(-1)}>{this.context.t("Others : ")}</p>
                                                <input className={`${styles.textInput11} ${styles.ml2}`} style={{width: 50}} type={"text"} readOnly={people === -1 ? false : true} value={extraPeople} name={'extraPeople'} onChange={this._handleInputChange} />
                                                <p className={`${styles.font1214} ${styles.ml1}`} onClick={() => this._handleChangePeople(-1)}>{this.context.t("people")}</p>
                                            </div>
                                        </div>
                                        <div className={`${styles.widthFull} ${styles.bgGray33} ${styles.row} ${styles.mx0} ${styles.mt5} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn}`} style={{height: 48}} onClick={this._nextSlide}>
                                            <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{this.context.t("NEXT")}</p>
                                        </div>
                                    </div>
                                    <div className={`${styles.py3} ${styles.px3}`}>
                                        <p className={`${styles.fontBold} ${styles.font1416}`}>{this.context.t("3. When would you like to meet your photographer? ")}</p>
                                        <div className={`${styles.row} ${styles.mx0} ${styles.mt3}`}>
                                            <div className={`${styles.col12} ${styles.px0}`}>
                                                <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                                                    <div className={`${styles.checkBox} ${dateOption === 1 ? null : styles.unchecked} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter}`} onClick={() => this._handleChangeDateOption(1)}>
                                                        {dateOption === 1 && (
                                                            <img src={require('../../assets/images/icon_check.png')} alt={this.context.t("Specific")} style={{width: 10, height: 10}} />
                                                        )}
                                                    </div>
                                                    <div className={`${styles.checkBoxText}`}>
                                                        <p className={`${styles.font1214} ${styles.ml2}`} onClick={() => this._handleChangeDateOption(1)}>{this.context.t("I have a specific date and time in mind.")}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            {dateConfirm && (dateOption === 1) && (
                                                <div className={`${styles.col12} ${styles.px0} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween} ${styles.mt3}`}>
                                                    <div className={`${styles.bgPink} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.py3} ${styles.cursorPointer}`} style={{width: 'calc(50% - 8px)'}} onClick={() => this._openCalendar1(1)}>
                                                        <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{`${selectedDate.getFullYear()}/${String(selectedDate.getMonth() + 1).length === 2 ? (selectedDate.getMonth() + 1) : '0'.concat(String(selectedDate.getMonth() + 1))}/${selectedDate.getDate()}`}</p>
                                                    </div>
                                                    <div className={`${styles.bgPink} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.py3} ${styles.cursorPointer}`} style={{width: 'calc(50% - 8px)'}} onClick={() => this._openCalendar1()}>
                                                        <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{`${selectedAmPm} ${selectedHour}:${selectedMin}`}</p>
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
                                                        <p className={`${styles.font1214} ${styles.ml2}`} onClick={() => this._handleChangeDateOption(2)}>{this.context.t("I don’t have a specific date yet, but I’m staying in New York City during : ")}</p>
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
                                        <p className={`${styles.fontBold} ${styles.font1416} ${styles.mt5}`}>{this.context.t("4. How long do you want to spend your time with the photographer?")}</p>
                                        <div className={`${styles.row} ${styles.mx0} ${styles.mt3} ${styles.justifyContentBetween}`}>
                                            <div className={`${styles.px0} ${styles.mb3}`}>
                                                <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                                                    <div className={`${styles.checkBox} ${hour === 1 ? null : styles.unchecked} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter}`} onClick={() => this._handleChangeHour(1)}>
                                                        {hour === 1 && (
                                                            <img src={require('../../assets/images/icon_check.png')} alt={this.context.t("1 Hour")} style={{width: 10, height: 10}} />
                                                        )}
                                                    </div>
                                                    <p className={`${styles.font1214} ${styles.ml2}`} onClick={() => this._handleChangeHour(1)}>{this.context.t("1 hour")}</p>
                                                </div>
                                            </div>
                                            <div className={`${styles.px0} ${styles.mb3}`}>
                                                <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
                                                    <div className={`${styles.checkBox} ${hour === 2 ? null : styles.unchecked} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter}`} onClick={() => this._handleChangeHour(2)}>
                                                        {hour === 2 && (
                                                            <img src={require('../../assets/images/icon_check.png')} alt={this.context.t("2 Hour")} style={{width: 10, height: 10}} />
                                                        )}
                                                    </div>
                                                    <p className={`${styles.font1214} ${styles.ml2}`} onClick={() => this._handleChangeHour(2)}>{this.context.t("2 hours")}</p>
                                                </div>
                                            </div>
                                            <div className={`${styles.px0} ${styles.mb3}`}>
                                                <div className={`${styles.row} ${styles.mx0}`}>
                                                    <div className={`${styles.checkBox} ${hour === -1 ? null : styles.unchecked} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter}`} onClick={() => this._handleChangeHour(-1)}>
                                                        {hour === -1 && (
                                                            <img src={require('../../assets/images/icon_check.png')} alt={this.context.t("Extra Hour")} style={{width: 10, height: 10}} />
                                                        )}
                                                    </div>
                                                    <p className={`${styles.font1214} ${styles.ml2}`} onClick={() => this._handleChangeHour(-1)}>{this.context.t("Others : ")}</p>
                                                    <input className={`${styles.textInput11} ${styles.ml2}`} readOnly={hour === -1 ? false : true} style={{width: 50}} type={"text"} value={extraHour} name={'extraHour'} maxLength={3} onChange={this._handleInputChange} />
                                                    <p className={`${styles.font1214} ${styles.ml1}`} onClick={() => this._handleChangeHour(-1)}>{this.context.t("hours")}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={`${styles.widthFull} ${styles.bgGray33} ${styles.row} ${styles.mx0} ${styles.mt5} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn}`} style={{height: 48}} onClick={this._nextSlide}>
                                            <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{this.context.t("NEXT")}</p>
                                        </div>
                                    </div>
                                    <div className={`${styles.py3} ${styles.px3}`}>
                                        <p className={`${styles.fontBold} ${styles.font1416}`}>{this.context.t("5. Where would you like to take the travel photography? ")}</p>
                                        <div className={`${styles.row} ${styles.mx0} ${styles.mt3}`}>
                                            <div className={`${styles.col12} ${styles.px0}`}>
                                                <div className={`${styles.row} ${styles.mx0}`}>
                                                    <div className={`${styles.checkBox} ${locationOption === 1 ? null : styles.unchecked} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter}`} onClick={() => this._handleChangeLocationOption(1)}>
                                                        {locationOption === 1 && (
                                                            <img src={require('../../assets/images/icon_check.png')} alt={this.context.t("Specific")} style={{width: 10, height: 10}} />
                                                        )}
                                                    </div>
                                                    <div className={`${styles.checkBoxText}`}>
                                                        <p className={`${styles.font1214} ${styles.ml2}`} onClick={() => this._handleChangeLocationOption(1)}>{this.context.t("I’d like to select my desired location(s). Click here to add a new location. ")}</p>
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
                                                        <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{this.context.t("Add a location")}</p>
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
                                                        <p className={`${styles.font1214} ${styles.ml2}`} onClick={() => this._handleChangeLocationOption(2)}>{this.context.t("I’d rather follow my photographer’s recommendation.")}</p>
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
                                            <p className={`${styles.fontBold} ${styles.font1416}`}>{this.context.t("6. Sign-up and submit your request ")}</p>
                                            <p className={`${styles.fontBold} ${styles.font12} ${styles.pt45}`}>{this.context.t("First name")}</p>
                                            <div className={`${styles.widthFull}`}>
                                                <input className={`${styles.textInput2}`} type={"text"} name={"firstName"} value={firstName} onChange={this._handleInputChange} />
                                            </div>
                                            <p className={`${styles.fontBold} ${styles.font12} ${styles.mt4}`}>{this.context.t("Last name")}</p>
                                            <div className={`${styles.widthFull}`}>
                                                <input className={`${styles.textInput2}`} type={"text"} name={"lastName"} value={lastName} onChange={this._handleInputChange} />
                                            </div>
                                            <p className={`${styles.fontBold} ${styles.font12} ${styles.mt4}`}>{this.context.t("Email")}</p>
                                            <div className={`${styles.widthFull}`}>
                                                <input className={`${styles.textInput2}`} type={"text"} name={"email"} value={email} onChange={this._handleInputChange} />
                                            </div>
                                            <p className={`${styles.fontBold} ${styles.font12} ${styles.mt4}`}>{this.context.t("Mobile")}</p>
                                            <div className={`${styles.positionRelative}`}>
                                                <div className={`${styles.widthFull} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween}`}>
                                                    <div className={`${styles.countryNumberInput} ${styles.cursorPointer}`} onClick={this._handleShowCountryNumber}>
                                                        <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween}`} style={{height: 17}}>
                                                            <p className={`${styles.font13}`}>{countryNumber ? `+${countryNumber}` : `${countryNumber}`}</p>
                                                            <MdArrowDropdown fontSize="16px" color="#000000" />
                                                        </div>
                                                    </div>
                                                    <div className={`${styles.textInput3} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween}`}>
                                                        <div className={`${styles.col10} ${styles.px0}`}>
                                                            <input className={`${styles.textInput4}`} type={"text"} name={"mobile"} value={mobile} onChange={this._handleInputChange} />
                                                        </div>
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
                                            <p className={`${styles.fontBold} ${styles.font12} ${styles.mt4}`}>{this.context.t("Confirm your password")}</p>
                                            <div className={`${styles.widthFull}`}>
                                                <input className={`${styles.textInput2}`} type={"password"} name={"password2"} value={password2} onChange={this._handleInputChange} />
                                            </div>
                                            <p className={`${styles.font1214} ${styles.pink} ${styles.textCenter} ${styles.mt3} ${styles.cursorPointer}`} onClick={() => this._handleChangeAuth('login')}>{this.context.t("Already have PRIZM account?")}</p>
                                            <div className={`${styles.widthFull} ${styles.bgGray33} ${styles.row} ${styles.mx0} ${styles.mt3} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn} ${isSubmitting ? styles.opacity7 : null}`} style={{height: 48}} onClick={this._signup}>
                                                <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{this.context.t("Click here to submit your request")}</p>
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
                                            <p className={`${styles.fontBold} ${styles.font1416}`}>{this.context.t("6. Sign-in and submit your request ")}</p>
                                            <p className={`${styles.fontBold} ${styles.font12} ${styles.pt45}`}>{this.context.t("Email")}</p>
                                            <div className={`${styles.widthFull}`}>
                                                <input className={`${styles.textInput2}`} type={"text"} name={"loginEmail"} value={loginEmail} onChange={this._handleInputChange} />
                                            </div>
                                            <p className={`${styles.fontBold} ${styles.font12} ${styles.mt4}`}>{this.context.t("Password")}</p>
                                            <div className={`${styles.widthFull}`}>
                                                <input className={`${styles.textInput2}`} type={"password"} name={"loginPassword"} value={loginPassword} onChange={this._handleInputChange} />
                                            </div>
                                            <p className={`${styles.font1214} ${styles.pink} ${styles.textCenter} ${styles.mt3} ${styles.cursorPointer}`} onClick={() => this._handleChangeAuth('signup')}>{this.context.t("First time to PRIZM?")}</p>
                                            <div className={`${styles.widthFull} ${styles.bgGray33} ${styles.row} ${styles.mx0} ${styles.mt3} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn} ${isSubmitting ? styles.opacity7 : null}`} style={{height: 48}} onClick={this._login}>
                                                <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{this.context.t("Click here to submit your request")}</p>
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
                                                            <Picker
                                                            optionGroups={optionGroups}
                                                            valueGroups={valueGroups}
                                                            onChange={this._handleChangeTimes} />
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
                    </Element>
                )}
                <Modal
                open={showCancel} 
                onClose={this._closeCancel} 
                center
                styles={{ overlay: { background: "rgba(0,0,0,0.2)", padding: 0 }, modal: { padding: 0 }}}
                >
                    <div className={`${styles.containerModal} ${styles.px3} ${styles.py3} ${styles.bgWhite}`}>
                        <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.widthFull}`}>
                            <img src={require('../../assets/images/icon_alert.png')} style={{width: '20%', minWidth: 60, maxWidth: 150}} />
                        </div>
                        <p className={`${styles.mt3} ${styles.font1416} ${styles.textCenter}`}>
                            {this.context.t("If you make a new custom request, your existing request will be automatically cancelled.")}
                        </p>
                        <p className={`${styles.mt4} ${styles.font1416} ${styles.textCenter}`}>
                            {this.context.t("Continue?")}
                        </p>
                        <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.mxAuto}`} style={{maxWidth: 400}}>
                            <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentBetween} ${styles.mt4} ${styles.widthFull}`}>
                                <div className={`${styles.bgGray93} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn}`} style={{height: 48, width: 'calc(50% - 8px)'}} onClick={this._cancel}>
                                    <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{this.context.t("OK")}</p>
                                </div>
                                <div className={`${styles.bgGray33} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn}`} style={{height: 48, width: 'calc(50% - 8px)'}} onClick={this._closeCancel}>
                                    <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{this.context.t("Back")}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            </Fragment>
        )
    }
}
export default CustomRequestCreate; 