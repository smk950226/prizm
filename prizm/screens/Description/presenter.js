import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styles from '../../style/styles.module.scss';
import { Element } from 'react-scroll';

class Description extends Component{
    static propTypes = {
        
    }

    static contextTypes = {
        t: PropTypes.func
    }

    render(){
        return(
            <div className={`${styles.safearea} ${styles.minHeightFullBtmNav} ${styles.containerCustomer} ${styles.px3}`}>
                <Element name={'about'}>
                    <div className={`${styles.borderBtmGrayDc} ${styles.py3}`}>
                        <p className={`${styles.font1620} ${styles.fontBold}`}>
                            {this.context.t("About PRIZM")}
                        </p>
                    </div>
                    <p className={`${styles.py3} ${styles.font1214} ${styles.lineHeight15}`}>
                        {this.context.t("PRIZM is a photography-centered tourism platform that connects travelers with talented local photographers in Seoul, South Korea. Browse the 'Photographer' section to view available photographers, or simply submit a 'Custom Request' - which takes less than 3 minutes to complete - so that we can find the right photographer for you.")}
                    </p>
                </Element>
                <Element name={'why'}>
                    <div className={`${styles.borderBtmGrayDc} ${styles.py3} ${styles.mt5}`}>
                        <p className={`${styles.font1620} ${styles.fontBold}`}>
                            {this.context.t("Why PRIZM")}
                        </p>
                    </div>
                    <p className={`${styles.py3} ${styles.font1214} ${styles.lineHeight15}`}>
                        {this.context.t("① You can make reservation and interact with your photographer even if you don't speak any local language. Our reservation system guarantees that both traveler and photographer successfully complete reservation matters with simple clicks and drags. ")}
                    </p>
                    <p className={`${styles.py3} ${styles.font1214} ${styles.lineHeight15}`}>
                        {this.context.t("② Photographer receives your money only after you have received your photos. While you will be asked to make payment after confirming your reservation details, the payment will only be transferred to your photographer after you have successfully received your travel photos. PRIZM safely holds the payment as deposit until you actually meet your photographer and get a photo session. On a very rare occasion, if the photographer does not show up or fails to deliver your photos, you will get 100% refund for your payment. ")}
                    </p>
                    <p className={`${styles.py3} ${styles.font1214} ${styles.lineHeight15}`}>
                        {this.context.t("③ You don't have to worry even if you don't have a specific local photographer in mind. Submit a 'Custom Request' and simply let us know a little information such as your desired date & time so that we could find the right photographer for you. ")}
                    </p>
                </Element>
                <Element name={'how'}>
                    <div className={`${styles.borderBtmGrayDc} ${styles.py3} ${styles.mt5}`}>
                        <p className={`${styles.font1620} ${styles.fontBold}`}>
                            {this.context.t("How it works")}
                        </p>
                    </div>
                    <p className={`${styles.mt3} ${styles.font1620} ${styles.fontBold}`}>
                        {this.context.t("Custom Request")}
                    </p>
                    <p className={`${styles.py3} ${styles.font1214} ${styles.lineHeight15}`}>
                        {this.context.t("① Click on the 'Book your photographer now' button. ")}
                    </p>
                    <p className={`${styles.py3} ${styles.font1214} ${styles.lineHeight15}`}>
                        {this.context.t("② Go through the reservation form and fill in the blanks.")}
                    </p>
                    <p className={`${styles.py3} ${styles.font1214} ${styles.lineHeight15}`}>
                        {this.context.t("③ When you complete the form, we'll recommend you at least 3 photographers registered in PRIZM within 72 hours. ")}
                    </p>
                    <p className={`${styles.py3} ${styles.font1214} ${styles.lineHeight15}`}>
                        {this.context.t("④ Choose your favorite photographer and start messaging him/her to discuss the meeting time and location. (Don't worry - setting up the date and time will be done with clicks and drags on your screen, without much of manual messaging.) ")}
                    </p>
                    <p className={`${styles.py3} ${styles.font1214} ${styles.lineHeight15}`}>
                        {this.context.t("⑤ Confirm your reservation and enter payment details. ")}
                    </p>
                    <p className={`${styles.py3} ${styles.font1214} ${styles.lineHeight15}`}>
                        {this.context.t("⑥ After you have had a photo session with your photographer, your photos will be sent both to your e-mail and PRIZM website. ")}
                    </p>
                    <p className={`${styles.py3} ${styles.font1214} ${styles.lineHeight15}`}>
                        {this.context.t("⑦ Your paymnt will be transferred to the photographer after you have received your photos. ")}
                    </p>
                    <p className={`${styles.mt3} ${styles.font1620} ${styles.fontBold}`}>
                        {this.context.t("Selecting your photographer yourself")}
                    </p>
                    <p className={`${styles.py3} ${styles.font1214} ${styles.lineHeight15}`}>
                        {this.context.t("① A list of PRIZM photographers is available at the 'Photographers' menu. ")}
                    </p>
                    <p className={`${styles.py3} ${styles.font1214} ${styles.lineHeight15}`}>
                        {this.context.t("② If you tab or click a photographer's icon, you will be directed to the photographer's online studio.  ")}
                    </p>
                    <p className={`${styles.py3} ${styles.font1214} ${styles.lineHeight15}`}>
                        {this.context.t("③ If you decide to make a reservation with the photographer, follow the reservation guideline in the studio and submit your reservation. ")}
                    </p>
                    <p className={`${styles.py3} ${styles.font1214} ${styles.lineHeight15}`}>
                        {this.context.t("④ Soon you will receive a message from the photographer to set up the date and time. (Don't worry - this process will be handled with simple clicks and drags on your screen) ")}
                    </p>
                    <p className={`${styles.py3} ${styles.font1214} ${styles.lineHeight15}`}>
                        {this.context.t("⑤ Confirm your reservation and enter payment details. ")}
                    </p>
                    <p className={`${styles.py3} ${styles.font1214} ${styles.lineHeight15}`}>
                        {this.context.t("⑥ After you have had a photo session with your photographer, your photos will be sent both to your e-mail and PRIZM website. ")}
                    </p>
                    <p className={`${styles.py3} ${styles.font1214} ${styles.lineHeight15}`}>
                        {this.context.t("⑦ Your paymnt will be transferred to the photographer after you have received your photos. ")}
                    </p>
                </Element>
                <Element name={'support'}>
                    <div className={`${styles.borderBtmGrayDc} ${styles.py3} ${styles.mt5}`}>
                        <p className={`${styles.font1620} ${styles.fontBold}`}>
                            {this.context.t("Support")}
                        </p>
                    </div>
                    <p className={`${styles.py3} ${styles.font1214} ${styles.lineHeight15}`}>
                        {this.context.t("If you have any questions, please send us an email at :")}<br/>
                        {this.context.t("contact@prizm.cloud")}<br/>
                        {this.context.t("We will respond within 24 hours. ")}
                    </p>
                    <p className={`${styles.py3} ${styles.font1214} ${styles.lineHeight15} ${styles.mb5}`}>
                        {this.context.t("If you need an immediate support in Seoul, call us at :")}<br/>
                        {this.context.t("+82-10-5309-3547")}
                    </p>
                </Element>
            </div>
        )
    }
}
export default Description; 