import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../../style/styles.module.scss';
import Rating from 'react-rating';
import MdStar from 'react-ionicons/lib/MdStar';
import Truncate from 'react-truncate';

const Review = (props, context) => (
    <div className={`${props.index === props.totalLength - 1 ? null : styles.borderBtmGrayDc} ${styles.px3} ${styles.py3}`}>
        <div className={`${styles.row} ${styles.mx0} ${styles.alignItemsCenter}`}>
            <Rating 
            initialRating={props.review.rate} 
            emptySymbol={<MdStar fontSize={"16px"} color={"#f4f4f4"} />}
            fullSymbol={<MdStar fontSize={"16px"} color={"#fffb64"} />}
            fractions={2}
            readonly
            />
            <p className={`${styles.font10} ${styles.grayA6} ${styles.ml1}`}>{`${props.review.created_at.slice(0,4)}/${props.review.created_at.slice(5,7)}/${props.review.created_at.slice(8,10)}`}</p>
        </div>
        <p className={`${styles.mt2} ${styles.font12}`} style={{lineHeight: 1.2}} onClick={props.isTruncated ? props.undoTruncate : props.doTruncate}>
            <Truncate lines={props.isTruncated ? 4 : null} ellipsis={<span>...</span>}>
                {props.review.comment}
            </Truncate>
        </p>
        <p className={`${styles.font11} ${styles.textRight} ${styles.mt2}`} style={{lineHeight: 1.5}}>
            {`${props.review.order.confirmed_date.slice(0,4)}.${props.review.order.confirmed_date.slice(5,7)}.${props.review.order.confirmed_date.slice(8,10)}`}<br/>
            {`${props.review.order.option.title} (${props.review.order.option.person} ${props.review.order.option.person > 1 ? `people` : `person`}, ${props.review.order.option.hour} ${props.review.order.option.hour > 1 ? `hrs` : `hr`})`}<br/>
            {props.review.user.name}
        </p>
    </div>
)

Review.propTypes = {
    review: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    totalLength: PropTypes.number.isRequired,
    doTruncate: PropTypes.func.isRequired,
    undoTruncate: PropTypes.func.isRequired,
    isTruncated: PropTypes.bool.isRequired
}

export default Review;
