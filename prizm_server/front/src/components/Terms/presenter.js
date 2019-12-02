import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styles from '../../style/styles.module.scss';
import Loader from 'react-loader-spinner';

const Terms = (props, context) => (
    <div className={`${styles.safearea} ${styles.containerCustomer}`}>
        {props.loading ? (
            <div className={`${styles.widthFull} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.py3}`}>
                <Loader type="Oval" color="#d66c8b" height={20} width={20} />
            </div>
        ) : (
            props.error ? (
                <Fragment>
                    <p className={`${styles.fontBold} ${styles.font14} ${styles.textCenter} ${styles.mt2} ${styles.mb3}`}>
                        {context.t("약관이 존재하지 않습니다.")}
                    </p>
                </Fragment>
            ) : (
                <Fragment>
                    <p className={`${styles.fontBold} ${styles.font1620} ${styles.textCenter} ${styles.mt2} ${styles.mb3}`}>
                        {props.term.name}
                    </p>
                    <p dangerouslySetInnerHTML={{__html: props.term.content}}></p>
                </Fragment>
            )
        )}
    </div>
)

Terms.propTypes = {
    loading: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired,
    term: PropTypes.object
}

Terms.contextTypes = {
    t: PropTypes.func
}

export default Terms