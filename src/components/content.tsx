import React, { Component } from 'react';
import styles from './content.module.css';
import { htmlToText } from 'html-to-text';

class Content extends Component<any, any> {
    render() {
        const item = this.props.content;
        return (
            <li className={styles.container}>
                <img className={styles.image} src={item.thumbnails.high.url} alt="" />
                <div className={styles.text}>
                    <p className={styles.title}>{htmlToText(item.title)}</p>
                    <p className={styles.description}>{htmlToText(item.description)}</p>
                </div>
            </li>
        );
    }
}

export default Content;
