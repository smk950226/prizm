import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SignUpClear from './presenter';

class Container extends Component{
    static propTypes = {
        goHome: PropTypes.func.isRequired,
        profile: PropTypes.object.isRequired,
        sendVerificationEmail: PropTypes.func.isRequired,
        isLoggedIn: PropTypes.func.isRequired
    }

    static contextTypes = {
        t: PropTypes.func
    }

    state = {
        isSubmitting: false
    }

    componentDidMount = () => {
        if(!this.props.profile){
            this.props.goHome()
        }
    }

    _send = async() => {
        const { isSubmitting } = this.state;
        const { sendVerificationEmail, isLoggedIn } = this.props;
        if(!isSubmitting){
            if(isLoggedIn){
                const result = await sendVerificationEmail()
                if(result.status === 'ok'){
                    this.setState({
                        isSubmitting: false
                    })
                    alert(this.context.t("A verification email has been sent. Please check your inbox."))
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

    render(){
        return(
            <SignUpClear 
            {...this.props}
            {...this.state}
            send={this._send}
            />
        )
    }
}

export default Container;