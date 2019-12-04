import React, { Component } from 'react';
import PropTypes from 'prop-types';
import OrderComp from './presenter';

class Container extends Component{
    static propTypes = {
        order: PropTypes.object.isRequired,
        index: PropTypes.number.isRequired,
        total: PropTypes.number.isRequired,
        responseToOrder: PropTypes.func.isRequired,
        refresh: PropTypes.func.isRequired
    }

    static contextTypes = {
        t: PropTypes.func.isRequired
    }

    state = {
        loading: true,
        showResponse: true,
        checkedOption: 0,
        showDatePicker: false,
        selectedTime: [],
        isSubmitting: false
    }

    componentDidMount = () => {
        const { order } = this.props;
        let dayList = []
        const timeList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
        if(order.date_option === 'Specific'){
            const day = new Date(order.specific_date)
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
            const start = new Date(order.start_date)
            const end = new Date(order.end_date)
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

    _openDatePicker = () => {
        this.setState({
            showDatePicker: true
        })
    }

    _closeDatePicker = () => {
        this.setState({
            showDatePicker: false
        })
    }

    _selectOption = (checkedOption) => {
        if(checkedOption === 2){
            this.setState({
                checkedOption,
                showDatePicker: true
            })
        }
        else{
            this.setState({
                checkedOption,
                showDatePicker: false
            })
        }
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
        const { checkedOption, selectedTime, isSubmitting } = this.state;
        const { order, responseToOrder, refresh } = this.props;
        if(!isSubmitting){
            if(checkedOption > 0){
                this.setState({
                    isSubmitting: true
                })
                if(checkedOption === 2){
                    if(selectedTime.length > 0){
                        const result = await responseToOrder(order.id, checkedOption, selectedTime)
                        if(result.status === 'ok'){
                            await refresh()
                            this.setState({
                                showResponse: false,
                                checkedOption: 0,
                                showDatePicker: false,
                                selectedTime: [],
                                isSubmitting: false
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
                        this.setState({
                            isSubmitting: false
                        })
                        alert(this.context.t("Please select available date & time."))
                    }
                }
                else{
                    const result = await responseToOrder(order.id, checkedOption)
                    if(result.status === 'ok'){
                        await refresh()
                        this.setState({
                            showResponse: false,
                            checkedOption: 0,
                            showDatePicker: false,
                            selectedTime: [],
                            isSubmitting: false
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
            }
            else{
                alert(this.context.t("Please select your response."))
            }
        }
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
                <OrderComp 
                {...this.props}
                {...this.state}
                openResponse={this._openResponse}
                closeResponse={this._closeResponse}
                selectOption={this._selectOption}
                openDatePicker={this._openDatePicker}
                closeDatePicker={this._closeDatePicker}
                selectTime={this._selectTime}
                removeTime={this._removeTime}
                submit={this._submit}
                />
            )
        }
    }
}

export default Container;