import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RequestComp from './presenter';

class Container extends Component{
    static propTypes = {
        request: PropTypes.object.isRequired,
        index: PropTypes.number.isRequired,
        total: PropTypes.number.isRequired,
        refresh: PropTypes.func.isRequired,
        photographer: PropTypes.object.isRequired,
        createRequestOrder: PropTypes.func.isRequired
    }

    static contextTypes = {
        t: PropTypes.func.isRequired
    }

    constructor(props){
        super(props);
        const { request } = props;
        this.state = {
            request,
            loading: true,
            showResponse: false,
            isSubmitting: false,
            selectedLocation: request.status === 'none' ? {} : request.request_order ? request.request_order.location ? JSON.parse(request.request_order.location.replace(/'/gi, '"')) : {} : {},
            selectedTime: request.status === 'none' ? [] : request.request_order ? request.request_order.available_time ? JSON.parse(request.request_order.available_time.replace(/'/gi, '"')) : [] : [],
            checkTime: false,
            price: request.status === 'none' ? '' : request.request_order ? `${request.request_order.price}` : '',
            readOnly: request.status === 'none' ? false : true
        }
    }

    componentDidMount = () => {
        const { request } = this.state;
        let dayList = []
        const timeList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
        if(request.date_option === 'Specific'){
            const day = new Date(request.specific_date)
            const prev = new Date(day.getTime() - (1000*60*60*24))
            const next = new Date(day.getTime() + (1000*60*60*24))
            dayList.push(prev)
            dayList.push(day)
            dayList.push(next)
            this.setState({
                loading: false,
                dayList,
                timeList
            })
        }
        else{
            const start = new Date(request.start_date)
            const end = new Date(request.end_date)
            let index = 0
            while(true){
                const day = new Date(start.getTime() + (1000*60*60*24*index))
                if (day.getTime() >= end.getTime()){
                    dayList.push(end)
                    break;
                }
                else{
                    index += 1
                    dayList.push(day)
                }
            }
            this.setState({
                loading: false,
                dayList,
                timeList
            })
        }
    }

    componentDidUpdate = (prevProps, prevState) => {
        if(prevProps.request !== this.props.request){
            this.setState({
                request: this.state.request
            })
        }
    }

    _handleInputChange = (event) => {
        const { target : { value, name } } = event;
        if(name === 'price'){
            let numberReg = /^[0-9]*$/;
            if(numberReg.test(value)){
                this.setState({
                    [name]: value
                });
            }
        }
    }

    _openResponse = () => {
        this.setState({
            showResponse: true
        })
    }

    _closeResponse = () => {
        this.setState({
            showResponse: false,
            showDatePicker: false,
            checkedOption: 0
        })
    }

    _selectTime = (time) => {
        this.setState({
            selectedTime: [...this.state.selectedTime, time]
        })
    }

    _removeTime = (time) => {
        let newSelectedTime = []
        this.state.selectedTime.map(ti => {
            if(ti === time){
                return null
            }
            else{
                newSelectedTime.push(ti)
                return null
            }
        })
        this.setState({
            selectedTime: newSelectedTime
        })
    }

    _submit = async() => {
        const { request, checkTime, selectedTime, isSubmitting, price, selectedLocation } = this.state;
        const { createRequestOrder, refresh } = this.props;
        if(!isSubmitting){
            if(request.date_option === 'Specific'){
                if(selectedLocation.name){
                    if(checkTime){
                        if(price){
                            this.setState({
                                isSubmitting: true
                            })
                            const result = await createRequestOrder(request.id, selectedLocation, '', price)
                            if(result.status === 'ok'){
                                await refresh(result.custom_request)
                                this.setState({
                                    request: result.custom_request,
                                    selectedTime: [],
                                    selectedLocation: {},
                                    checkTime: false,
                                    price: '',
                                    isSubmitting: false,
                                    showResponse: false
                                })
                            }
                            else if(result.error){
                                this.setState({
                                    isSubmitting: false
                                })
                                alert(request.error)
                            }
                            else{
                                this.setState({
                                    isSubmitting: false
                                })
                                alert(this.context.t("An error has occurred.."))
                            }
                        }
                        else{
                            alert(this.context.t("Please suggest price for the requested photography experience."))
                        }
                    }
                    else{
                        alert(this.context.t("Please check availaibility for the suggested date and time."))
                    }
                }
                else{
                    alert(this.context.t("Please select a photography location."))
                }
            }
            else{
                if(selectedLocation.name){
                    if(selectedTime.length > 0){
                        if(price){
                            this.setState({
                                isSubmitting: true
                            })
                            const result = await createRequestOrder(request.id, selectedLocation, selectedTime, price)
                            if(result.status === 'ok'){
                                await refresh(result.custom_request)
                                this.setState({
                                    request: result.custom_request,
                                    selectedTime: [],
                                    selectedLocation: {},
                                    checkTime: false,
                                    price: '',
                                    isSubmitting: false,
                                    showResponse: false
                                })
                            }
                            else if(result.error){
                                this.setState({
                                    isSubmitting: false
                                })
                                alert(result.error)
                            }
                            else{
                                this.setState({
                                    isSubmitting: false
                                })
                                alert(this.context.t("An error has occurred.."))
                            }
                        }
                        else{
                            alert(this.context.t("Please suggest price for the requested photography experience."))
                        }
                    }
                    else{
                        alert(this.context.t("Please select your available date and time."))
                    }
                }
                else{
                    alert(this.context.t("Please select a photography location."))
                }
            }
        }
    }

    _selectLocation = (selectedLocation) => {
        this.setState({
            selectedLocation
        })
    }

    _blankLocation = () => {
        this.setState({
            selectedLocation: {}
        })
    }

    _selectTime = (time) => {
        this.setState({
            selectedTime: [...this.state.selectedTime, time]
        })
    }

    _removeTime = (time) => {
        let newSelectedTime = []
        this.state.selectedTime.map(ti => {
            if(ti === time){
                return null
            }
            else{
                newSelectedTime.push(ti)
                return null
            }
        })
        this.setState({
            selectedTime: newSelectedTime
        })
    }

    _handleChangeCheckTime = () => {
        this.setState({
            checkTime: !this.state.checkTime
        })
    }

    render(){
        const { loading } = this.state;
        if(loading){
            return(
                null
            )
        }
        else{
            return(
                <RequestComp 
                {...this.props}
                {...this.state}
                openResponse={this._openResponse}
                closeResponse={this._closeResponse}
                selectTime={this._selectTime}
                removeTime={this._removeTime}
                submit={this._submit}
                selectLocation={this._selectLocation}
                blankLocation={this._blankLocation}
                selectTime={this._selectTime}
                removeTime={this._removeTime}
                handleChangeCheckTime={this._handleChangeCheckTime}
                handleInputChange={this._handleInputChange}
                />
            )
        }
    }
}

export default Container;