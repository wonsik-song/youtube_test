import React, { Component } from 'react';
import styles from './youtubecontents.module.css';
import Content from './content';

class Youtubecontents extends Component<any, any> {
    render() {
        let listItem = [];
        if (this.props.videoData !== undefined) {
            console.log(this.props.videoData);
            //listItem = this.props.videoData.map((item, index) => <li key={index}>{item.etag}</li>);
            listItem = this.props.videoData.map((item: any, index: Number) => <Content className={styles.content} content={item.snippet} />);
            console.log(listItem, this.props.videoData);
        }

        return <div className={styles.container}>{listItem}</div>;
    }
}

export default Youtubecontents;
