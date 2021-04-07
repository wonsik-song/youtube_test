import React, { Component } from 'react';
import styles from './videoplayer.module.css';

class Videoplayer extends Component {
    render() {
        return (
            <div className={styles.container}>
                <iframe className={styles.videoplayer} id="ytplayer" src="https://www.youtube.com/embed/zFT3f9biz68" frameBorder="1" allowFullScreen></iframe>
            </div>
        );
    }
}

export default Videoplayer;
