import React, { Component } from 'react';
import { Alert } from 'react-native';
import PropTypes from 'prop-types';
import ProfileScreen from './presenter';
import { COUNTRY_CODE } from '../../../utils/country';

class Container extends Component{
    static propTypes = {
        isLoggedIn: PropTypes.bool.isRequired,
        profile: PropTypes.object,
        editProfile: PropTypes.func.isRequired,
        getProfile: PropTypes.func.isRequired,
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
            showCountryNumber: false,
            isSubmitting: false,
            edited: false,
            q: "",
            countryList: []
        }
    }

    componentDidMount = () => {
        if(!this.props.isLoggedIn){
            this.props.navigation.navigate("Home")
        }
    }

    _handleFirstNameChange = (firstName) => {
        this.setState({
            firstName,
            edited: true
        })
    }

    _handleLastNameChange = (lastName) => {
        this.setState({
            lastName,
            edited: true
        })
    }

    _handleMobileChange = (mobile) => {
        let numberReg = /^[0-9]*$/;
        if(numberReg.test(mobile)){
            this.setState({
                mobile: mobile.replace(/^0+/, ''),
                edited: true
            })
        }
    }

    _handleQChange = (q) => {
        this.setState({
            q
        });
        let countryList = [];
        COUNTRY_CODE.map(country => {
            if(country.label.toLowerCase().indexOf(q.toLowerCase()) > -1){
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
                        Alert.alert(null, 
                            this.context.t("Your account information has been changed successfully."),
                            [
                              {text: 'OK', onPress: () => {
                                this.setState({
                                    isSubmitting: false,
                                    edited: false
                                })
                              }},
                            ],
                            {cancelable: false}
                        )
                    }
                    else if(result.error){
                        Alert.alert(null, 
                            result.error,
                            [
                              {text: 'OK', onPress: () => {
                                this.setState({
                                    isSubmitting: false
                                })
                              }},
                            ],
                            {cancelable: false}
                        )
                    }
                    else{
                        Alert.alert(null, 
                            this.context.t("An error has occurred.."),
                            [
                              {text: 'OK', onPress: () => {
                                this.setState({
                                    isSubmitting: false
                                })
                              }},
                            ],
                            {cancelable: false}
                        )
                    }
                }
                else{
                    Alert.alert(null, this.context.t("Please fill in the information."))
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
            <ProfileScreen 
            {...this.props} 
            {...this.state} 
            handleCountryNumberChange={this._handleCountryNumberChange}
            handleShowCountryNumber={this._handleShowCountryNumber}
            openShowCountryNumber={this._openShowCountryNumber}
            closeShowCountryNumber={this._closeShowCountryNumber}
            submit={this._submit}
            handleFirstNameChange={this._handleFirstNameChange}
            handleLastNameChange={this._handleLastNameChange}
            handleMobileChange={this._handleMobileChange}
            handleQChange={this._handleQChange}
            />
        )
    }
}

export default Container;