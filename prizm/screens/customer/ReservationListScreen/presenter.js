import React, { Component, Fragment } from 'react';
import { View, Text, FlatList, TouchableWithoutFeedback, Dimensions, ActivityIndicator, Image } from 'react-native';
import PropTypes from 'prop-types';
import styles from '../../../styles';
import Modal from 'react-native-modal';
import Loader from '../../../components/Loader';

const { width, height } = Dimensions.get('window');

class ReservationListScreen extends Component{
    static propTypes = {
        orderList: PropTypes.array,
        loading: PropTypes.bool.isRequired,
        orderListMore: PropTypes.func.isRequired,
        profile: PropTypes.object.isRequired,
        isSendingEmail: PropTypes.bool.isRequired,
        refresh: PropTypes.func.isRequired,
        refreshing: PropTypes.bool.isRequired,
        hasNextPage: PropTypes.bool.isRequired,
        isLoadingMore: PropTypes.bool.isRequired
    }

    static contextTypes = {
        t: PropTypes.func
    }

    render(){
        const { loading, orderList, profile, isSendingEmail, refreshing, hasNextPage, isLoadingMore } = this.props;
        return(
            <View style={[styles.container, styles.bgWhite, styles.px15]}>
                <Text style={[styles.font20, styles.fontBold, styles.mt20]}>
                    {this.context.t("My Schedule")}
                </Text>
                {profile && !profile.is_verified && (
                    <View style={[styles.row, styles.alignItemsCenter, styles.justifyContentBetween, styles.mt15]}>
                        <Text style={[styles.font12, styles.pink, { width: width - 130 }]}>
                            {this.context.t("Your request will be sent to the photographer when you complete the email verification")}
                        </Text>
                        <TouchableWithoutFeedback onPress={this.props.send}>
                            <View style={[styles.bgGray33, styles.center, styles.py15, styles.alignSelfCenter, { width: 100 }]}>
                                <Text style={[styles.font16, styles.fontBold, styles.white]}>
                                    {this.context.t("Resend")}
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                )}
                <View style={[styles.mt20, styles.flex1]}>
                    {loading ? (
                        <ActivityIndicator size={'small'} color={'#000'} />
                    ) : (
                        (orderList && orderList.length > 0) ? (
                            <FlatList 
                            showsVerticalScrollIndicator={false}
                            alwaysBounceVertical={false}
                            data={orderList} 
                            renderItem={({item, index}) => (
                                <TouchableWithoutFeedback key={item.id} onPress={() => this.props.navigation.navigate('ReservationDetail', { orderId: item.id, item })}>
                                    <View style={[(index === orderList.length - 1) ? null : styles.borderBtmGrayDc, styles.py15]}>
                                        <View style={[styles.row, styles.alignItemsCenter, styles.justifyContentBetween]}>
                                            <View style={[styles.flex9, styles.row, styles.alignItemsCenter]}>
                                                {item.status === 'pending' && (
                                                    <Text style={[styles.fontBold, styles.font13, styles.flex2, styles.pending]}>
                                                        {this.context.t("Pending")}
                                                    </Text>
                                                )}
                                                {((item.status === 'confirmed') || (item.status === 'waiting_payment')) && (
                                                    <Text style={[styles.fontBold, styles.font13, styles.flex2, styles.confirmed]}>
                                                        {this.context.t("Confirmed")}
                                                    </Text>
                                                )}
                                                {item.status === 'paid' && (
                                                    <Text style={[styles.fontBold, styles.font13, styles.flex2, styles.paid]}>
                                                        {this.context.t("Paid")}
                                                    </Text>
                                                )}
                                                {item.status === 'cancelled' && (
                                                    <Text style={[styles.fontBold, styles.font13, styles.flex2, styles.cancelled]}>
                                                        {this.context.t("Cancelled")}
                                                    </Text>
                                                )}
                                                {item.status === 'completed' && (
                                                    <Text style={[styles.fontBold, styles.font13, styles.flex2, styles.completed]}>
                                                        {this.context.t("Completed")}
                                                    </Text>
                                                )}
                                                <View style={[styles.flex8]}>
                                                    {item.date_option === 'Specific' && (
                                                        <Text style={[styles.ml15, styles.fontBold, styles.font11]}>
                                                            {item.specific_date.slice(2,4).concat('/',item.specific_date.slice(5,7),'/',item.specific_date.slice(8,10))}
                                                        </Text>
                                                    )}
                                                    {item.date_option === 'Range' && (
                                                        <Text style={[styles.ml15, styles.fontBold, styles.font11]}>
                                                            {item.start_date.slice(2,4).concat('/',item.start_date.slice(5,7),'/',item.start_date.slice(8,10))}
                                                        </Text>
                                                    )}
                                                    <Text style={[styles.ml15, styles.fontBold, styles.font13, styles.mt10]}>
                                                        {`${item.photographer.nickname} / ${item.location.name}`}
                                                    </Text>
                                                </View>
                                            </View>
                                            <View style={[styles.flex1, styles.alignItemsEnd]}>
                                                <Image source={require('../../../assets/images/icon_right.png')} style={[styles.iconArrowVerticalSm]} />
                                            </View>
                                        </View>
                                        {item.status === 'confirmed' && (
                                            <Fragment>
                                                <TouchableWithoutFeedback onPress={() => this.props.goPayment(order)}>
                                                    <View style={[styles.widthFull, styles.bgConfirmed, styles.center, styles.mt10]}>
                                                        <Text style={[styles.fontBold, styles.font14, styles.white]}>
                                                            {this.context.t("Add Payment Details")}
                                                        </Text>
                                                    </View>
                                                </TouchableWithoutFeedback>
                                                <Text style={[styles.font11, styles.mt5, styles.gray93]}>
                                                    {this.context.t("Please add payment details by : \n")}
                                                    {this.context.t(`${new Date(new Date(item.confirmed_at).getTime() + 1000*60*60*24*3)}`)}
                                                </Text>
                                            </Fragment>
                                        )}
                                        {item.status === 'waiting_payment' && (
                                            <Fragment>
                                                <TouchableWithoutFeedback onPress={() => this.props.goPayment(order)}>
                                                    <View style={[styles.widthFull, styles.bgConfirmed, styles.center, styles.mt10]}>
                                                        <Text style={[styles.fontBold, styles.font14, styles.white]}>
                                                            {this.context.t("View Payment Information")}
                                                        </Text>
                                                    </View>
                                                </TouchableWithoutFeedback>
                                                <Text style={[styles.font11, styles.mt5, styles.gray93]}>
                                                    {this.context.t("Please make payment by : \n")}
                                                    {this.context.t(`${new Date(new Date(item.deposit.created_at).getTime() + 1000*60*60*24*1)}`)}
                                                </Text>
                                            </Fragment>
                                        )}
                                        {item.status === 'completed' && !item.is_reviewed && (
                                            <TouchableWithoutFeedback onPress={() => this.props.goPayment(order)}>
                                                <View style={[styles.widthFull, styles.bgCompleted, styles.center, styles.mt10]}>
                                                    <Text style={[styles.fontBold, styles.font14, styles.white]}>
                                                        {this.context.t("Leave a Review")}
                                                    </Text>
                                                </View>
                                            </TouchableWithoutFeedback>
                                        )}
                                    </View>
                                </TouchableWithoutFeedback>
                            )} 
                            numColumns={1} 
                            keyExtractor={item => String(item.id)} 
                            refreshing={refreshing} 
                            onRefresh={this.props.refresh} 
                            onEndReached={hasNextPage ? this.props.orderListMore : null} 
                            onEndReachedThreshold={0.5} 
                            bounces={true} 
                            ListFooterComponent={isLoadingMore ? (
                                <View style={[styles.alignItemsCenter, styles.justifyContentCenter, styles.mt5, styles.py5]}>
                                    <ActivityIndicator size={'small'} color={'#000000'} />
                                </View>
                            ): null} />
                        ) : (
                            <View>
                                <Image source={require('../../../assets/images/main.png')} style={[styles.alignSelfCenter, { maxWidth: 400, width: width*0.8, maxHeight: 1668*400/2388, height: 1668*width*0.8/2388 }]} resizeMode={'contain'} />
                                <Text style={[styles.font12, styles.mt15]}>
                                    {this.context.t("You haven't made any reservations yet.\n")}
                                    {this.context.t("A new schedule will appear when you submit a request to a photographer.")}
                                </Text>
                            </View>
                        )
                    )}
                </View>
                <Modal
                isVisible={isSendingEmail}
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

export default ReservationListScreen