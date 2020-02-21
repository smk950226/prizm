import React from 'react';
import{ View, Text, TextInput, ScrollView, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';
import styles from '../../../styles';
import Modal from 'react-native-modal';
import Flag from 'react-native-flags';
import Loader from '../../../components/Loader';

const Profile = (props, context) => (
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
                    returnKeyType={'next'} 
                    placeholderTextColor={'#000000'}
                    underlineColorAndroid={'transparent'}
                    editable={false}
                />
                <Text style={[styles.fontBold, styles.font12, styles.mt10]}>
                    {context.t("Mobile")}
                </Text>
                <View style={[styles.row, styles.alignSelfCenter]}>
                    <View style={[styles.flex2, styles.pr5]}>
                        <TouchableWithoutFeedback onPress={props.openShowCountryNumber}>
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
                            returnKeyType={'done'} 
                            placeholderTextColor={'#000000'}
                            underlineColorAndroid={'transparent'}
                        />
                    </View>
                </View>
            </View>
            <View>
                <TouchableWithoutFeedback onPress={props.submit}>
                    <View style={[styles.bgGray33, styles.widthFull, styles.center, styles.maxWidth360, styles.py15, styles.alignSelfCenter]}>
                        <Text style={[styles.font16, styles.fontBold, styles.white]}>
                            {context.t("Edit profile")}
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => props.navigation.navigate('ProfilePassword')}>
                    <View>
                        <Text style={[styles.font12, styles.fontRegular, styles.textCenter, styles.mt10, styles.mb10]}>
                            {context.t("Do you want to change your password?")}
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </ScrollView>
        <Modal
        isVisible={props.showCountryNumber}
        onBackButtonPress={props.closeShowCountryNumber}
        onBackdropPress={props.closeShowCountryNumber}
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
                    placeholder={context.t("Search Country")}
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

Profile.propTypes = {
    email: PropTypes.string.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
    handleCountryNumberChange: PropTypes.func.isRequired,
    handleShowCountryNumber: PropTypes.func.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    countryNumber: PropTypes.string.isRequired,
    mobile: PropTypes.string.isRequired,
    showCountryNumber: PropTypes.bool.isRequired,
    submit: PropTypes.func.isRequired,
    openShowCountryNumber: PropTypes.func.isRequired,
    closeShowCountryNumber: PropTypes.func.isRequired,
    countryList: PropTypes.array,
    q: PropTypes.string.isRequired,
    handleFirstNameChange: PropTypes.func.isRequired,
    handleLastNameChange: PropTypes.func.isRequired,
    handleMobileChange: PropTypes.func.isRequired,
    handleQChange: PropTypes.func.isRequired
}

Profile.contextTypes = {
    t: PropTypes.func
}

export default Profile;
