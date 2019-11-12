import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PhotographerDetail from './presenter';

class Container extends Component{
    static propTypes = {
        getPhotographerDetail: PropTypes.func.isRequired,
        createRequest: PropTypes.func.isRequired,
        getRequest: PropTypes.func.isRequired,
        request: PropTypes.object,
        isLoggedIn: PropTypes.bool.isRequired,
        goSignUp: PropTypes.func.isRequired,
        removeRequest: PropTypes.func.isRequired,
        goHome: PropTypes.func.isRequired,
        getOrderList: PropTypes.func.isRequired
    }

    static contextTypes = {
        t: PropTypes.func
    }

    constructor(props){
        super(props);
        this.state = {
            loading: true,
            photographer: {},
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
            selectedHour: "",
            selectedMin: "",
            showHourList: false,
            showMinList: false,
            isConfirmPage: props.location.state ? props.location.state.isConfirmPage ? props.location.state.isConfirmPage : false : false,
            fromAuth: props.location.state ? props.location.state.fromAuth ? props.location.state.fromAuth : false : false,
            requestSubmitted: false,
            dateRange: []
        }
    }

    componentDidMount = async() => {
        const { getPhotographerDetail, match : { params : { photographerId } } } = this.props;
        const result = await getPhotographerDetail(photographerId)
        if(result.status === 'ok'){
            this.setState({
                photographer: result.photographer,
                loading: false
            })
        }
        else if(result.error){
            alert(result.error)
        }
        else{
            alert('오류가 발생하였습니다.')
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
                alert(this.context.t("날짜를 선택해주세요."))
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
                selectedHour: "",
                selectedMin: "",
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
    }

    _blankOption = () => {
        this.setState({
            selectedOption: {}
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

    _confirmDate = () => {
        const { selectedMin, selectedHour, dateOption, selectedStartDate, selectedEndDate } = this.state;
        if(dateOption === 1){
            if(selectedMin && selectedHour){
                this.setState({
                    dateConfirm: true,
                    showCalendar1: false,
                    show3: true
                })
            }
            else{
                this.setState({
                    dateConfirm: false
                })
                alert(this.context.t("시간을 선택해주세요."))
            }
        }
        else{
            if(selectedStartDate && selectedEndDate){
                this.setState({
                    dateConfirm: true,
                    showCalendar2: false,
                    show3: true
                })
            }
            else{
                this.setState({
                    dateConfirm: false
                })
                alert(this.context.t("날짜 범위를 선택해주세요."))
            }
        }
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

    _goConfirm = async() => {
        const { selectedLocation, dateOption, selectedDate, selectedHour, selectedMin, selectedStartDate, selectedEndDate, selectedOption, photographer, comment } = this.state;
        const { getRequest, isLoggedIn, goSignUp } = this.props;
        if(dateOption === 1){
            if(selectedLocation.id && selectedDate && selectedHour && selectedMin && selectedOption){
                await getRequest({
                    photographer: photographer,
                    location: selectedLocation,
                    option: selectedOption,
                    comment,
                    dateOption,
                    date: selectedDate ?  String(selectedDate.getFullYear()).concat('-', String(selectedDate.getMonth() + 1), '-', String(selectedDate.getDate())) : "",
                    hour: selectedHour,
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
                    goSignUp(photographer.studio_id)
                }
            }
            else{
                this.setState({
                    isConfirmPage: false
                })
                alert(this.context.t("요청 정보를 입력해주세요."))
            }
        }
        else{
            if(selectedLocation.id && selectedStartDate && selectedEndDate && selectedOption){
                await getRequest({
                    photographer: photographer,
                    location: selectedLocation,
                    option: selectedOption,
                    comment,
                    dateOption,
                    date: selectedDate ? String(selectedDate.getFullYear()).concat('-', String(selectedDate.getMonth() + 1), '-', String(selectedDate.getDate())) : "",
                    hour: selectedHour,
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
                    goSignUp(photographer.studio_id)
                }
            }
            else{
                this.setState({
                    isConfirmPage: false
                })
                alert(this.context.t("요청 정보를 입력해주세요."))
            }
        }
    }

    _submit = async() => {
        const { isSubmitting } = this.state;
        const { createRequest, request, removeRequest, getOrderList } = this.props;
        if(!isSubmitting){
            const result = await createRequest(request.photographer.id, request.location.id, request.option.id, request.comment, request.dateOption, request.date, request.hour, request.min, request.startDate, request.endDate)
            if(result.status === 'ok'){
                await getOrderList()
                this.setState({
                    isSubmitting: false,
                    requestSubmitted: true
                })
                await removeRequest()
            }
            else if(result.error){
                this.setState({
                    isSubmitting: false,
                    requestSubmitted: false
                })
                alert(result.error)
            }
            else{
                this.setState({
                    isSubmitting: false,
                    requestSubmitted: false
                })
                alert('오류가 발생하였습니다.')
            }
            this.setState({
                isSubmitting: false
            })
        }
    }

    render(){
        return (
            <PhotographerDetail 
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
            selectHour={this._selectHour}
            selectMin={this._selectMin}
            handleShowHourList={this._handleShowHourList}
            handleShowMinList={this._handleShowMinList}
            selectDateRange={this._selectDateRange}
            goConfirm={this._goConfirm}
            submit={this._submit}
            />
        )
    }
}

export default Container; 