import React, { Component } from 'react';
import styles from './content.module.css';
import { htmlToText } from 'html-to-text';

class Content extends Component<any, any> {
    handleContentClick = (e: any) => {
        console.log(e.currentTarget.dataset.id);
        this.props.selectContent(e.currentTarget.dataset.id);
    };

    render() {
        const item = this.props.content;
        return (
            <div className={styles.container} data-id={item.channelId} onClick={this.handleContentClick}>
                <img className={styles.image} src={item.thumbnails.medium.url} alt="" />
                <div className={styles.text}>
                    <p className={styles.title}>{htmlToText(item.title)}</p>
                    <p className={styles.description}>{htmlToText(item.description)}</p>
                </div>
            </div>
        );
    }
}

export default Content;
