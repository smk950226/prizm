import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PaymentDetail from './presenter';
import { FETCH_URL } from '../../config/urls';

class Container extends Component{

    static propTypes = {
        goHome: PropTypes.func.isRequired,
        isLoggedIn: PropTypes.bool.isRequired,
        profile: PropTypes.object.isRequired,
        createDeposit: PropTypes.func.isRequired,
        paymentExpire: PropTypes.func.isRequired,
        refresh: PropTypes.func.isRequired,
        goPaymentSuccess: PropTypes.func.isRequired,
        getPrice: PropTypes.func.isRequired,
        price: PropTypes.number,
        checkPrice: PropTypes.func.isRequired,
        pay: PropTypes.func.isRequired,
        getExchangeRate: PropTypes.func.isRequired
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
            isDeposit: false,
            price: null,
            fetchedPrice: false,
            fetchClear: false,
            loading: true,
            exchangeRate: 1250
        }
    }

    componentDidMount = async() => {
        const { isLoggedIn, goHome, profile, paymentExpire, refresh, getPrice, goPaymentSuccess } = this.props;
        const { order } = this.state;
        if(isLoggedIn){
            if(order){
                if(order.status === 'waiting_payment'){
                    goPaymentSuccess(true, order.deposit.price, new Date(order.deposit.created_at))
                }
                else if(order.status !== 'confirmed'){
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
                            await getPrice(order.option.price +  Math.ceil(order.option.price*0.1))
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

    static getDerivedStateFromProps(nextProps, prevState){
        const { fetchedPrice } = prevState;
        if((!fetchedPrice)){
            let update = {}
            if(nextProps.price){
                update.fetchedPrice = true
            }

            return update
        }
        else{
            return null
        }
    }

    componentDidUpdate = async() => {
        if(this.state.fetchedPrice && !this.state.fetchClear){
            const { getExchangeRate, profile, getPrice } = this.props;
            const { order, exchangeRate } = this.state;
            if(profile.country_number === '82' || profile.country_code === 'KR'){
                const result = await getExchangeRate('KR')
                if(result.status === 'ok'){
                    await getPrice((order.option.price +  Math.ceil(order.option.price*0.1))*Number(result.data.rate))
                    this.setState({
                        loading: false,
                        fetchClear: true,
                        exchangeRate: Number(result.data.rate)
                    })
                }
                else{
                    await getPrice((order.option.price +  Math.ceil(order.option.price*0.1))*exchangeRate)
                    this.setState({
                        loading: false,
                        fetchClear: true,
                    })
                }
            }
            else{
                this.setState({
                    loading: false,
                    fetchClear: true,
                })
            }
        }
    }

    _handleInputChange = (event) => {
        const { target : { value, name } } = event;
        this.setState({
            [name]: value,
            edited: true
        });
    }

    _payDeposit = async(amount) => {
        const { name, isSubmitting, order, isDeposit } = this.state;
        const { createDeposit, profile, paymentExpire, goHome, refresh, goPaymentSuccess, getPrice, price, checkPrice } = this.props;
        if(!isSubmitting){
            if(order.status === 'confirmed'){
                if(price === amount){
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
                                    const check = await checkPrice(order.id, price)
                                    if(check.status === 'ok'){
                                        const result = await createDeposit(name, price, order.id)
                                        if(result.status === 'ok'){
                                            this.setState({
                                                isSubmitting: false
                                            })
                                            await getPrice(null)
                                            await refresh()
                                            const now = new Date().getTime()
                                            goPaymentSuccess(isDeposit, price, now)
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
                                        alert(this.context.t("가격이 올바르지 않습니다."))
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
                    goHome()
                }
            }
            else{
                alert(this.context.t("잘못된 요청입니다."))
                goHome()
            }
        }
    }

    _updateMeta = async(meta) => {
        const { pay, getPrice, goPaymentSuccess, price } = this.props;
        const { order, isDeposit } = this.state;
        this.setState({
            isSubmitting: true
        })
        const result = await pay(meta, order.id);
        if(result.status === 'ok'){
            await getPrice(null)
            this.setState({
                isSubmitting: false
            })
            const now = new Date().getTime()
            goPaymentSuccess(isDeposit, price, now)

        }
        else{
            this.setState({
                isSubmitting: false
            })
            alert('오류가 발생하였습니다.\n 고객센터에 반드시 문의해주세요.')
        }
    }

    _payPaypal = async(amount) => {
        const { isSubmitting, order } = this.state;
        const { profile, paymentExpire, goHome, refresh, price, checkPrice } = this.props;
        const successFunc = this._updateMeta;
        if(!isSubmitting){
            if(order.status === 'confirmed'){
                if(price === amount){
                    if(order.user.id === profile.id){
                        if(profile.country_number === '82' || profile.country_code === 'KR'){
                            alert(this.context.t("한국 사용자는 사용하실 수 없습니다."))
                        }
                        else{
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
                                const check = await checkPrice(order.id, price)
                                if(check.status === 'ok'){
                                    const merchant_uid = check.merchant_uid.merchant_uid
                                    const IMP = window.IMP;
                                    IMP.init('imp03236970');
                                    IMP.request_pay({
                                        pg : 'paypal',
                                        pay_method : 'card',
                                        merchant_uid : merchant_uid,
                                        name : `PRIZM order to ${order.photographer.nickname}`,
                                        amount : price,
                                        buyer_email : profile.email,
                                        buyer_name : profile.name,
                                        buyer_tel : `+${profile.country_number} ${profile.mobile}`,
                                        m_redirect_url: `${FETCH_URL}/payment/success/`
                                    }, async(rsp) => {
                                        if ( rsp.success ) {
                                            await refresh()
                                            this.setState({
                                                isSubmitting: false
                                            })
                                            successFunc(rsp)
                                        } else {
                                            alert('결제에 실패하였습니다.')
                                        }
                                    });
                                }
                                else{
                                    alert(this.context.t("가격이 올바르지 않습니다."))
                                }
                            }
                            
                        }
                    }
                    else{
                        alert(this.context.t("요청자와 로그인한 유저가 일치하지 않습니다."))
                    }
                }
                else{
                    alert(this.context.t("잘못된 요청입니다."))
                    goHome()
                }
            }
            else{
                alert(this.context.t("잘못된 요청입니다."))
                goHome()
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
            payPaypal={this._payPaypal}
            />
        )
    }
}

export default Container;