import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AdminSignIn from './presenter';

class Container extends Component{
    static propTypes = {
        isLoggedIn: PropTypes.bool.isRequired,
        login: PropTypes.func.isRequired,
        getProfileByToken: PropTypes.func.isRequired,
        getSaveToken: PropTypes.func.isRequired,
        goHome: PropTypes.func.isRequired,
        goReservation: PropTypes.func.isRequired,
        goSignUp: PropTypes.func.isRequired,
        checkPhotographer: PropTypes.func.isRequired,
        getPhotographerByToken: PropTypes.func.isRequired,
        checkMessageByToken: PropTypes.func.isRequired,
        photographer: PropTypes.object,
        profile: PropTypes.object,
        goFindPassword: PropTypes.func.isRequired
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
            fetchedPhotographer: false,
            fetchedProfile: false,
            fetchClear: false
        }
    }

    componentDidMount = () => {
        window.scrollTo(0,0)
        if(this.props.isLoggedIn){
            this.props.goReservation()
        }
    }

    static getDerivedStateFromProps(nextProps, prevState){
        const { fetchedProfile, fetchedPhotographer } = prevState;
        if((!fetchedProfile) || (!fetchedPhotographer)){
            let update = {}
            if(nextProps.profile){
                update.fetchedProfile = true
            }
            if(nextProps.photographer){
                update.fetchedPhotographer = true
            }

            return update
        }
        else{
            return null
        }
    }

    componentDidUpdate = async() => {
        if(this.state.fetchedProfile && this.state.fetchedPhotographer && !this.state.fetchClear){
            this.setState({
                fetchClear: true,
                isSubmitting: false
            })
            await this.props.getSaveToken(this.state.token)
            this.props.goReservation()
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
        const { isSubmitting, email,  password, emailForm } = this.state;
        const { login, getProfileByToken, getSaveToken, goReservation, checkPhotographer, getPhotographerByToken, checkMessageByToken } = this.props;
        if(!isSubmitting){
            if(email && password){
                if(emailForm){
                    this.setState({
                        isSubmitting: true
                    })
                    const result = await login(email, password)
                    if(result.token){
                        const check = await checkPhotographer(result.token)
                        if(check.status === 'ok'){
                            await this.setState({
                                token: result.token
                            })
                            await getProfileByToken(result.token)
                            await getPhotographerByToken(result.token)
                            await checkMessageByToken(result.token)
                        }
                        else if(check.error){
                            this.setState({
                                isSubmitting: false
                            })
                            alert(this.context.t("This is not a valid photographer account."))
                        }
                        else{
                            this.setState({
                                isSubmitting: false
                            })
                            alert(this.context.t("Please check your email and password again."))
                        }
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
            <AdminSignIn 
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