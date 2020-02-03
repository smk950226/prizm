import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../style/styles.module.scss';
import { Link } from 'react-router-dom';

const ReviewCreateComplete = (props, context) => (
    <div className={`${styles.safearea} ${styles.containerCustomer} ${styles.row} ${styles.alignContentBetween} ${styles.alignContentMdCenter} ${styles.justifyContentCenter} ${styles.minHeightFull} ${styles.px3}`}>
        <div className={``}>
            <p className={`${styles.fontBold} ${styles.font1620}`}>{context.t("Your review has been submitted!")}</p>
            <p className={`${styles.font1416} ${styles.mt3}`}>{context.t("Thank you very much for the review. We hope you had a great experience with PRIZM.")}</p>
            <p className={`${styles.font1416} ${styles.mt2}`}>{context.t("If you have any questions or suggestions, feel free to reach us at contact@prizm.cloud")}</p>
            <div className={`${styles.textCenter}`}>
                <img src={require('../../assets/images/request_complete.png')} alt={context.t("Submitted")} className={`${styles.mt3}`} style={{width: '80%', maxWidth: 400}} />
            </div>
            <p className={`${styles.font1416} ${styles.mt3}`}>{context.t("Hope to see you again at your next trip!")}</p>
        </div>
        <Link to='/' style={{textDecoration: 'none', color: 'white', width: '100%'}}>
            <div className={`${styles.widthFull} ${styles.bgGray33} ${styles.row} ${styles.mx0} ${styles.mt3} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn}`} style={{height: 48}} onClick={props.goHome}>
                <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{context.t("Go to the main page")}</p>
            </div>
        </Link>
    </div>
)

ReviewCreateComplete.propTypes = {

}

ReviewCreateComplete.contextTypes = {
    t: PropTypes.func
}

export default ReviewCreateComplete;