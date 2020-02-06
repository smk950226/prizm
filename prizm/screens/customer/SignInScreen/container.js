import React, { Component } from 'react';
import { Alert } from 'react-native';
import PropTypes from 'prop-types';
import SignInScreen from './presenter';

class Container extends Component{
    static propTypes = {
        isLoggedIn: PropTypes.bool.isRequired,
        login: PropTypes.func.isRequired,
        getProfileByToken: PropTypes.func.isRequired,
        getSaveToken: PropTypes.func.isRequired,
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
        const goRequest = props.navigation.getParam('goRequest', null)
        const photographerId = props.navigation.getParam('photographerId', null)
        this.state = {
            email: "",
            password: "",
            emailForm: false,
            isSubmitting: false,
            goRequest: goRequest ? goRequest : false,
            photographerId: photographerId ? photographerId : null,
            fetchedProfile: false,
            fetchClear: false
        }
    }

    componentDidMount = () => {
        if(this.props.isLoggedIn){
            this.props.navigation.navigate('Home')
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

    componentDidUpdate = (prevProps, prevState) => {
        if(this.state.fetchedProfile && !this.state.fetchClear){
            this.setState({
                loading: false,
                fetchClear: true,
                isSubmitting: false
            })
            this.props.getSaveToken(this.state.token)
            if(this.state.goRequest){
                this.props.navigation.navigate('PhotographerDetail', { photographerId: this.state.photographerId })
            }
        }
        if(prevProps !== this.props){
            const goRequest = this.props.navigation.getParam('goRequest', null)
            const photographerId = this.props.navigation.getParam('photographerId', null)
            this.setState({
                goRequest: goRequest ? goRequest : false,
                photographerId: photographerId ? photographerId : null
            })
        }
        if(!prevProps.isLoggedIn && this.props.isLoggedIn){
            this.props.navigation.navigate('Home')
        }
    }

    _handleEmailChange = (email) => {
        let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ;
        if(reg.test(email)){
            this.setState({
                email,
                emailForm: true
            })
        }
        else{
            this.setState({
                email,
                emailForm: false
            })
        }
    }
    
    _handlePasswordChange = (password) => {
        this.setState({
            password
        })
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
                        this.props.navigation.navigate('Home')
                    }
                    else{
                        this.setState({
                            isSubmitting: false
                        })
                        Alert.alert(null, this.context.t("Please check your email and password again."))
                    }
                }
                else{
                    Alert.alert(null, this.context.t("Please enter a valid email address."))
                }
            }
            else{
                Alert.alert(null, this.context.t("Please fill in the information."))
            }
        }
    }

    render(){
        return(
            <SignInScreen
            {...this.props} 
            {...this.state} 
            submit={this._submit}
            handleEmailChange={this._handleEmailChange}
            handlePasswordChange={this._handlePasswordChange}
            />
        )
    }
}

export default Container;