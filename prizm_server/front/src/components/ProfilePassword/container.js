import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProfilePassword from './presenter';

class Container extends Component{
    static propTypes = {
        isLoggedIn: PropTypes.bool.isRequired,
        goHome: PropTypes.func.isRequired,
        editPassword: PropTypes.func.isRequired,
        getProfile: PropTypes.func.isRequired,
        goProfile: PropTypes.func.isRequired
    }

    static contextTypes = {
        t: PropTypes.func
    }

    constructor(props){
        super(props)
        this.state = {
            password: "",
            password2: "",
            currentPassword: "",
            passwordForm:false,
            password2Form:false,
            isSubmitting: false,
        }
    }

    componentDidMount = () => {
        if(!this.props.isLoggedIn){
            this.props.goHome()
        }
    }

    _handleInputChange = (event) => {
        const { target : { value, name } } = event;
        if(name === 'password'){
            let reg = /^(?=.*?[A-Za-z])(?=.*?[0-9]).{2,}$/ ;
            if(reg.test(value)){
                if(value.length >= 8){
                    if(this.state.password2){
                        if(this.state.password2 === value){
                            this.setState({
                                [name]: value,
                                passwordForm: true,
                                password2Form: true
                            });
                        }
                        else{
                            this.setState({
                                [name]: value,
                                passwordForm: true,
                                password2Form: false
                            });
                        }
                    }
                    else{
                        this.setState({
                            [name]: value,
                            passwordForm: true,
                            password2Form: false
                        });
                    }
                }
                else{
                    if(this.state.password2){
                        if(this.state.password2 === value){
                            this.setState({
                                [name]: value,
                                passwordForm: false,
                                password2Form: true
                            });
                        }
                        else{
                            this.setState({
                                [name]: value,
                                passwordForm: false,
                                password2Form: false
                            });
                        }
                    }
                    else{
                        this.setState({
                            [name]: value,
                            passwordForm: false,
                            password2Form: false
                        });
                    }
                }
            }
            else{
                if(this.state.password2){
                    if(this.state.password2 === value){
                        this.setState({
                            [name]: value,
                            passwordForm: false,
                            password2Form: true
                        });
                    }
                    else{
                        this.setState({
                            [name]: value,
                            passwordForm: false,
                            password2Form: false
                        });
                    }
                }
                else{
                    this.setState({
                        [name]: value,
                        passwordForm: false,
                        password2Form: false
                    });
                }
            }
        }
        else if(name === 'password2'){
            if(this.state.password){
                if(this.state.password === value){
                    this.setState({
                        [name]: value,
                        password2Form: true
                    });
                }
                else{
                    this.setState({
                        [name]: value,
                        password2Form: false
                    });
                }
            }
            else{
                this.setState({
                    [name]: value,
                    password2Form: false
                });
            }
        }
        else{
            this.setState({
                [name]: value
            });
        }
    }

    _submit = async() => {
        const { isSubmitting, password, password2, currentPassword, passwordForm, password2Form } = this.state;
        const { editPassword, getProfile } = this.props;
        if(!isSubmitting){
            if(password && password2 && currentPassword){
                if(passwordForm){
                    if(password === password2){
                        if(password2Form){
                            this.setState({
                                isSubmitting: true
                            })
                            const result = await editPassword(currentPassword, password)
                            if(result.status === 'ok'){
                                await getProfile()
                                this.setState({
                                    isSubmitting: false,
                                    currentPassword: "",
                                    password: "",
                                    password2: "",
                                    passwordForm: false,
                                    password2Form: false
                                })
                                alert(this.context.t("비밀번호를 수정하였습니다."))
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
                            alert(this.context.t("비밀번호가 일치하지 않습니다."))
                        }
                    }
                    else{
                        alert(this.context.t("비밀번호가 일치하지 않습니다."))
                    }
                }
                else{
                    alert(this.context.t("비밀번호는 최소 8자, 영문자와 숫자를 각 1개 이상 포함해야 합니다."))
                }
            }
            else{
                alert(this.context.t("정보를 입력해주세요."))
            }
        }
    }

    render(){
        return(
            <ProfilePassword 
            {...this.props} 
            {...this.state} 
            handleInputChange={this._handleInputChange}
            submit={this._submit}
            />
        )
    }
}

export default Container;