import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Profile from './presenter';
import { COUNTRY_CODE } from '../../utils/country';

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
            firstName: profile ? profile.first_name : "",
            lastName: profile ? profile.last_name : "",
            countryNumber: profile ? profile.country_number : "",
            mobile: profile ? profile.mobile : "",
            emailForm: profile ? true : false,
            showCountryNumber: false,
            isSubmitting: false,
            edited: false,
            q: "",
            countryList: []
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
        else if(name === 'q'){
            this.setState({
                [name]: value
            });
            let countryList = [];
            COUNTRY_CODE.map(country => {
                if(country.label.toLowerCase().indexOf(value.toLowerCase()) > -1){
                    countryList.push(country)
                    return null;
                }
                else{
                    return null
                }
            })
            this.setState({
                countryList
            })
        }
        else{
            this.setState({
                [name]: value,
                edited: true
            });
        }
    }

    _submit = async() => {
        const { isSubmitting, firstName, lastName, countryNumber, mobile, edited } = this.state;
        const { editProfile, getProfile } = this.props;
        if(!isSubmitting){
            if(edited){
                if(firstName && lastName && countryNumber && mobile){
                    this.setState({
                        isSubmitting: true
                    })
                    const result = await editProfile(firstName, lastName, countryNumber, mobile)
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

    _handleCountryNumberChange = (countryNumber, countryCode) => {
        this.setState({
            countryNumber,
            countryCode,
            showCountryNumber: false,
            edited: true
        })
    }

    _handleShowCountryNumber = () => {
        this.setState({
            showCountryNumber: !this.state.showCountryNumber
        })
    }

    _openShowCountryNumber = () => {
        this.setState({
            showCountryNumber: true
        })
    }

    _closeShowCountryNumber = () => {
        this.setState({
            showCountryNumber: false
        })
    }

    render(){
        return(
            <Profile 
            {...this.props} 
            {...this.state} 
            handleInputChange={this._handleInputChange}
            handleCountryNumberChange={this._handleCountryNumberChange}
            handleShowCountryNumber={this._handleShowCountryNumber}
            openShowCountryNumber={this._openShowCountryNumber}
            closeShowCountryNumber={this._closeShowCountryNumber}
            submit={this._submit}
            />
        )
    }
}

export default Container;