import React, { Fragment } from 'react';
import { View, Text, Image, TouchableWithoutFeedback, ScrollView, ActivityIndicator, Linking, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import styles from '../../../styles';
import PhotoSlider from '../../../components/PhotoSlider';
import Collapsible from 'react-native-collapsible';
import StarRating from 'react-native-star-rating';
import MapView, { Marker } from 'react-native-maps';
import CalendarPicker from 'react-native-calendar-picker';
import Modal from 'react-native-modal';
import DatePicker from 'react-native-datepicker';

const { width, height } = Dimensions.get('window')

const PhotographerDetailScreen = (props, context) => (
    <View style={[styles.container, styles.bgWhite]}>
        <ScrollView
        showsVerticalScrollIndicator={false}
        alwaysBounceVertical={false}
        >
            <View style={[{height: 70}]}>
                {props.photographer.portfolio_set && props.photographer.portfolio_set.length > 0 ? (
                    <PhotoSlider images={props.photographer.portfolio_set} name={props.photographer.nickname} height={70} />
                ) : (
                    null
                )}
            </View>
            <View style={[styles.mt10, styles.py10, styles.px15, styles.row, styles.alignItemsCenter]}>
                <Image source={props.photographer.profile_image ? {uri: props.photographer.profile_image} : require('../../../assets/images/icon_profile.png')} style={[styles.circle60]} />
                <View style={[styles.ml10]}>
                    <Text style={[styles.fontBold, styles.font16]}>
                        {props.photographer.nickname}
                    </Text>
                    <Text style={[styles.fontRegular, styles.font14]}>
                        {props.photographer.main_location}
                    </Text>
                </View>
            </View>
            <View style={[styles.px15, styles.mt10]}>
                <View style={[styles.row, styles.alignItemsCenter, styles.justifyContentBetween]}>
                    <Text style={[styles.font14, styles.fontBold]}>
                        {context.t("Career")}
                    </Text>
                    <Text style={[styles.font14]}>
                        {props.photographer.career}
                    </Text>
                </View>
                {props.photographer.equipment ? (
                    <View style={[styles.row, styles.alignItemsCenter, styles.justifyContentBetween, styles.mt5]}>
                        <Text style={[styles.font14, styles.fontBold]}>
                            {context.t("Equipment")}
                        </Text>
                        <Text style={[styles.font14]}>
                            {props.photographer.equipment}
                        </Text>
                    </View>
                ) : (
                    null
                )}
                {props.photographer.portfolio_url ? (
                    <View style={[styles.row, styles.alignItemsCenter, styles.justifyContentBetween, styles.mt5]}>
                        <Text style={[styles.font14, styles.fontBold]}>
                            {context.t("Portfolio")}
                        </Text>
                        <Text style={[styles.font14]}>
                            {props.photographer.portfolio_url}
                        </Text>
                    </View>
                ) : (
                    null
                )}
                <TouchableWithoutFeedback onPress={props.isTruncated ? props.undoTruncate : props.doTruncate}>
                    <View>
                        <Text 
                        style={[styles.font14, styles.mt10, {lineHeight: 20}]}
                        ellipsizeMode={props.isTruncated ? 'tail' : null}
                        numberOfLines={props.isTruncated ? 5 : null}
                        >
                            {props.photographer.description}
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
                <View style={[styles.row, styles.alignItemsCenter, styles.justifyContentBetween, styles.mt10]}>
                    <Text style={[styles.font14, styles.fontBold]}>
                        {context.t("Review")}
                    </Text>
                    <TouchableWithoutFeedback>
                        <View style={[styles.row, styles.alignItemsCenter]}>
                            <Text style={[styles.font14, styles.mr5]}>
                                {props.photographer.total_rating}
                            </Text>
                            <StarRating
                                disabled={true}
                                maxStars={5}
                                rating={props.photographer.total_rating}
                                emptyStar={require('../../../assets/images/icon_star_disabled.png')}
                                fullStar={require('../../../assets/images/icon_star.png')}
                                halfStar={require('../../../assets/images/icon_star_half.png')}
                                fullStarColor={'#FFBD07'}
                                starSize={12}
                            />
                            <Text style={[styles.font12, styles.ml5, styles.mr5]}>
                                {`(${props.photographer.review_count})`}
                            </Text>
                            <Image source={require('../../../assets/images/icon_arrow_right.png')} style={[styles.iconArrowSm]} />
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
            <View style={[styles.bgGrayF4, styles.my10, { height: 5 }]}/>
            {props.loading ? (
                <ActivityIndicator size={'small'} color={'#000'} />
            ) : (
                <View style={[styles.mt10]}>
                    <TouchableWithoutFeedback onPress={props.show1 ? props.selectedLocation.id ? props.close1 : null : props.open1}>
                        <View style={[styles.row, styles.alignItemsCenter, styles.px15, styles.py10, styles.justifyContentBetween]}>
                            <View style={[styles.row, styles.alignItemsCenter]}>
                                <Text style={[styles.fontBold, styles.font14]}>
                                    {context.t("1. Select Location")}
                                </Text>
                                <Text style={[styles.fontBold, styles.font14, styles.pink, styles.ml10]}>
                                    {`(${props.photographer.location_set.length})`}
                                </Text>
                            </View>
                                <View>
                                    <Image source={props.show1 ? require('../../../assets/images/icon_arrow_up.png') : require('../../../assets/images/icon_arrow_down.png')} resizeMode={'contain'} style={[styles.iconArrowVerticalSm]} />
                                </View>
                        </View>
                    </TouchableWithoutFeedback>
                    <Collapsible collapsed={!props.show1}>
                        <View style={[styles.mt10, styles.px15]}>
                            {props.photographer.location_set && props.photographer.location_set.length > 0 ? (
                                <ScrollView
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                alwaysBounceHorizontal={false}
                                >
                                    {props.photographer.location_set.map((location, index) => (
                                        <TouchableWithoutFeedback key={index} onPress={props.selectedLocation.id === location.id ? props.blankLocation : () => props.selectLocation(location)}>
                                            <View style={[props.selectedLocation.id === location.id ? styles.borderPink3 : styles.borderGrayF43, index === props.photographer.location_set.length - 1 ? null : styles.mr5, styles.px10, styles.py5]}>
                                                <Text style={[styles.font10]}>
                                                    {context.t(`Location ${index + 1}`)}
                                                </Text>
                                                <Text style={[styles.fontBold, styles.font12]}>
                                                    {location.name}
                                                </Text>
                                            </View>
                                        </TouchableWithoutFeedback>
                                    ))}
                                </ScrollView>

                            ) : (
                                <Text style={[styles.font14, styles.textCenter]}>
                                    {context.t("There is no available location.")}
                                </Text>
                            )}
                            {props.selectedLocation.lat ? (
                                <View style={[styles.mt10]}>
                                    <MapView 
                                    style={[styles.widthFull, {height: 300}]}
                                    initialRegion={{
                                        latitude: props.selectedLocation.lat,
                                        longitude: props.selectedLocation.lng,
                                        latitudeDelta: 0.0922,
                                        longitudeDelta: 0.0421,
                                    }}
                                    region={{
                                        latitude: props.selectedLocation.lat,
                                        longitude: props.selectedLocation.lng,
                                        latitudeDelta: 0.0922,
                                        longitudeDelta: 0.0421,
                                    }}
                                    >
                                        <Marker
                                        coordinate={{
                                            latitude: props.selectedLocation.lat,
                                            longitude: props.selectedLocation.lng
                                        }}
                                        />
                                    </MapView>
                                </View>
                            ) : null}
                        </View>
                    </Collapsible>
                    <View style={[styles.bgGrayF4, styles.my10, { height: 5 }]}/>
                    <TouchableWithoutFeedback onPress={(props.dateConfirm ) ? props.show2 ? props.close2 : props.open2 : null}>
                        <View style={[styles.row, styles.alignItemsCenter, styles.px15, styles.py10, styles.justifyContentBetween]}>
                            <View style={[styles.row, styles.alignItemsCenter]}>
                                <Text style={[styles.fontBold, styles.font14]}>
                                    {context.t("2. Date&Time")}
                                </Text>
                            </View>
                            <View>
                                <Image source={props.show2 ? require('../../../assets/images/icon_arrow_up.png') : require('../../../assets/images/icon_arrow_down.png')} resizeMode={'contain'} style={[styles.iconArrowVerticalSm]} />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                    <Collapsible collapsed={!props.show2}>
                        <View style={[styles.mt10, styles.px15]}>
                            <View style={[styles.row]}>
                                <TouchableWithoutFeedback onPress={() => props.handleChangeDateOption(1)}>
                                    <View style={[styles.flex1, styles.row]}>
                                        <View style={[styles.icon15, props.dateOption === 1 ? styles.checkboxChecked : styles.checkbox, styles.center]}>
                                            {props.dateOption === 1 && (
                                                <Image source={require('../../../assets/images/icon_check.png')} style={[styles.icon10]} />
                                            )}
                                        </View>
                                        <Text style={[styles.font14, styles.fontRegular, styles.ml10]}>
                                            {context.t("I have a specific date and time in mind.")}
                                        </Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                            {props.dateConfirm && (props.dateOption === 1) && (
                                <View style={[styles.row, styles.alignSelfCenter, styles.justifyContentBetween, styles.mt10]}>
                                    <View style={[styles.flex1, styles.pr5, { height: 40 }, styles.justifyContentCenter]}>
                                        <TouchableWithoutFeedback onPress={() => props.openCalendar1(1)}>
                                            <View style={[styles.flex1, styles.bgPink, styles.center]}>
                                                <Text style={[styles.fontBold, styles.font14, styles.white]}>
                                                    {props.selectedDate && `${props.selectedDate.getFullYear()}/${String(props.selectedDate.getMonth() + 1).length === 2 ? (props.selectedDate.getMonth() + 1) : '0'.concat(String(props.selectedDate.getMonth() + 1))}/${props.selectedDate.getDate()}`}
                                                </Text>
                                            </View>
                                        </TouchableWithoutFeedback>
                                    </View>
                                    <View style={[styles.flex1, styles.pl5, { height: 40 }, styles.justifyContentCenter]}>
                                        <TouchableWithoutFeedback onPress={() => props.openCalendar1(2)}>
                                            <View style={[styles.flex1, styles.bgPink, styles.center]}>
                                                <Text style={[styles.fontBold, styles.font14, styles.white]}>
                                                {`${props.selectedHour}:${props.selectedMin}`}
                                                </Text>
                                            </View>
                                        </TouchableWithoutFeedback>
                                    </View>
                                </View>
                            )}
                            <View style={[styles.row, styles.mt10]}>
                                <TouchableWithoutFeedback onPress={() => props.handleChangeDateOption(2)}>
                                    <View style={[styles.flex1, styles.row]}>
                                        <View style={[styles.icon15, props.dateOption === 2 ? styles.checkboxChecked : styles.checkbox, styles.center]}>
                                            {props.dateOption === 2 && (
                                                <Image source={require('../../../assets/images/icon_check.png')} style={[styles.icon10]} />
                                            )}
                                        </View>
                                        <Text style={[styles.font14, styles.fontRegular, styles.ml10]}>
                                            {context.t("I don't have a specific date in mind, but my availability in Seoul is as follows :")}
                                        </Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                            {props.dateConfirm && (props.dateOption === 2) && (
                                <View style={[styles.row, styles.alignSelfCenter, styles.justifyContentBetween, styles.mt10]}>
                                    <View style={[styles.flex1, styles.pr5, { height: 40 }, styles.justifyContentCenter]}>
                                        <TouchableWithoutFeedback onPress={props.openCalendar2}>
                                            <View style={[styles.flex1, styles.bgPink, styles.center]}>
                                                <Text style={[styles.fontBold, styles.font14, styles.white]}>
                                                {props.selectedStartDate !== "" && `${props.selectedStartDate.getFullYear()}/${String(props.selectedStartDate.getMonth() + 1).length === 2 ? (props.selectedStartDate.getMonth() + 1) : '0'.concat(String(props.selectedStartDate.getMonth() + 1))}/${props.selectedStartDate.getDate()}`}
                                                </Text>
                                            </View>
                                        </TouchableWithoutFeedback>
                                    </View>
                                    <View style={[styles.flex1, styles.pl5, { height: 40 }, styles.justifyContentCenter]}>
                                        <TouchableWithoutFeedback onPress={props.openCalendar2}>
                                            <View style={[styles.flex1, styles.bgPink, styles.center]}>
                                                <Text style={[styles.fontBold, styles.font14, styles.white]}>
                                                {props.selectedEndDate !== "" && `${props.selectedEndDate.getFullYear()}/${String(props.selectedEndDate.getMonth() + 1).length === 2 ? (props.selectedEndDate.getMonth() + 1) : '0'.concat(String(props.selectedEndDate.getMonth() + 1))}/${props.selectedEndDate.getDate()}`}
                                                </Text>
                                            </View>
                                        </TouchableWithoutFeedback>
                                    </View>
                                </View>
                            )}
                        </View>
                    </Collapsible>
                </View>
            )}
        </ScrollView>    
        <Modal
        isVisible={props.showCalendar1}
        onBackButtonPress={props.closeCalendar1}
        onBackdropPress={props.closeCalendar1}
        >
            <View style={[styles.bgWhite, styles.pt20, styles.center]}>
                {props.selectDateStep === 1 && (
                    <Fragment>
                        <CalendarPicker
                        onDateChange={props.selectDate}
                        selectedStartDate={props.selectedDate ? props.selectedDate : null}
                        selectedEndDate={props.selectedDate ? props.selectedDate : null}
                        selectedDayColor={'#d66c8b'}
                        selectedDayTextColor={'#ffffff'}
                        dayShape={'square'}
                        disabledDates={(date) => {
                            if(date < new Date()){
                                return true
                            }
                            else{
                                return false
                            }
                        }}
                        previousTitle={'<'}
                        nextTitle={'>'}
                        previousTitleStyle={{
                            fontFamily: 'NanumSquareOTFB00',
                            fontSize: 18
                        }}
                        nextTitleStyle={{
                            fontFamily: 'NanumSquareOTFB00',
                            fontSize: 18
                        }}
                        textStyle={{
                            fontFamily: 'NanumSquareOTFB00'
                        }}
                        width={width - 60}
                        />
                        <TouchableWithoutFeedback onPress={() => props.changeDateStep(2)}>
                            <View style={[styles.bgGray33, styles.widthFull, styles.center, styles.py15, styles.alignSelfCenter]}>
                                <Text style={[styles.font16, styles.fontBold, styles.white]}>
                                    {context.t("NEXT")}
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </Fragment>
                )}
                {props.selectDateStep === 2 && (
                    <Fragment>
                        <View style={[styles.row, styles.alignItemsCenter, styles.justifyContentBetween, styles.widthFull, styles.px15]}>
                            <TouchableWithoutFeedback onPress={() => props.changeDateStep(1)}>
                                <View>
                                    <Image source={require('../../../assets/images/icon_arrow_left.png')} style={[styles.iconArrow]} />
                                </View>
                            </TouchableWithoutFeedback>
                            <Text style={[styles.font16, styles.fontBold]}>
                                {props.selectedDate !== "" && `${props.selectedDate.getFullYear()}.${props.selectedDate.getMonth() + 1}.${props.selectedDate.getDate()}`}
                            </Text>
                            <View style={[styles.hidden]}>
                                <Image source={require('../../../assets/images/icon_arrow_left.png')} style={[styles.iconArrow]} />
                            </View>
                        </View>
                        <DatePicker
                            style={[{width: width - 60, borderWidth: 0}, styles.my30]}
                            date={`${props.selectedHour}:${props.selectedMin}`}
                            mode="time"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            showIcon={false}
                            hideText={false}
                            textColor={'#000'}
                            customStyles={{
                                dateInput: {
                                    borderWidth: 0,
                                    color: '#000'
                                },
                                placeholderText: {
                                    color: '#000'
                                },
                                dateText: {
                                    fontSize: 20,
                                    fontFamily: 'NanumSquareOTFB00',
                                    color: '#000'
                                },
                                confirmBtnText: {
                                    color: '#000'
                                },
                                textStyle: {
                                    color: '#000'
                                }
                            }}
                            onDateChange={(date) => props.handleChangeTimes(date)}
                        />
                        <TouchableWithoutFeedback onPress={props.confirmDate}>
                            <View style={[styles.bgGray33, styles.widthFull, styles.center, styles.py15, styles.alignSelfCenter]}>
                                <Text style={[styles.font16, styles.fontBold, styles.white]}>
                                    {context.t("DONE")}
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </Fragment>
                )}
            </View>
        </Modal>
        <Modal
        isVisible={props.showCalendar2}
        onBackButtonPress={props.closeCalendar2}
        onBackdropPress={props.closeCalendar2}
        >
            <View style={[styles.bgWhite, styles.pt20, styles.center]}>
                <CalendarPicker
                allowRangeSelection={true}
                onDateChange={props.selectDateRange}
                selectedDayColor={'#d66c8b'}
                selectedDayTextColor={'#ffffff'}
                dayShape={'square'}
                disabledDates={(date) => {
                    if(date < new Date()){
                        return true
                    }
                    else{
                        return false
                    }
                }}
                previousTitle={'<'}
                nextTitle={'>'}
                selectedStartDate={props.selectedStartDate ? props.selectedStartDate : null}
                selectedEndDate={props.selectedEndDate ? props.selectedEndDate : null}
                previousTitleStyle={{
                    fontFamily: 'NanumSquareOTFB00',
                    fontSize: 18
                }}
                nextTitleStyle={{
                    fontFamily: 'NanumSquareOTFB00',
                    fontSize: 18
                }}
                textStyle={{
                    fontFamily: 'NanumSquareOTFB00'
                }}
                width={width - 60}
                />
                <TouchableWithoutFeedback onPress={props.confirmDate}>
                    <View style={[styles.bgGray33, styles.widthFull, styles.center, styles.py15, styles.alignSelfCenter]}>
                        <Text style={[styles.font16, styles.fontBold, styles.white]}>
                            {context.t("DONE")}
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </Modal>    
    </View>
)

PhotographerDetailScreen.propTypes = {
    photographer: PropTypes.object,
    isTruncated: PropTypes.bool.isRequired,
    doTruncate: PropTypes.func.isRequired,
    undoTruncate: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    show1: PropTypes.bool.isRequired,
    open1: PropTypes.func.isRequired,
    close1: PropTypes.func.isRequired,
    selectedLocation: PropTypes.object,
    selectLocation: PropTypes.func.isRequired,
    blankLocation: PropTypes.func.isRequired,
    dateConfirm: PropTypes.bool.isRequired,
    show2: PropTypes.bool.isRequired,
    open2: PropTypes.func.isRequired,
    close2: PropTypes.func.isRequired,
    dateOption: PropTypes.number.isRequired,
    handleChangeDateOption: PropTypes.func.isRequired,
    showCalendar1: PropTypes.bool.isRequired,
    openCalendar1: PropTypes.func.isRequired,
    closeCalendar1: PropTypes.func.isRequired,
    showCalendar2: PropTypes.bool.isRequired,
    openCalendar2: PropTypes.func.isRequired,
    closeCalendar2: PropTypes.func.isRequired,
    selectDate: PropTypes.func.isRequired,
    selectedDate: PropTypes.any,
    selectDateStep: PropTypes.number.isRequired,
    changeDateStep: PropTypes.func.isRequired,
    selectedHour: PropTypes.any,
    selectedMin: PropTypes.any,
    handleChangeTimes: PropTypes.func.isRequired,
    confirmDate: PropTypes.func.isRequired,
    selectDateRange: PropTypes.func.isRequired,
    selectedStartDate: PropTypes.any,
    selectedEndDate: PropTypes.any
}

PhotographerDetailScreen.contextTypes = {
    t: PropTypes.func
}

export default PhotographerDetailScreen;
