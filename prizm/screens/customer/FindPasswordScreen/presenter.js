import React, { Component, Fragment } from 'react';
import { View, Text, Dimensions, TouchableWithoutFeedback, Image, ScrollView, TextInput, Alert, SafeAreaView, TouchableHighlightBase } from 'react-native';
import PropTypes from 'prop-types';
import styles from '../../../styles';
import Modal from 'react-native-modal';
import Loader from '../../../components/Loader';

const FindPasswordScreen = (props, context) => {
    if(props.finded){
        return(
            <View style={[styles.container, styles.bgWhite, styles.px15]}>
                <Text style={[styles.font18, styles.fontBold, styles.mt20]}>
                    {context.t("Reset your password")}
                </Text>
                <ScrollView
                showsVerticalScrollIndicator={false}
                alwaysBounceVertical={false}
                contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between', flexDirection: 'column' }}
                >
                    <View>
                        <Text style={[styles.fontBold, styles.font12, styles.mt10]}>
                            {context.t("We have sent a password reset link to your email.")}
                        </Text>
                        <TextInput
                            style={[styles.font14, styles.black, styles.textinputUnderline, styles.fontRegular, styles.widthFull, { height: 30 }]}
                            autoCapitalize={'none'} 
                            autoCorrect={false} 
                            value={props.finded} 
                            returnKeyType={'next'} 
                            placeholderTextColor={'#000000'}
                            underlineColorAndroid={'transparent'}
                            editable={false}
                        />
                    </View>
                    <TouchableWithoutFeedback onPress={() => props.navigation.navigate('SignIn')}>
                        <View style={[styles.bgGray16, styles.widthFull, styles.center, styles.maxWidth360, styles.py15, styles.alignSelfCenter]}>
                            <Text style={[styles.font16, styles.fontBold, styles.white]}>
                                {context.t("Login")}
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                </ScrollView>
            </View>
        )
    }
    else{
        return(
            <View style={[styles.container, styles.bgWhite, styles.px15]}>
                <Text style={[styles.font18, styles.fontBold, styles.mt20]}>
                    {context.t("Reset your password")}
                </Text>
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
                        <Text style={[styles.fontRegular, styles.font12, styles.mt10, styles.textCenter]}>
                            {context.t("Please enter your PRIZM account email")}
                        </Text>
                        <Text style={[styles.fontRegular, styles.font12, styles.mt5, styles.textCenter]}>
                            {context.t("We will send you a password reset link to the email.")}
                        </Text>
                    </View>
                    <TouchableWithoutFeedback onPress={props.submit}>
                        <View style={[styles.bgGray16, styles.widthFull, styles.center, styles.maxWidth360, styles.py15, styles.alignSelfCenter]}>
                            <Text style={[styles.font16, styles.fontBold, styles.white]}>
                                {context.t("Send")}
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                </ScrollView>
                <Modal
                isVisible={props.isSubmitting}
                onBackButtonPress={null}
                onBackdropPress={null}
                backdropOpacity={0.7}
                backdropColor={'#ffffff'}
                animationIn={"fadeIn"}
                animationOut={"fadeOut"}
                >
                    <View style={[styles.container, styles.center]}>
                        <Loader/>
                    </View>
                </Modal>
            </View>
        )
    }
}

FindPasswordScreen.propTypes = {
    submit: PropTypes.func.isRequired,
    handleEmailChange: PropTypes.func.isRequired,
    email: PropTypes.string.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
    submit: PropTypes.func.isRequired,
    finded: PropTypes.string.isRequired
}

FindPasswordScreen.contextTypes = {
    t: PropTypes.func
}

export default FindPasswordScreen;
