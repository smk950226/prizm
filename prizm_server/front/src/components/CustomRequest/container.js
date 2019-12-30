import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CustomRequest from './presenter';

class Container extends Component{
    static propTypes = {
        goCustomRequestCreate: PropTypes.func.isRequired,
        profile: PropTypes.object,
        cancelCustomRequest: PropTypes.func.isRequired,
        goSignin: PropTypes.func.isRequired,
        getProfile: PropTypes.func.isRequired,
        goRequestOrderList: PropTypes.func.isRequired,
        sendVerificationEmail: PropTypes.func.isRequired,
        isLoggedIn: PropTypes.bool.isRequired,
        getOrderDetail: PropTypes.func.isRequired,
        goPayment: PropTypes.func.isRequired
    }

    static contextTypes = {
        t: PropTypes.func
    }

    state = {
        isSubmitting: false,
        fetchedProfile: false,
        isSendingEmail: false,
        showCancel: false,
        isLoading: false
    }

    static getDerivedStateFromProps(nextProps, prevState){
        const { fetchedProfile } = prevState;
        if((!fetchedProfile)){
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

    componentDidUpdate = (prevProps, prevState) => {
        if(!prevState.fetchedProfile && this.state.fetchedProfile){
            this.props.goCustomRequestCreate()
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
        const { isSubmitting } = this.state;
        if(!isSubmitting){
            if(profile){
                if(profile.custom_request_status.status === 'close'){
                    this.setState({
                        isSubmitting: true
                    })
                    const result = await cancelCustomRequest(profile.custom_request_status.id)
                    if(result.status === 'ok'){
                        this.setState({
                            isSubmitting: false,
                            showCancel: false
                        })
                        await getProfile()
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

    render(){
        return (
            <CustomRequest 
            {...this.props} 
            {...this.state}
            cancel={this._cancel}
            send={this._send}
            openCancel={this._openCancel}
            closeCancel={this._closeCancel}
            goPayment={this._goPayment}
            />
        )
    }
}

export default Container; 