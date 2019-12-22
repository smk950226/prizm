import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../../style/styles.module.scss';
import Truncate from 'react-truncate';

class LocationComp extends Component{
    static propTypes = {
        location: PropTypes.object.isRequired,
        selectedLocation: PropTypes.object,
        iondex: PropTypes.number,
        total: PropTypes.number,
        blankLocation: PropTypes.func.isRequired,
        selectLocation: PropTypes.func.isRequired,
        readOnly: PropTypes.bool
    }

    static contextTypes = {
        t: PropTypes.func
    }

    state = {
        isTruncated: true
    }

    componentDidUpdate = (prevProps, prevState) => {
        if((prevProps.selectedLocation.id === prevProps.location.id) && (this.props.selectedLocation.id !== this.props.location.id)){
            this.setState({
                isTruncated: true
            })
        }
    }

    _handleTruncate = () => {
        this.setState({
            isTruncated: !this.state.isTruncated
        })
    }

    _blankLocation = () => {
        this.setState({
            isTruncated: true
        })
        this.props.blankLocation()
    }

    _selectLocation = (location) => {
        this.setState({
            isTruncated: false
        })
        this.props.selectLocation(location)
    }

    render(){
        const { location, selectedLocation, index, total, readOnly } = this.props;
        const { isTruncated } = this.state;
        return(
            <div className={`${styles.containerLocation} ${selectedLocation.id === location.id ? styles.selected : null} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.cursorPointer} ${index === total - 1 ? null : styles.mr3}`} onClick={readOnly ? null : selectedLocation.id === location.id ? this._blankLocation : () => this._selectLocation(location)} style={isTruncated ? {width: 120, minWidth: 120} : { width: null, minWidth: null }}>
                <div className={`${styles.px3} ${styles.col12}`}>
                    <p className={`${styles.font10}`}>{this.context.t(`Location ${index + 1}`)}</p>
                    <p className={`${styles.fontBold} ${styles.font11} ${styles.mt1} ${styles.cursorPointer}`} style={isTruncated ? null : {whiteSpace: 'nowrap'}}>
                    <Truncate lines={isTruncated ? 1 : null} ellipsis={<span className={`${styles.cursorPointer}`} onClick={this._handleTruncate}>...</span>} width={82}>
                        {location.name}
                    </Truncate>
                    </p>
                </div>
            </div>
        )
    }
}

export default LocationComp