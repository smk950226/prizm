import React, { Component, Fragment } from 'react';
import { View, Text, Dimensions, TouchableWithoutFeedback, Image, ScrollView, TextInput, Alert, SafeAreaView, TouchableHighlightBase } from 'react-native';
import PropTypes from 'prop-types';
import styles from '../../../styles';

const SignInScreen = (props, context) => (
    <View style={[styles.container, styles.bgWhite, styles.px15]}>
        <View style={[styles.mt20, styles.row, styles.alignItemsCenter]}>
            <TouchableWithoutFeedback onPress={() => props.navigation.navigate('SignUp', { goRequest: props.goRequest, photographerId: props.photographerId })}>
                <View>
                    <Text style={[styles.font18, styles.fontBold, { opacity: 0.4 }]}>
                        {context.t("Sign Up")}
                    </Text>
                </View>
            </TouchableWithoutFeedback>
            <Text style={[styles.font18, styles.fontBold, styles.mx10]}>
                |
            </Text>
            <TouchableWithoutFeedback>
                <View>
                    <Text style={[styles.font18, styles.fontBold]}>
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
                <TouchableWithoutFeedback onPress={() => props.navigation.navigate('FindPassword')}>
                    <View>
                        <Text style={[styles.font12, styles.fontRegular, styles.textCenter, styles.mt10]}>
                            {context.t("Forgot Password?")}
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
            <TouchableWithoutFeedback onPress={props.submit}>
                <View style={[styles.bgGray33, styles.widthFull, styles.center, styles.maxWidth360, styles.py15, styles.alignSelfCenter, props.isSubmitting ? { opacity: 0.7 } : null]}>
                    <Text style={[styles.font16, styles.fontBold, styles.white]}>
                        {props.goRequest ? context.t("Sign In & Submit the request") : context.t("Sign In")}
                    </Text>
                </View>
            </TouchableWithoutFeedback>
        </ScrollView>
    </View>
)

SignInScreen.propTypes = {
    submit: PropTypes.func.isRequired,
    handleEmailChange: PropTypes.func.isRequired,
    handlePasswordChange: PropTypes.func.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
    submit: PropTypes.func.isRequired,
    goRequest: PropTypes.bool.isRequired
}

SignInScreen.contextTypes = {
    t: PropTypes.func
}

export default SignInScreen;
