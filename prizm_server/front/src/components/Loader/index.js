import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../style/styles.module.scss';
import Loader from 'react-loader-spinner';

const MyLoader = (props) => (
    <div className={`${styles.minHeightFull} ${styles.heightFullPercent} ${styles.widthFull} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter}`} style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 999, backgroundColor: 'rgba(255,255,255,0.7)'}}>
        <div className={`${styles.textCenter}`}>
            <img src={require('../../assets/images/favicon.png')} style={{width: 96*0.7, height: 110*0.7}} className={`${styles.mb3}`} />
            <Loader
            type={"ThreeDots"}
            color={"#333333"}
            height={20}
            width={80}
            />
        </div>
    </div>
)

export default MyLoader; 