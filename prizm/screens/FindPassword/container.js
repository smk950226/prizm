import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FindPassword from './presenter';

class Container extends Component{
    static proptTypes = {
        isLoggedIn: PropTypes.bool.isRequired,
        findPassword: PropTypes.func.isRequired,
        goSignin: PropTypes.func.isRequired
    }

    state = {
        email: "",
        emailForm: false,
        isSubmitting: false,
        finded: false,
    }

    _handleInputChange = async(event) => {
        const { target : { value, name } } = event;
        this.setState({
            [name]: value
        });
        if(name === 'email'){
            let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ;
            if(reg.test(value) === true){
                await this.setState({
                    emailForm: true
                })
            }
            else{
                await this.setState({
                    emailForm: false
                })
            }
        }
    };

    _handleKeyPress = async(event) => {
        const { key } = event;
        const { email, emailForm } = this.state;
        if(email){
            if (key === "Enter") {
                event.preventDefault();
                if(emailForm){
                    this.setState({
                        isSubmitting: true
                    })
                    const { findPassword } = this.props;
                    const check = await findPassword(email);
                    if(check.email){
                        this.setState({
                            finded: check.email,
                            isSubmitting: false
                        })
                    }
                    else if(check.error){
                        this.setState({
                            finded: "",
                            isSubmitting: false
                        })
                        alert(check.error)
                    }
                    else{
                        this.setState({
                            finded: "",
                            isSubmitting: false
                        })
                        alert("An error has occurred..")
                    }
                }
                else{
                    alert('올바른 형식을 입력해주세요.')
                }
            }
        }
    }

    _handleFindPassword = async(event) => {
        event.preventDefault();
        const { email, emailForm } = this.state;
        if(email){
            if(emailForm){
                this.setState({
                    isSubmitting: true
                })
                const { findPassword } = this.props;
                const check = await findPassword(email);
                if(check.email){
                    this.setState({
                        finded: check.email,
                        isSubmitting: false
                    })
                }
                else if(check.error){
                    this.setState({
                        finded: "",
                        isSubmitting: false
                    })
                    alert(check.error)
                }
                else{
                    this.setState({
                        finded: "",
                        isSubmitting: false
                    })
                    alert("An error has occurred..")
                }
            }
            else{
                alert('올바른 형식을 입력해주세요.')
            }
        }
        else{
            alert('회원 정보를 입력해주세요.')
        }
    }

    render(){
        return(
            <FindPassword {...this.props} {...this.state} handleInputChange={this._handleInputChange} handleKeyPress={this._handleKeyPress} handleFindPassword={this._handleFindPassword} />
        )
    }
}

export default Container;