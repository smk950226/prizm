import React, { Component, Fragment } from 'react';
import { View, Text, ScrollView, TouchableWithoutFeedback, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import styles from '../../../styles';
import Modal from 'react-native-modal';
import Loader from '../../../components/Loader';
import MapView, { Marker } from 'react-native-maps';

const { width, height } = Dimensions.get('window');

class ReservationDetailScreen extends Component{
    static propTypes = {
        loading: PropTypes.bool.isRequired,
        order: PropTypes.object.isRequired,
        mapRender: PropTypes.func.isRequired,
        mapReady: PropTypes.bool.isRequired,
        region: PropTypes.object
    }

    static contextTypes = {
        t: PropTypes.func
    }

    render(){
        const { loading, order, region } = this.props;
        return(
            <View style={[styles.container, styles.bgWhite]}>
                {loading ? (
                    null
                ) : (
                    <ScrollView
                    showsVerticalScrollIndicator={false}
                    alwaysBounceVertical={false}
                    >
                        <View style={[styles.mt10, styles.px15]}>
                            <View style={[styles.row, styles.alignItemsCenter, styles.justifyContentBetween]}>
                                <Text style={[styles.font16, styles.fontBold]}>
                                    {order.photographer.nickname}
                                </Text>
                                {order.status === 'pending' && (
                                    <Text style={[styles.font16, styles.fontBold, styles.pending]}>
                                        {this.context.t("Pending")}
                                    </Text>
                                )}
                                {((order.status === 'confirmed') || (order.status === 'waiting_payment')) && (
                                    <Text style={[styles.font16, styles.fontBold, styles.confirmed]}>
                                        {this.context.t("Confirmed")}
                                    </Text>
                                )}
                                {order.status === 'paid' && (
                                    <Text style={[styles.font16, styles.fontBold, styles.paid]}>
                                        {this.context.t("Paid")}
                                    </Text>
                                )}
                                {order.status === 'cancelled' && (
                                    <Text style={[styles.font16, styles.fontBold, styles.cancelled]}>
                                        {this.context.t("Cancelled")}
                                    </Text>
                                )}
                                {order.status === 'completed' && (
                                    <Text style={[styles.font16, styles.fontBold, styles.completed]}>
                                        {this.context.t("Completed")}
                                    </Text>
                                )}
                            </View>
                            <Text style={[styles.mt5, styles.font11]}>
                                {order.photographer.main_location}
                            </Text>
                            <Text style={[styles.font13, styles.fontBold, styles.mt20]}>
                                {this.context.t("Location")}
                            </Text>
                            <Text style={[styles.font14, styles.fontBold, styles.mt5]}>
                                {order.location.name}
                            </Text>
                            <View style={[styles.mt5]}>
                                <MapView 
                                ref={ref => (this.confirmMap = ref)}
                                style={[styles.widthFull, {height: 200}]}
                                initialRegion={region}
                                region={region}
                                onMapReady={this.props.mapRender}
                                >
                                    <Marker
                                    key={String(region.lat)}
                                    ref={ref => (this.confirmMarker = ref)}
                                    coordinate={region}
                                    />
                                </MapView>
                            </View>
                            <Text style={[styles.font14, styles.fontBold, styles.mt20]}>
                                {this.context.t("Date&Time")}
                            </Text>
                            {order.status === 'pending' ? (
                                <Fragment>
                                    {order.date_option === "Specific" && (
                                        <Text style={[styles.mt5, styles.fontBold, styles.font14]}>
                                            {order.specific_date.slice(2,4).concat('/', order.specific_date.slice(5,7), '/', order.specific_date.slice(8,10), ' ', order.specific_date.slice(11,13), ':', order.specific_date.slice(14,16))}
                                        </Text>
                                    )}
                                    {order.date_option === 'Range' && (
                                        <Text style={[styles.mt5, styles.fontBold, styles.font14]}>
                                            {order.start_date.slice(2,4).concat('/', order.start_date.slice(5,7), '/', order.start_date.slice(8,10), ' ~ ',order.end_date.slice(2,4).concat('/', order.end_date.slice(5,7), '/', order.end_date.slice(8,10)))}
                                        </Text>
                                    )}
                                </Fragment>
                            ) : (
                                <Text style={[styles.mt5, styles.fontBold, styles.font14]}>
                                    {order.confirmed_date.slice(2,4).concat('/', order.confirmed_date.slice(5,7), '/', order.confirmed_date.slice(8,10), ' ', order.confirmed_date.slice(11,13), ':', order.confirmed_date.slice(14,16))}
                                </Text>
                            )}
                            <Text style={[styles.font14, styles.fontBold, styles.mt20]}>
                                {this.context.t("Service&Pricing")}
                            </Text>
                            <Text style={[styles.mt5, styles.fontBold, styles.font14]}>
                                {`${order.option.title} (${order.option.person > 1 ? `${order.option.person} people` : `${order.option.person} person`}, ${order.option.hour > 1 ? `${order.option.hour} hrs` : `${order.option.hour} hr`})`}
                            </Text>
                            <Text style={[styles.mt5, styles.font10]}>
                                {order.option.description}
                            </Text>
                            {order.comment ? (
                                <Fragment>
                                    <Text style={[styles.mt5, styles.fontBold, styles.font14]}>
                                        {this.context.t("Comment")}
                                    </Text>
                                    <Text style={[styles.mt5, styles.font10]}>
                                        {request.comment}
                                    </Text>
                                </Fragment>
                            ) : (
                                null
                            )}
                        </View>
                        {order.status === 'confirmed' && (
                            <Fragment>
                                <TouchableWithoutFeedback onPress={() => this.props.goPayment(order)}>
                                    <View style={[styles.bgConfirmed, styles.mt20, styles.widthFull, styles.center, styles.maxWidth360, styles.py15, styles.alignSelfCenter]}>
                                        <Text style={[styles.font16, styles.fontBold, styles.white]}>
                                            {this.context.t("Add Payment Details")}
                                        </Text>
                                    </View>
                                </TouchableWithoutFeedback>
                                <Text style={[styles.font11, styles.mt5, styles.gray93, styles.px15]}>
                                    {this.context.t("Please add payment details by : \n")}
                                    {this.context.t(`${new Date(new Date(order.confirmed_at).getTime() + 1000*60*60*24*3)}`)}
                                </Text>
                            </Fragment>
                        )}
                        {order.status === 'waiting_payment' && (
                            <Fragment>
                                <TouchableWithoutFeedback onPress={() => this.props.goPayment(order)}>
                                    <View style={[styles.bgConfirmed, styles.mt20, styles.widthFull, styles.center, styles.maxWidth360, styles.py15, styles.alignSelfCenter]}>
                                        <Text style={[styles.font16, styles.fontBold, styles.white]}>
                                            {this.context.t("Add Payment Details")}
                                        </Text>
                                    </View>
                                </TouchableWithoutFeedback>
                                <Text style={[styles.font11, styles.mt5, styles.gray93, styles.px15]}>
                                    {this.context.t("Please make payment by : \n")}
                                    {this.context.t(`${new Date(new Date(order.deposit.created_at).getTime() + 1000*60*60*24*1)}`)}
                                </Text>
                            </Fragment>
                        )}
                        {order.status === 'completed' && !order.is_reviewed && (
                            <TouchableWithoutFeedback onPress={() => this.props.goReveiwCreate(order)}>
                                <View style={[styles.bgCompleted, styles.mt20, styles.widthFull, styles.center, styles.maxWidth360, styles.py15, styles.alignSelfCenter]}>
                                    <Text style={[styles.font16, styles.fontBold, styles.white]}>
                                        {this.context.t("Leave a Review")}
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                        )}
                    </ScrollView>
                )}
                <Modal
                isVisible={loading}
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

export default ReservationDetailScreen