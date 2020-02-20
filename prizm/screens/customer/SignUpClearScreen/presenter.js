import React, { Fragment } from 'react';
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';
import styles from '../../../styles';
import Modal from 'react-native-modal';
import Loader from '../../../components/Loader';

const SignUpClearScreen = (props, context) => (
    <View style={[styles.container, styles.bgWhite, styles.center, styles.px15]}>
        <Fragment>
            <Text style={[styles.font14, styles.textCenter]}>
                {context.t("Thanks for signing up!")}
            </Text>
            <Image source={require('../../../assets/images/email_verifing.png')} style={[{width: 2338*0.1, height: 1668*0.1}, styles.alignSelfCenter]} />
            <Text style={[styles.font14, styles.mt20, styles.textCenter]}>
                {context.t("We sent a ")}<Text style={[styles.pink]}>{context.t("verification email ")}</Text>{context.t("to the following address :")}
            </Text>
            <Text style={[styles.font14, styles.mt10, styles.textCenter]}>
                {props.profile.email}
            </Text>
            <Text style={[styles.font14, styles.mt10, styles.textCenter, styles.pink]}>
                {context.t("Please verify yourself by clicking the link attached in the email.")}
            </Text>
            <Text style={[styles.font14, styles.mt5, styles.textCenter]}>
                {context.t("When you complete the email verification, you will be able to freely make reservations.")}
            </Text>
            <View style={[styles.row, styles.alignItemsCenter, styles.justifyContentBetween, styles.mt20]}>
                <View style={[styles.flex1, styles.pr5]}>
                    <TouchableWithoutFeedback onPress={props.send}>
                        <View style={[styles.bgGray33, styles.widthFull, styles.center, styles.maxWidth360, styles.py15, styles.alignSelfCenter, styles.mt20]}>
                            <Text style={[styles.font16, styles.fontBold, styles.white]}>
                                {context.t("RESEND")}
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <View style={[styles.flex1, styles.pl5]}>
                    <TouchableWithoutFeedback onPress={() => props.navigation.navigate('Home')}>
                        <View style={[styles.bgGray33, styles.widthFull, styles.center, styles.maxWidth360, styles.py15, styles.alignSelfCenter, styles.mt20]}>
                            <Text style={[styles.font16, styles.fontBold, styles.white]}>
                                {context.t("HOME")}
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        </Fragment>
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

SignUpClearScreen.propTypes = {
    profile: PropTypes.object.isRequired,
    send: PropTypes.func.isRequired,
    isSubmitting: PropTypes.bool.isRequired
}

SignUpClearScreen.contextTypes = {
    t: PropTypes.func
}

export default SignUpClearScreen;
