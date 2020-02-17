import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PhotographerDetail from './presenter';

class Container extends Component{
    static propTypes = {
        isLoggedIn: PropTypes.bool.isRequired,
        goHome: PropTypes.func.isRequired,
        goRequestOrderList: PropTypes.func.isRequired,
        responsetToRequsetOrder: PropTypes.func.isRequired
    }

    static contextTypes = {
        t: PropTypes.func
    }

    constructor(props){
        super(props);
        this.state = {
            order: props.location.state ? props.location.state.order ? props.location.state.order : null : null,
            show1: true,
            show2: true,
            show3: true,
            isTruncated: true,
            isSubmitting: false,
            requestSubmitted: false,
            dayList: [],
            timeList: [],
            loading: true,
            selectedTime: []
        }
    }

    componentDidMount = async() => {
        const { goHome } = this.props;
        const { order } = this.state;
        if(order){
            let dayList = []
            const timeList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
            if(order.custom_request.date_option === 'Specific'){
                const day = new Date(order.custom_request.specific_date)
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
                const start = new Date(order.custom_request.start_date)
                const end = new Date(order.custom_request.end_date)
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
        else{
            goHome()
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

    _selectTime = (time, timeIndex, dayIndex) => {
        const { selectedTime, order } = this.state;
        if(selectedTime.length < order.custom_request.hour){
            if(selectedTime.length > 0){
                let ok = false
                selectedTime.map(selected => {
                    if(selected.dayIndex === dayIndex){
                        if((selected.timeIndex - timeIndex === -1) || (selected.timeIndex - timeIndex === 1)){
                            ok = true
                        }
                    }
                })
                if(ok){
                    this.setState({
                        selectedTime: [...this.state.selectedTime, {
                            time,
                            timeIndex,
                            dayIndex
                        }]
                    })
                }
            }
            else{
                this.setState({
                    selectedTime: [...this.state.selectedTime, {
                        time,
                        timeIndex,
                        dayIndex
                    }]
                })
            }
        }
    }

    _removeTime = (time) => {
        this.setState({
            selectedTime: []
        })
    }

    _submit = async() => {
        const { isSubmitting, order, selectedTime } = this.state;
        const { responsetToRequsetOrder } = this.props;
        if(!isSubmitting){
            if(order.custom_request.date_option === 'Specific'){
                this.setState({
                    isSubmitting: true
                })
                const result = await responsetToRequsetOrder(order.id)
                if(result.status === 'ok'){
                    this.setState({
                        isSubmitting: false,
                        requestSubmitted: true
                    })
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
                    alert(this.context.t("An error has occurred.."))
                }
            }
            else{
                if(selectedTime.length === order.custom_request.hour){
                    this.setState({
                        isSubmitting: true
                    })
                    selectedTime.sort((a,b) => {
                        const aDate = new Date(Number(a.time.slice(0,4)), Number(a.time.slice(5,7)) - 1, Number(a.time.slice(8,10)), Number(a.time.slice(11,13)), Number(a.time.slice(14,16)))
                        const bDate = new Date(Number(b.time.slice(0,4)), Number(b.time.slice(5,7)) - 1, Number(b.time.slice(8,10)), Number(b.time.slice(11,13)), Number(b.time.slice(14,16)))
                        if(aDate < bDate){
                            return -1
                        }
                        else{
                            return 1
                        }
                    })
                    const result = await responsetToRequsetOrder(order.id, selectedTime[0].time)
                    if(result.status === 'ok'){
                        this.setState({
                            isSubmitting: false,
                            requestSubmitted: true,
                            selectTime: []
                        })
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
                        alert(this.context.t("An error has occurred.."))
                    }
                }
                else{
                    alert(`${order.custom_request.hour}` + this.context.t("hour(s) must be selected."))
                }
            }
        }
    }

    render(){
        return (
            <PhotographerDetail 
            {...this.props} 
            {...this.state}
            doTruncate={this._doTruncate}
            undoTruncate={this._undoTruncate}
            open1={this._open1}
            close1={this._close1}
            open2={this._open2}
            close2={this._close2}
            open3={this._open3}
            close3={this._close3}
            submit={this._submit}
            selectTime={this._selectTime}
            removeTime={this._removeTime}
            />
        )
    }
}

export default Container; 