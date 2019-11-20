import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../style/styles.module.scss';

const MessageList = (props, context) => (
    <div className={`${styles.safearea} ${styles.containerCustomer} ${styles.px3}`}>
        <p className={`${styles.mt45} ${styles.fontBold} ${styles.font17}`}>{context.t("Messages")}</p>
        
    </div>
)

MessageList.propTypes = {
    orderList: PropTypes.array,
}

MessageList.contextTypes = {
    t: PropTypes.func
}

export default MessageList