import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CustomRequestCreate from './presenter';

class Container extends Component{
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
        goCustomRequest: PropTypes.func.isRequired,
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

    render(){
        return (
            <CustomRequestCreate 
            {...this.props} 
            {...this.state}
            />
        )
    }
}

export default Container; 