import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import Home from '../Home';
import Welcome from '../Welcome';
import Navigation from '../Navigation';
import BottomNavigation from '../BottomNavigation';
import SignUp from '../SignUp';
import SignIn from '../SignIn';
import MySchedule from '../MySchedule';
import MyScheduleDetail from '../MyScheduleDetail';
import PhotographerDetail from '../PhotographerDetail';
import ProfileMenu from '../ProfileMenu';
import Profile from '../Profile';
import ProfilePassword from '../ProfilePassword';
import MessageList from '../MessageList';
import MessageDetail from '../MessageDetail';
import MyPhotos from '../MyPhotos';
import MyPhotoDetail from '../MyPhotoDetail';
import PaymentDetail from '../PaymentDetail';
import PaymentSuccess from '../PaymentSuccess';
import Terms from '../Terms';
import NotFound from '../NotFound';
import ReviewList from '../ReviewList';
import ReviewCreate from '../ReviewCreate';
import ReviewCreateComplete from '../ReviewCreateComplete';
import CustomRequest from '../CustomRequest';
import CustomRequestCreate from '../CustomRequestCreate';
import RequestOrderList from '../RequestOrderList';
import RequestOrderDetail from '../RequestOrderDetail';

import AdminHome from '../AdminHome';
import AdminNavigation from '../AdminNavigation';
import AdminSignUp from '../AdminSignUp';
import AdminSignIn from '../AdminSignIn';
import AdminOrderList from '../AdminOrderList';
import AdminMenu from '../AdminMenu';
import AdminTouristPhoto from '../AdminTouristPhoto';
import AdminStudioSetting from '../AdminStudioSetting';
import AdminStudioSettingClear from '../AdminStudioSettingClear';
import AdminProfileSetting from '../AdminProfileSetting';
import AdminProfilePassword from '../AdminProfilePassword';
import AdminAccountSetting from '../AdminAccountSetting';
import AdminBottomNavigation from '../AdminBottomNavigation';
import AdminMessageList from '../AdminMessageList';
import AdminMessageDetail from '../AdminMessageDetail';
import AdminSettings from '../AdminSettings';

import styles from '../../style/styles.module.scss';
import Loader from 'react-loader-spinner';
import Modal from 'react-modal';

Modal.setAppElement('#root')

const App = (props) => {
    if(props.admin){
        return(
            <AdminRouteContainer initAdmin={props.initAdmin} profile={props.profile} isLoggedIn={props.isLoggedIn} showBtmNav={props.showBtmNav} photographer={props.photographer} newMessage={props.newMessage} goHome={props.goHome} />
        )
    }
    else{
        return(
            <GeneralRouteContainer initApp={props.initApp} profile={props.profile} isLoggedIn={props.isLoggedIn} showBtmNav={props.showBtmNav} notification={props.notification} newMessage={props.newMessage} goHome={props.goHome} />
        )
    }
}

export default App; 

App.propTypes = {
    showBtmNav: PropTypes.bool.isRequired,
    initApp: PropTypes.func.isRequired,
    profile: PropTypes.object,
    isLoggedIn: PropTypes.bool.isRequired,
    notification: PropTypes.array,
    admin: PropTypes.bool.isRequired,
    initAdmin: PropTypes.func.isRequired,
    photographer: PropTypes.any,
    newMessage: PropTypes.bool,
    goHome: PropTypes.func.isRequired
}

class GeneralRouteContainer extends Component{
    static propTypes = {
        initApp: PropTypes.func.isRequired,
        profile: PropTypes.object,
        isLoggedIn: PropTypes.bool.isRequired,
        showBtmNav: PropTypes.bool.isRequired,
        notification: PropTypes.array,
        newMessage: PropTypes.bool,
        goHome: PropTypes.func.isRequired
    }

    state = {
        loading: true,
        fetchedProfile: false,
        fetchedNotification: false,
        fetchedNewMessage: false,
        fetchClear: false
    }

    componentDidMount = async() => {
        const { isLoggedIn, initApp, profile } = this.props;
        if(isLoggedIn){
            await initApp()
        }
        else{
            this.setState({
                loading: false
            })
        }
    }

    static getDerivedStateFromProps(nextProps, prevState){
        const { fetchedProfile, fetchedNotification, fetchedNewMessage } = prevState;
        if((!fetchedProfile) || (!fetchedNotification) || (!fetchedNewMessage)){
            let update = {}
            if(nextProps.profile){
                update.fetchedProfile = true
            }
            if(nextProps.notification){
                update.fetchedNotification = true
            }
            if((nextProps.newMessage) || (nextProps.newMessage === false)){
                update.fetchedNewMessage = true
            }

            return update
        }
        else{
            return null
        }
    }

    componentDidUpdate = () => {
        if(this.state.fetchedProfile && this.state.fetchedNotification && this.state.fetchedNewMessage && !this.state.fetchClear){
            this.setState({
                loading: false,
                fetchClear: true,
            })
        }
    }

    render(){
        const { loading } = this.state;
        const { showBtmNav, goHome } = this.props;
        if(loading){
            return(
                <div className={`${styles.widthFull} ${styles.heightFull} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter}`}>
                    <Loader type="Oval" color="#d66c8b" height={20} width={20} />
                </div>
            )
        }
        else{
            return(
                <div className={`${styles.widthFull} ${styles.minHeightFull}`}>
                    <Navigation />
                    <GeneralRoute goHome={goHome} />
                    <BottomNavigation showBtmNav={showBtmNav} />
                </div>
            )
        }
    }
}

class AdminRouteContainer extends Component{
    static propTypes = {
        initAdmin :PropTypes.func.isRequired,
        profile: PropTypes.object,
        isLoggedIn: PropTypes.bool.isRequired,
        photographer: PropTypes.object,
        showBtmNav: PropTypes.bool.isRequired,
        newMessage: PropTypes.bool,
        goHome: PropTypes.func.isRequired
    }

    state = {
        loading: true,
        fetchedProfile: false,
        fetchedPhotographer: false,
        fetchedNewMessage: false,
        fetchClear: false,
        showMobile: false,
        showLocationModal: false,
        showOptionModal: false,
        hideBtmNav: false
    }

    componentDidMount = async() => {
        const { isLoggedIn, initAdmin } = this.props;
        if(isLoggedIn){
            await initAdmin()
        }
        else{
            this.setState({
                loading: false
            })
        }
    }

    static getDerivedStateFromProps(nextProps, prevState){
        const { fetchedProfile, fetchedPhotographer, fetchedNewMessage } = prevState;
        if((!fetchedProfile) || (!fetchedPhotographer) || (!fetchedNewMessage)){
            let update = {}
            if(nextProps.profile){
                update.fetchedProfile = true
            }
            if(nextProps.photographer || (nextProps.photographer === false)){
                update.fetchedPhotographer = true
            }
            if((nextProps.newMessage) || (nextProps.newMessage === false)){
                update.fetchedNewMessage = true
            }

            return update
        }
        else{
            return null
        }
    }

    componentDidUpdate = () => {
        if(this.state.fetchedProfile && this.state.fetchedPhotographer && this.state.fetchedNewMessage && !this.state.fetchClear){
            this.setState({
                loading: false,
                fetchClear: true,
            })
        }
    }

    _openMobile = () => {
        this.setState({
            showMobile: true
        })
    }

    _closeMobile = () => {
        this.setState({
            showMobile: false
        })
    }

    _openLocationModal = () => {
        this.setState({
            hideBtmNav: true,
            showLocationModal: true
        })
    }

    _closeLocationModal = () => {
        this.setState({
            hideBtmNav: false,
            showLocationModal: false
        })
    }

    _openOptionModal = () => {
        this.setState({
            showOptionModal: true
        })
    }

    _closeOptionModal = () => {
        this.setState({
            showOptionModal: false
        })
    }

    _displayBtmNav = () => {
        this.setState({
            hideBtmNav: false
        })
    }

    _hideBtmNav = () => {
        this.setState({
            hideBtmNav: true
        })
    }

    render(){
        const { loading, showMobile, showLocationModal, showOptionModal, hideBtmNav } = this.state;
        const { showBtmNav, goHome } = this.props;
        if(loading){
            return(
                <div className={`${styles.widthFull} ${styles.heightFull} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter}`}>
                    <Loader type="Oval" color="#d66c8b" height={20} width={20} />
                </div>
            )
        }
        else{
            return(
                <div className={`${styles.widthFull} ${styles.minHeightFull}`}>
                    <AdminNavigation showMobile={showMobile} openMobile={this._openMobile} showLocationModal={showLocationModal} showOptionModal={showOptionModal} />
                    <AdminRoute goHome={goHome} displayBtmNav={this._displayBtmNav} hideBtmNav={this._hideBtmNav} showMobile={showMobile} openMobile={this._openMobile} closeMobile={this._closeMobile} showLocationModal={showLocationModal} openLocationModal={this._openLocationModal} closeLocationModal={this._closeLocationModal} showOptionModal={showOptionModal} openOptionModal={this._openOptionModal} closeOptionModal={this._closeOptionModal} />
                    {!hideBtmNav && (
                        <AdminBottomNavigation showBtmNav={showBtmNav} />
                    )}
                </div>
            )
        }
    }
}

const GeneralRoute = props => (
    <Switch>
        <Route exact path='/' component={Home} key={1} />
        <Route exact path='/welcome/' component={Welcome} key={2} />
        <Route exact path='/signup/' component={SignUp} key={3} />
        <Route exact path='/signin/' component={SignIn} key={4} />
        <Route exact path='/my/schedule/' component={MySchedule} key={6} />
        <Route exact path='/my/schedule/:orderId' component={MyScheduleDetail} key={7} />
        <Route exact path='/menu/profile/' component={ProfileMenu} key={8} />
        <Route exact path='/profile/' component={Profile} key={9} />
        <Route exact path='/profile/password/' component={ProfilePassword} key={10} />
        <Route exact path='/message/' component={MessageList} key={11} />
        <Route exact path='/message/detail/:chatId/' component={MessageDetail} key={12} />
        <Route exact path='/my/photos/' component={MyPhotos} key={13} />
        <Route exact path='/my/photo/:orderId/' component={MyPhotoDetail} key={14} />
        <Route exact path='/payment/' component={PaymentDetail} key={15} />
        <Route exact path='/payment/success/' component={PaymentSuccess} key={16} />
        <Route exact path='/terms/:name/' component={Terms} key={17} />
        <Route exact path='/review/list/' component={ReviewList} key={18} />
        <Route exact path='/review/create/' component={ReviewCreate} key={19} />
        <Route exact path='/review/complete/' component={ReviewCreateComplete} key={20} />
        <Route exact path='/custom/request/' component={CustomRequest} key={21} />
        <Route exact path='/custom/request/create/' component={CustomRequestCreate} key={22} />
        <Route exact path='/custom/request/order/list/' component={RequestOrderList} key={23} />
        <Route exact path='/custom/request/order/detail/' component={RequestOrderDetail} key={23} />
        <Route exact path='/:photographerId/' component={PhotographerDetail} key={100} />
        <Route render={(props) => <NotFound {...props} goHome={props.goHome} />} key={101} />
    </Switch>
)

const AdminRoute = props => (
    <Switch>
        <Route exact path='/' component={AdminHome} key={1} />
        <Route exact path='/signup/' component={AdminSignUp} key={2} />
        <Route exact path='/signin/' component={AdminSignIn} key={3} />
        <Route exact path='/reservation/' component={AdminOrderList} key={4} />
        <Route exact path='/menu/' component={AdminMenu} key={5} />
        <Route exact path='/tourist/photo/' component={AdminTouristPhoto} key={6} />
        <Route exact path='/studio/edit/' render={() => <AdminStudioSetting {...props} />} key={7} />
        <Route exact path='/studio/edit/complete/' component={AdminStudioSettingClear} key={8} />
        <Route exact path='/profile/' component={AdminProfileSetting} key={9} />
        <Route exact path='/profile/password/' component={AdminProfilePassword} key={10} />
        <Route exact path='/terms/:name/' component={Terms} key={11} />
        <Route exact path='/profile/account/' component={AdminAccountSetting} key={12} />
        <Route exact path='/message/' component={AdminMessageList} key={13} />
        <Route exact path='/message/detail/:chatId/' component={AdminMessageDetail} key={14} />
        <Route exact path='/my/settings/' component={AdminSettings} key={15} />
        <Route render={(props) => <NotFound {...props} goHome={props.goHome} />} key={101} />
    </Switch>
)