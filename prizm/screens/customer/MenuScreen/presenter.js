import React, { Component, Fragment } from 'react';
import { View, Text, TouchableWithoutFeedback, ActivityIndicator, Image, SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';
import styles from '../../../styles';

class MenuScreen extends Component{
    static propTypes = {
        profile: PropTypes.object,
        isLoggedIn: PropTypes.bool.isRequired,
        now: PropTypes.number.isRequired,
        logout: PropTypes.func.isRequired
    }

    static contextTypes = {
        t: PropTypes.func
    }

    _goNotice = () => {
        this.props.navigation.navigate('NoticeRoute')
    }

    _goHome = () => {
        this.props.navigation.navigate('HomeRoute')
    }

    _goCenter = () => {
        this.props.navigation.navigate('CenterRoute')
    }

    _goMyInfo = () => {
        this.props.navigation.navigate('MyInfoRoute')
    }

    _goPreference = () => {
        this.props.navigation.navigate('PreferenceRoute')
    }

    _goAttendance = () => {
        this.props.navigation.navigate('AttendanceRoute')
    }

    render(){
        const { isLoggedIn, profile, now } = this.props;
        return(
            <View style={[styles.container]}>
                <SafeAreaView style={[{ flex: 0 }, styles.bgNavBlue]} />
                <SafeAreaView style={[styles.bgWhite, styles.justifyContentBetween, styles.flex1]}>
                    <View>
                        <View style={[styles.bgNavBlue, styles.px20, styles.py20]}>
                            {isLoggedIn ? profile? (
                                <View>
                                    <Text style={[styles.font20]}>
                                        {((now>=6) && (now<12)) && (
                                            this.context.t("Good morning,")
                                        )}
                                        {((now>=12) && (now<18)) && (
                                            this.context.t("Good afternoon,")
                                        )}
                                        {((now>=18) && (now<22)) && (
                                            this.context.t("Good evening,")
                                        )}
                                        {((now>=22) || (now<6)) && (
                                            this.context.t("Good night,")
                                        )}
                                    </Text>
                                    <Text style={[styles.mt5, styles.font20]}>
                                        {`${profile.first_name} ${profile.last_name}`}
                                    </Text>
                                </View>
                            ) : (
                                <View>
                                    <Text style={[styles.font20]}>
                                        {this.context.t("Welcome to ")}<Text style={[styles.fontBold]}>{this.context.t("PRIZM!")}</Text>
                                    </Text>
                                    <Text style={[styles.mt10, styles.font14]}>
                                        {this.context.t("Sign in to find the coolest photographers in ")}<Text style={[styles.fontBold]}>{this.context.t("Seoul.")}</Text>
                                    </Text>
                                    <Text style={[styles.mt10, styles.font14]}>
                                        {this.context.t("Book your photographer without hassle.")}
                                    </Text>
                                </View>
                            ) : (
                                <View>
                                    <Text style={[styles.font20]}>
                                        {this.context.t("Welcome to ")}<Text style={[styles.fontBold]}>{this.context.t("PRIZM!")}</Text>
                                    </Text>
                                    <Text style={[styles.mt10, styles.font14]}>
                                        {this.context.t("Sign in to find the coolest photographers in ")}<Text style={[styles.fontBold]}>{this.context.t("Seoul.")}</Text>
                                    </Text>
                                    <Text style={[styles.mt10, styles.font14]}>
                                        {this.context.t("Book your photographer without hassle.")}
                                    </Text>
                                </View>
                            )}
                        </View>
                        <View style={[styles.bgWhite, styles.px20]}>
                            {isLoggedIn ? (
                                <Fragment>
                                    <TouchableWithoutFeedback>
                                        <View style={[styles.row, styles.alignItemsCenter, styles.mt20]}>
                                            <Text style={[styles.font16, styles.fontBold]}>
                                                {this.context.t("Profile")}
                                            </Text>
                                            <Image source={require('../../../assets/images/icon_arrow_right.png')} style={[styles.iconArrow, styles.ml10]} />
                                        </View>
                                    </TouchableWithoutFeedback>
                                    <TouchableWithoutFeedback>
                                        <View style={[styles.row, styles.alignItemsCenter, styles.mt10]}>
                                            <Text style={[styles.font16, styles.fontBold]}>
                                                {this.context.t("My Schedule")}
                                            </Text>
                                            <Image source={require('../../../assets/images/icon_arrow_right.png')} style={[styles.iconArrow, styles.ml10]} />
                                        </View>
                                    </TouchableWithoutFeedback>
                                    <TouchableWithoutFeedback>
                                        <View style={[styles.row, styles.alignItemsCenter, styles.mt10]}>
                                            <Text style={[styles.font16, styles.fontBold]}>
                                                {this.context.t("My Photos")}
                                            </Text>
                                            <Image source={require('../../../assets/images/icon_arrow_right.png')} style={[styles.iconArrow, styles.ml10]} />
                                        </View>
                                    </TouchableWithoutFeedback>
                                </Fragment>
                            ) : (
                                <Fragment>
                                    <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('SignUp')}>
                                        <View style={[styles.row, styles.alignItemsCenter, styles.mt20]}>
                                            <Text style={[styles.font16, styles.fontBold]}>
                                                {this.context.t("Sign Up")}
                                            </Text>
                                            <Image source={require('../../../assets/images/icon_arrow_right.png')} style={[styles.iconArrow, styles.ml10]} />
                                        </View>
                                    </TouchableWithoutFeedback>
                                    <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('SignIn')}>
                                        <View style={[styles.row, styles.alignItemsCenter, styles.mt10]}>
                                            <Text style={[styles.font16, styles.fontBold]}>
                                                {this.context.t("Sign In")}
                                            </Text>
                                            <Image source={require('../../../assets/images/icon_arrow_right.png')} style={[styles.iconArrow, styles.ml10]} />
                                        </View>
                                    </TouchableWithoutFeedback>
                                </Fragment>
                            )}
                            <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Description', { menu: 'about' })}>
                                <View style={[styles.mt20]}>
                                    <Text style={[styles.font16]}>
                                        {this.context.t("About PRIZM")}
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Description', { menu: 'why' })}>
                                <View style={[styles.mt10]}>
                                    <Text style={[styles.font16]}>
                                        {this.context.t("Why PRIZM")}
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Description', { menu: 'how' })}>
                                <View style={[styles.mt10]}>
                                    <Text style={[styles.font16]}>
                                        {this.context.t("How it works")}
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Description', { menu: 'support' })}>
                                <View style={[styles.mt10]}>
                                    <Text style={[styles.font16]}>
                                        {this.context.t("Support")}
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                            {isLoggedIn ? (
                                <TouchableWithoutFeedback onPress={this.props.logout}>
                                    <View style={[styles.mt20]}>
                                        <Text style={[styles.font16, styles.navBrown]}>
                                            {this.context.t("Sign Out")}
                                        </Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            ) : (
                                <TouchableWithoutFeedback>
                                    <View style={[styles.mt20]}>
                                        <Text style={[styles.font16, styles.navBrown]}>
                                            {this.context.t("Are you a photographer?")}
                                        </Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            )}
                        </View>
                    </View>
                    <Image source={require('../../../assets/images/main.png')} style={[{width: 2388*0.06, height: 1668*0.06}]} />
                </SafeAreaView>
            </View>
        )
    }
}

export default MenuScreen;