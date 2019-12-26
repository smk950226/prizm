import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from '../../style/styles.module.scss';

const NotFound = (props, context) => (
    <div className={`${styles.safearea} ${styles.containerCustomer} ${styles.row} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.minHeightFull} ${styles.px3}`}>
        <div className={`${styles.textCenter}`}>
            <img src={require('../../assets/images/email_verifing.png')} alt={context.t("Submitted")} className={``} style={{width: '100%', maxWidth: 500}} />
            <p className={`${styles.fontBold} ${styles.mt2}`} style={{fontSize: 70}}>{context.t("404")}</p>
            <p className={`${styles.font1214} ${styles.mt1}`}>{context.t("Page not found")}</p>
            <p className={`${styles.font1214} ${styles.mt2} ${styles.textCenter}`}>
                {context.t(`The page you are looking for doesn't exist or another error has occured.`)}<br/>
            </p>
            <Link to='/' style={{textDecoration: 'none', color: 'white'}}>
                <div className={`${styles.widthFull} ${styles.bgGray33} ${styles.row} ${styles.mx0} ${styles.mt3} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.btn}`} style={{height: 48}} onClick={props.goHome}>
                    <p className={`${styles.fontBold} ${styles.font14} ${styles.white}`}>{context.t("Go to the main page")}</p>
                </div>
            </Link>
        </div>
    </div>
)

NotFound.propTypes = {
    goHome: PropTypes.func
}

NotFound.contextTypes = {
    t: PropTypes.func
}

export default NotFound;