import React, { Component} from 'react';
import PropTypes from 'prop-types';
import styles from '../../style/styles.module.scss'
import IosArrowRoundForward from 'react-ionicons/lib/IosArrowRoundForward';

class Welcome extends Component{
    static propTypes = {
        username: PropTypes.string.isRequired,
        handleInputChange: PropTypes.func.isRequired,
        handleKeyPress: PropTypes.func.isRequired,
        submit: PropTypes.func.isRequired
    }

    static contextTypes = {
        t: PropTypes.func
    }

    render(){
        const { username, handleInputChange, handleKeyPress, submit } = this.props;
        return(
            <div className={`${styles.widthFull} ${styles.overflowHidden}`}>
                <video id="video_background" src={require('../../assets/videos/newyork.mp4')} className={`${styles.widthFull} ${styles.heightFull}`} style={{objectFit: 'cover'}} autoPlay={true} loop={true} muted={true} playsInline={true} />
                <div className={`${styles.absoluteCenter} ${styles.widthFull} ${styles.heightFull}`} style={{backgroundColor: 'rgba(0,0,0,0.6)'}}></div>
                <div className={`${styles.absoluteCenter} ${styles.widthFull}`}>
                    <p className={`${styles.white} ${styles.fontLight} ${styles.font24} ${styles.textCenter}`}>
                        {this.context.t("Meet the best photographers in Seoul.")}
                    </p>
                    <p className={`${styles.white} ${styles.fontLight} ${styles.font16} ${styles.textCenter} ${styles.mt2}`}>
                        {this.context.t("PRIZM connects tourists in need of travel photography with photographers around the world.")}
                    </p>
                    <div className={`${styles.row} ${styles.mx0} ${styles.justifyContentCenter} ${styles.mt5} ${styles.mb5}`}>
                        <input className={`${styles.textInput1}`} type={"text"} name={"username"} value={username} placeholder={this.context.t("  Enter your email here to stay connected with us.")} onChange={handleInputChange} onKeyPress={handleKeyPress}></input>
                        <div className={`${styles.bgWhite} ${styles.row} ${styles.mx0} ${styles.alignItemsCenter} ${styles.justifyContentCenter} ${styles.px2}`}>
                            <div className={`${styles.bgWhite} ${username ? styles.circleBlack40 : styles.circleGray8e40} ${styles.cursorPointer}`} onClick={submit}>
                                <IosArrowRoundForward fontSize="40px" color={username ? '#000000' : '#8e8e8e'}/>
                            </div>
                        </div>
                    </div>
                    <p className={`${styles.white} ${styles.fontLight} ${styles.font24} ${styles.textCenter} ${styles.hidden}`}>
                        {this.context.t("Meet the best photographers in Seoul.")}
                    </p>
                    <p className={`${styles.white} ${styles.fontLight} ${styles.font16} ${styles.textCenter} ${styles.mt2} ${styles.hidden}`}>
                        {this.context.t("PRIZM connects tourists in need of travel photography with photographers around the world.")}
                    </p>
                </div>
                <div className={`${styles.positionHomeLogo} ${styles.widthFull}`}>
                    <p className={`${styles.grayA6} ${styles.fontLight} ${styles.font13} ${styles.textCenter}`}>{this.context.t("prizm.cloud")}</p>
                </div>
            </div>
        )
    }
}
export default Welcome; 