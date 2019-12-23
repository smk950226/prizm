import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CustomRequest from './presenter';

class Container extends Component{
    static propTypes = {
        goCustomRequestCreate: PropTypes.func.isRequired,
        profile: PropTypes.object,
        cancelCustomRequest: PropTypes.func.isRequired,
        goSignin: PropTypes.func.isRequired,
        getProfile: PropTypes.func.isRequired
    }

    static contextTypes = {
        t: PropTypes.func
    }

    state = {
        isSubmitting: false,
        fetchedProfile: false
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
                            isSubmitting: false
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

    render(){
        return (
            <CustomRequest 
            {...this.props} 
            {...this.state}
            cancel={this._cancel}
            />
        )
    }
}

export default Container; 