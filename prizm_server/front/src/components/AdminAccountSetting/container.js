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
                            alert(this.context.t("Account 정보를 수정하였습니다."))
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