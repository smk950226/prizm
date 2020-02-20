import React, { Component } from 'react';
import { Alert } from 'react-native';
import PropTypes from 'prop-types';
import PhotographerDetailScreen from './presenter';

class Container extends Component{
    static propTypes = {
        getPhotographerDetail: PropTypes.func.isRequired,
        createRequest: PropTypes.func.isRequired,
        getRequest: PropTypes.func.isRequired,
        request: PropTypes.object,
        isLoggedIn: PropTypes.bool.isRequired,
        removeRequest: PropTypes.func.isRequired,
        getOrderList: PropTypes.func.isRequired,
        profile: PropTypes.object,
        sendVerificationEmail: PropTypes.func.isRequired
    }

    static contextTypes = {
        t: PropTypes.func
    }

    constructor(props){
        super(props);
        const isConfirmPage = props.navigation.getParam('isConfirmPage', null)
        const fromAuth = props.navigation.getParam('fromAuth', null)
        const photographer = props.navigation.getParam('photographer', null)
        this.state = {
            photographer,
            loading: true,
            isTruncated: true,
            selectedLocation: {},
            dateOption: 0,
            selectedOption: {},
            comment: "",
            isSubmitting: false,
            show1: true,
            show2: false,
            show3: false,
            show4: false,
            showCalendar1: false,
            showCalendar2: false,
            selectedDate: "",
            selectedStartDate: "",
            selectedEndDate: "",
            dateConfirm: false,
            selectDateStep: 1,
            selectedHour: "14",
            selectedMin: "00",
            isConfirmPage: isConfirmPage ? isConfirmPage : false,
            fromAuth: fromAuth ? fromAuth : false ,
            requestSubmitted: false,
            dateRange: [],
            isSendingEmail: false
        }
    }

    componentDidMount = async() => {
        const { getPhotographerDetail } = this.props;
        const { photographer } = this.state;
        const result = await getPhotographerDetail(photographer.studio_id)
        if(result.status === 'ok'){
            this.setState({
                photographer: result.photographer,
                loading: false
            })
        }
        else if(result.error){
            Alert.alert(null, result.error)
        }
        else{
            Alert.alert(null, this.context.t('An error has occurred..'))
        }
    }

    componentDidUpdate = async(prevProps, prevState) => {
        if(prevProps.navigation.getParam('fromAuth', null) !== this.props.navigation.getParam('fromAuth', null)){
            const isConfirmPage = this.props.navigation.getParam('isConfirmPage', null)
            const fromAuth = this.props.navigation.getParam('fromAuth', null)
            this.setState({
                isConfirmPage: isConfirmPage ? isConfirmPage : false,
                fromAuth: fromAuth ? fromAuth : false
            })
        }
    }

    _open1 = () => {
        this.setState({
            show1: true
        })
    }

    _close1 = () => {
        this.setState({
            show1: false
        })
    }

    _open2 = () => {
        this.setState({
            show2: true
        })
    }

    _close2 = () => {
        this.setState({
            show2: false
        })
    }

    _open3 = () => {
        this.setState({
            show3: true
        })
    }

    _close3 = () => {
        this.setState({
            show3: false
        })
    }

    _open4 = () => {
        this.setState({
            show4: true
        })
    }

    _close4 = () => {
        this.setState({
            show4: false
        })
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
                showCalendar1: true
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

    _handleInputChange = (event) => {
        const { target : { value, name } } = event;
        this.setState({
            [name]: value
        });
    }

    _doTruncate = () => {
        this.setState({
            isTruncated: true
        })
    }

    _undoTruncate = () => {
        this.setState({
            isTruncated: false
        })
    }

    _selectLocation = (selectedLocation) => {
        this.setState({
            selectedLocation,
            show2: true
        })

        return true
    }

    _blankLocation = () => {
        this.setState({
            selectedLocation: {}
        })
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
                selectedEndDate: "",
                show3: false
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
                show3: false
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
            show3: false
        })
    }

    _selectOption = (selectedOption) => {
        this.setState({
            selectedOption,
            show4: true
        })
        return true
    }

    _blankOption = () => {
        this.setState({
            selectedOption: {}
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

    _confirmDate = () => {
        const { dateOption, selectedDate, selectedHour, selectedMin, selectedStartDate, selectedEndDate } = this.state;
        if(dateOption === 1){
            if(selectedDate && selectedHour && selectedMin){
                this.setState({
                    dateConfirm: true,
                    showCalendar1: false,
                    show3: true
                })

                return true
            }
            else{
                this.setState({
                    dateConfirm: false
                })
                Alert.alert(null, this.context.t("Please select time."))

                return false
            }
        }
        else{
            if(selectedStartDate && selectedEndDate){
                this.setState({
                    dateConfirm: true,
                    showCalendar2: false,
                    show3: true
                })

                return true
            }
            else{
                this.setState({
                    dateConfirm: false
                })
                Alert.alert(null, this.context.t("Please select your date range."))

                return false
            }
        }
    }

    _goConfirm = async() => {
        const { selectedLocation, dateOption, selectedDate, selectedHour, selectedMin, selectedStartDate, selectedEndDate, selectedOption, photographer, comment } = this.state;
        const { getRequest, isLoggedIn } = this.props;
        if(dateOption === 1){
            if(selectedLocation.id && selectedDate && selectedHour && selectedMin && selectedOption){
                let submitHour = selectedHour
                await getRequest({
                    photographer: photographer,
                    location: selectedLocation,
                    option: selectedOption,
                    comment,
                    dateOption,
                    date: selectedDate ?  String(selectedDate.getFullYear()).concat('-', String(selectedDate.getMonth() + 1), '-', String(selectedDate.getDate())) : "",
                    hour: submitHour,
                    min: selectedMin,
                    startDate: selectedStartDate ? String(selectedStartDate.getFullYear()).concat('-', String(selectedStartDate.getMonth() + 1), '-', String(selectedStartDate.getDate())) : "",
                    endDate: selectedEndDate ? String(selectedEndDate.getFullYear()).concat('-', String(selectedEndDate.getMonth() + 1), '-', String(selectedEndDate.getDate())) : ""
                })
                if(isLoggedIn){
                    this.setState({
                        isConfirmPage: true
                    })
                }
                else{
                    this.props.navigation.navigate('SignUp', { photographerId: photographer.studio_id, goRequest: true })
                }
            }
            else{
                this.setState({
                    isConfirmPage: false
                })
                Alert.alert(null, this.context.t("Please select all of the options above."))
            }
        }
        else{
            if(selectedLocation.id && selectedStartDate && selectedEndDate && selectedOption){
                let submitHour = selectedHour
                await getRequest({
                    photographer: photographer,
                    location: selectedLocation,
                    option: selectedOption,
                    comment,
                    dateOption,
                    date: selectedDate ? String(selectedDate.getFullYear()).concat('-', String(selectedDate.getMonth() + 1), '-', String(selectedDate.getDate())) : "",
                    hour: submitHour,
                    min: selectedMin,
                    startDate: selectedStartDate ? String(selectedStartDate.getFullYear()).concat('-', String(selectedStartDate.getMonth() + 1), '-', String(selectedStartDate.getDate())) : "",
                    endDate: selectedEndDate ? String(selectedEndDate.getFullYear()).concat('-', String(selectedEndDate.getMonth() + 1), '-', String(selectedEndDate.getDate())) : ""
                })
                if(isLoggedIn){
                    this.setState({
                        isConfirmPage: true
                    })
                }
                else{
                    this.props.navigation.navigate('SignUp', { photographerId: photographer.studio_id, goRequest: true })
                }
            }
            else{
                this.setState({
                    isConfirmPage: false
                })
                Alert.alert(null, this.context.t("Please select all of the options above."))
            }
        }
    }

    _submit = async() => {
        const { isSubmitting } = this.state;
        const { createRequest, request, removeRequest, getOrderList, profile, sendVerificationEmail } = this.props;
        if(!isSubmitting){
            if(profile){
                this.setState({
                    isSubmitting: true
                })
                const result = await createRequest(request.photographer.id, request.location.id, request.option.id, request.comment, request.dateOption, request.date, request.hour, request.min, request.startDate, request.endDate)
                if(result.status === 'ok'){
                    await getOrderList()
                    if(!profile.is_verified){
                        const result = await sendVerificationEmail()
                    }
                    this.setState({
                        isSubmitting: false,
                        requestSubmitted: true
                    })
                    await removeRequest()
                }
                else if(result.error){
                    Alert.alert(null, 
                        result.error,
                        [
                          {text: 'OK', onPress: () => {
                            this.setState({
                                isSubmitting: false,
                                requestSubmitted: false
                            })
                          }},
                        ],
                        {cancelable: false}
                    )
                }
                else{
                    this.setState({
                        isSubmitting: false,
                        requestSubmitted: false
                    })
                    Alert.alert(null, 
                        this.context.t('An error has occurred..'),
                        [
                          {text: 'OK', onPress: () => {
                            this.setState({
                                isSubmitting: false,
                                requestSubmitted: false
                            })
                          }},
                        ],
                        {cancelable: false}
                    )
                }
            }
            else{
                Alert.alert(null, this.context.t('Login is required.'))
            }
        }
    }

    _send = async() => {
        const { isSendingEmail } = this.state;
        const { sendVerificationEmail, isLoggedIn } = this.props;
        if(!isSendingEmail){
            if(isLoggedIn){
                this.setState({
                    isSendingEmail: true
                })
                const result = await sendVerificationEmail()
                if(result.status === 'ok'){
                    Alert.alert(null, 
                        this.context.t("A verification email has been sent. Please check your inbox."),
                        [
                          {text: 'OK', onPress: () => {
                            this.setState({
                                isSendingEmail: false
                            })
                          }},
                        ],
                        {cancelable: false}
                    )
                }
                else if(result.error){
                    Alert.alert(null, 
                        result.error,
                        [
                          {text: 'OK', onPress: () => {
                            this.setState({
                                isSendingEmail: false
                            })
                          }},
                        ],
                        {cancelable: false}
                    )
                }
                else{
                    Alert.alert(null, 
                        this.context.t("An error has occurred.."),
                        [
                          {text: 'OK', onPress: () => {
                            this.setState({
                                isSendingEmail: false
                            })
                          }},
                        ],
                        {cancelable: false}
                    )
                }
            }
        }
    }

    _handleChangeTimes = (date) => {
        const dateList = date.split(':')
        this.setState({
            selectedHour: dateList[0],
            selectedMin: dateList[1]
        })
    };

    _handleChangeComment = (comment) => {
        this.setState({
            comment
        })
    }

    render(){
        return (
            <PhotographerDetailScreen 
            {...this.props} 
            {...this.state}
            doTruncate={this._doTruncate}
            undoTruncate={this._undoTruncate}
            selectLocation={this._selectLocation}
            blankLocation={this._blankLocation}
            handleChangeDateOption={this._handleChangeDateOption}
            blankDateOption={this._blankDateOption}
            selectOption={this._selectOption}
            blankOption={this._blankOption}
            handleInputChange={this._handleInputChange}
            open1={this._open1}
            close1={this._close1}
            open2={this._open2}
            close2={this._close2}
            open3={this._open3}
            close3={this._close3}
            open4={this._open4}
            close4={this._close4}
            openCalendar1={this._openCalendar1}
            closeCalendar1={this._closeCalendar1}
            openCalendar2={this._openCalendar2}
            closeCalendar2={this._closeCalendar2}
            selectDate={this._selectDate}
            confirmDate={this._confirmDate}
            changeDateStep={this._changeDateStep}
            selectDateRange={this._selectDateRange}
            goConfirm={this._goConfirm}
            submit={this._submit}
            send={this._send}
            handleChangeTimes={this._handleChangeTimes}
            handleChangeComment={this._handleChangeComment}
            />
        )
    }
}

export default Container; 