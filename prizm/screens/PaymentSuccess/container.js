import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PaymentSuccess from './presenter';
import queryString from 'query-string';

class Container extends Component{

    static propTypes = {
        goHome: PropTypes.func.isRequired,
        paymentSuccess: PropTypes.func.isRequired
    }

    static contextTypes = {
        t: PropTypes.func
    }

    constructor(props){
        super(props)
        this.state = {
            isDeposit: props.location.state ? props.location.state.isDeposit ? props.location.state.isDeposit : false : false,
            price: props.location.state ? props.location.state.price ? props.location.state.price : 0 : 0,
            now: props.location.state ? props.location.state.now ? props.location.state.now : new Date().getTime() : new Date().getTime(),
            loading: true
        }
    }

    componentDidMount = async() => {
        const { price, isDeposit } = this.state;
        const { goHome } = this.props;
        if(isDeposit && (price === 0)) {
            goHome()
        }
        else{
            if(isDeposit){
                this.setState({
                    loading: false
                })
            }
            else{
                const { location : { search }, paymentSuccess } = this.props;
                const querys = queryString.parse(search)
                const result = await paymentSuccess(querys.imp_uid, querys.merchant_uid, querys.imp_success)
                if(result.status === 'ok'){
                    this.setState({
                        loading: false
                    })
                }
                else if(result.error){
                    alert(result.error)
                    goHome()
                }
                else{
                    alert(this.context.t("An error has occurred.."))
                    goHome()
                }
            }
        }
    }

    render(){
        const deadline = new Date(this.state.now + 1000*60*60*24)
        return(
            <PaymentSuccess 
            {...this.props}
            {...this.state}
            deadline={deadline}
            />
        )
    }
}

export default Container;