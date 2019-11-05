import React, { Component} from 'react';
import PropTypes from 'prop-types';
import styles from '../../style/styles.module.scss'
import VideoCover from 'react-video-cover';

class Home extends Component{
    static propTypes = {
        username: PropTypes.string.isRequired,
        handleInputChange: PropTypes.func.isRequired
    }

    static contextTypes = {
        t: PropTypes.func
    }

    render(){
        const videoOptions = {
            src: require('../../assets/videos/newyork.mp4'),
            ref: videoRef => {
                this.videoRef = videoRef;
            },
            autoPlay: true,
            muted: true,
            loop: true
        };
        const { username, handleInputChange } = this.props;
        return(
            <div className={`${styles.widthFull} ${styles.heightFull}`}>
                <VideoCover videoOptions={videoOptions} />
                <div className={`${styles.absoluteCenter} ${styles.widthFull} ${styles.heightFull}`} style={{backgroundColor: 'rgba(0,0,0,0.8)'}}></div>
                <div className={`${styles.positionHomeTitle} ${styles.widthFull}`}>
                    <p className={`${styles.white} ${styles.fontLight} ${styles.font60120} ${styles.italic} ${styles.textCenter}`}>{this.context.t("NEW YORK")}</p>
                </div>
                <div className={`${styles.absoluteCenter} ${styles.widthFull}`}>
                    <div className={`${styles.row} ${styles.mx0} ${styles.justifyContentCenter}`}>
                        <input className={`${styles.textInput1}`} type={"text"} name={"username"} value={username} placeholder={this.context.t("YourJourneyBecomesArt@Prizm")} onChange={handleInputChange}></input>
                    </div>
                </div>
                <div className={`${styles.positionHomeLogo} ${styles.widthFull}`}>
                    <p className={`${styles.gray2f} ${styles.fontLight} ${styles.font26} ${styles.textCenter}`}>{this.context.t("prizm.cloud")}</p>
                </div>
            </div>
        )
    }
}
export default Home; 