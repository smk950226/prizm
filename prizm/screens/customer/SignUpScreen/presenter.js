import React, { Component, Fragment } from 'react';
import { View, Text, Dimensions, TouchableWithoutFeedback, Image, ScrollView, TextInput, Alert, SafeAreaView, TouchableHighlightBase } from 'react-native';
import PropTypes from 'prop-types';
import styles from '../../../styles';
import Modal from 'react-native-modal';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Flag from 'react-native-flags';

const SignUp = (props, context) => (
    <View style={[styles.container, styles.bgWhite, styles.px15]}>
        <View style={[styles.mt20, styles.row, styles.alignItemsCenter]}>
            <TouchableWithoutFeedback>
                <View>
                    <Text style={[styles.font18, styles.fontBold]}>
                        {context.t("Sign Up")}
                    </Text>
                </View>
            </TouchableWithoutFeedback>
            <Text style={[styles.font18, styles.fontBold, styles.mx10]}>
                |
            </Text>
            <TouchableWithoutFeedback onPress={() => props.navigation.navigate('SignIn', { goRequest: props.goRequest, photographerId: props.photographerId })}>
                <View>
                    <Text style={[styles.font18, styles.fontBold, { opacity: 0.4 }]}>
                        {context.t("Sign In")}
                    </Text>
                </View>
            </TouchableWithoutFeedback>
        </View>
        <ScrollView
        showsVerticalScrollIndicator={false}
        alwaysBounceVertical={false}
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between', flexDirection: 'column' }}
        >
            <View>
                <Text style={[styles.fontBold, styles.font12, styles.mt10]}>
                    {context.t("First name")}
                </Text>
                <TextInput
                    style={[styles.font14, styles.black, styles.textinputUnderline, styles.fontRegular, styles.widthFull, { height: 30 }]}
                    autoCapitalize={'none'} 
                    autoCorrect={false} 
                    value={props.firstName} 
                    onChangeText={props.handleFirstNameChange} 
                    returnKeyType={'next'} 
                    placeholderTextColor={'#000000'}
                    underlineColorAndroid={'transparent'}
                />
                <Text style={[styles.fontBold, styles.font12, styles.mt10]}>
                    {context.t("Last name")}
                </Text>
                <TextInput
                    style={[styles.font14, styles.black, styles.textinputUnderline, styles.fontRegular, styles.widthFull, { height: 30 }]}
                    autoCapitalize={'none'} 
                    autoCorrect={false} 
                    value={props.lastName} 
                    onChangeText={props.handleLastNameChange} 
                    returnKeyType={'next'} 
                    placeholderTextColor={'#000000'}
                    underlineColorAndroid={'transparent'}
                />
                <Text style={[styles.fontBold, styles.font12, styles.mt10]}>
                    {context.t("Email")}
                </Text>
                <TextInput
                    style={[styles.font14, styles.black, styles.textinputUnderline, styles.fontRegular, styles.widthFull, { height: 30 }]}
                    autoCapitalize={'none'} 
                    autoCorrect={false} 
                    value={props.email} 
                    onChangeText={props.handleEmailChange} 
                    returnKeyType={'next'} 
                    placeholderTextColor={'#000000'}
                    underlineColorAndroid={'transparent'}
                />
                <Text style={[styles.fontBold, styles.font12, styles.mt10]}>
                    {context.t("Mobile")}
                </Text>
                <View style={[styles.row, styles.alignSelfCenter]}>
                    <View style={[styles.flex2, styles.pr5]}>
                        <TouchableWithoutFeedback onPress={props.handleShowCuntryNumberChange}>
                            <View style={[styles.font14, styles.black, styles.textinputUnderline, styles.justifyContentCenter, styles.fontRegular, styles.widthFull, { height: 30 }]}>
                                <Text style={[styles.font14, styles.black, styles.fontRegular]}>
                                    {`+${props.countryNumber}`} 
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={[styles.flex8]}>
                        <TextInput
                            style={[styles.font14, styles.black, styles.textinputUnderline, styles.fontRegular, styles.widthFull, { height: 30 }]}
                            autoCapitalize={'none'} 
                            autoCorrect={false} 
                            value={props.mobile} 
                            onChangeText={props.handleMobileChange} 
                            returnKeyType={'next'} 
                            placeholderTextColor={'#000000'}
                            underlineColorAndroid={'transparent'}
                        />
                    </View>
                </View>
                <Text style={[styles.mt5, styles.font10]}>
                    {context.t("Your reservation details and confirmation message from photographers will be sent to your email and mobile number.")}
                </Text>
                <Text style={[styles.fontBold, styles.font12, styles.mt10]}>
                    {context.t("Password")}
                </Text>
                <TextInput
                    style={[styles.font14, styles.black, styles.textinputUnderline, styles.fontRegular, styles.widthFull, { height: 30 }]}
                    autoCapitalize={'none'} 
                    autoCorrect={false} 
                    secureTextEntry={true}
                    value={props.password} 
                    onChangeText={props.handlePasswordChange} 
                    returnKeyType={'next'} 
                    placeholderTextColor={'#000000'}
                    underlineColorAndroid={'transparent'}
                />
                <Text style={[styles.fontBold, styles.font12, styles.mt10]}>
                    {context.t("Confirm your password")}
                </Text>
                <TextInput
                    style={[styles.font14, styles.black, styles.textinputUnderline, styles.fontRegular, styles.widthFull, { height: 30 }]}
                    autoCapitalize={'none'} 
                    autoCorrect={false} 
                    secureTextEntry={true}
                    value={props.password2} 
                    onChangeText={props.handlePassword2Change} 
                    returnKeyType={'next'} 
                    placeholderTextColor={'#000000'}
                    underlineColorAndroid={'transparent'}
                />
            </View>
            <TouchableWithoutFeedback onPress={props.submit}>
                <View style={[styles.bgGray33, styles.widthFull, styles.center, styles.maxWidth360, styles.py15, styles.alignSelfCenter, props.isSubmitting ? { opacity: 0.7 } : null]}>
                    <Text style={[styles.font16, styles.fontBold, styles.white]}>
                        {props.goRequest ? context.t("Sign Up & Submit the request") : context.t("Sign Up")}
                    </Text>
                </View>
            </TouchableWithoutFeedback>
        </ScrollView>
        <Modal
        isVisible={props.showCountryNumber}
        onBackButtonPress={props.closeCountryNumberModal}
        onBackdropPress={props.closeCountryNumberModal}
        >
            <View style={[styles.bgWhite, styles.pt20, styles.center, styles.px30]}>
                <TextInput
                    style={[styles.font14, styles.black, styles.textinputUnderline, styles.fontRegular, styles.widthFull, { height: 30 }]}
                    autoCapitalize={'none'} 
                    autoCorrect={false} 
                    value={props.q} 
                    onChangeText={props.handleQChange} 
                    returnKeyType={'next'} 
                    placeholderTextColor={'#000000'}
                    underlineColorAndroid={'transparent'}
                    placeholder={context.t("Search Count")}
                />
                <ScrollView 
                style={[styles.mt10, { height: 500 }]}
                alwaysBounceVertical={false}
                alwaysBounceHorizontal={false}
                >
                    {props.q !== "" && props.countryList.map((country, index) => (
                        <TouchableWithoutFeedback key={index} onPress={() => props.handleCountryNumberChange(country.number, country.value)}>
                            <View style={[styles.row, styles.alignItemsCenter, styles.py5]}>
                                <Flag 
                                code={country.value}
                                type={'flat'}
                                size={16}
                                />
                                <Text style={[styles.font14, styles.mx10]}>
                                    {country.label}
                                </Text>
                                <Text style={[styles.font14]}>
                                    {`+${country.number}`}
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    ))}
                </ScrollView>
            </View>
        </Modal>
    </View>
)

SignUp.propTypes = {
    handleCountryNumberChange: PropTypes.func.isRequired,
    handleShowCuntryNumberChange: PropTypes.func.isRequired,
    submit: PropTypes.func.isRequired,
    openCountryNumberModal: PropTypes.func.isRequired,
    closeCountryNumberModal: PropTypes.func.isRequired,
    handleFirstNameChange: PropTypes.func.isRequired,
    handleLastNameChange: PropTypes.func.isRequired,
    handleEmailChange: PropTypes.func.isRequired,
    handleMobileChange: PropTypes.func.isRequired,
    handlePasswordChange: PropTypes.func.isRequired,
    handlePassword2Change: PropTypes.func.isRequired,
    handleQChange: PropTypes.func.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    countryNumber: PropTypes.string.isRequired,
    mobile: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    password2: PropTypes.string.isRequired,
    showCountryNumber: PropTypes.bool.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
    submit: PropTypes.func.isRequired,
    goRequest: PropTypes.bool.isRequired,
    q: PropTypes.string.isRequired,
    countryList: PropTypes.array
}

SignUp.contextTypes = {
    t: PropTypes.func
}

export default SignUp;
