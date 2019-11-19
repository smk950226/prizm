import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Profile from './presenter';
import { COUNTRY_CODE } from '../../utils/country';

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
            name: profile ? profile.name : "",
            countryNumber: profile ? profile.country_number : "",
            mobile: profile ? profile.mobile : "",
            birth: profile ? profile.birth : "",
            instagram: profile ? profile.instagram_account :"",
            birthForm: profile ? true : false,
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
        else if(name === 'birth'){
            let numberReg = /^[0-9]*$/;
            if(numberReg.test(value)){
                let reg = /^(?:[0-9]{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[1,2][0-9]|3[0,1]))$/;
                if(reg.test(value)){
                    this.setState({
                        [name]: value,
                        birthForm: true,
                        edited: true
                    });
                }
                else{
                    this.setState({
                        [name]: value,
                        birthForm: false,
                        edited: true
                    });
                }
            }
        }
        else if(name === 'instagram'){
            this.setState({
                [name]: value.replace(/^@+/, ''),
                edited: true
            });
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
        const { isSubmitting, name, countryNumber, mobile, birth, instagram, birthForm, edited } = this.state;
        const { adminEditProfile, getProfile } = this.props;
        if(!isSubmitting){
            if(edited){
                if(name && countryNumber && mobile && birth && instagram){
                    if(birthForm){
                        this.setState({
                            isSubmitting: true
                        })
                        const result = await adminEditProfile(name, countryNumber, mobile, birth, instagram)
                        if(result.status === 'ok'){
                            await getProfile()
                            this.setState({
                                isSubmitting: false
                            })
                            alert(this.context.t("회원 정보를 수정하였습니다."))
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
                            alert(this.context.t("오류가 발생하였습니다."))
                        }
                    }
                    else{
                        alert(this.context.t("올바른 생년월일을 입력해주세요."))
                    }
                }
                else{
                    alert(this.context.t("정보를 입력해주세요."))
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
            <Profile 
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