import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Profile from './presenter';

class Container extends Component{
    static propTypes = {
        isLoggedIn: PropTypes.bool.isRequired,
        profile: PropTypes.object,
        goHome: PropTypes.func.isRequired,
        editProfile: PropTypes.func.isRequired,
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
            name: profile ? profile.name : "",
            countryNumber: profile ? profile.country_number : "",
            mobile: profile ? profile.mobile : "",
            emailForm: profile ? true : false,
            showCountryNumber: false,
            isSubmitting: false,
            edited: false
        }
    }

    componentDidMount = () => {
        if(!this.props.isLoggedIn){
            this.props.goHome()
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
        const { isSubmitting, name, countryNumber, mobile, edited } = this.state;
        const { editProfile, getProfile } = this.props;
        if(!isSubmitting){
            if(edited){
                if(name && countryNumber && mobile){
                    this.setState({
                        isSubmitting: true
                    })
                    const result = await editProfile(name, countryNumber, mobile)
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

    render(){
        return(
            <Profile 
            {...this.props} 
            {...this.state} 
            handleInputChange={this._handleInputChange}
            handleCountryNumberChange={this._handleCountryNumberChange}
            handleShowCountryNumber={this._handleShowCountryNumber}
            submit={this._submit}
            />
        )
    }
}

export default Container;