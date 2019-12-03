import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AdminProfileSetting from './presenter';

class Container extends Component{
    static propTypes = {
        isLoggedIn: PropTypes.bool.isRequired,
        profile: PropTypes.object,
        goHome: PropTypes.func.isRequired,
        editAccount: PropTypes.func.isRequired,
        getPhotographer: PropTypes.func.isRequired,
        goPasswordChange: PropTypes.func.isRequired
    }

    static contextTypes = {
        t: PropTypes.func
    }

    constructor(props){
        super(props)
        const { photographer : { photographeraccount } } = props;
        this.state = {
            legalName: photographeraccount ? photographeraccount.legal_name : "",
            birth: photographeraccount ? photographeraccount.birth : "",
            accountType: photographeraccount ? photographeraccount.account_type : "paypal_account",
            content: photographeraccount ? photographeraccount.content : "",
            birthForm: photographeraccount ? true : false,
            edited: false,
            editable: false,
            isSubmitting: false
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
        else{
            if((profile.country_code === 'KR') || (profile.country_number === '82')){
                this.setState({
                    accountType: 'bank_account'
                })
            }
        }
    }

    _handleInputChange = (event) => {
        const { target : { value, name } } = event;
        if(name === 'birth'){
            let numberReg = /^[0-9]*$/;
            if(numberReg.test(value)){
                if(value.length === 8){
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
        else if(name === 'number'){
            if(this.state.accountType === 'bank_account'){
                let numberReg = /^[0-9]*$/;
                if(numberReg.test(value)){
                    this.setState({
                        [name]: value,
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
        else if(name === 'content'){
            if(this.state.accountType === 'bank_account'){
                let numberReg = /^[0-9]*$/;
                if(numberReg.test(value)){
                    console.log(5)
                    this.setState({
                        [name]: value,
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
        else{
            this.setState({
                [name]: value,
                edited: true
            });
        }
    }

    _submit = async() => {
        const { isSubmitting, legalName, birth, accountType, content, edited, birthForm } = this.state;
        const { editAccount, getPhotographer } = this.props;
        if(!isSubmitting){
            if(edited){
                if(legalName && birth && accountType && content){
                    if(birthForm){
                        this.setState({
                            isSubmitting: true
                        })
                        const result = await editAccount(legalName, birth, accountType, content)
                        if(result.status === 'ok'){
                            await getPhotographer()
                            this.setState({
                                isSubmitting: false
                            })
                            alert(this.context.t("Your account information has been changed."))
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
                        alert(this.context.t("Please check your date of birth again."))
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
            submit={this._submit}
            enableEdit={this._enableEdit}
            />
        )
    }
}

export default Container;