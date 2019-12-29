import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AdminProfileSetting from './presenter';

class Container extends Component{
    static propTypes = {
        isLoggedIn: PropTypes.bool.isRequired,
        profile: PropTypes.object,
        goHome: PropTypes.func.isRequired,
        adminEditProfile: PropTypes.func.isRequired,
        getProfile: PropTypes.func.isRequired,
        goPasswordChange: PropTypes.func.isRequired
    }

    static contextTypes = {
        t: PropTypes.func
    }

    constructor(props){
        super(props)
        const { profile } = props;
        this.state = {
            email: profile ? profile.email : "",
            firstName: profile ? profile.first_name : "",
            lastName: profile ? profile.last_name : "",
            countryNumber: profile ? profile.country_number : "",
            mobile: profile ? profile.mobile : "",
            instagram: profile ? profile.instagram_account :"",
            showCountryNumber: false,
            showCountryCode: false,
            isSubmitting: false,
            edited: false,
            editable: false
        }
    }

    componentDidMount = () => {
        const { isLoggedIn, profile, goHome } = this.props;
        if(!isLoggedIn){
            goHome()
        }
        else if(profile.user_type !== 'photographer'){
            goHome()
        }
    }

    _handleInputChange = (event) => {
        const { target : { value, name } } = event;
        if(name === 'mobile'){
            let numberReg = /^[0-9]*$/;
            if(numberReg.test(value)){
                this.setState({
                    [name]: value.replace(/^0+/, ''),
                    edited: true
                });
            }
        }
        else{
            this.setState({
                [name]: value,
                edited: true
            });
        }
    }

    _handleCountryNumberChange = (countryNumber) => {
        this.setState({
            countryNumber,
            showCountryNumber: false
        })
    }

    _handleShowCountryNumber = () => {
        this.setState({
            showCountryNumber: !this.state.showCountryNumber
        })
    }

    _submit = async() => {
        const { isSubmitting, firstName, lastName, countryNumber, mobile, instagram, edited } = this.state;
        const { adminEditProfile, getProfile } = this.props;
        if(!isSubmitting){
            if(edited){
                if(firstName && lastName && countryNumber && mobile && instagram){
                    this.setState({
                        isSubmitting: true
                    })
                    const replacedInstagram = instagram.replace('instagram.com/', '')
                    const result = await adminEditProfile(firstName, lastName, countryNumber, mobile, replacedInstagram)
                    if(result.status === 'ok'){
                        await getProfile()
                        this.setState({
                            isSubmitting: false
                        })
                        alert(this.context.t("Your account information has been changed successfully."))
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
                    alert(this.context.t("Please fill in the information."))
                }
            }
        }
    }

    _enableEdit = () => {
        this.setState({
            editable: true
        })
    }

    render(){
        return(
            <AdminProfileSetting 
            {...this.props} 
            {...this.state} 
            handleInputChange={this._handleInputChange}
            handleCountryNumberChange={this._handleCountryNumberChange}
            handleShowCountryNumber={this._handleShowCountryNumber}
            submit={this._submit}
            enableEdit={this._enableEdit}
            />
        )
    }
}

export default Container;