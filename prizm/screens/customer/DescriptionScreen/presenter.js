import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';
import styles from '../../../styles';
import {
    ScrollIntoView, // enhanced View container
    wrapScrollView, // simple wrapper, no config
    wrapScrollViewConfigured, // complex wrapper, takes a config
  } from 'react-native-scroll-into-view';
  
const CustomScrollView = wrapScrollView(ScrollView);

const options = {
    align: 'top',
    animated: true,
    insets: {
        top: 0,
        bottom: 0,
    },
};

class DescriptionScreen extends Component{
    static propTypes = {
        menu: PropTypes.string
    }

    static contextTypes = {
        t: PropTypes.func
    }

    state = {
        about: null,
        why: null,
        how: null,
        support: null,
        loading: true
    }

    componentDidUpdate = (prevProps, prevState) => {
        if(this.state.loading && this.state.about && this.state.why && this.state.how && this.state.support){
            this.setState({
                loading: false
            })
            const { menu } = this.props;
            if(menu){
                if(menu === 'about'){
                    this.scrollViewRef.scrollTo({y: this.state.about.y})
                }
                else if(menu === 'why'){
                    this.scrollViewRef.scrollTo({y: this.state.why.y})
                }
                else if(menu === 'how'){
                    this.scrollViewRef.scrollTo({y: this.state.how.y})
                }
                else if(menu === 'support'){
                    this.scrollViewRef.scrollTo({y: this.state.support.y})
                }
                else{
                    this.scrollViewRef.scrollTo({y: this.state.about.y})
                }
            }
        }
        if(prevProps.menu !== this.props.menu && this.state.about && this.state.why && this.state.how && this.state.support){
            const { menu } = this.props;
            if(menu){
                if(menu === 'about'){
                    this.scrollViewRef.scrollTo({y: this.state.about.y})
                }
                else if(menu === 'why'){
                    this.scrollViewRef.scrollTo({y: this.state.why.y})
                }
                else if(menu === 'how'){
                    this.scrollViewRef.scrollTo({y: this.state.how.y})
                }
                else if(menu === 'support'){
                    this.scrollViewRef.scrollTo({y: this.state.support.y})
                }
                else{
                    this.scrollViewRef.scrollTo({y: this.state.about.y})
                }
            }
        }
    }

    render(){
        return(
            <View style={[styles.container, styles.bgWhite, styles.px15]}>
                <ScrollView
                showsVerticalScrollIndicator={false}
                alwaysBounceVertical={false}
                ref={ref => this.scrollViewRef = ref}
                >
                    <View style={[styles.mb50]} onLayout={event => this.setState({
                        about: event.nativeEvent.layout
                    })}>
                        <View style={[styles.borderBtmGrayDc]}>
                            <Text style={[styles.fontBold, styles.font20, styles.py10]}>
                                {this.context.t("About PRIZM")}
                            </Text>
                        </View>
                        <View style={[styles.mt10]}>
                            <Text style={[styles.fontRegular, styles.font14, { lineHeight: 20 }]}>
                                {this.context.t("PRIZM is a photography-centered tourism platform that connects travelers with talented local photographers in Seoul, South Korea. Browse the 'Photographer' section to view available photographers, or simply submit a 'Custom Request' - which takes less than 3 minutes to complete - so that we can find the right photographer for you.")}
                            </Text>
                        </View>
                    </View>
                    <View style={[styles.mb50]} onLayout={event => this.setState({
                        why: event.nativeEvent.layout
                    })}>
                        <View style={[styles.borderBtmGrayDc]}>
                            <Text style={[styles.fontBold, styles.font20, styles.py10]}>
                                {this.context.t("Why PRIZM")}
                            </Text>
                        </View>
                        <View style={[styles.mt10]}>
                            <Text style={[styles.fontRegular, styles.font14, { lineHeight: 20 }]}>
                                {this.context.t("① You can make reservation and interact with your photographer even if you don't speak any local language. Our reservation system guarantees that both traveler and photographer successfully complete reservation matters with simple clicks and drags. ")}
                            </Text>
                            <Text style={[styles.fontRegular, styles.font14, styles.mt20, { lineHeight: 20 }]}>
                                {this.context.t("② Photographer receives your money only after you have received your photos. While you will be asked to make payment after confirming your reservation details, the payment will only be transferred to your photographer after you have successfully received your travel photos. PRIZM safely holds the payment as deposit until you actually meet your photographer and get a photo session. On a very rare occasion, if the photographer does not show up or fails to deliver your photos, you will get 100% refund for your payment. ")}
                            </Text>
                            <Text style={[styles.fontRegular, styles.font14, styles.mt20, { lineHeight: 20 }]}>
                                {this.context.t("③ You don't have to worry even if you don't have a specific local photographer in mind. Submit a 'Custom Request' and simply let us know a little information such as your desired date & time so that we could find the right photographer for you. ")}
                            </Text>
                        </View>
                    </View>
                    <View style={[styles.mb50]} onLayout={event => this.setState({
                        how: event.nativeEvent.layout
                    })}>
                        <View style={[styles.borderBtmGrayDc]}>
                            <Text style={[styles.fontBold, styles.font20, styles.py10]}>
                                {this.context.t("How it works")}
                            </Text>
                        </View>
                        <View style={[styles.mt10]}>
                            <Text style={[styles.fontBold, styles.font20]}>
                                {this.context.t("Custom Request")}
                            </Text>
                            <Text style={[styles.fontRegular, styles.font14, { lineHeight: 20 }]}>
                                {this.context.t("① Click on the 'Book your photographer now' button. ")}
                            </Text>
                            <Text style={[styles.fontRegular, styles.font14, styles.mt20, { lineHeight: 20 }]}>
                                {this.context.t("② Go through the reservation form and fill in the blanks.")}
                            </Text>
                            <Text style={[styles.fontRegular, styles.font14, styles.mt20, { lineHeight: 20 }]}>
                                {this.context.t("③ When you complete the form, we'll recommend you at least 3 photographers registered in PRIZM within 72 hours. ")}
                            </Text>
                            <Text style={[styles.fontRegular, styles.font14, styles.mt20, { lineHeight: 20 }]}>
                                {this.context.t("④ Choose your favorite photographer and start messaging him/her to discuss the meeting time and location. (Don't worry - setting up the date and time will be done with clicks and drags on your screen, without much of manual messaging.) ")}
                            </Text>
                            <Text style={[styles.fontRegular, styles.font14, styles.mt20, { lineHeight: 20 }]}>
                                {this.context.t("⑤ Confirm your reservation and enter payment details. ")}
                            </Text>
                            <Text style={[styles.fontRegular, styles.font14, styles.mt20, { lineHeight: 20 }]}>
                                {this.context.t("⑥ After you have had a photo session with your photographer, your photos will be sent both to your e-mail and PRIZM website. ")}
                            </Text>
                            <Text style={[styles.fontRegular, styles.font14, styles.mt20, { lineHeight: 20 }]}>
                                {this.context.t("⑦ Your paymnt will be transferred to the photographer after you have received your photos. ")}
                            </Text>
                            <Text style={[styles.fontBold, styles.font20, styles.mt20]}>
                                {this.context.t("Selecting your photographer yourself")}
                            </Text>
                            <Text style={[styles.fontRegular, styles.font14, { lineHeight: 20 }]}>
                                {this.context.t("① A list of PRIZM photographers is available at the 'Photographers' menu. ")}
                            </Text>
                            <Text style={[styles.fontRegular, styles.font14, styles.mt20, { lineHeight: 20 }]}>
                                {this.context.t("② If you tab or click a photographer's icon, you will be directed to the photographer's online studio.  ")}
                            </Text>
                            <Text style={[styles.fontRegular, styles.font14, styles.mt20, { lineHeight: 20 }]}>
                                {this.context.t("③ If you decide to make a reservation with the photographer, follow the reservation guideline in the studio and submit your reservation. ")}
                            </Text>
                            <Text style={[styles.fontRegular, styles.font14, styles.mt20, { lineHeight: 20 }]}>
                                {this.context.t("④ Soon you will receive a message from the photographer to set up the date and time. (Don't worry - this process will be handled with simple clicks and drags on your screen) ")}
                            </Text>
                            <Text style={[styles.fontRegular, styles.font14, styles.mt20, { lineHeight: 20 }]}>
                                {this.context.t("⑤ Confirm your reservation and enter payment details. ")}
                            </Text>
                            <Text style={[styles.fontRegular, styles.font14, styles.mt20, { lineHeight: 20 }]}>
                                {this.context.t("⑥ After you have had a photo session with your photographer, your photos will be sent both to your e-mail and PRIZM website. ")}
                            </Text>
                            <Text style={[styles.fontRegular, styles.font14, styles.mt20, { lineHeight: 20 }]}>
                                {this.context.t("⑦ Your paymnt will be transferred to the photographer after you have received your photos. ")}
                            </Text>
                        </View>
                    </View>
                    <View style={[styles.mb50]} onLayout={event => this.setState({
                        support: event.nativeEvent.layout
                    })}>
                        <View style={[styles.borderBtmGrayDc]}>
                            <Text style={[styles.fontBold, styles.font20, styles.py10]}>
                                {this.context.t("Support")}
                            </Text>
                        </View>
                        <View style={[styles.mt10]}>
                            <Text style={[styles.fontRegular, styles.font14, { lineHeight: 20 }]}>
                                {this.context.t("If you have any questions, please send us an email at :")}
                            </Text>
                            <Text style={[styles.fontRegular, styles.font14, { lineHeight: 20 }]}>
                                {this.context.t("contact@prizm.cloud")}
                            </Text>
                            <Text style={[styles.fontRegular, styles.font14, { lineHeight: 20 }]}>
                                {this.context.t("We will respond within 24 hours. ")}
                            </Text>
                            <Text style={[styles.fontRegular, styles.font14, styles.mt20, { lineHeight: 20 }]}>
                                {this.context.t("If you need an immediate support in Seoul, call us at :")}
                            </Text>
                            <Text style={[styles.fontRegular, styles.font14, { lineHeight: 20 }]}>
                                {this.context.t("+82-10-5309-3547")}
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

export default DescriptionScreen;