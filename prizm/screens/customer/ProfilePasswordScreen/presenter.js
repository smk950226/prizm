import React from 'react';
import{ View, Text, TextInput, ScrollView, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';
import styles from '../../../styles';
import Modal from 'react-native-modal';
import Loader from '../../../components/Loader';

const ProfilePasswordScreen = (props, context) => (
    <View style={[styles.container, styles.bgWhite, styles.px15]}>
        <Text style={[styles.font20, styles.fontBold, styles.mt20]}>
            {context.t("Profile")}
        </Text>
        <ScrollView
        showsVerticalScrollIndicator={false}
        alwaysBounceVertical={false}
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between', flexDirection: 'column' }}
        >
            <View>
                <Text style={[styles.fontBold, styles.font12, styles.mt10]}>
                    {context.t("Current password")}
                </Text>
                <TextInput
                    style={[styles.font14, styles.black, styles.textinputUnderline, styles.fontRegular, styles.widthFull, { height: 30 }]}
                    autoCapitalize={'none'} 
                    autoCorrect={false} 
                    value={props.currentPassword} 
                    onChangeText={props.handleCurrentPasswordChange} 
                    returnKeyType={'next'} 
                    placeholderTextColor={'#000000'}
                    underlineColorAndroid={'transparent'}
                    secureTextEntry={true}
                />
                <Text style={[styles.fontBold, styles.font12, styles.mt10]}>
                    {context.t("New password")}
                </Text>
                <TextInput
                    style={[styles.font14, styles.black, styles.textinputUnderline, styles.fontRegular, styles.widthFull, { height: 30 }]}
                    autoCapitalize={'none'} 
                    autoCorrect={false} 
                    value={props.password} 
                    onChangeText={props.handlePasswordChange} 
                    returnKeyType={'next'} 
                    placeholderTextColor={'#000000'}
                    underlineColorAndroid={'transparent'}
                    secureTextEntry={true}
                />
                <Text style={[styles.fontBold, styles.font12, styles.mt10]}>
                    {context.t("Confirm your new password")}
                </Text>
                <TextInput
                    style={[styles.font14, styles.black, styles.textinputUnderline, styles.fontRegular, styles.widthFull, { height: 30 }]}
                    autoCapitalize={'none'} 
                    autoCorrect={false} 
                    value={props.password2} 
                    onChangeText={props.handlePassword2Change} 
                    returnKeyType={'done'} 
                    placeholderTextColor={'#000000'}
                    underlineColorAndroid={'transparent'}
                    secureTextEntry={true}
                />
            </View>
            <View>
                <TouchableWithoutFeedback onPress={props.submit}>
                    <View style={[styles.bgGray33, styles.widthFull, styles.center, styles.maxWidth360, styles.py15, styles.alignSelfCenter]}>
                        <Text style={[styles.font16, styles.fontBold, styles.white]}>
                            {context.t("Change Password")}
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => props.navigation.navigate('Profile')}>
                    <View>
                        <Text style={[styles.font12, styles.fontRegular, styles.textCenter, styles.mt10, styles.mb10]}>
                            {context.t("Do you want to change your profile?")}
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
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

ProfilePasswordScreen.propTypes = {
    password: PropTypes.string.isRequired,
    password2: PropTypes.string.isRequired,
    currentPassword: PropTypes.string.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
    passwordForm: PropTypes.bool.isRequired,
    submit: PropTypes.func.isRequired,
    handleCurrentPasswordChange: PropTypes.func.isRequired,
    handlePasswordChange: PropTypes.func.isRequired,
    handlePassword2Change: PropTypes.func.isRequired
}

ProfilePasswordScreen.contextTypes = {
    t: PropTypes.func
}

export default ProfilePasswordScreen;
