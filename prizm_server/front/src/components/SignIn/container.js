import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SignIn from './presenter';

class Container extends Component{
    static propTypes = {
        isLoggedIn: PropTypes.bool.isRequired,
        login: PropTypes.func.isRequired,
        getProfileByToken: PropTypes.func.isRequired,
        getSaveToken: PropTypes.func.isRequired,
        goHome: PropTypes.func.isRequired,
        goSignUp: PropTypes.func.isRequired,
        goDetail: PropTypes.func.isRequired,
        getNotificationByToken: PropTypes.func.isRequired,
        getOrderListByToken: PropTypes.func.isRequired,
        checkMessageByToken: PropTypes.func.isRequired,
        profile: PropTypes.object
    }

    static contextTypes = {
        t: PropTypes.func
    }

    constructor(props){
        super(props)
        this.state = {
            email: "",
            password: "",
            emailForm: false,
            isSubmitting: false,
            goRequest: props.location.state ? props.location.state.goRequest ? props.location.state.goRequest : false : false,
            photographerId: props.location.state ? props.location.state.photographerId ? props.location.state.photographerId : null : null,
            fetchedProfile: false,
            fetchClear: false
        }
    }

    componentDidMount = () => {
        window.scrollTo(0,0)
        if(this.props.isLoggedIn){
            this.props.goHome()
        }
    }

    static getDerivedStateFromProps(nextProps, prevState){
        const { fetchedProfile } = prevState;
        if(!fetchedProfile){
            let update = {}
            if(nextProps.profile){
                update.fetchedProfile = true
            }

            return update
        }
        else{
            return null
        }
    }

    componentDidUpdate = () => {
        if(this.state.fetchedProfile && !this.state.fetchClear){
            this.setState({
                loading: false,
                fetchClear: true,
                isSubmitting: false
            })
            this.props.getSaveToken(this.state.token)
            if(this.state.goRequest){
                this.props.goDetail(this.state.photographerId)
            }
            else{
                this.props.goHome()
            }
        }
    }

    _handleInputChange = (event) => {
        const { target : { value, name } } = event;
        if(name === 'email'){
            let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ;
            if(reg.test(value) === true){
                this.setState({
                    [name]: value,
                    emailForm: true
                })
            }
            else{
                this.setState({
                    [name]: value,
                    emailForm: false
                })
            }
        }
        else{
            this.setState({
                [name]: value
            });
        }
    }

    _submit = async() => {
        const { isSubmitting, email,  password, emailForm, goRequest, photographerId } = this.state;
        const { login, getProfileByToken, getSaveToken, goHome, goDetail, getNotificationByToken, getOrderListByToken, checkMessageByToken } = this.props;
        if(!isSubmitting){
            if(email && password){
                if(emailForm){
                    this.setState({
                        isSubmitting: true
                    })
                    const result = await login(email, password)
                    if(result.token){
                        await this.setState({
                            token: result.token
                        })
                        await getProfileByToken(result.token)
                        await getNotificationByToken(result.token)
                        await getOrderListByToken(result.token)
                        await checkMessageByToken(result.token)
                    }
                    else{
                        this.setState({
                            isSubmitting: false
                        })
                        alert(this.context.t("Please check your email and password again."))
                    }
                }
                else{
                    alert(this.context.t("Please enter a valid email address."))
                }
            }
            else{
                alert(this.context.t("Please fill in the information."))
            }
        }
    }

    _handleKeyPress = async(event) => {
        const { key } = event;
        if (key === "Enter") {
            event.preventDefault();
            this._submit()
        }
    }

    render(){
        return(
            <SignIn 
            {...this.props} 
            {...this.state} 
            handleInputChange={this._handleInputChange}
            submit={this._submit}
            handleKeyPress={this._handleKeyPress}
            />
        )
    }
}

export default Container;