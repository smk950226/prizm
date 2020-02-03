import React, { Fragment } from 'react';
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';
import styles from '../../../styles';
import Swiper from 'react-native-swiper';

const HomeScreen = (props, context) => (
    <View style={[styles.container, styles.center]}>
        <View style={[styles.flex1]}>
            <Swiper 
            showsButtons={false}
            autoplay={true}
            showsPagination={false}
            autoplayTimeout={5}
            >
                <View style={styles.container}>
                    <View style={[styles.flex1]}>
                        <Image source={require('../../../assets/images/landing_1.jpeg')} style={[styles.widthFull, styles.heightFull]} resizeMode={'cover'} />
                    </View> 
                </View>
                <View style={styles.container}>
                    <View style={[styles.flex1]}>
                        <Image source={require('../../../assets/images/landing_2.jpeg')} style={[styles.widthFull, styles.heightFull]} resizeMode={'cover'} />
                    </View> 
                </View>
                <View style={styles.container}>
                    <View style={[styles.flex1]}>
                        <Image source={require('../../../assets/images/landing_3.jpeg')} style={[styles.widthFull, styles.heightFull]} resizeMode={'cover'} />
                    </View> 
                </View>
            </Swiper>
        </View>
        <View style={[styles.flex1, styles.center, styles.bgLanding1]}>
            <View>
                {props.profile ? (
                    <Fragment>
                        {props.profile.custom_request_status.status === 'none' && (
                            <View>
                                <View style={[styles.alignSelfCenter]}>
                                    <Text style={[styles.font14]}>
                                        {context.t("Meet the ")}<Text style={[styles.fontBold]}>{context.t("coolest photographers in Seoul")}</Text>
                                    </Text>
                                    <Text style={[styles.font14, styles.mt5]}>
                                        {context.t("Enrich your travel with photography")}
                                    </Text>
                                </View>
                                <TouchableWithoutFeedback>
                                    <View style={[styles.mt30, styles.bgGray33, styles.widthFull, styles.center, styles.maxWidth360, styles.py15, styles.alignSelfCenter]}>
                                        <Text style={[styles.fontBold, styles.font14, styles.white]}>
                                            {context.t("Book your photographer now >>")}
                                        </Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        )}
                        {props.profile.custom_request_status.status === 'close' && (
                            <View>
                                <View style={[styles.alignSelfCenter]}>
                                    <Text style={[styles.font14]}>
                                        {context.t("Meet the ")}<Text style={[styles.fontBold]}>{context.t("coolest photographers in Seoul")}</Text>
                                    </Text>
                                    <Text style={[styles.font14, styles.mt5]}>
                                        {context.t("Enrich your travel with photography")}
                                    </Text>
                                </View>
                                <TouchableWithoutFeedback>
                                    <View style={[styles.mt15, props.profile.is_verified ? styles.bgGray33 : styles.bgGray93, styles.widthFull, styles.center, styles.maxWidth360, styles.py15, styles.alignSelfCenter]}>
                                        {props.profile.is_verified ? (
                                            <Text style={[styles.fontBold, styles.font14, styles.white]}>
                                                {context.t("Your custom request has been submitted.")}
                                            </Text>
                                        ) : (
                                            <Fragment>
                                                <Text style={[styles.fontBold, styles.font14, styles.white]}>
                                                    {context.t("Your custom request has been submitted.")}
                                                </Text>
                                                <Text style={[styles.fontBold, styles.font14, styles.white, styles.mt5]}>
                                                    {context.t("Please complete the email verification")}
                                                </Text>
                                            </Fragment>
                                        )}
                                    </View>
                                </TouchableWithoutFeedback>
                                {!props.profile.is_verified  && (
                                    <TouchableWithoutFeedback>
                                        <View style={[styles.mt30, styles.bgGray33, styles.widthFull, styles.center, styles.maxWidth360, styles.py15, styles.alignSelfCenter]}>
                                            <Text style={[styles.fontBold, styles.font14, styles.white]}>
                                                {context.t("Resend Verification Email")}
                                            </Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                )}
                                {props.profile.is_verified ? (
                                    <Fragment>
                                        <Text style={[styles.font14, styles.mt10, styles.pink]}>
                                            {context.t("We are waiting for photographers to submit their proposals.")}
                                        </Text>
                                        <Text style={[styles.font14, styles.pink, styles.mt5]}>
                                            {context.t("We will notify you through text message and email when we have received proposals from photographers")}
                                        </Text>
                                    </Fragment>
                                ) : (
                                    <Text style={[styles.font14, styles.mt10, styles.pink]}>
                                        {context.t("When you complete the email verification, your request details will be sent to photographers and you will soon receive various proposals.")}
                                    </Text>
                                )}
                                <TouchableWithoutFeedback>
                                    <View>
                                        <Text style={[styles.font14, styles.mt10, styles.gray93, styles.textCenter]}>
                                            {context.t("Make a New Request")}
                                        </Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        )}
                        {props.profile.custom_request_status.status === 'open' && (
                            <View>
                                <View style={[styles.alignSelfCenter]}>
                                    <Text style={[styles.font14]}>
                                        {context.t("Meet the ")}<Text style={[styles.fontBold]}>{context.t("coolest photographers in Seoul")}</Text>
                                    </Text>
                                    <Text style={[styles.font14, styles.mt5]}>
                                        {context.t("Enrich your travel with photography")}
                                    </Text>
                                </View>
                                <TouchableWithoutFeedback>
                                    <View style={[styles.mt30, styles.bgGray33, styles.widthFull, styles.center, styles.maxWidth360, styles.py15, styles.alignSelfCenter]}>
                                        <Text style={[styles.fontBold, styles.font14, styles.white]}>
                                            {context.t(`Proposals for ${props.profile.first_name} ${props.profile.last_name}`)}
                                        </Text>
                                        <View style={[{position: 'absolute', top: -10, right: 20}, styles.center]}>
                                            <Image source={require('../../../assets/images/icon_count.png')} style={[{width: 20, height: 20}]} />
                                            <Text style={[styles.fontExtraBold, styles.font8, { position: 'absolute' }]}>
                                                {props.profile.custom_request_status.count}
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableWithoutFeedback>
                                <Text style={[styles.font14, styles.pink, styles.mt10]}>
                                    {context.t("PRIZM photographers' proposals have arrived.")}
                                </Text>
                                <Text style={[styles.font14, styles.pink, styles.mt5]}>
                                    {context.t("Please click the button above to see them in detail")}
                                </Text>
                            </View>
                        )}
                        {props.profile.custom_request_status.status === 'confirmed' && (
                            <View>
                                <View style={[styles.alignSelfCenter]}>
                                    <Text style={[styles.font14]}>
                                        {context.t("Meet the ")}<Text style={[styles.fontBold]}>{context.t("coolest photographers in Seoul")}</Text>
                                    </Text>
                                    <Text style={[styles.font14, styles.mt5]}>
                                        {context.t("Enrich your travel with photography")}
                                    </Text>
                                </View>
                                <TouchableWithoutFeedback>
                                    <View style={[styles.mt30, styles.bgGray33, styles.widthFull, styles.center, styles.maxWidth360, styles.py15, styles.alignSelfCenter]}>
                                        <Text style={[styles.fontBold, styles.font14, styles.white]}>
                                            {context.t("Your custom request has been confirmed.")}
                                        </Text>
                                    </View>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback>
                                    <View style={[styles.mt30, styles.bgConfirmed, styles.widthFull, styles.center, styles.maxWidth360, styles.mt10, styles.py15, styles.alignSelfCenter]}>
                                        <Text style={[styles.fontBold, styles.font14, styles.white]}>
                                            {props.profile.custom_request_status.payment === 'confirmed' && (
                                                context.t("Add Payment Details")
                                            )}
                                            {props.profile.custom_request_status.payment === 'waiting_payment' && (
                                                context.t("Waiting for Payment")
                                            )}
                                            {props.profile.custom_request_status.payment === 'paid' && (
                                                context.t("Payment Successful!")
                                            )}
                                        </Text>
                                    </View>
                                </TouchableWithoutFeedback>
                                <Text style={[styles.mt10, styles.pink, styles.font10]}>
                                    {context.t(`Please add payment details by : ${new Date(new Date(props.profile.custom_request_status.confirmed_at).getTime() + 1000*60*60*24*3)}`)}
                                </Text>
                            </View>
                        )}
                    </Fragment>
                    
                ) : (
                    <View>
                        <View style={[styles.alignSelfCenter]}>
                            <Text style={[styles.font14]}>
                                {context.t("Meet the ")}<Text style={[styles.fontBold]}>{context.t("coolest photographers in Seoul")}</Text>
                            </Text>
                            <Text style={[styles.font14, styles.mt5]}>
                                {context.t("Enrich your travel with photography")}
                            </Text>
                        </View>
                        <TouchableWithoutFeedback>
                            <View style={[styles.mt30, styles.bgGray33, styles.widthFull, styles.center, styles.maxWidth360, styles.py15, styles.alignSelfCenter]}>
                                <Text style={[styles.fontBold, styles.font14, styles.white]}>
                                    {context.t("Book your photographer now >>")}
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback>
                            <View>
                                <Text style={[styles.mt10, styles.pink, styles.font14, styles.textCenter]}>
                                    {context.t("Already made a reservation?")}
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                )}
            </View>
        </View>
    </View>
)

HomeScreen.propTypes = {
    profile: PropTypes.object
}

HomeScreen.contextTypes = {
    t: PropTypes.func
}

export default HomeScreen;