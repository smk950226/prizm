import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PaymentDetail from './presenter';

class Container extends Component{

    static propTypes = {
        goHome: PropTypes.func.isRequired,
        isLoggedIn: PropTypes.bool.isRequired,
        profile: PropTypes.object.isRequired,
        createDeposit: PropTypes.func.isRequired,
        paymentExpire: PropTypes.func.isRequired,
        refresh: PropTypes.func.isRequired,
        goPaymentSuccess: PropTypes.func.isRequired
    }

    static contextTypes = {
        t: PropTypes.func
    }

    constructor(props){
        super(props)
        this.state = {
            order: props.location.state ? props.location.state.order ? props.location.state.order : null : null,
            name: "",
            isSubmitting: false,
            isDeposit: false
        }
    }

    componentDidMount = async() => {
        const { isLoggedIn, goHome, profile, paymentExpire, refresh } = this.props;
        const { order } = this.state;
        if(isLoggedIn){
            if(order){
                if(order.status !== 'confirmed'){
                    goHome()
                }
                else{
                    if(profile.id === order.user.id){
                        const deadline =  new Date(new Date(order.confirmed_at).getTime() + 1000*60*60*24*3);
                        const now = new Date()
                        if(now > deadline){
                            await paymentExpire(order.id)
                            await refresh()
                            alert(this.context.t("결제 기한이 만료되었습니다."))
                            goHome()
                        }
                        else{
                            if(profile.country_number === '82' || profile.country_code === 'KR'){
                                this.setState({
                                    isDeposit: true
                                })
                            }
                            else{
                                this.setState({
                                    isDeposit: false
                                })
                            }
                        }
                    }
                    else{
                        alert(this.context.t("요청자와 로그인한 유저가 일치하지 않습니다."))
                        goHome()
                    }
                }
            }
            else{
                goHome()
            }
        } 
        else{
            goHome()
        }
    }

    _handleInputChange = (event) => {
        const { target : { value, name } } = event;
        this.setState({
            [name]: value,
            edited: true
        });
    }

    _payDeposit = async(price) => {
        const { name, isSubmitting, order, isDeposit } = this.state;
        const { createDeposit, profile, paymentExpire, goHome, refresh, goPaymentSuccess } = this.props;
        if(!isSubmitting){
            if(order.status === 'confirmed'){
                if(name){
                    if(order.user.id === profile.id){
                        if(profile.country_number === '82' || profile.country_code === 'KR'){
                            this.setState({
                                isSubmitting: true
                            })
                            const deadline =  new Date(new Date(order.confirmed_at).getTime() + 1000*60*60*24*3);
                            const now = new Date()
                            if(now > deadline){
                                await paymentExpire(order.id)
                                await refresh()
                                this.setState({
                                    isSubmitting: false
                                })
                                alert(this.context.t("결제 기한이 만료되었습니다."))
                                goHome()
                            }
                            else{
                                this.setState({
                                    isSubmitting: true
                                })
                                const result = await createDeposit(name, price, order.id)
                                if(result.status === 'ok'){
                                    this.setState({
                                        isSubmitting: false
                                    })
                                    goPaymentSuccess(isDeposit)
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
                        }
                        else{
                            alert(this.context.t("한국 사용자만 입금 가능합니다."))
                        }
                    }
                    else{
                        alert(this.context.t("요청자와 로그인한 유저가 일치하지 않습니다."))
                    }
                }
                else{
                    alert(this.context.t("이름을 입력해주세요."))
                }
            }
            else{
                alert(this.context.t("잘못된 요청입니다."))
            }
        }
    }

    render(){
        return(
            <PaymentDetail 
            {...this.props}
            {...this.state}
            handleInputChange={this._handleInputChange}
            payDeposit={this._payDeposit}
            />
        )
    }
}

export default Container;