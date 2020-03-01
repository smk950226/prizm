import React, { Component } from 'react';
import PropTypes from 'prop-types';
import App from './presenter';
import styles from '../../style/styles.module.scss';
import Loader from 'react-loader-spinner';
import MyLoader from '../Loader';

class Container extends Component{
    static propTypes = {
        profile: PropTypes.object,
        initApp: PropTypes.func.isRequired,
        isLoggedIn: PropTypes.bool.isRequired,
        notification: PropTypes.array,
        initAdmin: PropTypes.func.isRequired,
        photographer: PropTypes.any,
        newMessage: PropTypes.bool,
        goHome: PropTypes.func.isRequired,
        logout: PropTypes.func.isRequired,
        getProfile: PropTypes.func.isRequired,
        lang: PropTypes.string
    }

    state = {
        lastScrollTop: 0,
        delta: 30,
        showBtmNav: true,
        admin: false,
        loading: true,
        fetchedProfile: false,
        fetchClear: false,
        fetchedLang: false,
        changedLang: false
    }

    componentDidMount = async() => {
        window.addEventListener('scroll', this._handleScroll, false)
        fetch('https://ipapi.co/json/').then((response) => response.json())
        .then(json => {
            this.props.changeLang(json.country_code.toLowerCase())
        })
        .then(() => {
            this.setState({
                changedLang: true
            })
        })
        if((window.location.href.startsWith('http://admin.prizm.cloud/')) || (window.location.href.startsWith('https://admin.prizm.cloud/'))){
            this.setState({
                admin: true
            })
        }
        else if((window.location.href.startsWith('http://prizm.cloud/')) || (window.location.href.startsWith('https://prizm.cloud/'))){
            this.setState({
                admin: false
            })
        }
        const { isLoggedIn, getProfile } = this.props;
        if(isLoggedIn){
            await getProfile()
        }
        else{
            this.setState({
                fetchedProfile: true
            })
        }
    }

    componentWillUnmount(){
        window.removeEventListener('scroll', this._handleScroll, false);
    }

    static getDerivedStateFromProps(nextProps, prevState){
        const { fetchedProfile } = prevState;
        if((!fetchedProfile)){
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
        if(this.state.fetchedProfile && this.state.fetchedLang && !this.state.fetchClear){
            this.setState({
                loading: false,
                fetchClear: true,
            })
        }
        if(prevProps.lang !== this.props.lang){
            this.setState({
                fetchedLang: true
            })
        }
        else if(this.state.changedLang && (this.props.lang === 'en') && !this.state.fetchedLang){
            this.setState({
                fetchedLang: true
            })
        }
        if(prevProps.pathname !== this.props.pathname){
            window.scrollTo(0,0)
        }
    }

    _handleScroll = async() => {
        const { lastScrollTop, delta, showBtmNav } = this.state;
        var st = window.pageYOffset;
        if (Math.abs(lastScrollTop - st) <= delta) return;
        if ((st > lastScrollTop) && (lastScrollTop > 0)) {
            if(showBtmNav){
                this.setState({
                    showBtmNav: false
                })
            }
        }
        else {
            if(!showBtmNav){
                this.setState({
                    showBtmNav: true
                })
            }
        }
        this.setState({
            lastScrollTop: st
        })
    }

    render(){
        const { loading } = this.state;
        if(loading){
            return(
                <div className={`${styles.widthFull} ${styles.heightFull} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter}`}>
                    <MyLoader />
                </div>
            )
        }
        else{
            return(
                <App {...this.props} {...this.state} />
            )
        }
        
    }
}

export default Container; 